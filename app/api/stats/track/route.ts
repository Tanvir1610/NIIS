import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

/**
 * GET /api/stats/track
 * Track-specific statistics for track coordinators.
 * Query param: ?track=Track+1%3A+...
 */
export async function GET(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.TRACK_COORDINATOR, ROLES.CONVENER)) return forbiddenResponse();

        await connectDB();

        // Determine which track to show stats for
        let track = req.nextUrl.searchParams.get('track');
        if (user.role === ROLES.TRACK_COORDINATOR) {
            // Track coordinators can only see their own track
            track = user.assignedTrack || null;
        }

        if (!track) {
            return NextResponse.json(
                { error: 'track query parameter is required' },
                { status: 400 }
            );
        }

        const [
            totalParticipants,
            totalPapers,
            acceptedPapers,
            rejectedPapers,
            pendingPapers,
            verifiedPayments,
            pendingPayments,
        ] = await Promise.all([
            ParticipantModel.countDocuments({ track }),
            ParticipantModel.countDocuments({ track, participantType: 'presenter' }),
            ParticipantModel.countDocuments({ track, participantType: 'presenter', paperStatus: 'approved' }),
            ParticipantModel.countDocuments({ track, participantType: 'presenter', paperStatus: 'rejected' }),
            ParticipantModel.countDocuments({ track, participantType: 'presenter', paperStatus: 'pending' }),
            ParticipantModel.countDocuments({ track, paymentStatus: 'verified' }),
            ParticipantModel.countDocuments({ track, paymentStatus: 'pending' }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                track,
                totalParticipants,
                totalPapers,
                acceptedPapers,
                rejectedPapers,
                pendingPapers,
                verifiedPayments,
                pendingPayments,
            },
        });
    } catch (err) {
        console.error('GET /api/stats/track error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
