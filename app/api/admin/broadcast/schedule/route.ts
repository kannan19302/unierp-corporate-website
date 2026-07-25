import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';
import { sendEmail } from '@/lib/email';

/** GET /api/admin/broadcast/schedule — list all scheduled broadcasts */
export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const schedules = await prisma.broadcastSchedule.findMany({
    where: { tenantId },
    orderBy: { scheduledAt: 'asc' },
  });

  return NextResponse.json({ schedules });
}

/** POST /api/admin/broadcast/schedule */
export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const body = await req.json();
  const { action } = body as { action: string };

  // Schedule a new broadcast
  if (action === 'schedule') {
    const { subject, htmlBody, scheduledAt } = body as { subject: string; htmlBody: string; scheduledAt: string };
    if (!subject || !htmlBody || !scheduledAt) {
      return NextResponse.json({ error: 'Missing subject, htmlBody, or scheduledAt' }, { status: 400 });
    }
    const schedule = await prisma.broadcastSchedule.create({
      data: {
        tenantId,
        subject,
        htmlBody,
        scheduledAt: new Date(scheduledAt),
        createdByEmail: auth.session.email,
      },
    });
    await logAudit(auth.session, 'create', 'broadcast-schedule', schedule.id, `Scheduled: ${subject}`);
    return NextResponse.json({ schedule });
  }

  // Cancel a scheduled broadcast
  if (action === 'cancel') {
    const { id } = body as { id: string };
    const schedule = await prisma.broadcastSchedule.findFirst({ where: { id, tenantId, status: 'PENDING' } });
    if (!schedule) return NextResponse.json({ error: 'Not found or already processed' }, { status: 404 });
    await prisma.broadcastSchedule.update({ where: { id }, data: { status: 'CANCELLED' } });
    await logAudit(auth.session, 'update', 'broadcast-schedule', id, `Cancelled: ${schedule.subject}`);
    return NextResponse.json({ cancelled: true });
  }

  // Process all due broadcasts (manual trigger / cron-equivalent)
  if (action === 'process-due') {
    const now = new Date();
    const due = await prisma.broadcastSchedule.findMany({
      where: { tenantId, status: 'PENDING', scheduledAt: { lte: now } },
    });

    let totalSent = 0;
    for (const broadcast of due) {
      const subscribers = await prisma.subscriber.findMany({
        where: { tenantId, active: true },
        select: { email: true },
      });

      const results = await Promise.allSettled(
        subscribers.map((s) => sendEmail({ tenantId, to: s.email, subject: broadcast.subject, html: broadcast.htmlBody }))
      );
      const sent = results.filter((r) => r.status === 'fulfilled' && (r.value as any).ok).length;
      totalSent += sent;

      await prisma.broadcastSchedule.update({
        where: { id: broadcast.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
          recipients: subscribers.length,
          sent,
        },
      });
      await logAudit(auth.session, 'broadcast', 'broadcast-schedule', broadcast.id,
        `Processed: "${broadcast.subject}" — ${sent}/${subscribers.length} sent`);
    }

    return NextResponse.json({ processed: due.length, totalSent });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
