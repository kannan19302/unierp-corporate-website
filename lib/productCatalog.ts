/**
 * Ground-truth product catalog, audited directly against the ERPSys monorepo
 * source (apps/api/src/modules/*, apps/mobile). Counts and "core" vs
 * "early-access" tiers reflect actual implementation depth, not aspiration —
 * update this file alongside real product changes, not marketing copy alone.
 */

export type ModuleTier = 'core' | 'early-access';

export interface ProductModule {
  slug: string;
  label: string;
  desc: string;
  tier: ModuleTier;
  body: string;
}

export const CORE_MODULES: ProductModule[] = [
  { slug: 'finance', label: 'Finance & Accounting', desc: 'GL, AR, AP, multi-currency, budgeting', tier: 'core', body: 'Core general ledger, accounts receivable/payable, multi-currency, and budgeting workflows.' },
  { slug: 'hr', label: 'Human Resources', desc: 'Payroll, leave, performance, attendance', tier: 'core', body: 'Advanced HR covering payroll, leave, performance reviews, and attendance.' },
  { slug: 'crm', label: 'CRM & Sales', desc: 'Pipelines, forecasting, territories', tier: 'core', body: 'Our most mature module — pipelines, sales forecasting, and territory management.' },
  { slug: 'inventory', label: 'Inventory & Warehouse', desc: 'Multi-location, barcode, serial/batch', tier: 'core', body: 'Multi-location inventory with barcode and serial/batch tracking.' },
  { slug: 'procurement', label: 'Procurement', desc: 'RFQ, PO, vendor management', tier: 'core', body: 'RFQ, purchase orders, and vendor management workflows.' },
  { slug: 'supply-chain', label: 'Supply Chain', desc: 'Logistics and distribution', tier: 'core', body: 'Supply chain and logistics coordination across warehouses.' },
  { slug: 'manufacturing', label: 'Manufacturing (MRP)', desc: 'BOM, work orders, quality', tier: 'core', body: 'Bills of materials, work orders, and quality tracking for production.' },
  { slug: 'projects', label: 'Project Management', desc: 'Planning, tracking, budgets', tier: 'core', body: 'Project planning, tracking, and budget management.' },
  { slug: 'analytics', label: 'Analytics & Reporting', desc: 'Dashboards, KPIs, reporting', tier: 'core', body: 'Dashboards, KPI tracking, and cross-module reporting.' },
  { slug: 'ecommerce', label: 'E-Commerce', desc: 'Storefront, cart, checkout', tier: 'core', body: 'Storefront and checkout integration for online sales.' },
  { slug: 'pos', label: 'Point of Sale', desc: 'In-store checkout and receipts', tier: 'core', body: 'Point-of-sale checkout, receipts, and cash management.' },
  { slug: 'billing', label: 'Multi-Tenant Billing', desc: 'Subscriptions, invoicing, plans', tier: 'core', body: 'SaaS subscription billing and invoicing across tenants.' },
  { slug: 'builder', label: 'No-Code Builder', desc: 'Custom forms, workflows, pages', tier: 'core', body: 'Visual builder for custom forms, workflows, and pages without code.' },
  { slug: 'communication', label: 'Communication', desc: 'Notifications, messaging', tier: 'core', body: 'In-app and outbound notification and messaging tools.' },
];

export const EARLY_ACCESS_MODULES: ProductModule[] = [
  { slug: 'documents', label: 'Documents & Drive', desc: 'Templates, approvals (early access)', tier: 'early-access', body: 'Document templates and approval flows — actively being built out.' },
  { slug: 'fixed-assets', label: 'Fixed Assets', desc: 'Asset tracking (early access)', tier: 'early-access', body: 'Fixed asset tracking and depreciation — early access.' },
  { slug: 'workflow', label: 'Workflow Automation', desc: 'Rules engine (early access)', tier: 'early-access', body: 'Cross-module workflow automation — early access.' },
  { slug: 'api-platform', label: 'API Platform', desc: 'REST, webhooks (early access)', tier: 'early-access', body: 'REST API and webhook platform for integrations — early access.' },
];

export const ALL_MODULES = [...CORE_MODULES, ...EARLY_ACCESS_MODULES];

export interface IndustryApp {
  slug: string;
  label: string;
  desc: string;
  body: string;
}

// Healthcare / Education / Real Estate / Field Service exist as standalone
// scaffold services today (4-17 source files, 4-7 data models each) — real,
// but early. "Retail" has no backing module and is intentionally omitted.
export const INDUSTRY_APPS: IndustryApp[] = [
  { slug: 'healthcare', label: 'Healthcare', desc: 'Early access — clinical & scheduling foundations', body: 'A dedicated healthcare service covering clinical events and scheduling. Early access as we build out full EHR/billing depth.' },
  { slug: 'education', label: 'Education', desc: 'Early access — student & campus foundations', body: 'A dedicated education service for student records and campus operations. Early access.' },
  { slug: 'real-estate', label: 'Real Estate', desc: 'Early access — property & lease foundations', body: 'A dedicated real estate service for properties and leases. Early access.' },
  { slug: 'field-service', label: 'Field Service', desc: 'Early access — dispatch foundations', body: 'A dedicated field service module for work orders and dispatch. Early access.' },
];

export const PLATFORMS = [
  { key: 'web', label: 'Web', desc: 'Responsive web app, works on any modern browser.' },
  { key: 'ios', label: 'iOS', desc: 'Native mobile app built with Flutter.' },
  { key: 'android', label: 'Android', desc: 'Native mobile app built with Flutter.' },
];
