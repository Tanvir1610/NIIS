import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UserModel from '@/models/User';
import AuditLogModel from '@/models/AuditLog';
import { hashPassword } from '@/lib/auth';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES, TRACKS } from '@/lib/constants';

/**
 * PUT /api/users/[id]
 * Edit an admin user (convener-only).
 * Allowed fields: name, email, role, assignedTrack, password (optional).
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = authenticateRequest(req);
        if (!currentUser) return unauthorizedResponse();
        if (!hasRole(currentUser, ROLES.CONVENER)) return forbiddenResponse();

        const { id } = await params;
        const body = await req.json();
        const { name, email, role, assignedTrack, password } = body || {};

        if (!name || !email || !role) {
            return NextResponse.json(
                { error: 'name, email, and role are required' },
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

        await connectDB();

        const targetUser = await UserModel.findById(id);
        if (!targetUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check for email conflict with other users
        const emailConflict = await UserModel.findOne({
            email: email.toLowerCase().trim(),
            _id: { $ne: id },
        });
        if (emailConflict) {
            return NextResponse.json(
                { error: 'Another user with this email already exists' },
                { status: 409 }
            );
        }

        // Build update object
        const updateData: Record<string, any> = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            role,
            assignedTrack: role === ROLES.TRACK_COORDINATOR ? assignedTrack : null,
        };

        // Only update password if provided
        if (password && password.length >= 6) {
            updateData.password = await hashPassword(password);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true })
            .select('-password')
            .lean();

        // Audit log
        await AuditLogModel.create({
            action: 'UPDATE_USER',
            performedBy: currentUser.userId,
            role: currentUser.role,
            targetId: id,
            details: `Updated user: ${email} (role: ${role})`,
        });

        return NextResponse.json({
            success: true,
            data: updatedUser,
        });
    } catch (err) {
        console.error('PUT /api/users/[id] error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * DELETE /api/users/[id]
 * Delete an admin user (convener-only).
 * Cannot delete yourself.
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = authenticateRequest(req);
        if (!currentUser) return unauthorizedResponse();
        if (!hasRole(currentUser, ROLES.CONVENER)) return forbiddenResponse();

        const { id } = await params;

        await connectDB();

        // Prevent self-deletion
        if (id === currentUser.userId) {
            return NextResponse.json(
                { error: 'You cannot delete your own account' },
                { status: 400 }
            );
        }

        const targetUser = await UserModel.findById(id);
        if (!targetUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await UserModel.findByIdAndDelete(id);

        // Audit log
        await AuditLogModel.create({
            action: 'DELETE_USER',
            performedBy: currentUser.userId,
            role: currentUser.role,
            targetId: id,
            details: `Deleted user: ${targetUser.email} (role: ${targetUser.role})`,
        });

        return NextResponse.json({
            success: true,
            message: `User ${targetUser.email} deleted successfully`,
        });
    } catch (err) {
        console.error('DELETE /api/users/[id] error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
