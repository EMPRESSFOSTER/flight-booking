import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, extractTokenFromHeader } from '@/lib/jwt';
import { applySecureHeaders, getCorsHeaders, handleCorsPreFlight } from '@/lib/security-headers';

/**
 * GET /api/auth/me
 * Protected route - returns current user info if JWT is valid
 */
export async function GET(request: NextRequest) {
  try {
    // Handle CORS preflight
    const corsResponse = handleCorsPreFlight(request);
    if (corsResponse) return corsResponse;

    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      const response = NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
      return applySecureHeaders(response);
    }

    // Verify token
    const payload = verifyAccessToken(token);
    if (!payload) {
      const response = NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
      return applySecureHeaders(response);
    }

    // Return user info from token payload
    const response = NextResponse.json({
      success: true,
      user: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
    });

    const headersToAdd = getCorsHeaders(request.headers.get('origin') || '');
    Object.entries(headersToAdd).forEach(([key, value]) => {
      if (value) response.headers.set(key, value);
    });

    return applySecureHeaders(response);
  } catch (error) {
    console.error('Auth error:', error);
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    return applySecureHeaders(response);
  }
}

/**
 * Handle CORS preflight for OPTIONS requests
 */
export async function OPTIONS(request: NextRequest) {
  const corsResponse = handleCorsPreFlight(request);
  if (corsResponse) {
    return applySecureHeaders(corsResponse);
  }
  return new NextResponse(null, { status: 204 });
}
