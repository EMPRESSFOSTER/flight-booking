import { NextRequest, NextResponse } from 'next/server';
import { protectRouteWithRole, UserRole, logAuditEvent, getClientIp } from '@/lib/authorization';
import { applySecureHeaders, handleCorsPreFlight } from '@/lib/security-headers';
import { checkApiRateLimit, createRateLimitResponse } from '@/lib/rate-limit';
import { validateInput, flightSearchSchema } from '@/lib/validators';

/**
 * Example protected API endpoint
 * GET /api/protected/flights/search
 * 
 * Features demonstrated:
 * - Role-based access control
 * - Input validation
 * - Rate limiting
 * - Audit logging
 * - Secure headers
 * - CORS preflight handling
 */

export async function GET(request: NextRequest) {
  try {
    // Handle CORS preflight
    const corsResponse = handleCorsPreFlight(request);
    if (corsResponse) return corsResponse;

    // Check rate limit
    const canProceed = await checkApiRateLimit(request);
    if (!canProceed) {
      return applySecureHeaders(createRateLimitResponse());
    }

    // Protect route - requires USER role or higher
    const result = await protectRouteWithRole(request, UserRole.USER);
    if (result instanceof NextResponse) {
      return applySecureHeaders(result);
    }

    const { payload } = result;

    // Get query parameters
    const url = new URL(request.url);
    const departure = url.searchParams.get('departure');
    const arrival = url.searchParams.get('arrival');
    const departureDate = url.searchParams.get('departureDate');
    const passengers = url.searchParams.get('passengers');

    // Validate input
    try {
      validateInput(flightSearchSchema, {
        departure,
        arrival,
        departureDate,
        passengers: parseInt(passengers || '1'),
      });
    } catch (error) {
      return applySecureHeaders(
        NextResponse.json(
          { error: error instanceof Error ? error.message : 'Validation failed' },
          { status: 400 }
        )
      );
    }

    // Log audit event
    await logAuditEvent({
      userId: payload.userId,
      action: 'flight_search',
      resource: 'flight',
      changes: { departure, arrival, departureDate, passengers },
      status: 'success',
      ipAddress: getClientIp(request),
    });

    // TODO: Query flight database
    const flights = [
      // Mock data - replace with actual DB query
      {
        id: 'FL123',
        airline: 'Airline A',
        departure: 'NYC',
        arrival: 'LAX',
        departureTime: '10:00',
        arrivalTime: '13:00',
        price: 250,
      },
    ];

    const response = NextResponse.json({
      success: true,
      data: flights,
      count: flights.length,
    });

    return applySecureHeaders(response);
  } catch (error) {
    console.error('Error in protected endpoint:', error);

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
