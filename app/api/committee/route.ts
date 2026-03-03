import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CommitteeMemberModel from '@/models/CommitteeMember';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

// GET: List all committee members
export async function GET() {
    try {
        await connectDB();
        const members = await CommitteeMemberModel.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ success: true, data: members });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch committee members' }, { status: 500 });
    }
}

// POST: Add new member (Convener only)
export async function POST(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        await connectDB();
        const body = await req.json();
        const member = await CommitteeMemberModel.create(body);

        return NextResponse.json({ success: true, data: member }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create committee member' }, { status: 500 });
    }
}

// DELETE: Remove member (Convener only)
export async function DELETE(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await connectDB();
        await CommitteeMemberModel.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: 'Member deleted' });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
    }
}
