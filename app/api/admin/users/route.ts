import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

const createUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(200),
  role: z.enum(['ADMIN', 'SUPER_ADMIN']).default('ADMIN'),
});

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const users = await prisma.user.findMany({
    where: { tenantId: auth.session.tenantId },
    select: { id: true, email: true, role: true, active: true, createdAt: true, lastLoginAt: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ success: true, users });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { session, tenant } = auth;

  if (session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only super admins can create admin accounts' }, { status: 403 });
  }

  const parsed = createUserSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const { email, password, role } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { tenantId_email: { tenantId: tenant.id, email } } });
  if (existing) {
    return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { tenantId: tenant.id, email, passwordHash, role },
    select: { id: true, email: true, role: true, active: true, createdAt: true },
  });

  await logAudit(session, 'create', 'user', user.id, `Created admin account ${email} (${role})`);

  return NextResponse.json({ success: true, user });
}
