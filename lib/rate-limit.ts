import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

// Separate rate limiters for different purposes
const loginLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 900, // per 15 minutes
});

const apiLimiter = new RateLimiterMemory({
  points: 100, // 100 requests
  duration: 60, // per minute
});

const strictLimiter = new RateLimiterMemory({
  points: 20, // 20 requests
  duration: 60, // per minute
});

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 
    request.headers.get('x-real-ip') || 
    'unknown';
  return ip;
}

/**
 * Rate limit decorator for login endpoints
 */
export async function checkLoginRateLimit(request: NextRequest): Promise<boolean> {
  const ip = getClientIp(request);
  try {
    await loginLimiter.consume(ip);
    return true;
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return false;
    }
    throw error;
  }
}

/**
 * Rate limit decorator for general API endpoints
 */
export async function checkApiRateLimit(request: NextRequest): Promise<boolean> {
  const ip = getClientIp(request);
  try {
    await apiLimiter.consume(ip);
    return true;
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return false;
    }
    throw error;
  }
}

/**
 * Rate limit decorator for sensitive operations
 */
export async function checkStrictRateLimit(request: NextRequest): Promise<boolean> {
  const ip = getClientIp(request);
  try {
    await strictLimiter.consume(ip);
    return true;
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return false;
    }
    throw error;
  }
}

/**
 * Create rate limit error response
 */
export function createRateLimitResponse(): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429 }
  );
}
