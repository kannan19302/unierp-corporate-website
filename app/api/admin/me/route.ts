import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.tenantId) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: payload.tenantId as string },
      select: { id: true, name: true, primaryDomain: true },
    });

    return NextResponse.json({
      authenticated: true,
      user: { email: payload.email, role: payload.role },
      tenant,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
