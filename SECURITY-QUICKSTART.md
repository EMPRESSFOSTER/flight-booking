# Security Quick Start Guide

## 🔧 Setup

1. **Copy environment file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Generate secure secrets:**
   ```bash
   # Generate JWT_SECRET
   openssl rand -hex 32
   
   # Generate JWT_REFRESH_SECRET
   openssl rand -hex 32
   ```

3. **Update `.env.local`** with generated secrets and your allowed origins

4. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 📚 Security Features Implemented

### ✅ Authentication & Authorization
- JWT access tokens (15m expiry)
- JWT refresh tokens (7d expiry)
- Role-based access control (RBAC)
- 4 user roles: admin, moderator, user, guest

### ✅ Password Security
- bcrypt hashing (12 salt rounds)
- Strong password validation (12+ chars, mixed case, numbers, special chars)
- Secure password comparison

### ✅ API Protection
- Rate limiting (configurable per endpoint)
- Input validation with Zod schemas
- CORS with origin whitelist
- Secure HTTP headers

### ✅ CSRF Protection
- Cryptographically secure tokens
- 24-hour token expiry with automatic cleanup
- Constant-time comparison

### ✅ HTTP Security Headers
- XSS Protection
- Clickjacking prevention
- MIME sniffing prevention
- Content Security Policy
- Strict Transport Security
- And more...

### ✅ Audit Logging
- Login/logout tracking
- Failed authentication attempts
- Sensitive operation logging
- IP and User-Agent capture

---

## 🚀 Usage Examples

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

Response:
```json
{
  "success": true,
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "userId": "user-123",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### Access Protected Route
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "YOUR_REFRESH_TOKEN"}'
```

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

---

## 📂 Security Files

```
lib/
├── jwt.ts                 # JWT token creation & verification
├── password.ts            # Password hashing & validation
├── validators.ts          # Input validation schemas (Zod)
├── rate-limit.ts          # Rate limiting for API
├── csrf.ts                # CSRF token generation & validation
├── security-headers.ts    # Security headers & CORS
├── authorization.ts       # RBAC, audit logging
└── auth-middleware.ts     # Helper functions (for middleware)

app/api/auth/
├── login/route.ts         # POST /api/auth/login
├── register/route.ts      # POST /api/auth/register
├── refresh/route.ts       # POST /api/auth/refresh
└── me/route.ts            # GET /api/auth/me

middleware.ts             # Global security middleware (example)
SECURITY.md              # Comprehensive security documentation
.env.local.example       # Environment variables template
```

---

## 🔐 Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/auth/login` | 5 attempts | 15 minutes |
| General API | 100 requests | 1 minute |
| Sensitive ops | 20 requests | 1 minute |

---

## ⚙️ Configuration

### Enable/Disable Features
Update `.env.local`:
```env
ENABLE_RATE_LIMITING=true
ENABLE_CSRF_PROTECTION=true
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Password Requirements
- Minimum: 12 characters
- Must include: uppercase, lowercase, numbers, special characters
- Examples: `SecurePass123!`, `MyPass@2024`, `Secure#Pass99`

---

## 🛡️ Protecting Your API Routes

### Simple Protection (Check Authentication)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, extractTokenFromHeader } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);
  
  if (!token || !verifyAccessToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Your protected logic
}
```

### Role-Based Protection
```typescript
import { protectRouteWithRole, UserRole } from '@/lib/authorization';

export async function DELETE(request: NextRequest) {
  const result = await protectRouteWithRole(request, UserRole.ADMIN);
  
  if (result instanceof NextResponse) return result;
  
  const { payload } = result;
  // Only admins can reach here
}
```

### With Rate Limiting
```typescript
import { checkApiRateLimit, createRateLimitResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  if (!(await checkApiRateLimit(request))) {
    return createRateLimitResponse();
  }
  
  // Your logic
}
```

### With Input Validation
```typescript
import { validateInput, loginSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = validateInput(loginSchema, body);
    
    // Use validated data
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
```

---

## 📋 Pre-Production Checklist

- [ ] Change all JWT secrets
- [ ] Configure database connection
- [ ] Set up HTTPS/SSL
- [ ] Update `ALLOWED_ORIGINS`
- [ ] Set up email service
- [ ] Configure persistent audit logging
- [ ] Switch rate limiting to Redis
- [ ] Test all auth flows end-to-end
- [ ] Run security audit
- [ ] Set up monitoring & alerting
- [ ] Review CSP headers for your domain
- [ ] Implement password reset flow
- [ ] Consider 2FA for admin accounts
- [ ] Regular security updates (npm audit)

---

## 🚨 Common Issues

**"Invalid credentials" on login**
- Default credentials: `email: user@example.com`, `password: password123`
- Production: Replace with database lookup in `app/api/auth/login/route.ts`

**"Too many requests" error**
- Rate limit exceeded (see table above)
- Wait before retrying or check configuration

**"Invalid or expired token"**
- Token expired (access tokens valid for 15 minutes)
- Use refresh token to get new access token
- Or login again

**CORS error in browser**
- Add your domain to `ALLOWED_ORIGINS` in `.env.local`
- Clear browser cache
- Check Origin header matches allowed list

---

## 📖 Further Reading

- [SECURITY.md](./SECURITY.md) - Comprehensive security documentation
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security)

---

**Last Updated:** April 15, 2026  
**Security Version:** 1.0.0
