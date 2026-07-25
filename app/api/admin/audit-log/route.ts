import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const entries = await prisma.auditLog.findMany({
    where: { tenantId: auth.session.tenantId },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });

  return NextResponse.json({ success: true, entries });
}
