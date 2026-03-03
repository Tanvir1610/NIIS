import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SpeakerModel from '@/models/Speaker';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

// GET: List all speakers
export async function GET() {
    try {
        await connectDB();
        const speakers = await SpeakerModel.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ success: true, data: speakers });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch speakers' }, { status: 500 });
    }
}

// POST: Add new speaker (Convener only)
export async function POST(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        await connectDB();
        const body = await req.json();
        const speaker = await SpeakerModel.create(body);

        return NextResponse.json({ success: true, data: speaker }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create speaker' }, { status: 500 });
    }
}

// DELETE: Remove speaker (Convener only)
export async function DELETE(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.CONVENER)) return forbiddenResponse();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await connectDB();
        await SpeakerModel.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: 'Speaker deleted' });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete speaker' }, { status: 500 });
    }
}
