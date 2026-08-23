import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export const getSiteContent = cache(async (tenantId: string) => {
  try {
    const [siteSettings, navLinks, features, testimonials, pricingTiers, faqItems, industries, caseStudies, resources] =
      await Promise.all([
        prisma.siteSettings.findUnique({ where: { tenantId } }).catch(() => null),
        prisma.navLink.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
        prisma.feature.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
        prisma.testimonial.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
        prisma.pricingTier.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
        prisma.faqItem.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
        prisma.industry.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
        prisma.caseStudy.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
        prisma.resource.findMany({ where: { tenantId, visible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
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
  } catch {
    return {
      settings: withSiteDefaults(null),
      navLinks: [],
      features: [],
      testimonials: [],
      pricingTiers: [],
      faqItems: [],
      industries: [],
      caseStudies: [],
      resources: [],
    };
  }
});

export const getPageContent = cache(async (tenantId: string, path: string) => {
  try {
    return await prisma.pageContent.findUnique({ where: { tenantId_path: { tenantId, path } } });
  } catch {
    return null;
  }
});

export const getFeatureCategories = cache(async (tenantId: string) => {
  try {
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
  } catch {
    return [];
  }
});

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

/** Fills every nullable branding/copy field with a neutral default so a blank/new tenant still renders sensibly. */
export function withSiteDefaults(settings: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>>) {
  return {
    brandName: settings?.brandName || 'UniERP',
    brandNameAccent: settings?.brandNameAccent || '',
    logoText: settings?.logoText || 'U',
    logoImageUrl: settings?.logoImageUrl || null,
    brandTagline: settings?.brandTagline || 'Enterprise capability underneath, consumer-grade simplicity on the surface',

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

    // Ports 3000/3002 were the old monorepo layout and are served by nothing in
    // the current platform — infra/docker-compose.platform.yml puts the ERP app
    // (tenant-apps, P3) on 4003 and this site on 4001. Compose was already
    // passing NEXT_PUBLIC_ERP_APP_URL and nothing read it, so every "Log In",
    // "Get Started" and announcement CTA on the marketing site pointed at a
    // dead port. Read the env first, and keep the port map as the fallback.
    erpAppUrl:
      settings?.erpAppUrl || process.env.NEXT_PUBLIC_ERP_APP_URL || 'http://localhost:4003',
    erpLoginPath: settings?.erpLoginPath || '/login',
    erpRegisterPath: settings?.erpRegisterPath || '/register',
    siteUrl: settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4001',

    trustStats: (settings?.trustStats as { label: string; value: string }[] | undefined) || [],
    logoWallHeading: settings?.logoWallHeading || '',
    logoWallNames: settings?.logoWallNames || [],

    footerBrandName: settings?.footerBrandName || settings?.brandName || 'UniERP',
    footerBlurb: settings?.footerBlurb || 'The composable, multi-tenant enterprise ERP platform for modern businesses — finance, HR, CRM, inventory, manufacturing, and 40+ modules.',
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
