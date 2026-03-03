import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { PRICING_MAP, ROLES, TRACKS } from '@/lib/constants';
import { uploadImage, uploadPaymentScreenshot } from '@/lib/cloudinary';

/**
 * POST /api/participants
 * Public registration endpoint — no auth required.
 */
export async function POST(req: NextRequest) {
    try {
        let body;
        try {
            const bodyText = await req.text();
            body = bodyText ? JSON.parse(bodyText) : {};
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }
        const { name, email, phone, participantType, track, paperTitle, university, location, transactionId, image, paymentScreenshot } = body || {};

        // Validate required fields
        if (!name || !email || !participantType) {
            return NextResponse.json(
                { error: 'name, email, and participantType are required' },
                { status: 400 }
            );
        }

        // Validate participant type
        const validTypes = Object.keys(PRICING_MAP);
        if (!validTypes.includes(participantType)) {
            return NextResponse.json(
                { error: `Invalid participantType. Must be one of: ${validTypes.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate presenter requirements
        if (participantType === 'presenter') {
            if (!track) {
                return NextResponse.json({ error: 'Track is required for presenters' }, { status: 400 });
            }
            if (!paperTitle) {
                return NextResponse.json({ error: 'Paper title is required for presenters' }, { status: 400 });
            }
            if (!TRACKS.includes(track as (typeof TRACKS)[number])) {
                return NextResponse.json(
                    { error: `Invalid track. Must be one of: ${TRACKS.join(', ')}` },
                    { status: 400 }
                );
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        await connectDB();

        // Check duplicate email
        const existing = await ParticipantModel.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return NextResponse.json(
                { error: 'A participant with this email is already registered' },
                { status: 409 }
            );
        }

        // Upload participant image to Cloudinary if provided
        let imageUrl: string | undefined;
        if (image) {
            try {
                const result = await uploadImage(image);
                imageUrl = result.secure_url;
            } catch (uploadErr) {
                console.error('Cloudinary upload error:', uploadErr);
            }
        }

        // Upload payment screenshot to Cloudinary if provided
        let paymentScreenshotUrl: string | undefined;
        if (paymentScreenshot) {
            try {
                const result = await uploadPaymentScreenshot(paymentScreenshot);
                paymentScreenshotUrl = result.secure_url;
            } catch (uploadErr) {
                console.error('Payment screenshot upload error:', uploadErr);
            }
        }

        const expectedAmount = PRICING_MAP[participantType] || 0;

        const participant = await ParticipantModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone?.trim() || null,
            participantType,
            track: participantType === 'presenter' ? track : null,
            paperTitle: participantType === 'presenter' ? paperTitle?.trim() : null,
            university: university?.trim() || null,
            location: location || {},
            transactionId: transactionId?.trim() || null,
            expectedAmount,
            paymentStatus: 'pending',
            imageUrl,
            paymentScreenshotUrl,
            paperStatus: participantType === 'presenter' ? 'pending' : 'pending',
        });

        return NextResponse.json(
            {
                success: true,
                data: {
                    id: participant._id.toString(),
                    name: participant.name,
                    email: participant.email,
                    participantType: participant.participantType,
                    expectedAmount: participant.expectedAmount,
                    paymentStatus: participant.paymentStatus,
                },
            },
            { status: 201 }
        );
    } catch (err) {
        console.error('POST /api/participants error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * GET /api/participants
 * List participants — role-filtered.
 * Convener: all participants
 * Accountant: all (for payment review)
 * Track Coordinator: only their assigned track
 */
export async function GET(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER, ROLES.ACCOUNTANT, ROLES.TRACK_COORDINATOR)) {
            return forbiddenResponse();
        }

        await connectDB();

        const searchParams = req.nextUrl.searchParams;
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')));
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const search = searchParams.get('search');

        // Build query filter
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: Record<string, any> = {};

        // Track coordinator can only see their assigned track
        if (user.role === ROLES.TRACK_COORDINATOR && user.assignedTrack) {
            filter.track = user.assignedTrack;
        }

        if (status && ['pending', 'verified', 'rejected'].includes(status)) {
            filter.paymentStatus = status;
        }

        if (type && ['attendee', 'presenter', 'student', 'faculty'].includes(type)) {
            filter.participantType = type;
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { participantId: { $regex: search, $options: 'i' } },
            ];
        }

        const total = await ParticipantModel.countDocuments(filter);
        const participants = await ParticipantModel.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return NextResponse.json({
            success: true,
            data: participants,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        console.error('GET /api/participants error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
