'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard, Users, BarChart3, Package, ShoppingCart, Truck,
  Hammer, Briefcase, Activity, ShoppingBag, Store, FileText,
  Heart, GraduationCap, Building2, Wrench, Cpu, Globe, Zap,
  Shield, MessageSquare, Code2, Layers, PieChart, Star, ArrowRight, Search
} from 'lucide-react';

const ALL_MODULES = [
  // Core ERP
  { icon: CreditCard, name: 'Finance & Accounting', slug: 'finance', desc: 'General ledger, AR/AP, bank reconciliation, budgeting, multi-currency, tax compliance, cash flow forecasting, and advanced financial reporting.', category: 'Core ERP', tier: 'deep', features: '1,634+' },
  { icon: Users, name: 'Human Resources', slug: 'hr', desc: 'Employee records, payroll, leave management, attendance, performance reviews, recruitment pipeline, and org chart.', category: 'Core ERP', tier: 'deep', features: '1,521+' },
  { icon: BarChart3, name: 'CRM & Sales', slug: 'crm', desc: 'Lead management, opportunity pipeline, CPQ, commissions, territory management, forecasting, and 360° customer view.', category: 'Core ERP', tier: 'deep', features: '1,508+' },
  { icon: Package, name: 'Inventory & Warehouse', slug: 'inventory', desc: 'Multi-location stock, barcode/RFID, serial & batch tracking, cycle counting, replenishment rules, and 3PL integration.', category: 'Core ERP', tier: 'deep', features: '1,588+' },
  { icon: ShoppingCart, name: 'Procurement', slug: 'procurement', desc: 'RFQ, purchase orders, vendor management, 3-way matching, blanket orders, and spend analytics.', category: 'Core ERP', tier: 'deep', features: '1,530+' },
  { icon: Truck, name: 'Supply Chain', slug: 'supply-chain', desc: 'Demand planning, DRP, container tracking, ASN, cross-docking, carrier management, and route optimization.', category: 'Core ERP', tier: 'deep', features: '1,541+' },
  // Advanced
  { icon: Hammer, name: 'Manufacturing (MRP)', slug: 'manufacturing', desc: 'BOM management, work orders, production scheduling, quality control, scrap tracking, and shop-floor control.', category: 'Advanced', tier: 'deep', features: '1,507+' },
  { icon: Briefcase, name: 'Project Management', slug: 'projects', desc: 'Gantt charts, Agile/Scrum, EVM, resource management, CAPEX tracking, claims & changes, and PMO dashboards.', category: 'Advanced', tier: 'deep', features: '1,506+' },
  { icon: MessageSquare, name: 'Communication Hub', slug: 'communication', desc: 'Unified inbox, team messaging, video calls, document collaboration, announcements, and notification center.', category: 'Advanced', tier: 'deep', features: '1,511+' },
  { icon: Code2, name: 'Visual Page Builder', slug: 'builder', desc: 'Drag-and-drop page editor, custom widgets, form builder, workflow automation, and low-code app creation.', category: 'Advanced', tier: 'deep', features: '1,518+' },
  { icon: PieChart, name: 'Analytics & BI', slug: 'analytics', desc: 'Real-time dashboards, KPI tracking, predictive analytics, custom reports, and data export to Excel/CSV.', category: 'Advanced', tier: 'functional', features: '63+' },
  { icon: ShoppingBag, name: 'E-Commerce', slug: 'ecommerce', desc: 'Online storefront, product catalog, cart & checkout, Stripe payments, promotions, and order management.', category: 'Advanced', tier: 'functional', features: '70+' },
  { icon: Store, name: 'Point of Sale', slug: 'pos', desc: 'Offline-first POS, cash management, receipt printing, barcode scanning, split payments, and customer loyalty.', category: 'Advanced', tier: 'functional', features: '115+' },
  { icon: FileText, name: 'Documents & Drive', slug: 'documents', desc: 'Document templates, e-signatures, version control, OCR, approval workflows, and cloud file storage.', category: 'Advanced', tier: 'functional', features: '41+' },
  // SaaS & Platform
  { icon: Layers, name: 'SaaS Portal', slug: 'saas', desc: 'Multi-tenant management, plan billing, usage metering, tenant analytics, SSO, and white-label branding.', category: 'Platform', tier: 'deep', features: '1,517+' },
  { icon: Cpu, name: 'API Platform', slug: 'api-platform', desc: 'REST APIs, webhook subscriptions, API keys, rate limiting, developer portal, and third-party integrations.', category: 'Platform', tier: 'functional', features: '19+' },
  { icon: Shield, name: 'Authentication', slug: 'auth', desc: 'SSO, SAML 2.0, OAuth, MFA, session management, RBAC, and GDPR erasure.', category: 'Platform', tier: 'functional', features: '52+' },
  { icon: Zap, name: 'Workflow Engine', slug: 'workflow', desc: 'Visual workflow builder, approval chains, SLA timers, conditional branching, and audit logs.', category: 'Platform', tier: 'functional', features: '31+' },
  // Industry
  { icon: Heart, name: 'Healthcare', slug: 'healthcare', desc: 'Patient records, appointment scheduling, pharmacy management, insurance billing, and clinical notes.', category: 'Industry', tier: 'functional', features: '90+' },
  { icon: GraduationCap, name: 'Education', slug: 'education', desc: 'Student enrollment, grade management, timetable scheduling, library catalog, and fee management.', category: 'Industry', tier: 'functional', features: '95+' },
  { icon: Building2, name: 'Real Estate', slug: 'real-estate', desc: 'Property listings, lease management, tenant CRM, maintenance requests, and REIT portfolio analytics.', category: 'Industry', tier: 'functional', features: '118+' },
  { icon: Wrench, name: 'Field Service', slug: 'field-service', desc: 'Work order management, crew dispatch, mobile app, service contracts, and SLA tracking.', category: 'Industry', tier: 'functional', features: '108+' },
  { icon: Globe, name: 'Localization', slug: 'localization', desc: 'Multi-language UI, regional date/number formats, VAT/GST compliance, and locale-specific workflows.', category: 'Platform', tier: 'functional', features: '20+' },
  { icon: Activity, name: 'Notifications', slug: 'notifications', desc: 'Email, SMS, push, in-app, and webhook notifications with templates and delivery tracking.', category: 'Platform', tier: 'functional', features: '25+' },
  { icon: Star, name: 'Reporting Engine', slug: 'reporting', desc: 'Custom report builder, scheduled exports, data visualization, and embed-ready charts.', category: 'Advanced', tier: 'functional', features: '30+' },
  { icon: Globe, name: 'Marketplace', slug: 'marketplace', desc: 'Install third-party apps, community modules, and integrations directly from the app store.', category: 'Platform', tier: 'functional', features: '62+' },
];

const CATEGORIES = ['All', 'Core ERP', 'Advanced', 'Industry', 'Platform'];

const TIER_MAP: Record<string, string> = {
  deep: 'DEEP',
  complete: 'COMPLETE',
  advanced: 'ADVANCED',
  functional: 'FUNCTIONAL',
  competitive: 'COMPETITIVE',
};

const TIER_BADGE: Record<string, string> = {
  deep: 'badge-deep',
  complete: 'badge-complete',
  advanced: 'badge-advanced',
  functional: 'badge-functional',
  competitive: 'badge-functional',
};

const MODULE_COLORS: Record<string, string> = {
  'Core ERP': 'rgba(37,99,235,0.12)',
  'Advanced': 'rgba(79,70,229,0.12)',
  'Industry': 'rgba(5,150,105,0.12)',
  'Platform': 'rgba(124,58,237,0.12)',
};

const MODULE_ICON_COLORS: Record<string, string> = {
  'Core ERP': '#2563eb',
  'Advanced': '#4f46e5',
  'Industry': '#059669',
  'Platform': '#7c3aed',
};

export function ProductsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = ALL_MODULES.filter((m) => {
    const matchCat = activeCategory === 'All' || m.category === activeCategory;
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="page-hero-badge hero-enter"><Layers size={13} /> 45+ Enterprise Modules</div>
        <h1 className="hero-enter-delay-1">
          Every tool your business needs,<br />
          <span className="text-gradient">in one unified platform</span>
        </h1>
        <p className="hero-enter-delay-2">
          Finance, HR, CRM, Inventory, Manufacturing, Projects, Supply Chain, and more.
          Install only what you need — all modules share one database, one login.
        </p>
      </section>

      {/* Filter + search */}
      <section className="page-section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`toggle-option ${activeCategory === cat ? 'toggle-option-active' : ''}`}
                style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="help-search" style={{ margin: 0, width: '280px' }}>
            <Search size={16} className="help-search-icon" />
            <input
              className="help-search-input"
              placeholder="Search modules…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '0.55rem 0.9rem 0.55rem 2.5rem', borderRadius: '9px' }}
            />
          </div>
        </div>

        {/* Results count */}
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', marginBottom: '1.5rem' }}>
          Showing {filtered.length} of {ALL_MODULES.length} modules
        </p>

        {/* Grid */}
        <div className="module-grid">
          {filtered.map((m) => (
            <Link key={m.slug} href={`/products/${m.slug}`} className="module-card reveal">
              <div className="module-card-icon" style={{ background: MODULE_COLORS[m.category] }}>
                <m.icon size={20} color={MODULE_ICON_COLORS[m.category]} />
              </div>
              <div>
                <div className="module-card-name">{m.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)', marginTop: '0.15rem' }}>{m.category}</div>
              </div>
              <div className="module-card-desc">{m.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`module-status-badge ${TIER_BADGE[m.tier]}`}>{TIER_MAP[m.tier]}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)' }}>{m.features} features</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '3rem 1.5rem 6rem' }}>
        <div className="glass-panel cta-glow" style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Not sure which modules you need?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Our team will help you identify the right modules for your industry and team size.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=demo" className="btn-primary btn-ripple">
              Schedule a Demo <ArrowRight size={15} />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
