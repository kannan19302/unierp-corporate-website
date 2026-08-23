import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';

/**
 * Marketing site middleware — admin route protection via OIDC tokens.
 *
 * Previously verified a local `admin_token` cookie against `JWT_SECRET`.
 * Now verifies the `auth_token` cookie set by the centralized IDP's OIDC
 * hosted login page, against the IDP's published JWKS (RS256).
 *
 * The `auth_token` cookie is set by the IDP's login.controller.ts after
 * successful authentication — the same cookie every other UniERP platform
 * uses. This middleware validates the signature, expiry, and session ID
 * before allowing access to /admin routes.
 */

const IDP_ORIGIN = process.env.IDP_ORIGIN || process.env.NEXT_PUBLIC_IDP_ORIGIN || 'http://localhost:3005';
const JWKS_URL = new URL('/oidc/jwks.json', IDP_ORIGIN);

/** Cached JWKS — created once per edge worker lifecycle. */
const jwks = createRemoteJWKSet(JWKS_URL);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes, but allow /admin/login (the OIDC redirect page)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      const res = NextResponse.redirect(loginUrl);
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.headers.set('Pragma', 'no-cache');
      return res;
    }

    try {
      const { payload } = await jwtVerify(token, jwks, { issuer: IDP_ORIGIN });

      // Reject tokens without a session ID — they can't be revoked.
      if (typeof payload.sid !== 'string' || !payload.sid) {
        throw new Error('Token has no session ID');
      }

      const res = NextResponse.next();
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.headers.set('Pragma', 'no-cache');
      return res;
    } catch (error) {
      console.error('OIDC Token Verification Failed:', error);
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      // Clear the stale/invalid cookie
      response.cookies.delete('auth_token');
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      return response;
    }
  }

  // Protect Admin API routes except login
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return res;
    }

    try {
      const { payload } = await jwtVerify(token, jwks, { issuer: IDP_ORIGIN });
      if (typeof payload.sid !== 'string' || !payload.sid) {
        throw new Error('Token has no session ID');
      }
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
