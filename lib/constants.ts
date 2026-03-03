/**
 * Registration pricing by participant type (in INR).
 */
export const PRICING_MAP: Record<string, number> = {
    attendee: 1000,
    student: 800,
    faculty: 1500,
    presenter: 2000,
};

/**
 * Conference tracks.
 */
export const TRACKS = [
    'Track 1: Artificial Intelligence & Machine Learning',
    'Track 2: Internet of Things & Embedded Systems',
    'Track 3: Cyber Security & Blockchain',
    'Track 4: Data Science & Cloud Computing',
] as const;

/**
 * User roles.
 */
export const ROLES = {
    CONVENER: 'convener',
    TRACK_COORDINATOR: 'track_coordinator',
    ACCOUNTANT: 'accountant',
} as const;

/**
 * Get the dashboard redirect path for a given role.
 */
export function getDashboardPath(role: string, assignedTrack?: string | null): string {
    switch (role) {
        case ROLES.CONVENER:
            return '/dashboard/convener';
        case ROLES.ACCOUNTANT:
            return '/dashboard/accountant';
        case ROLES.TRACK_COORDINATOR:
            return `/dashboard/track/${encodeURIComponent(assignedTrack || 'unknown')}`;
        default:
            return '/admin/login';
    }
}
