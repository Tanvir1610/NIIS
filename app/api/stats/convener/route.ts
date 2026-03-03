import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES, TRACKS } from '@/lib/constants';

/**
 * GET /api/stats/convener
 * Full statistics dashboard for conveners (super admin).
 */
export async function GET(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        await connectDB();

        // Run all aggregations in parallel
        const [
            totalParticipants,
            totalPresenters,
            totalStudents,
            totalFaculty,
            totalAttendees,
            pendingPayments,
            verifiedPayments,
            rejectedPayments,
            totalPapers,
            revenueResult,
            revenueByTrack,
            revenueByType,
            todayRegistrations,
        ] = await Promise.all([
            ParticipantModel.countDocuments({}),
            ParticipantModel.countDocuments({ participantType: 'presenter' }),
            ParticipantModel.countDocuments({ participantType: 'student' }),
            ParticipantModel.countDocuments({ participantType: 'faculty' }),
            ParticipantModel.countDocuments({ participantType: 'attendee' }),
            ParticipantModel.countDocuments({ paymentStatus: 'pending' }),
            ParticipantModel.countDocuments({ paymentStatus: 'verified' }),
            ParticipantModel.countDocuments({ paymentStatus: 'rejected' }),
            ParticipantModel.countDocuments({ participantType: 'presenter', paperTitle: { $ne: null } }),
            ParticipantModel.aggregate([
                { $match: { paymentStatus: 'verified' } },
                { $group: { _id: null, total: { $sum: '$expectedAmount' } } },
            ]),
            ParticipantModel.aggregate([
                { $match: { paymentStatus: 'verified', track: { $ne: null } } },
                { $group: { _id: '$track', total: { $sum: '$expectedAmount' }, count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
            ParticipantModel.aggregate([
                { $match: { paymentStatus: 'verified' } },
                { $group: { _id: '$participantType', total: { $sum: '$expectedAmount' }, count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
            ParticipantModel.countDocuments({
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            }),
        ]);

        const totalRevenue = revenueResult[0]?.total || 0;

        // Build track stats with zeros for empty tracks
        const trackRevenue = TRACKS.map((trackName) => {
            const found = revenueByTrack.find((r: { _id: string }) => r._id === trackName);
            return {
                track: trackName,
                revenue: found?.total || 0,
                count: found?.count || 0,
            };
        });

        // Build type count map for dashboard (Record<string, number>)
        const byType: Record<string, number> = {
            presenter: totalPresenters,
            student: totalStudents,
            faculty: totalFaculty,
            attendee: totalAttendees,
        };

        // Build track count map for dashboard (Record<string, number>)
        const byTrack: Record<string, number> = {};
        for (const t of trackRevenue) {
            byTrack[t.track] = t.count;
        }

        return NextResponse.json({
            success: true,
            data: {
                totalParticipants,
                totalPresenters,
                totalStudents,
                totalFaculty,
                totalAttendees,
                totalPapers,
                totalRevenue,
                pendingPayments,
                verifiedPayments,
                rejectedPayments,
                todayRegistrations,
                revenueByTrack: trackRevenue,
                revenueByType,
                byType,
                byTrack,
            },
        });
    } catch (err) {
        console.error('GET /api/stats/convener error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
