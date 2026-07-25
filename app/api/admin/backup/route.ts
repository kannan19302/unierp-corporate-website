import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const tenantId = auth.session.tenantId;

  // Export full snapshot of tenant data
  const [siteSettings, features, pricingTiers, testimonials, faqs, industries, caseStudies, resources, leads, tickets, subscribers, auditLogs] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { tenantId } }),
    prisma.feature.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    prisma.pricingTier.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    prisma.testimonial.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    prisma.faqItem.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    prisma.industry.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    prisma.caseStudy.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    prisma.resource.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    prisma.lead.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 1000 }),
    prisma.ticket.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 1000 }),
    prisma.subscriber.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 2000 }),
    prisma.auditLog.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 500 }),
  ]);

  const backupData = {
    metadata: {
      exportedAt: new Date().toISOString(),
      exportedBy: auth.session.email,
      tenantId,
      version: '1.0',
    },
    siteSettings,
    collections: {
      features,
      pricingTiers,
      testimonials,
      faqs,
      industries,
      caseStudies,
      resources,
    },
    crm: {
      leads,
      tickets,
      subscribers,
    },
    auditLogs,
  };

  return new NextResponse(JSON.stringify(backupData, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="unierp-backup-${tenantId}-${Date.now()}.json"`,
    },
  });
}
