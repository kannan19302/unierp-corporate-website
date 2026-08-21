import { PrismaClient } from '@prisma/client';

export async function seedUnierpContent(prisma: PrismaClient, tenantId: string) {
  await prisma.siteSettings.upsert({
    where: { tenantId },
    update: {},
    create: {
      tenantId,
      brandName: 'Uni',
      brandNameAccent: 'ERP',
      logoText: 'U',
      brandTagline: 'The Universal ERP Operating System',
      announcementEnabled: true,
      announcementIconName: 'Sparkles',
      announcementText: 'UniERP 2.5: Indian GST E-Invoicing, E-Way Bill & 30-Day Free Trial',
      announcementCtaLabel: 'Launch Demo Site →',
      announcementCtaHref: 'http://localhost:4003/',
      headerDemoLabel: 'Demo',
      headerLoginLabel: 'Log In',
      headerCtaLabel: 'Get Started',
      headerCtaHref: '/contact',
      erpAppUrl: 'http://localhost:4003',
      erpLoginPath: '/login',
      erpRegisterPath: '/register',
      siteUrl: 'http://localhost:4001',
      trustStats: [
        { label: 'Businesses running on UniERP', value: '3,400+' },
        { label: 'Countries', value: '12' },
        { label: 'Uptime SLA', value: '99.9%' },
        { label: 'ERP modules', value: '28+' },
      ],
      logoWallHeading: 'Trusted by growing businesses across India and beyond',
      logoWallNames: ['TechCorp India', 'GlobalMed Inc', 'EduLearn Systems', 'Apex Retail Group', 'Nordic Style', 'Logistics Co'],
      footerBrandName: 'UniERP Platform',
      footerBlurb: 'The Universal ERP Operating System for Indian & global enterprises.',
      newsletterPlaceholder: 'Subscribe for product updates',
      newsletterCtaLabel: 'Subscribe',
      copyrightText: '© {year} UniERP Platform Inc. All rights reserved.',
      chatEnabled: true,
      chatTitle: 'UniERP AI Assistant',
      chatLauncherLabel: 'Ask UniERP AI Assistant',
      chatGreeting: 'Hello! I am your UniERP AI Assistant. Ask me anything about our 28+ ERP modules, INR pricing, GST compliance, or the No-Code Studio!',
      chatFallbackMessage: "I'm having trouble reaching my knowledge base right now. Would you like me to connect you with a human specialist instead?",
    },
  });

  const navLinks: Array<{ label: string; href: string; placement: 'HEADER' | 'FOOTER'; group?: string; sortOrder: number }> = [
    { label: 'Product', href: '/product', placement: 'HEADER', sortOrder: 0 },
    { label: 'Pricing', href: '/pricing', placement: 'HEADER', sortOrder: 1 },
    { label: 'Industries', href: '/industries', placement: 'HEADER', sortOrder: 2 },
    { label: 'Customers', href: '/customers', placement: 'HEADER', sortOrder: 3 },
    { label: 'Resources', href: '/resources', placement: 'HEADER', sortOrder: 4 },
    { label: 'All Modules', href: '/product', placement: 'FOOTER', group: 'Product', sortOrder: 0 },
    { label: 'Pricing', href: '/pricing', placement: 'FOOTER', group: 'Product', sortOrder: 1 },
    { label: 'Industries', href: '/industries', placement: 'FOOTER', group: 'Product', sortOrder: 2 },
    { label: 'Customer Stories', href: '/customers', placement: 'FOOTER', group: 'Company', sortOrder: 3 },
    { label: 'Resources', href: '/resources', placement: 'FOOTER', group: 'Company', sortOrder: 4 },
    { label: 'Contact Sales', href: '/contact', placement: 'FOOTER', group: 'Company', sortOrder: 5 },
  ];
  for (const link of navLinks) {
    const existing = await prisma.navLink.findFirst({ where: { tenantId, label: link.label, placement: link.placement, href: link.href } });
    if (!existing) await prisma.navLink.create({ data: { tenantId, ...link } });
  }

  const features = [
    { slug: 'finance', name: 'General Ledger & GST Compliance', category: 'ops', categoryLabel: 'Core Operations', iconName: 'CreditCard', description: 'Double-entry bookkeeping, GSTR-1/3B tax reports, E-Way bills, bank feeds.', highlighted: true, sortOrder: 0 },
    { slug: 'inventory', name: 'Multi-Warehouse Inventory & MRP', category: 'ops', categoryLabel: 'Core Operations', iconName: 'Package', description: 'Serial/batch tracking, drop-shipping, barcodes, reorder automation.', highlighted: true, sortOrder: 1 },
    { slug: 'manufacturing', name: 'Manufacturing & Work Orders', category: 'ops', categoryLabel: 'Core Operations', iconName: 'Hammer', description: 'Bill of materials (BOM), routing, work station capacity scheduling.', highlighted: true, sortOrder: 2 },
    { slug: 'crm', name: 'CRM & Sales Funnel', category: 'ops', categoryLabel: 'Core Operations', iconName: 'Users', description: 'Lead scoring, sales funnel analytics, automated GST quotations.', highlighted: true, sortOrder: 3 },
    { slug: 'hr', name: 'Indian HR & Statutory Payroll', category: 'ops', categoryLabel: 'Core Operations', iconName: 'Heart', description: 'EPF, ESI, Professional Tax, TDS withholding, salary slips, attendance.', sortOrder: 4 },
    { slug: 'pos', name: 'Retail Point-of-Sale (POS)', category: 'ops', categoryLabel: 'Core Operations', iconName: 'Store', description: 'Offline-first cash register, GST receipt printing, stock sync.', sortOrder: 5 },
    { slug: 'studio', name: 'No-Code Builder Studio', category: 'studio', categoryLabel: 'No-Code Studio', iconName: 'Activity', description: 'Drag-and-drop page builder, form intake builder, workflow triggers.', sortOrder: 6 },
    { slug: 'cms', name: 'Tenant Web Portal CMS', category: 'studio', categoryLabel: 'No-Code Studio', iconName: 'Globe', description: 'Customizable public site engine with dynamic theme tokens.', sortOrder: 7 },
    { slug: 'healthcare', name: 'Healthcare & EMR Suite', category: 'verticals', categoryLabel: 'Industry Verticals', iconName: 'Activity', description: 'Patient records, appointments, prescription logs, lab billing.', sortOrder: 8 },
    { slug: 'education', name: 'Education & SIS Portal', category: 'verticals', categoryLabel: 'Industry Verticals', iconName: 'GraduationCap', description: 'Student enrollment, gradebooks, fee collections, timetables.', sortOrder: 9 },
    { slug: 'realestate', name: 'Real Estate & Lease Mgmt', category: 'verticals', categoryLabel: 'Industry Verticals', iconName: 'Building2', description: 'Property listings, tenant lease agreements, maintenance tickets.', sortOrder: 10 },
    { slug: 'fieldservice', name: 'Field Service Dispatch', category: 'verticals', categoryLabel: 'Industry Verticals', iconName: 'Wrench', description: 'Technician scheduling, mobile work orders, route optimization.', sortOrder: 11 },
    { slug: 'copilot', name: 'UniERP AI Copilot', category: 'ai', categoryLabel: 'AI & Analytics', iconName: 'Bot', description: 'Automated financial reconciliation, quote drafting, inventory alerts.', sortOrder: 12 },
    { slug: 'analytics', name: 'BI Executive Dashboards', category: 'ai', categoryLabel: 'AI & Analytics', iconName: 'BarChart3', description: '1,500+ real-time metrics, cohort analysis, cashflow forecasting.', sortOrder: 13 },
  ];
  for (const f of features) {
    await prisma.feature.upsert({ where: { tenantId_slug: { tenantId, slug: f.slug } }, update: f, create: { tenantId, ...f } });
  }

  const testimonials = [
    { quote: 'UniERP cut our monthly GST reconciliation from three days to under two hours. The E-Invoicing automation alone paid for the subscription.', authorName: 'Rajesh Kumar', authorTitle: 'CFO', company: 'TechCorp India', sortOrder: 0 },
    { quote: 'We replaced four disconnected tools with one UniERP workspace. Our sales team finally trusts the pipeline numbers.', authorName: 'Ananya Sharma', authorTitle: 'COO', company: 'EduLearn Systems', sortOrder: 1 },
    { quote: 'The No-Code Builder Studio let our ops team ship a custom intake workflow in an afternoon — no engineering ticket required.', authorName: 'Michael Zhang', authorTitle: 'VP Operations', company: 'Apex Retail Group', sortOrder: 2 },
  ];
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { tenantId, authorName: t.authorName } });
    if (!existing) await prisma.testimonial.create({ data: { tenantId, ...t } });
  }

  const pricingTiers = [
    { slug: 'starter', name: 'Starter', blurb: 'Essential ERP modules for growing Indian small businesses.', priceInrAnnual: 1199, priceInrMonthly: 1499, priceUsdAnnual: 23, priceUsdMonthly: 29, ctaLabel: 'Start 30-Day Trial', highlight: false, features: ['Up to 10 users', 'Finance & GST module', 'Inventory management', 'Email support'], sortOrder: 0 },
    { slug: 'professional', name: 'Professional', blurb: 'Complete 28-module suite with full GST E-Invoicing & Statutory Payroll.', priceInrAnnual: 3199, priceInrMonthly: 3999, priceUsdAnnual: 63, priceUsdMonthly: 79, ctaLabel: 'Start 30-Day Free Trial', highlight: true, features: ['Unlimited users', 'All 28+ modules', 'GST E-Invoicing & E-Way Bills', 'Statutory Payroll (EPF/ESI/TDS)', 'Priority support'], sortOrder: 1 },
    { slug: 'enterprise', name: 'Enterprise', blurb: 'Dedicated single-tenant infrastructure with custom SLA.', priceLabelOverride: 'Custom Quote', ctaLabel: 'Contact Sales', ctaOpensLeadModal: true, highlight: false, features: ['Dedicated infrastructure', 'Custom SLA & onboarding', 'SSO & advanced RBAC', 'Dedicated success manager'], sortOrder: 2 },
  ];
  for (const p of pricingTiers) {
    await prisma.pricingTier.upsert({ where: { tenantId_slug: { tenantId, slug: p.slug } }, update: p, create: { tenantId, ...p } });
  }

  const faqs = [
    { question: 'Is the 30-day trial really free, no credit card?', answer: 'Yes — every trial starts with full access to all 28+ modules and requires no payment details up front.', page: '/pricing', sortOrder: 0 },
    { question: 'Can I switch between INR and USD billing?', answer: 'Yes, pricing is shown in both currencies and your invoice currency is set during onboarding.', page: '/pricing', sortOrder: 1 },
    { question: 'Is UniERP compliant with Indian GST regulations?', answer: 'Yes — E-Invoicing (IRN), E-Way Bills, and GSTR-1/3B exports are built in on the Professional and Enterprise tiers.', page: '/pricing', sortOrder: 2 },
    { question: 'Can I cancel anytime?', answer: 'Yes, subscriptions are month-to-month with no long-term lock-in on Starter and Professional tiers.', page: '/pricing', sortOrder: 3 },
  ];
  for (const f of faqs) {
    const existing = await prisma.faqItem.findFirst({ where: { tenantId, question: f.question } });
    if (!existing) await prisma.faqItem.create({ data: { tenantId, ...f } });
  }

  const industries = [
    { slug: 'healthcare', name: 'Healthcare', iconName: 'Activity', blurb: 'EMR, patient billing, and lab workflows built for Indian clinics and hospital chains.', appSlug: 'unierp-app-healthcare', sortOrder: 0 },
    { slug: 'education', name: 'Education', iconName: 'GraduationCap', blurb: 'Admissions, fee collection, gradebooks, and timetables for schools and institutes.', appSlug: 'unierp-app-education', sortOrder: 1 },
    { slug: 'realestate', name: 'Real Estate', iconName: 'Building2', blurb: 'Lease lifecycle management, tenant portals, and maintenance dispatch.', appSlug: 'unierp-app-realestate', sortOrder: 2 },
    { slug: 'fieldservice', name: 'Field Service', iconName: 'Wrench', blurb: 'Technician scheduling, mobile work orders, and route optimization.', appSlug: 'unierp-app-fieldservice', sortOrder: 3 },
    { slug: 'retail', name: 'Retail & Manufacturing', iconName: 'Store', blurb: 'POS, multi-warehouse inventory, MRP, and GST-compliant billing.', sortOrder: 4 },
  ];
  for (const i of industries) {
    await prisma.industry.upsert({ where: { tenantId_slug: { tenantId, slug: i.slug } }, update: i, create: { tenantId, ...i } });
  }

  const caseStudies = [
    { slug: 'techcorp-india', company: 'TechCorp India', result: '60% faster GST reconciliation', detail: 'Automated E-Invoicing and GSTR filing cut monthly close time from 3 days to under 2 hours.', sortOrder: 0 },
    { slug: 'apex-retail-group', company: 'Apex Retail Group', result: '25% reduction in stockouts', detail: 'Multi-warehouse inventory and MRP gave real-time visibility across 40+ retail locations.', sortOrder: 1 },
    { slug: 'edulearn-systems', company: 'EduLearn Systems', result: '4x faster fee collection cycle', detail: 'Automated invoicing and payment reminders through the Education SIS module.', sortOrder: 2 },
  ];
  for (const c of caseStudies) {
    await prisma.caseStudy.upsert({ where: { tenantId_slug: { tenantId, slug: c.slug } }, update: c, create: { tenantId, ...c } });
  }

  const resources = [
    { slug: 'gst-e-invoicing-guide', type: 'Guide', title: 'A Complete Guide to GST E-Invoicing in 2026', description: 'Everything Indian businesses need to know about IRN generation and E-Way bill compliance.', iconName: 'FileText', sortOrder: 0 },
    { slug: 'modular-vs-monolithic-erp', type: 'Guide', title: 'Choosing Between Modular and Monolithic ERP', description: 'How composable ERP platforms reduce total cost of ownership vs. legacy suites.', iconName: 'BookOpen', sortOrder: 1 },
    { slug: 'no-code-studio-walkthrough', type: 'Webinar', title: 'No-Code Builder Studio Walkthrough', description: 'A 20-minute tour of building a custom intake workflow without writing code.', iconName: 'Video', sortOrder: 2 },
    { slug: 'statutory-payroll-checklist', type: 'Guide', title: 'Statutory Payroll Compliance Checklist', description: 'EPF, ESI, Professional Tax, and TDS — what to automate and what to review manually.', iconName: 'FileText', sortOrder: 3 },
  ];
  for (const r of resources) {
    await prisma.resource.upsert({ where: { tenantId_slug: { tenantId, slug: r.slug } }, update: r, create: { tenantId, ...r } });
  }

  await prisma.pageContent.upsert({
    where: { tenantId_path: { tenantId, path: '/' } },
    update: {},
    create: {
      tenantId,
      path: '/',
      title: 'Home',
      badgeText: '30-Day Free Trial • No Credit Card Required',
      heroHeadline: 'The Universal ERP Operating System For ',
      heroHeadlineAccent: 'Indian & Global Enterprises',
      heroSubheadline: 'Seamlessly combine 28+ composable ERP modules, Indian GST E-Invoicing & E-Way Bills, Statutory PF/ESI Payroll, and a visual No-Code Builder Studio.',
      heroBullets: ['30 Days Full Access', 'No Credit Card Required', 'GST & Statutory Ready'],
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UniERP Operating System',
        operatingSystem: 'Linux, Windows, Web, Cloud, Docker',
        applicationCategory: 'BusinessApplication',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '520' },
        offers: { '@type': 'Offer', price: '1499.00', priceCurrency: 'INR' },
      },
      sections: [
        { id: 'stat-bar-1', type: 'stat-bar' },
        { id: 'logo-wall-1', type: 'logo-wall' },
        {
          id: 'feature-grid-1',
          type: 'feature-grid',
          heading: 'One Platform, 28+ Modules',
          subheading: 'Replace disconnected point tools with a single composable operating system.',
          source: 'highlighted',
          limit: 4,
          ctaLabel: 'See all 28+ modules',
          ctaHref: '/product',
        },
        {
          id: 'feature-cards-1',
          type: 'feature-cards',
          eyebrowIconName: 'Shield',
          eyebrow: 'Built For Indian Enterprise Taxation',
          heading: 'Indian GST, E-Invoicing & Statutory Payroll',
          background: 'surface',
          items: [
            { iconName: 'FileText', title: 'Automated E-Invoicing & E-Way Bills', body: 'QR-coded GST E-Invoices and E-Way bills with automatic IRN generation and NIC portal sync.', accent: 'emerald' },
            { iconName: 'BarChart3', title: 'GSTR-1 & GSTR-3B Tax Filing', body: 'Pre-formatted B2B/B2C/HSN and ITC reconciliation reports for direct GST portal upload.', accent: 'primary' },
            { iconName: 'Heart', title: 'Indian Statutory Payroll', body: 'EPF, ESI, Professional Tax state tables, and Form 16 TDS withholding calculations.', accent: 'purple' },
          ],
        },
        { id: 'testimonials-1', type: 'testimonials', heading: 'Loved by finance & ops teams' },
        { id: 'cta-1', type: 'cta', heading: 'Ready to run your business on one platform?', body: 'Start your 30-day free trial — no credit card required.', ctaLabel: 'Talk to Sales', ctaHref: '/contact' },
      ],
    },
  });
}
