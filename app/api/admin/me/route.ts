import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Returns the current admin user's profile, verified against the
 * IDP's JWKS — not the old local JWT_SECRET.
 */
export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.tenantId },
    select: { id: true, name: true, primaryDomain: true },
  });

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      role: session.role,
      permissions: session.permissions,
      realm: session.realm,
    },
    tenant,
  });
}
