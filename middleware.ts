import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ENFORCE_TENANT_HOST_MATCH = process.env.ENFORCE_TENANT_HOST_MATCH !== 'false';

function normalizeHost(raw: string | null): string | null {
  if (!raw) return null;
  return raw.trim().toLowerCase().split(':')[0].replace(/\.$/, '') || null;
}

async function verifyTenantToken(request: NextRequest, token: string): Promise<boolean> {
  const { payload } = await jwtVerify(token, JWT_SECRET);

  if (!payload.tenantId) return false;

  if (ENFORCE_TENANT_HOST_MATCH) {
    const devOverride = process.env.NODE_ENV !== 'production' ? request.headers.get('x-tenant-domain') : null;
    const currentHost =
      normalizeHost(devOverride) ||
      normalizeHost(request.headers.get('x-forwarded-host')) ||
      normalizeHost(request.headers.get('host'));

    if (payload.tenantHost !== currentHost) return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes, but allow /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      const res = NextResponse.redirect(loginUrl);
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.headers.set('Pragma', 'no-cache');
      return res;
    }

    try {
      const valid = await verifyTenantToken(request, token);
      if (!valid) throw new Error('Tenant mismatch or missing claim');
      const res = NextResponse.next();
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.headers.set('Pragma', 'no-cache');
      return res;
    } catch (error) {
      console.error('JWT Verification Failed:', error);
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      return response;
    }
  }

  // Protect Admin API routes except login
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return res;
    }

    try {
      const valid = await verifyTenantToken(request, token);
      if (!valid) throw new Error('Tenant mismatch or missing claim');
      const res = NextResponse.next();
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return res;
    } catch (error) {
      const res = NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
