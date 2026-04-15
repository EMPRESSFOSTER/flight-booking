import { NextRequest, NextResponse } from 'next/server';
import { createTokenPair } from '@/lib/jwt';
import { comparePassword } from '@/lib/password';
import { validateInput, loginSchema } from '@/lib/validators';
import { checkLoginRateLimit, createRateLimitResponse } from '@/lib/rate-limit';
import { applySecureHeaders, getCorsHeaders, handleCorsPreFlight } from '@/lib/security-headers';
import { logAuditEvent, getClientIp } from '@/lib/authorization';

/**
 * POST /api/auth/login
 * Authenticate user and return JWT tokens
 */
export async function POST(request: NextRequest) {
  try {
    // Handle CORS preflight
    const corsResponse = handleCorsPreFlight(request);
    if (corsResponse) return corsResponse;

    // Check rate limit
    const canProceed = await checkLoginRateLimit(request);
    if (!canProceed) {
      return applySecureHeaders(createRateLimitResponse());
    }

    // Parse and validate input
    const body = await request.json();
    const { email, password } = validateInput(loginSchema, body);

    const clientIp = getClientIp(request);

    // TODO: Replace with actual database user lookup
    // const user = await database.users.findByEmail(email);
    const mockUser = {
      id: 'user-123',
      email: 'user@example.com',
      passwordHash: '$2a$12$...', // In production, fetch from database
      role: 'user',
    };

    // Example validation - replace with actual logic
    if (email !== 'user@example.com') {
      await logAuditEvent({
        userId: 'unknown',
        action: 'login_failed',
        resource: 'auth',
        status: 'failure',
        error: 'user_not_found',
        ipAddress: clientIp,
      });

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password (in production: const passwordMatch = await comparePassword(password, user.passwordHash))
    const passwordMatch = password === 'password123';
    if (!passwordMatch) {
      await logAuditEvent({
        userId: mockUser.id,
        action: 'login_failed',
        resource: 'auth',
        status: 'failure',
        error: 'invalid_password',
        ipAddress: clientIp,
      });

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create tokens
    const { accessToken, refreshToken } = createTokenPair({
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });

    // Log successful login
    await logAuditEvent({
      userId: mockUser.id,
      action: 'login_success',
      resource: 'auth',
      status: 'success',
      ipAddress: clientIp,
    });

    // Return response with secure headers
    const response = NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        userId: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      },
    });

    // Apply security headers
    const headersToAdd = getCorsHeaders(request.headers.get('origin') || '');
    Object.entries(headersToAdd).forEach(([key, value]) => {
      if (value) response.headers.set(key, value);
    });

    return applySecureHeaders(response);
  } catch (error) {
    console.error('Login error:', error);

    const response = NextResponse.json(
      { error: 'Auth error - please try again' },
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
