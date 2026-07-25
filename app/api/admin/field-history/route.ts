import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const { searchParams } = new URL(req.url);
  const fieldId = searchParams.get('fieldId');

  if (!fieldId) {
    return NextResponse.json({ error: 'Missing fieldId parameter' }, { status: 400 });
  }

  // Find audit logs matching entityId === fieldId or action === 'field_change'
  const entries = await prisma.auditLog.findMany({
    where: {
      tenantId: auth.session.tenantId,
      OR: [
        { entityId: fieldId },
        { summary: { contains: fieldId } },
      ],
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const history = entries.map((entry) => {
    let parsed: any = {};
    try {
      if (entry.summary?.startsWith('{')) {
        parsed = JSON.parse(entry.summary);
      }
    } catch (e) {
      // fallback
    }

    return {
      id: entry.id,
      timestamp: entry.createdAt,
      userEmail: entry.userEmail,
      action: entry.action,
      fieldId: parsed.fieldId || fieldId,
      oldValue: parsed.oldValue ?? '(initial state)',
      newValue: parsed.newValue ?? entry.summary,
    };
  });

  return NextResponse.json({ success: true, history });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const { fieldId, oldValue, newValue } = await req.json();

  if (!fieldId) {
    return NextResponse.json({ error: 'Missing fieldId' }, { status: 400 });
  }

  const log = await prisma.auditLog.create({
    data: {
      tenantId: auth.session.tenantId,
      userId: auth.session.sub,
      userEmail: auth.session.email,
      action: 'field_change',
      entityType: 'option_field',
      entityId: fieldId,
      summary: JSON.stringify({ fieldId, oldValue, newValue }),
    },
  });

  return NextResponse.json({ success: true, log });
}
