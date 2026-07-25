import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

const updateSchema = z.object({
  active: z.boolean().optional(),
  role: z.enum(['ADMIN', 'SUPER_ADMIN']).optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { session } = auth;

  if (session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only super admins can manage admin accounts' }, { status: 403 });
  }

  const { id } = await params;

  if (id === session.sub) {
    return NextResponse.json({ error: 'You cannot modify your own account here' }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({ where: { id, tenantId: session.tenantId } });
  if (!existing) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const user = await prisma.user.update({
    where: { id: existing.id },
    data: parsed.data,
    select: { id: true, email: true, role: true, active: true },
  });

  await logAudit(session, 'update', 'user', user.id, `Updated ${user.email}`);

  return NextResponse.json({ success: true, user });
}
