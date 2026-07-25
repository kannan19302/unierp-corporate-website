import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export const getSiteContent = cache(async (tenantId: string) => {
  const [siteSettings, navLinks, features, testimonials, pricingTiers, faqItems, industries, caseStudies, resources] =
    await Promise.all([
      prisma.siteSettings.findUnique({ where: { tenantId } }),
      prisma.navLink.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.feature.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.testimonial.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.pricingTier.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.faqItem.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.industry.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.caseStudy.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.resource.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }),
    ]);

  return {
    settings: withSiteDefaults(siteSettings),
    navLinks,
    features,
    testimonials,
    pricingTiers,
    faqItems,
    industries,
    caseStudies,
    resources,
  };
});

export const getPageContent = cache(async (tenantId: string, path: string) => {
  return prisma.pageContent.findUnique({ where: { tenantId_path: { tenantId, path } } });
});

export const getFeatureCategories = cache(async (tenantId: string) => {
  const features = await prisma.feature.findMany({
    where: { tenantId, visible: true },
    select: { category: true, categoryLabel: true, sortOrder: true },
    orderBy: { sortOrder: 'asc' },
  });

  const seen = new Map<string, { category: string; label: string; order: number }>();
  for (const f of features) {
    if (!seen.has(f.category)) {
      seen.set(f.category, { category: f.category, label: f.categoryLabel || f.category, order: f.sortOrder });
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.order - b.order);
});

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

/** Fills every nullable branding/copy field with a neutral default so a blank/new tenant still renders sensibly. */
export function withSiteDefaults(settings: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>>) {
  return {
    brandName: settings?.brandName || 'Business',
    brandNameAccent: settings?.brandNameAccent || '',
    logoText: settings?.logoText || 'B',
    logoImageUrl: settings?.logoImageUrl || null,
    brandTagline: settings?.brandTagline || '',

    themePrimary: settings?.themePrimary || null,
    themeAccent: settings?.themeAccent || null,
    themeEmerald: settings?.themeEmerald || null,
    themePurple: settings?.themePurple || null,

    announcementEnabled: settings?.announcementEnabled ?? false,
    announcementIconName: settings?.announcementIconName || 'Sparkles',
    announcementText: settings?.announcementText || '',
    announcementCtaLabel: settings?.announcementCtaLabel || '',
    announcementCtaHref: settings?.announcementCtaHref || '',

    headerDemoLabel: settings?.headerDemoLabel || 'Demo',
    headerLoginLabel: settings?.headerLoginLabel || 'Log In',
    headerCtaLabel: settings?.headerCtaLabel || 'Get Started',
    headerCtaHref: settings?.headerCtaHref || '/contact',

    erpAppUrl: settings?.erpAppUrl || 'http://localhost:3000',
    erpLoginPath: settings?.erpLoginPath || '/login',
    erpRegisterPath: settings?.erpRegisterPath || '/register',
    siteUrl: settings?.siteUrl || 'http://localhost:3002',

    trustStats: (settings?.trustStats as { label: string; value: string }[] | undefined) || [],
    logoWallHeading: settings?.logoWallHeading || '',
    logoWallNames: settings?.logoWallNames || [],

    footerBrandName: settings?.footerBrandName || settings?.brandName || 'Business',
    footerBlurb: settings?.footerBlurb || '',
    newsletterPlaceholder: settings?.newsletterPlaceholder || 'Subscribe for updates',
    newsletterCtaLabel: settings?.newsletterCtaLabel || 'Subscribe',
    copyrightText: settings?.copyrightText || '',

    chatEnabled: settings?.chatEnabled ?? true,
    chatTitle: settings?.chatTitle || 'AI Assistant',
    chatLauncherLabel: settings?.chatLauncherLabel || 'Ask AI Assistant',
    chatGreeting: settings?.chatGreeting || 'Hello! How can I help you today?',
    chatSystemPrompt: settings?.chatSystemPrompt || '',
    chatFallbackMessage:
      settings?.chatFallbackMessage ||
      "I'm having trouble reaching my knowledge base right now. Would you like me to connect you with a human specialist instead?",

    defaultOgImage: settings?.defaultOgImage || null,
    titleTemplate: settings?.titleTemplate || '%s',
    demoBookingUrl: settings?.demoBookingUrl || null,
  };
}
