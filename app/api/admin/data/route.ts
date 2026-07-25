import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await requireAdminTenant(request);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const [
    totalPageviews,
    activeLeads,
    highScoreLeads,
    openTickets,
    totalSubscribers,
    emailsSent,
    emailsFailed,
    emailsQueued,
    leads,
    tickets,
    emailLogs,
    seoRows,
    recentAuditLogs,
    scheduledBroadcasts,
    dailyTrend,
  ] = await Promise.all([
    prisma.analyticsEvent.count({ where: { tenantId, eventType: 'pageview' } }),
    prisma.lead.count({ where: { tenantId, isDraft: false, status: { in: ['NEW', 'QUALIFIED', 'PROPOSAL_SENT'] } } }),
    prisma.lead.count({ where: { tenantId, isDraft: false, score: { gte: 80 } } }),
    prisma.ticket.count({ where: { tenantId, status: 'OPEN' } }),
    prisma.subscriber.count({ where: { tenantId, active: true } }),
    prisma.emailLog.count({ where: { tenantId, status: 'SENT' } }),
    prisma.emailLog.count({ where: { tenantId, status: 'FAILED' } }),
    prisma.emailLog.count({ where: { tenantId, status: 'QUEUED' } }),
    prisma.lead.findMany({ where: { tenantId, isDraft: false }, orderBy: { createdAt: 'desc' }, take: 100 }),
    prisma.ticket.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { replies: { orderBy: { createdAt: 'desc' }, take: 1 } },
    }),
    prisma.emailLog.findMany({ where: { tenantId }, orderBy: { sentAt: 'desc' }, take: 200 }),
    prisma.seoSetting.findMany({ where: { tenantId } }),
    prisma.auditLog.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 10 }),
    prisma.broadcastSchedule.findMany({ where: { tenantId, status: 'PENDING' }, orderBy: { scheduledAt: 'asc' } }),
    // Daily trend — last 14 days of pageviews
    prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*)::bigint as count
      FROM analytics_events
      WHERE "tenantId" = ${tenantId}
        AND "eventType" = 'pageview'
        AND "createdAt" >= NOW() - INTERVAL '14 days'
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") ASC
    `.catch(() => []),
  ]);

  const totalEmails = emailsSent + emailsFailed + emailsQueued;
  const deliveryRate = totalEmails > 0 ? Math.round((emailsSent / totalEmails) * 100) : 100;

  return NextResponse.json({
    success: true,
    data: {
      stats: {
        totalPageviews,
        activeLeads,
        highScoreLeads,
        openTickets,
        totalSubscribers,
        emailsSent,
        emailsFailed,
        emailsQueued,
        deliveryRate,
        pendingBroadcasts: scheduledBroadcasts.length,
      },
      leads,
      tickets: tickets.map((t) => ({ ...t, reply: t.replies[0]?.body || '' })),
      emailLogs,
      seo: seoRows,
      recentAuditLogs,
      scheduledBroadcasts,
      dailyTrend: (dailyTrend as any[]).map((r) => ({
        date: typeof r.date === 'object' ? r.date.toISOString().split('T')[0] : String(r.date),
        count: Number(r.count),
      })),
    },
  });
}
