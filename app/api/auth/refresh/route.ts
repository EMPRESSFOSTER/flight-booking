import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken, extractTokenFromHeader } from '@/lib/jwt';
import { applySecureHeaders, getCorsHeaders, handleCorsPreFlight } from '@/lib/security-headers';
import { checkApiRateLimit, createRateLimitResponse } from '@/lib/rate-limit';
import { logAuditEvent, getClientIp } from '@/lib/authorization';

/**
 * POST /api/auth/refresh
 * Generate new access token using refresh token
 */
export async function POST(request: NextRequest) {
  try {
    // Handle CORS preflight
    const corsResponse = handleCorsPreFlight(request);
    if (corsResponse) return corsResponse;

    // Check rate limit
    const canProceed = await checkApiRateLimit(request);
    if (!canProceed) {
      return applySecureHeaders(createRateLimitResponse());
    }

    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      const response = NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
      return applySecureHeaders(response);
    }

    // Generate new access token
    const newAccessToken = refreshAccessToken(refreshToken);
    if (!newAccessToken) {
      const clientIp = getClientIp(request);
      await logAuditEvent({
        userId: 'unknown',
        action: 'token_refresh_failed',
        resource: 'auth',
        status: 'failure',
        error: 'invalid_refresh_token',
        ipAddress: clientIp,
      });

      const response = NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
      return applySecureHeaders(response);
    }

    const response = NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });

    const headersToAdd = getCorsHeaders(request.headers.get('origin') || '');
    Object.entries(headersToAdd).forEach(([key, value]) => {
      if (value) response.headers.set(key, value);
    });

    return applySecureHeaders(response);
  } catch (error) {
    console.error('Token refresh error:', error);
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
