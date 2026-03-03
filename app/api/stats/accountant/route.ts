import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

/**
 * GET /api/stats/accountant
 * Financial statistics for the accountant dashboard.
 */
export async function GET(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.ACCOUNTANT, ROLES.CONVENER)) return forbiddenResponse();

        await connectDB();

        const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

        const [
            totalRevenueResult,
            revenueTodayResult,
            pendingAmountResult,
            verifiedCount,
            pendingCount,
            rejectedCount,
            totalParticipants,
        ] = await Promise.all([
            ParticipantModel.aggregate([
                { $match: { paymentStatus: 'verified' } },
                { $group: { _id: null, total: { $sum: '$expectedAmount' } } },
            ]),
            ParticipantModel.aggregate([
                { $match: { paymentStatus: 'verified', updatedAt: { $gte: todayStart } } },
                { $group: { _id: null, total: { $sum: '$expectedAmount' } } },
            ]),
            ParticipantModel.aggregate([
                { $match: { paymentStatus: 'pending' } },
                { $group: { _id: null, total: { $sum: '$expectedAmount' } } },
            ]),
            ParticipantModel.countDocuments({ paymentStatus: 'verified' }),
            ParticipantModel.countDocuments({ paymentStatus: 'pending' }),
            ParticipantModel.countDocuments({ paymentStatus: 'rejected' }),
            ParticipantModel.countDocuments({}),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                totalRevenue: totalRevenueResult[0]?.total || 0,
                revenueToday: revenueTodayResult[0]?.total || 0,
                pendingAmount: pendingAmountResult[0]?.total || 0,
                verifiedCount,
                pendingCount,
                rejectedCount,
                totalParticipants,
            },
        });
    } catch (err) {
        console.error('GET /api/stats/accountant error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
