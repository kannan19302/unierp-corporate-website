import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { getTenantFromRequest, type ResolvedTenant } from '@/lib/tenant';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export interface AdminSession {
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  sub: string;
  tenantId: string;
  tenantHost: string;
}

export async function getAdminSession(request: Request): Promise<AdminSession | null> {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  const token = match?.[1];
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.tenantId) return null;
    return {
      email: payload.email as string,
      role: payload.role as 'ADMIN' | 'SUPER_ADMIN',
      sub: payload.sub as string,
      tenantId: payload.tenantId as string,
      tenantHost: payload.tenantHost as string,
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
