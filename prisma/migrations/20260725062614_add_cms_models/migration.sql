-- CreateEnum
CREATE TYPE "NavPlacement" AS ENUM ('HEADER', 'FOOTER', 'LEGAL');

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL DEFAULT 'Business',
    "brandNameAccent" TEXT,
    "logoText" TEXT DEFAULT 'B',
    "logoImageUrl" TEXT,
    "brandTagline" TEXT,
    "themePrimary" TEXT,
    "themeAccent" TEXT,
    "themeEmerald" TEXT,
    "themePurple" TEXT,
    "announcementEnabled" BOOLEAN NOT NULL DEFAULT true,
    "announcementIconName" TEXT DEFAULT 'Sparkles',
    "announcementText" TEXT,
    "announcementCtaLabel" TEXT,
    "announcementCtaHref" TEXT,
    "headerDemoLabel" TEXT DEFAULT 'Demo',
    "headerLoginLabel" TEXT DEFAULT 'Log In',
    "headerCtaLabel" TEXT DEFAULT 'Get Started',
    "headerCtaHref" TEXT DEFAULT '/contact',
    "erpAppUrl" TEXT NOT NULL DEFAULT 'http://localhost:3000',
    "erpLoginPath" TEXT NOT NULL DEFAULT '/login',
    "erpRegisterPath" TEXT NOT NULL DEFAULT '/register',
    "siteUrl" TEXT NOT NULL DEFAULT 'http://localhost:3002',
    "trustStats" JSONB NOT NULL DEFAULT '[]',
    "logoWallHeading" TEXT,
    "logoWallNames" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "footerBrandName" TEXT,
    "footerBlurb" TEXT,
    "newsletterPlaceholder" TEXT DEFAULT 'Subscribe for product updates',
    "newsletterCtaLabel" TEXT DEFAULT 'Subscribe',
    "copyrightText" TEXT,
    "chatEnabled" BOOLEAN NOT NULL DEFAULT true,
    "chatTitle" TEXT DEFAULT 'AI Assistant',
    "chatLauncherLabel" TEXT,
    "chatGreeting" TEXT,
    "chatSystemPrompt" TEXT,
    "chatFallbackMessage" TEXT,
    "defaultOgImage" TEXT,
    "titleTemplate" TEXT DEFAULT '%s',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nav_links" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "placement" "NavPlacement" NOT NULL DEFAULT 'HEADER',
    "group" TEXT,
    "external" BOOLEAN NOT NULL DEFAULT false,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "nav_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_content" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT,
    "badgeIconName" TEXT,
    "badgeText" TEXT,
    "heroHeadline" TEXT,
    "heroHeadlineAccent" TEXT,
    "heroSubheadline" TEXT,
    "heroPrimaryCtaLabel" TEXT,
    "heroPrimaryCtaHref" TEXT,
    "heroSecondaryCtaLabel" TEXT,
    "heroSecondaryCtaHref" TEXT,
    "heroBullets" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sections" JSONB NOT NULL DEFAULT '[]',
    "jsonLd" JSONB,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "seoPriority" DOUBLE PRECISION DEFAULT 0.7,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryLabel" TEXT,
    "iconName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorTitle" TEXT,
    "company" TEXT,
    "avatarUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_tiers" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blurb" TEXT,
    "priceInrAnnual" INTEGER,
    "priceInrMonthly" INTEGER,
    "priceUsdAnnual" INTEGER,
    "priceUsdMonthly" INTEGER,
    "priceLabelOverride" TEXT,
    "unitLabel" TEXT DEFAULT '/ user / month',
    "ctaLabel" TEXT NOT NULL,
    "ctaHref" TEXT,
    "ctaOpensLeadModal" BOOLEAN NOT NULL DEFAULT true,
    "highlight" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_items" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "page" TEXT NOT NULL DEFAULT '/pricing',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industries" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "appSlug" TEXT,
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "logoUrl" TEXT,
    "metricIconName" TEXT DEFAULT 'TrendingUp',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "url" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_tenantId_key" ON "site_settings"("tenantId");

-- CreateIndex
CREATE INDEX "nav_links_tenantId_placement_sortOrder_idx" ON "nav_links"("tenantId", "placement", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "page_content_tenantId_path_key" ON "page_content"("tenantId", "path");

-- CreateIndex
CREATE INDEX "features_tenantId_sortOrder_idx" ON "features"("tenantId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "features_tenantId_slug_key" ON "features"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "testimonials_tenantId_sortOrder_idx" ON "testimonials"("tenantId", "sortOrder");

-- CreateIndex
CREATE INDEX "pricing_tiers_tenantId_sortOrder_idx" ON "pricing_tiers"("tenantId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_tiers_tenantId_slug_key" ON "pricing_tiers"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "faq_items_tenantId_page_sortOrder_idx" ON "faq_items"("tenantId", "page", "sortOrder");

-- CreateIndex
CREATE INDEX "industries_tenantId_sortOrder_idx" ON "industries"("tenantId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "industries_tenantId_slug_key" ON "industries"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "case_studies_tenantId_sortOrder_idx" ON "case_studies"("tenantId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_tenantId_slug_key" ON "case_studies"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "resources_tenantId_sortOrder_idx" ON "resources"("tenantId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "resources_tenantId_slug_key" ON "resources"("tenantId", "slug");

-- AddForeignKey
ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nav_links" ADD CONSTRAINT "nav_links_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_content" ADD CONSTRAINT "page_content_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_tiers" ADD CONSTRAINT "pricing_tiers_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq_items" ADD CONSTRAINT "faq_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "industries" ADD CONSTRAINT "industries_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
