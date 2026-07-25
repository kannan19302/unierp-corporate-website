import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await requireAdminTenant(request);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [topPaths, topReferrers, recentEvents, totalLeads, wonLeads] = await Promise.all([
    prisma.analyticsEvent.groupBy({
      by: ['path'],
      where: { tenantId, eventType: 'pageview', createdAt: { gte: since } },
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    }),
    prisma.analyticsEvent.groupBy({
      by: ['referrer'],
      where: { tenantId, eventType: 'pageview', createdAt: { gte: since }, NOT: { referrer: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 10,
    }),
    prisma.analyticsEvent.findMany({
      where: { tenantId, eventType: 'pageview', createdAt: { gte: since } },
      select: { createdAt: true },
    }),
    prisma.lead.count({ where: { tenantId, isDraft: false, createdAt: { gte: since } } }),
    prisma.lead.count({ where: { tenantId, isDraft: false, status: 'WON', createdAt: { gte: since } } }),
  ]);

  const dailyTrend: Record<string, number> = {};
  for (const event of recentEvents) {
    const day = event.createdAt.toISOString().slice(0, 10);
    dailyTrend[day] = (dailyTrend[day] || 0) + 1;
  }

  return NextResponse.json({
    success: true,
    analytics: {
      topPaths: topPaths.map((p) => ({ path: p.path, count: p._count.path })),
      topReferrers: topReferrers.map((r) => ({ referrer: r.referrer || 'Direct', count: r._count.referrer })),
      dailyTrend: Object.entries(dailyTrend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count })),
      leadConversionRate: totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 1000) / 10 : 0,
      totalLeads,
      wonLeads,
    },
  });
}
