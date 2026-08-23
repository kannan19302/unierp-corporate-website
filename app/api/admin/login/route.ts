import { NextResponse } from 'next/server';

/**
 * RETIRED: Direct email/password login for the marketing admin.
 *
 * This route previously accepted a JSON payload `{email, password}`,
 * verified against the database with bcrypt, and minted an HS256 JWT.
 * That is a parallel auth system that bypasses the centralized IDP
 * entirely — no MFA, no OIDC, no audit trail, and it shipped with
 * hardcoded default credentials in the login page.
 *
 * Authentication now flows through the OIDC hosted login at
 * `/oidc/login`. The admin middleware reads the `auth_token` cookie
 * set by the IDP and verifies it against the JWKS.
 *
 * This route is kept only as a 410 Gone response so any client-side
 * code that still POSTs here gets a clear signal, not a silent failure.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Direct login is retired. Sign in through the centralized identity provider.',
      redirect: '/admin/login',
    },
    { status: 410 },
  );
}
