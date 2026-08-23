import { createRemoteJWKSet, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { getTenantFromRequest, type ResolvedTenant } from '@/lib/tenant';

/**
 * Admin session, now backed by the centralized IDP's OIDC access token.
 *
 * Previously this file verified a local HS256 JWT signed with `JWT_SECRET`.
 * That was a parallel auth system: it did not participate in the OIDC flow,
 * did not honour MFA or SSO, and required a separate password endpoint. Now
 * the middleware and every admin API route verify the `auth_token` cookie set
 * by the IDP's hosted login page against the IDP's published JWKS — the same
 * verification path every other UniERP platform uses.
 */

const IDP_ORIGIN = process.env.IDP_ORIGIN || process.env.NEXT_PUBLIC_IDP_ORIGIN || 'http://localhost:3005';
const JWKS_URL = new URL('/oidc/jwks.json', IDP_ORIGIN);

/** Cached JWKS — fetched once per process, auto-refreshed on `kid` miss. */
const jwks = createRemoteJWKSet(JWKS_URL);

export interface AdminSession {
  email: string;
  role: string;
  sub: string;
  tenantId: string;
  realm: 'tenant' | 'provider';
  permissions: string[];
  roles: string[];
  sid: string;
}

/**
 * Reads and verifies the admin session from the OIDC `auth_token` cookie.
 *
 * The token is verified against the IDP's JWKS (RS256), not a local secret.
 * A token lacking a session ID (`sid`) is rejected — tokens without it cannot
 * be revoked, which was the exact defect W0 closed in the NestJS guards.
 */
export async function getAdminSession(request: Request): Promise<AdminSession | null> {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/auth_token=([^;]+)/);
  const token = match?.[1];
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: IDP_ORIGIN,
    });

    // Reject tokens without a session ID — they can't be revoked.
    if (typeof payload.sid !== 'string' || !payload.sid) return null;
    if (!payload.tenantId) return null;

    return {
      email: (payload.email as string) || '',
      role: ((payload.roles as string[]) || []).includes('Super Admin') ? 'SUPER_ADMIN' : 'ADMIN',
      sub: payload.sub as string,
      tenantId: payload.tenantId as string,
      realm: (payload.realm as 'tenant' | 'provider') || 'tenant',
      permissions: (payload.permissions as string[]) || [],
      roles: (payload.roles as string[]) || [],
      sid: payload.sid as string,
    };
  } catch {
    return null;
  }
}

/**
 * Defense-in-depth behind middleware: re-resolves the tenant from the
 * request's Host header and confirms it matches the session's tenantId
 * before any admin route handler is allowed to touch Prisma.
 */
export async function requireAdminTenant(
  request: Request
): Promise<{ session: AdminSession; tenant: ResolvedTenant } | { error: NextResponse }> {
  const session = await getAdminSession(request);
  if (!session) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const tenant = await getTenantFromRequest(request);
  if (!tenant || tenant.id !== session.tenantId) {
    return { error: NextResponse.json({ error: 'Tenant mismatch' }, { status: 403 }) };
  }

  return { session, tenant };
}
