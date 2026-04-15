import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, TokenPayload } from './jwt';
import { extractTokenFromHeader } from './jwt';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest',
}

/**
 * Role hierarchy - higher roles inherit lower permissions
 */
const roleHierarchy: Record<UserRole, number> = {
  [UserRole.ADMIN]: 4,
  [UserRole.MODERATOR]: 3,
  [UserRole.USER]: 2,
  [UserRole.GUEST]: 1,
};

/**
 * Check if user has required role
 */
export function hasRole(userRole: string | undefined, requiredRole: UserRole): boolean {
  if (!userRole) return false;
  const userLevel = roleHierarchy[userRole as UserRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole];
  return userLevel >= requiredLevel;
}

/**
 * Check if user has any of the required roles
 */
export function hasAnyRole(userRole: string | undefined, requiredRoles: UserRole[]): boolean {
  return requiredRoles.some(role => hasRole(userRole, role));
}

/**
 * Protect route with role requirement
 */
export async function protectRouteWithRole(
  request: NextRequest,
  requiredRole: UserRole = UserRole.USER
): Promise<{ payload: TokenPayload } | NextResponse> {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return NextResponse.json(
      { error: 'No authorization token provided' },
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

  if (!hasRole(payload.role, requiredRole)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  return { payload };
}

/**
 * Audit log for sensitive operations
 */
export interface AuditLog {
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: Record<string, any>;
  status: 'success' | 'failure';
  error?: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Log an audit event
 */
export async function logAuditEvent(log: Omit<AuditLog, 'timestamp'>): Promise<void> {
  const auditLog: AuditLog = {
    ...log,
    timestamp: new Date(),
  };

  // TODO: Store in database
  console.log('[AUDIT]', JSON.stringify(auditLog));
}

/**
 * Get client IP from request
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 
    request.headers.get('x-real-ip') || 
    'unknown';
}

/**
 * Get user agent from request
 */
export function getUserAgent(request: NextRequest): string | null {
  return request.headers.get('user-agent');
}
