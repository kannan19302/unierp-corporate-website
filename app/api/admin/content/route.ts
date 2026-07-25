import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { seedUnierpContent } from '@/prisma/seed/content/unierp';

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  let siteSettings = await prisma.siteSettings.findUnique({ where: { tenantId } });

  if (!siteSettings) {
    try {
      await seedUnierpContent(prisma, tenantId);
    } catch (err) {
      console.error('Auto-seed failed:', err);
    }
  }

  const [finalSiteSettings, navLinks, pages, features, testimonials, pricingTiers, faqItems, industries, caseStudies, resources] =
    await Promise.all([
      prisma.siteSettings.findUnique({ where: { tenantId } }),
      prisma.navLink.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.pageContent.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.feature.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.testimonial.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.pricingTier.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.faqItem.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.industry.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.caseStudy.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
      prisma.resource.findMany({ where: { tenantId }, orderBy: { sortOrder: 'asc' } }),
    ]);

  return NextResponse.json({
    success: true,
    data: {
      siteSettings: finalSiteSettings,
      navigation: navLinks,
      pages,
      features,
      testimonials,
      pricing: pricingTiers,
      faqs: faqItems,
      industries,
      'case-studies': caseStudies,
      resources,
    },
  });
}

