import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Please define JWT_SECRET in .env.local');
    }
    return secret;
}

/**
 * Hash a plaintext password with bcrypt.
 */
export async function hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT_ROUNDS);
}

/**
 * Compare a plaintext password against a bcrypt hash.
 */
export async function comparePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
}

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
    name: string;
    assignedTrack?: string | null;
}

/**
 * Sign a JWT token with a 24-hour expiry.
 */
export function signToken(payload: TokenPayload): string {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: '24h' });
}

/**
 * Verify and decode a JWT token.
 * Returns the decoded payload or null if invalid/expired.
 */
export function verifyToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, getJwtSecret()) as TokenPayload;
        return decoded;
    } catch {
        return null;
    }
}
