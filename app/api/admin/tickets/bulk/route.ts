import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const auth = await requireAdminTenant(req);
    if ('error' in auth) return auth.error;
    const { tenantId } = auth.session;

    const body = await req.json();
    const { ids, action, value } = body as {
      ids: string[];
      action: 'status-change' | 'priority-change' | 'delete';
      value?: string;
    };

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    if (action === 'status-change') {
      const allowed = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
      if (!value || !allowed.includes(value)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
      await prisma.ticket.updateMany({
        where: { id: { in: ids }, tenantId },
        data: { status: value as any },
      });
      await logAudit(auth.session, 'update', 'ticket', null, `Bulk status → ${value} for ${ids.length} tickets`);
      return NextResponse.json({ updated: ids.length });
    }

    if (action === 'priority-change') {
      const allowed = ['LOW', 'MEDIUM', 'HIGH'];
      if (!value || !allowed.includes(value)) {
        return NextResponse.json({ error: 'Invalid priority' }, { status: 400 });
      }
      await prisma.ticket.updateMany({
        where: { id: { in: ids }, tenantId },
        data: { priority: value as any },
      });
      await logAudit(auth.session, 'update', 'ticket', null, `Bulk priority → ${value} for ${ids.length} tickets`);
      return NextResponse.json({ updated: ids.length });
    }

    if (action === 'delete') {
      await prisma.ticket.deleteMany({ where: { id: { in: ids }, tenantId } });
      await logAudit(auth.session, 'delete', 'ticket', null, `Bulk deleted ${ids.length} tickets`);
      return NextResponse.json({ deleted: ids.length });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Tickets bulk error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
