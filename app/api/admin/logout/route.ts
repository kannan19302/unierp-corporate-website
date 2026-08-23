import { NextResponse } from 'next/server';

/**
 * Admin logout — clears the OIDC session cookie and returns a redirect
 * URL to the IDP's end_session endpoint, which revokes the server-side
 * session so the token is dead even if replayed.
 */
const IDP_ORIGIN = process.env.IDP_ORIGIN || process.env.NEXT_PUBLIC_IDP_ORIGIN || 'http://localhost:3005';

export async function POST(request: Request) {
  const postLogoutRedirectUri = new URL('/admin/login', request.url).toString();
  const endSessionUrl = `${IDP_ORIGIN}/oidc/end_session?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;

  const response = NextResponse.json({ success: true, redirect: endSessionUrl });
  response.cookies.delete('auth_token');
  return response;
}
