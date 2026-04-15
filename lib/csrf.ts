import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * In-memory CSRF token store
 * In production, use Redis or database
 */
const csrfTokens = new Map<string, { token: string; createdAt: number }>();

const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

// Clean up expired tokens periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, { createdAt }] of csrfTokens.entries()) {
    if (now - createdAt > TOKEN_EXPIRY) {
      csrfTokens.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Generate a CSRF token for a session
 */
export function generateCsrfToken(sessionId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  csrfTokens.set(sessionId, { token, createdAt: Date.now() });
  return token;
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);
  if (!stored) {
    return false;
  }

  // Check expiry
  if (Date.now() - stored.createdAt > TOKEN_EXPIRY) {
    csrfTokens.delete(sessionId);
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(stored.token),
    Buffer.from(token)
  );
}

/**
 * Middleware to check CSRF token on state-changing requests
 */
export function validateCsrfToken(request: NextRequest, sessionId: string): boolean {
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    return true; // No CSRF check for GET requests
  }

  const token = request.headers.get('x-csrf-token') || 
    request.headers.get('csrf-token');

  if (!token) {
    console.warn('CSRF token missing for', request.nextUrl.pathname);
    return false;
  }

  return verifyCsrfToken(sessionId, token);
}

/**
 * Create CSRF error response
 */
export function createCsrfErrorResponse(): NextResponse {
  return NextResponse.json(
    { error: 'CSRF validation failed' },
    { status: 403 }
  );
}
