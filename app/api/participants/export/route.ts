import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ParticipantModel from '@/models/Participant';
import { authenticateRequest, hasRole, unauthorizedResponse, forbiddenResponse } from '@/lib/middleware/authMiddleware';
import { ROLES } from '@/lib/constants';

/**
 * GET /api/participants/export
 * Export participants as CSV.
 * Track coordinators can only export their assigned track.
 * Conveners can export all or filter by track.
 */
export async function GET(req: NextRequest) {
    try {
        const user = authenticateRequest(req);
        if (!user) return unauthorizedResponse();
        if (!hasRole(user, ROLES.TRACK_COORDINATOR, ROLES.CONVENER)) return forbiddenResponse();

        await connectDB();

        // Build filter
        const filter: Record<string, any> = {};
        const trackParam = req.nextUrl.searchParams.get('track');

        if (user.role === ROLES.TRACK_COORDINATOR) {
            // Track coordinators can only export their own track
            filter.track = user.assignedTrack;
        } else if (trackParam) {
            filter.track = trackParam;
        }

        const participants = await ParticipantModel.find(filter)
            .sort({ createdAt: -1 })
            .lean();

        // Build CSV
        const headers = [
            'Participant ID',
            'Name',
            'Email',
            'Phone',
            'University',
            'Participant Type',
            'Track',
            'Paper Title',
            'Paper Status',
            'Transaction ID',
            'Expected Amount',
            'Payment Status',
            'Remarks',
            'Registered At',
        ];

        const escapeCSV = (value: any): string => {
            if (value === null || value === undefined) return '';
            const str = String(value);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const rows = participants.map((p) => [
            escapeCSV(p.participantId || ''),
            escapeCSV(p.name),
            escapeCSV(p.email),
            escapeCSV(p.phone || ''),
            escapeCSV(p.university || ''),
            escapeCSV(p.participantType),
            escapeCSV(p.track || ''),
            escapeCSV(p.paperTitle || ''),
            escapeCSV(p.paperStatus || ''),
            escapeCSV(p.transactionId || ''),
            escapeCSV(p.expectedAmount),
            escapeCSV(p.paymentStatus),
            escapeCSV(p.remarks || ''),
            escapeCSV(p.createdAt ? new Date(p.createdAt).toISOString() : ''),
        ].join(','));

        const csv = [headers.join(','), ...rows].join('\n');

        const filename = filter.track
            ? `participants-${filter.track.replace(/[^a-zA-Z0-9]/g, '_')}.csv`
            : 'participants-all.csv';

        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (err) {
        console.error('GET /api/participants/export error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
