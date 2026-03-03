import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UserModel from '@/models/User';
import { comparePassword, signToken } from '@/lib/auth';
import { getDashboardPath } from '@/lib/constants';

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token with role info.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body || {};

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Find user and explicitly include password field
        const user = await UserModel.findOne({ email: email.toLowerCase().trim() }).select('+password');

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
            assignedTrack: user.assignedTrack || null,
        });

        const redirectPath = getDashboardPath(user.role, user.assignedTrack);

        return NextResponse.json({
            success: true,
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                assignedTrack: user.assignedTrack || null,
            },
            redirectPath,
        });
    } catch (err) {
        console.error('POST /api/auth/login error:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
