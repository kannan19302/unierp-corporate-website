import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function GET(req: Request) {
  try {
    const auth = await requireAdminTenant(req);
    if ('error' in auth) return auth.error;
    const { tenantId } = auth.session;

    const url = new URL(req.url);
    const search = url.searchParams.get('q') || '';

    const subscribers = await prisma.subscriber.findMany({
      where: {
        tenantId,
        ...(search ? { email: { contains: search, mode: 'insensitive' } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const totalActive = subscribers.filter((s) => s.active).length;
    const newLast30d = subscribers.filter((s) => new Date(s.createdAt) >= thirtyDaysAgo).length;

    return NextResponse.json({
      subscribers,
      stats: { total: subscribers.length, active: totalActive, newLast30d },
    });
  } catch (error) {
    console.error('Subscribers GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = await requireAdminTenant(req);
    if ('error' in auth) return auth.error;
    const { tenantId } = auth.session;

    const body = await req.json();
    const { emails, action, ids } = body as { emails?: string[]; action?: string; ids?: string[] };

    // Bulk import
    if (emails && Array.isArray(emails)) {
      let created = 0;
      for (const email of emails) {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed.includes('@')) continue;
        await prisma.subscriber.upsert({
          where: { tenantId_email: { tenantId, email: trimmed } },
          update: { active: true },
          create: { tenantId, email: trimmed },
        });
        created++;
      }
      await logAudit(auth.session, 'create', 'subscriber', undefined, `Imported ${created} subscribers`);
      return NextResponse.json({ created });
    }

    // Bulk unsubscribe
    if (action === 'bulk-unsubscribe' && ids && Array.isArray(ids)) {
      await prisma.subscriber.updateMany({ where: { id: { in: ids }, tenantId }, data: { active: false } });
      await logAudit(auth.session, 'update', 'subscriber', undefined, `Bulk unsubscribed ${ids.length} subscribers`);
      return NextResponse.json({ updated: ids.length });
    }

    // Bulk delete
    if (action === 'bulk-delete' && ids && Array.isArray(ids)) {
      await prisma.subscriber.deleteMany({ where: { id: { in: ids }, tenantId } });
      await logAudit(auth.session, 'delete', 'subscriber', undefined, `Bulk deleted ${ids.length} subscribers`);
      return NextResponse.json({ deleted: ids.length });
    }

    // Export as CSV
    if (action === 'export') {
      const all = await prisma.subscriber.findMany({
        where: { tenantId, active: true },
        orderBy: { createdAt: 'desc' },
      });
      const header = 'Email,Active,Subscribed\n';
      const rows = all.map((s) => `"${s.email}","${s.active}","${s.createdAt.toISOString()}"`);
      const csv = header + rows.join('\n');
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="subscribers-${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Subscribers POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
