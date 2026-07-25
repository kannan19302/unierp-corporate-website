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
      action: 'stage-change' | 'delete' | 'export';
      value?: string;
    };

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    if (action === 'stage-change') {
      const allowed = ['NEW', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST'];
      if (!value || !allowed.includes(value)) {
        return NextResponse.json({ error: 'Invalid stage value' }, { status: 400 });
      }
      await prisma.lead.updateMany({
        where: { id: { in: ids }, tenantId },
        data: { status: value as any },
      });
      await logAudit(auth.session, 'update', 'lead', null, `Bulk stage → ${value} for ${ids.length} leads`);
      return NextResponse.json({ updated: ids.length });
    }

    if (action === 'delete') {
      await prisma.lead.deleteMany({ where: { id: { in: ids }, tenantId } });
      await logAudit(auth.session, 'delete', 'lead', null, `Bulk deleted ${ids.length} leads`);
      return NextResponse.json({ deleted: ids.length });
    }

    if (action === 'export') {
      const leads = await prisma.lead.findMany({ where: { id: { in: ids }, tenantId } });
      const header = 'Name,Email,Company,Size,Score,Status,Source,Created\n';
      const rows = leads.map((l) =>
        [l.name, l.email, l.company ?? '', l.size ?? '', l.score, l.status, l.source, new Date(l.createdAt).toISOString()]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(',')
      );
      const csv = header + rows.join('\n');
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="leads-${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Leads bulk error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
