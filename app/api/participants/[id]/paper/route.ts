import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import AuditLogModel from '@/models/AuditLog';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

/**
 * PATCH /api/participants/[id]/paper
 * Approve or reject a paper submission (track coordinator/convener only).
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.TRACK_COORDINATOR, ROLES.CONVENER)) return forbiddenResponse();

        const { id } = await params;
        const body = await req.json();
        const { status, remarks } = body || {};

        if (!status || !['approved', 'rejected'].includes(status)) {
            return NextResponse.json(
                { error: 'status must be "approved" or "rejected"' },
                { status: 400 }
            );
        }

        await connectDB();

        const participant = await ParticipantModel.findById(id);
        if (!participant) {
            return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
        }

        // Track coordinators can only manage their assigned track
        if (user.role === ROLES.TRACK_COORDINATOR && participant.track !== user.assignedTrack) {
            return forbiddenResponse('You can only manage papers in your assigned track');
        }

        // Only presenters have papers
        if (participant.participantType !== 'presenter') {
            return NextResponse.json(
                { error: 'Only presenter participants have papers to review' },
                { status: 400 }
            );
        }

        participant.paperStatus = status;
        if (remarks) {
            participant.remarks = remarks.trim();
        }
        await participant.save();

        // Create audit log
        await AuditLogModel.create({
            action: status === 'approved' ? 'PAPER_APPROVED' : 'PAPER_REJECTED',
            performedBy: user.userId,
            role: user.role,
            targetId: participant._id.toString(),
            details: `Paper "${participant.paperTitle}" ${status}${remarks ? `. Remarks: ${remarks}` : ''}`,
        });

        return NextResponse.json({
            success: true,
            data: {
                id: participant._id.toString(),
                name: participant.name,
                paperTitle: participant.paperTitle,
                paperStatus: participant.paperStatus,
                remarks: participant.remarks,
            },
        });
    } catch (err) {
        console.error('PATCH /api/participants/[id]/paper error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
