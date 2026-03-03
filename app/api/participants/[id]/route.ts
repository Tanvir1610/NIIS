import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import AuditLogModel from '@/models/AuditLog';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { PRICING_MAP, ROLES, TRACKS } from '@/lib/constants';

/**
 * PUT /api/participants/[id]
 * Edit participant information (convener-only).
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        const { id } = await params;
        const body = await req.json();
        const { name, email, phone, university, participantType, track, paperTitle, transactionId } = body || {};

        if (!name || !email) {
            return NextResponse.json(
                { error: 'name and email are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const participant = await ParticipantModel.findById(id);
        if (!participant) {
            return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
        }

        // Check email conflict
        const emailConflict = await ParticipantModel.findOne({
            email: email.toLowerCase().trim(),
            _id: { $ne: id },
        });
        if (emailConflict) {
            return NextResponse.json(
                { error: 'Another participant with this email already exists' },
                { status: 409 }
            );
        }

        // Validate participant type if changed
        if (participantType) {
            const validTypes = Object.keys(PRICING_MAP);
            if (!validTypes.includes(participantType)) {
                return NextResponse.json(
                    { error: `Invalid participantType. Must be one of: ${validTypes.join(', ')}` },
                    { status: 400 }
                );
            }
        }

        // Validate track if presenter
        const finalType = participantType || participant.participantType;
        if (finalType === 'presenter' && track && !TRACKS.includes(track as (typeof TRACKS)[number])) {
            return NextResponse.json(
                { error: `Invalid track. Must be one of: ${TRACKS.join(', ')}` },
                { status: 400 }
            );
        }

        // Build changes description for audit
        const changes: string[] = [];
        if (name !== participant.name) changes.push(`name: ${participant.name} → ${name}`);
        if (email.toLowerCase().trim() !== participant.email) changes.push(`email: ${participant.email} → ${email}`);
        if (participantType && participantType !== participant.participantType) changes.push(`type: ${participant.participantType} → ${participantType}`);

        // Update fields
        participant.name = name.trim();
        participant.email = email.toLowerCase().trim();
        if (phone !== undefined) participant.phone = phone?.trim() || null;
        if (university !== undefined) participant.university = university?.trim() || null;
        if (participantType) {
            participant.participantType = participantType;
            participant.expectedAmount = PRICING_MAP[participantType] || participant.expectedAmount;
        }
        if (finalType === 'presenter') {
            if (track) participant.track = track;
            if (paperTitle !== undefined) participant.paperTitle = paperTitle?.trim() || null;
        } else {
            participant.track = null as any;
            participant.paperTitle = null as any;
        }
        if (transactionId !== undefined) participant.transactionId = transactionId?.trim() || null;

        await participant.save();

        // Audit log
        await AuditLogModel.create({
            action: 'UPDATE_PARTICIPANT',
            performedBy: user.userId,
            role: user.role,
            targetId: participant._id.toString(),
            details: changes.length > 0
                ? `Updated participant ${participant.name}: ${changes.join(', ')}`
                : `Updated participant ${participant.name} (no field changes detected)`,
        });

        return NextResponse.json({
            success: true,
            data: participant.toObject(),
        });
    } catch (err) {
        console.error('PUT /api/participants/[id] error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
