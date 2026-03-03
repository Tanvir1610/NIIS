import { NextRequest } from 'next/server';
import { verifyToken, TokenPayload } from '@/lib/auth';

/**
 * Extract and verify JWT from request headers.
 * Returns the decoded payload or null if invalid.
 */
export function authenticateRequest(req: NextRequest): TokenPayload | null {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.slice(7);
    return verifyToken(token);
}

/**
 * Check if the user has one of the allowed roles.
 */
export function hasRole(user: TokenPayload, ...allowedRoles: string[]): boolean {
    return allowedRoles.includes(user.role);
}

/**
 * Create a JSON response for unauthorized access.
 */
export function unauthorizedResponse(message = 'Unauthorized') {
    return Response.json({ error: message }, { status: 401 });
}

/**
 * Create a JSON response for forbidden access.
 */
export function forbiddenResponse(message = 'Forbidden: insufficient permissions') {
    return Response.json({ error: message }, { status: 403 });
}
