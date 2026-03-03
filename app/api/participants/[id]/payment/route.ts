import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import AuditLogModel from '@/models/AuditLog';
import { getNextParticipantId } from '@/models/Counter';
import { sendConfirmationEmail } from '@/lib/email';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

/**
 * PATCH /api/participants/[id]/payment
 * Confirm or reject participant payment (accountant/convener only).
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.ACCOUNTANT, ROLES.CONVENER)) return forbiddenResponse();

        const { id } = await params;
        const body = await req.json();
        const { status } = body || {};

        if (!status || !['verified', 'rejected'].includes(status)) {
            return NextResponse.json(
                { error: 'status must be "verified" or "rejected"' },
                { status: 400 }
            );
        }

        await connectDB();

        const participant = await ParticipantModel.findById(id);
        if (!participant) {
            return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
        }

        // Update payment status
        participant.paymentStatus = status;

        // Generate participant ID on verification
        if (status === 'verified' && !participant.participantId) {
            const participantId = await getNextParticipantId();
            participant.participantId = participantId;
        }

        await participant.save();

        // Create audit log
        await AuditLogModel.create({
            action: status === 'verified' ? 'PAYMENT_VERIFIED' : 'PAYMENT_REJECTED',
            performedBy: user.userId,
            role: user.role,
            targetId: participant._id.toString(),
            details: `Payment ${status} for ${participant.name} (${participant.email}). Amount: ₹${participant.expectedAmount}`,
        });

        // Send confirmation email on verification
        if (status === 'verified' && participant.participantId) {
            await sendConfirmationEmail({
                name: participant.name,
                email: participant.email,
                participantId: participant.participantId,
                participantType: participant.participantType,
                amount: participant.expectedAmount,
                track: participant.track,
                paperTitle: participant.paperTitle,
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: participant._id.toString(),
                name: participant.name,
                paymentStatus: participant.paymentStatus,
                participantId: participant.participantId,
            },
        });
    } catch (err) {
        console.error('PATCH /api/participants/[id]/payment error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
