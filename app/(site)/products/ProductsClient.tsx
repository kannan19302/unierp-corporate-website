'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/site/anim/PageHero';
import {
  CreditCard, Users, BarChart3, Package, ShoppingCart, Truck,
  Hammer, Briefcase, Activity, ShoppingBag, Store, FileText,
  Heart, GraduationCap, Building2, Wrench, Cpu, Globe, Zap,
  Shield, MessageSquare, Code2, Layers, PieChart, Star, ArrowRight, Search
} from 'lucide-react';

// Module list and tiers audited directly against ERPSys source
// (apps/api/src/modules/*). "sourceFiles" = actual .ts file count per module —
// used instead of invented "feature counts" so the number on screen is checkable.
const ALL_MODULES = [
  // Core ERP
  { icon: CreditCard, name: 'Finance & Accounting', slug: 'finance', desc: 'General ledger, AR/AP, bank reconciliation, budgeting, and multi-currency.', category: 'Core ERP', tier: 'deep', sourceFiles: '141+' },
  { icon: Users, name: 'Human Resources', slug: 'hr', desc: 'Employee records, payroll, leave management, attendance, performance reviews.', category: 'Core ERP', tier: 'deep', sourceFiles: '45+' },
  { icon: BarChart3, name: 'CRM & Sales', slug: 'crm', desc: 'Lead management, opportunity pipeline, forecasting, and customer records.', category: 'Core ERP', tier: 'deep', sourceFiles: '247+' },
  { icon: Package, name: 'Inventory & Warehouse', slug: 'inventory', desc: 'Multi-location stock, barcode tracking, serial & batch tracking.', category: 'Core ERP', tier: 'deep', sourceFiles: '186+' },
  { icon: ShoppingCart, name: 'Procurement', slug: 'procurement', desc: 'RFQ, purchase orders, vendor management, 3-way matching.', category: 'Core ERP', tier: 'deep', sourceFiles: '48+' },
  { icon: Truck, name: 'Supply Chain', slug: 'supply-chain', desc: 'Demand planning, distribution, and carrier coordination.', category: 'Core ERP', tier: 'deep', sourceFiles: '77+' },
  // Advanced
  { icon: Hammer, name: 'Manufacturing (MRP)', slug: 'manufacturing', desc: 'BOM management, work orders, production scheduling, quality control.', category: 'Advanced', tier: 'deep', sourceFiles: '34+' },
  { icon: Briefcase, name: 'Project Management', slug: 'projects', desc: 'Planning, tracking, resource management, and budgets.', category: 'Advanced', tier: 'deep', sourceFiles: '35+' },
  { icon: MessageSquare, name: 'Communication Hub', slug: 'communication', desc: 'In-app messaging, notifications, and announcements.', category: 'Advanced', tier: 'deep', sourceFiles: '36+' },
  { icon: Code2, name: 'Visual Page Builder', slug: 'builder', desc: 'No-code page editor, custom forms, and workflow building blocks.', category: 'Advanced', tier: 'deep', sourceFiles: '50+' },
  { icon: PieChart, name: 'Analytics & BI', slug: 'analytics', desc: 'Real-time dashboards, KPI tracking, and cross-module reporting.', category: 'Advanced', tier: 'deep', sourceFiles: '36+' },
  { icon: ShoppingBag, name: 'E-Commerce', slug: 'ecommerce', desc: 'Online storefront, cart & checkout, and order management.', category: 'Advanced', tier: 'functional', sourceFiles: '23+' },
  { icon: Store, name: 'Point of Sale', slug: 'pos', desc: 'In-store checkout, receipts, and cash management.', category: 'Advanced', tier: 'functional', sourceFiles: '18+' },
  { icon: FileText, name: 'Documents & Drive', slug: 'documents', desc: 'Document templates and approval workflows.', category: 'Advanced', tier: 'early-access', sourceFiles: '11+' },
  // SaaS & Platform
  { icon: Layers, name: 'SaaS Billing', slug: 'saas', desc: 'Multi-tenant subscription billing and plan management.', category: 'Platform', tier: 'deep', sourceFiles: '154+' },
  { icon: Cpu, name: 'API Platform', slug: 'api-platform', desc: 'REST APIs and webhooks for integrations.', category: 'Platform', tier: 'early-access', sourceFiles: '10+' },
  { icon: Shield, name: 'Authentication', slug: 'auth', desc: 'Session management, RBAC, and multi-tenant access control.', category: 'Platform', tier: 'functional', sourceFiles: '22+' },
  { icon: Zap, name: 'Workflow Engine', slug: 'workflow', desc: 'Cross-module workflow automation rules.', category: 'Platform', tier: 'early-access', sourceFiles: '12+' },
  // Industry (early access)
  { icon: Heart, name: 'Healthcare', slug: 'healthcare', desc: 'Early-access clinical and scheduling foundations.', category: 'Industry', tier: 'early-access', sourceFiles: '24+' },
  { icon: GraduationCap, name: 'Education', slug: 'education', desc: 'Early-access student and campus foundations.', category: 'Industry', tier: 'early-access', sourceFiles: '26+' },
  { icon: Building2, name: 'Real Estate', slug: 'real-estate', desc: 'Early-access property and lease foundations.', category: 'Industry', tier: 'early-access', sourceFiles: '20+' },
  { icon: Wrench, name: 'Field Service', slug: 'field-service', desc: 'Early-access dispatch and work order foundations.', category: 'Industry', tier: 'early-access', sourceFiles: '20+' },
  { icon: Activity, name: 'Notifications', slug: 'notifications', desc: 'Email, SMS, push, and in-app notifications.', category: 'Platform', tier: 'functional', sourceFiles: '20+' },
  { icon: Star, name: 'Reporting Engine', slug: 'reporting', desc: 'Custom report building and scheduled exports.', category: 'Advanced', tier: 'functional', sourceFiles: '32+' },
  { icon: Globe, name: 'Marketplace', slug: 'marketplace', desc: 'Install third-party apps and integrations.', category: 'Platform', tier: 'functional', sourceFiles: '21+' },
];

const CATEGORIES = ['All', 'Core ERP', 'Advanced', 'Industry', 'Platform'];

const TIER_MAP: Record<string, string> = {
  deep: 'CORE',
  functional: 'FUNCTIONAL',
  'early-access': 'EARLY ACCESS',
};

const TIER_BADGE: Record<string, string> = {
  deep: 'badge-deep',
  functional: 'badge-functional',
  'early-access': 'badge-early-access',
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
      <PageHero
        eyebrow={<><Layers size={13} /> {ALL_MODULES.length} Modules — Core &amp; Early Access</>}
        title={<>Every tool your business needs,<br /><span className="cosmic-text">in one unified platform</span></>}
        sub={
          <>
            Finance, HR, CRM, Inventory, Manufacturing, Projects, Supply Chain, and more.
            Install only what you need — all modules share one database, one login.
            Modules marked <strong>Early Access</strong> are newer and actively being built out.
          </>
        }
      />

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
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)' }}>{m.sourceFiles} source files</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '3rem 1.5rem 6rem' }}>
        <div className="hologram hologram-sheen" style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem' }}>
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
