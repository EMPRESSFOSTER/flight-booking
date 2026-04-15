# Security Implementation Guide

This document outlines the comprehensive security measures implemented in the Flight Booking application.

## Table of Contents
1. [Authentication & Authorization](#authentication--authorization)
2. [Password Security](#password-security)
3. [API Security](#api-security)
4. [Input Validation](#input-validation)
5. [CSRF Protection](#csrf-protection)
6. [HTTP Security Headers](#http-security-headers)
7. [Rate Limiting](#rate-limiting)
8. [Audit Logging](#audit-logging)
9. [Environment & Secrets](#environment--secrets)
10. [Best Practices](#best-practices)

---

## Authentication & Authorization

### JWT Implementation
- **Access Tokens**: Short-lived (15 minutes) for API requests
- **Refresh Tokens**: Long-lived (7 days) for obtaining new access tokens
- **Algorithm**: HS256 with separate secrets for each token type
- **Claims**: `userId`, `email`, `role`, `iat`, `exp`

### Role-Based Access Control (RBAC)
Four roles implemented with hierarchy:
- `admin` (level 4): Full system access
- `moderator` (level 3): Content management permissions
- `user` (level 2): Standard user permissions
- `guest` (level 1): Limited read-only permissions

### Usage Example
```typescript
import { protectRouteWithRole, UserRole } from '@/lib/authorization';

export async function POST(request: NextRequest) {
  const result = await protectRouteWithRole(request, UserRole.ADMIN);
  
  if (result instanceof NextResponse) {
    return result; // Unauthorized/Forbidden response
  }
  
  const { payload } = result;
  // Use payload.userId, payload.email, payload.role
}
```

---

## Password Security

### Password Requirements
- Minimum 12 characters
- Must include: uppercase, lowercase, numbers, special characters
- Hashed with bcrypt (12 salt rounds)
- Never stored in plaintext

### Implementation
```typescript
import { hashPassword, comparePassword } from '@/lib/password';

// During registration
const passwordHash = await hashPassword(userPassword);

// During login
const isValid = await comparePassword(providePassword, storedHash);
```

---

## API Security

### Endpoints Protected

**Authentication Endpoints:**
- `POST /api/auth/login` - Login (rate-limited to 5 attempts per 15 min)
- `POST /api/auth/register` - Registration (rate-limited)
- `POST /api/auth/refresh` - Token refresh (rate-limited)
- `GET /api/auth/me` - Current user info (token required)

### CORS Configuration
- Whitelist allowed origins in `ALLOWED_ORIGINS`
- Automatic origin validation on all requests
- Preflight (OPTIONS) requests handled correctly

### Token Usage
Always send tokens in Authorization header:
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

---

## Input Validation

### Using Zod Schemas
All user input is validated using Zod schemas defined in `lib/validators.ts`:

```typescript
import { validateInput, loginSchema } from '@/lib/validators';

const { email, password } = validateInput(loginSchema, body);
```

### Available Schemas
- `emailSchema` - Email format validation
- `passwordSchema` - Strong password requirement
- `loginSchema` - Login request validation
- `registerSchema` - Registration with password confirmation
- `updateProfileSchema` - Profile updates
- `flightSearchSchema` - Flight search parameters

---

## CSRF Protection

### Implementation
Located in `lib/csrf.ts`, uses:
- Cryptographically secure tokens generated with `crypto.randomBytes()`
- Tokens stored with 24-hour expiry
- Automatic cleanup of expired tokens
- Constant-time comparison to prevent timing attacks

### Usage in Frontend
1. Get CSRF token from the `/api/csrf` endpoint
2. Include in request header: `x-csrf-token: TOKEN`
3. Token validates only for POST/PUT/DELETE/PATCH requests

---

## HTTP Security Headers

### Headers Applied
All responses include:

| Header | Purpose |
|--------|---------|
| `X-Frame-Options: DENY` | Prevent clickjacking |
| `X-Content-Type-Options: nosniff` | Prevent MIME sniffing |
| `X-XSS-Protection: 1; mode=block` | XSS protection for older browsers |
| `Content-Security-Policy` | Prevent XSS/injection attacks |
| `Referrer-Policy: strict-origin-when-cross-origin` | Control referrer info |
| `Permissions-Policy` | Control browser feature access |
| `Strict-Transport-Security` | Force HTTPS |

### Implementation
```typescript
import { applySecureHeaders } from '@/lib/security-headers';

const response = NextResponse.json({ /* data */ });
return applySecureHeaders(response);
```

---

## Rate Limiting

### Limits Configured

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Login attempts | 5 | 15 minutes |
| General API | 100 | 1 minute |
| Sensitive ops | 20 | 1 minute |

### Implementation
```typescript
import { checkLoginRateLimit, checkApiRateLimit } from '@/lib/rate-limit';

const canProceed = await checkLoginRateLimit(request);
if (!canProceed) {
  return createRateLimitResponse(); // 429 Too Many Requests
}
```

**Note**: In production, use Redis instead of in-memory storage for shared sessions across servers.

---

## Audit Logging

### Logged Events
- User login/registration
- Failed authentication attempts
- Token refresh failures
- Role/permission changes
- Sensitive data access/modifications

### Implementation
```typescript
import { logAuditEvent, getClientIp } from '@/lib/authorization';

await logAuditEvent({
  userId: user.id,
  action: 'login_success',
  resource: 'auth',
  status: 'success',
  ipAddress: getClientIp(request),
});
```

**TODO**: Connect to database for persistent audit trails

---

## Environment & Secrets

### Required in `.env.local`

```env
# JWT Secrets (change in production!)
JWT_SECRET=<32-character-hex>
JWT_REFRESH_SECRET=<32-character-hex>

# CORS allowed origins
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Rate limiting
ENABLE_RATE_LIMITING=true

# CSRF protection
ENABLE_CSRF_PROTECTION=true
```

### Generating Secrets
```bash
# Generate random hex string
openssl rand -hex 32

# Or in Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Never
- ❌ Commit `.env.local` to version control
- ❌ Log sensitive values
- ❌ Expose secrets in frontend code
- ❌ Use same secrets for different environments

---

## Best Practices

### For Developers

1. **Always validate input**
   ```typescript
   const validated = validateInput(schema, userInput);
   ```

2. **Use roles for authorization**
   ```typescript
   if (!hasRole(payload.role, UserRole.ADMIN)) {
     return 403; // Forbidden
   }
   ```

3. **Log sensitive operations**
   ```typescript
   await logAuditEvent({ userId, action, resource, status });
   ```

4. **Apply security headers**
   ```typescript
   return applySecureHeaders(response);
   ```

5. **Handle tokens securely**
   - Never log tokens
   - Use HTTPS only
   - Keep refresh token in Secure, HttpOnly cookie
   - Keep access token in memory (short-lived)

### For Database Integration

Replace mock implementations with database calls:

```typescript
// In `app/api/auth/login/route.ts`
const user = await db.users.findByEmail(email);
const isValid = await comparePassword(password, user.passwordHash);

// In `app/api/auth/register/route.ts`
const user = await db.users.create({ email, passwordHash, role: 'user' });

// In `lib/authorization.ts` for audit logging
await db.auditLogs.create(auditLog);
```

### Production Checklist

- [ ] Change `JWT_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Set up database connection
- [ ] Enable HTTPS/SSL
- [ ] Configure `ALLOWED_ORIGINS`
- [ ] Set up email service for password resets
- [ ] Implement persistent audit logging
- [ ] Use Redis for rate limiting (not in-memory)
- [ ] Enable CSRF token generation endpoint
- [ ] Configure error logging (Sentry, etc.)
- [ ] Set up monitoring/alerts
- [ ] Review security headers in production context
- [ ] Test all authentication flows
- [ ] Implement password reset flow
- [ ] Add two-factor authentication (optional)
- [ ] Regular security audits

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Zod Validation](https://github.com/colinhacks/zod)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security)

---

## Support

For security issues, please report privately via security@yourdomain.com rather than public issues.
