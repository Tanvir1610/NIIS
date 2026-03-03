import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UserModel from '@/models/User';
import AuditLogModel from '@/models/AuditLog';
import { hashPassword } from '@/lib/auth';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES, TRACKS } from '@/lib/constants';

/**
 * POST /api/auth/register-user
 * Create a new admin user (convener-only).
 */
export async function POST(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        const body = await req.json();
        const { name, email, password, role, assignedTrack } = body || {};

        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { error: 'name, email, password, and role are required' },
                { status: 400 }
            );
        }

        const validRoles = [ROLES.CONVENER, ROLES.TRACK_COORDINATOR, ROLES.ACCOUNTANT];
        if (!validRoles.includes(role)) {
            return NextResponse.json(
                { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
                { status: 400 }
            );
        }

        if (role === ROLES.TRACK_COORDINATOR && !assignedTrack) {
            return NextResponse.json(
                { error: 'assignedTrack is required for track coordinators' },
                { status: 400 }
            );
        }

        if (assignedTrack && !TRACKS.includes(assignedTrack as (typeof TRACKS)[number])) {
            return NextResponse.json(
                { error: `Invalid track. Must be one of: ${TRACKS.join(', ')}` },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await connectDB();

        // Check for duplicate email
        const existing = await UserModel.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return NextResponse.json(
                { error: 'A user with this email already exists' },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await UserModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role,
            assignedTrack: role === ROLES.TRACK_COORDINATOR ? assignedTrack : null,
        });

        // Audit log
        await AuditLogModel.create({
            action: 'CREATE_USER',
            performedBy: user.userId,
            role: user.role,
            targetId: newUser._id.toString(),
            details: `Created ${role} user: ${email}`,
        });

        return NextResponse.json(
            {
                success: true,
                user: {
                    id: newUser._id.toString(),
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    assignedTrack: newUser.assignedTrack,
                },
            },
            { status: 201 }
        );
    } catch (err) {
        console.error('POST /api/auth/register-user error:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
