import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getTenantFromRequest } from '@/lib/tenant';

const schema = z.object({ email: z.string().trim().email().max(200) });

export async function POST(req: Request) {
  try {
    const tenant = await getTenantFromRequest(req);
    if (!tenant) {
      return NextResponse.json({ error: 'Unrecognized site domain' }, { status: 404 });
    }

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    await prisma.subscriber.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: parsed.data.email } },
      update: { active: true },
      create: { tenantId: tenant.id, email: parsed.data.email },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
