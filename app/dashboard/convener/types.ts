export interface Participant {
    _id: string; name: string; email: string; phone?: string; university?: string;
    participantType: string; paymentStatus: 'pending' | 'verified' | 'rejected';
    expectedAmount: number; transactionId: string; track?: string; paperTitle?: string;
    paperStatus?: string; remarks?: string; imageUrl?: string; paymentScreenshotUrl?: string;
    participantId?: string; createdAt: string;
}

export interface Stats {
    totalParticipants: number; totalPresenters: number; totalStudents: number;
    totalFaculty: number; totalAttendees: number; totalPapers: number;
    totalRevenue: number; pendingPayments: number; verifiedPayments: number;
    rejectedPayments: number; todayRegistrations: number;
    byType: Record<string, number>; byTrack: Record<string, number>;
    revenueByTrack: Array<{ track: string; revenue: number; count: number }>;
    revenueByType: Array<{ _id: string; total: number; count: number }>;
}

export interface AuditLog {
    _id: string; action: string; performedBy: { name: string; email: string };
    role: string; details: any; timestamp: string;
}

export interface AdminUser {
    _id: string; name: string; email: string; role: string;
    assignedTrack?: string; createdAt: string;
}

export interface AccountantStats {
    totalRevenue: number; revenueToday: number; pendingAmount: number;
    verifiedCount: number; pendingCount: number; rejectedCount: number;
}
