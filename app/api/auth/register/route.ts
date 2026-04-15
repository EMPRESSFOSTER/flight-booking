import { NextRequest, NextResponse } from 'next/server';
import { createTokenPair } from '@/lib/jwt';
import { hashPassword } from '@/lib/password';
import { validateInput, registerSchema } from '@/lib/validators';
import { checkApiRateLimit, createRateLimitResponse } from '@/lib/rate-limit';
import { applySecureHeaders, getCorsHeaders, handleCorsPreFlight } from '@/lib/security-headers';
import { logAuditEvent, getClientIp } from '@/lib/authorization';

/**
 * POST /api/auth/register
 * Create new user account
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

    // Parse and validate input
    const body = await request.json();
    const { email, password } = validateInput(registerSchema, body);

    const clientIp = getClientIp(request);

    // TODO: Check if user already exists in database
    // const existingUser = await database.users.findByEmail(email);
    // if (existingUser) {
    //   return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    // }

    // Hash password
    const passwordHash = await hashPassword(password);

    // TODO: Save user to database
    // const user = await database.users.create({ email, passwordHash, role: 'user' });

    const newUserId = 'user-' + Date.now();
    const mockUser = {
      id: newUserId,
      email,
      role: 'user',
    };

    // Create tokens
    const { accessToken, refreshToken } = createTokenPair({
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });

    // Log successful registration
    await logAuditEvent({
      userId: mockUser.id,
      action: 'user_registered',
      resource: 'user',
      resourceId: mockUser.id,
      status: 'success',
      ipAddress: clientIp,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        accessToken,
        refreshToken,
        user: {
          userId: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
        },
      },
      { status: 201 }
    );

    const headersToAdd = getCorsHeaders(request.headers.get('origin') || '');
    Object.entries(headersToAdd).forEach(([key, value]) => {
      if (value) response.headers.set(key, value);
    });

    return applySecureHeaders(response);
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof Error && error.message.includes('Validation failed')) {
      const response = NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
      return applySecureHeaders(response);
    }

    const response = NextResponse.json(
      { error: 'Registration failed - please try again' },
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
