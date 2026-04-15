import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';

/**
 * Reusable protection wrapper for API routes
 * Usage in your route handlers:
 *
 * export async function POST(request: NextRequest) {
 *   const payload = await protectRoute(request);
 *   if (!payload) return; // Automatic 401 response is sent
 *   // Use payload.userId, payload.email, etc.
 * }
 */
export async function protectRoute(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return null; // Will trigger 401 in caller
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null; // Will trigger 401 in caller
  }

  return payload;
}

/**
 * Middleware to protect all routes under /api/protected
 * Create middleware.ts in your project root with:
 *
 * import { NextRequest, NextResponse } from 'next/server';
 * import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';
 *
 * export function middleware(request: NextRequest) {
 *   if (request.nextUrl.pathname.startsWith('/api/protected')) {
 *     const authHeader = request.headers.get('authorization');
 *     const token = extractTokenFromHeader(authHeader);
 *
 *     if (!token) {
 *       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 *     }
 *
 *     const payload = verifyToken(token);
 *     if (!payload) {
 *       return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
 *     }
 *   }
 *
 *   return NextResponse.next();
 * }
 *
 * export const config = {
 *   matcher: ['/api/protected/:path*'],
 * };
 */
