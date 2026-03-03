import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UserModel from '@/models/User';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

/**
 * GET /api/users
 * List all admin users (convener-only).
 * Returns user data WITHOUT passwords.
 */
export async function GET(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        await connectDB();

        const users = await UserModel.find({})
            .select('-password')
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: users,
        });
    } catch (err) {
        console.error('GET /api/users error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
