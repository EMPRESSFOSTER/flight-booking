import { NextRequest, NextResponse } from 'next/server';
import { extractTokenFromHeader, verifyAccessToken } from '@/lib/jwt';
import { applySecureHeaders } from '@/lib/security-headers';

/**
 * Global middleware for security
 * Applies security headers to all responses
 * Can be extended to check authentication for protected routes
 * 
 * To use this, uncomment the export config at the bottom
 * and update the matcher pattern as needed
 */

export function middleware(request: NextRequest) {
  // Protected routes that require authentication
  const protectedPaths = ['/api/protected'];
  const isProtectedRoute = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Check authentication for protected routes
  if (isProtectedRoute) {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Add user info to request headers for downstream handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-role', payload.role || 'user');

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

/**
 * Configure which routes should run through middleware
 * Uncomment to enable global middleware
 */
/*
export const config = {
  matcher: [
    // Protect API routes
    '/api/:path*',
    // Exclude public endpoints
    '!(api/auth/login|api/auth/register|api/auth/refresh|_next/static|_next/image|favicon.ico)',
  ],
};
*/
