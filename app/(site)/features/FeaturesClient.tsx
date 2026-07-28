'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Check, X, Shield, Cpu, Zap, Search } from 'lucide-react';

const MODULES = [
  {
    name: 'Finance & Accounting',
    features: [
      { name: 'General Ledger', ent: true, pro: true, starter: true },
      { name: 'Accounts Payable & Receivable', ent: true, pro: true, starter: true },
      { name: 'Bank Reconciliation', ent: true, pro: true, starter: true },
      { name: 'Tax Engine (VAT, GST, Sales Tax)', ent: true, pro: true, starter: true },
      { name: 'Multi-Currency & Exchange Rates', ent: true, pro: true, starter: false },
      { name: 'Budgeting & Forecasting', ent: true, pro: true, starter: false },
      { name: 'Fixed Assets Management', ent: true, pro: true, starter: false },
      { name: 'Multi-Entity Consolidation', ent: true, pro: false, starter: false },
      { name: 'IFRS & GAAP Compliance', ent: true, pro: false, starter: false },
    ]
  },
  {
    name: 'Human Resources',
    features: [
      { name: 'Employee Profiles & Directory', ent: true, pro: true, starter: true },
      { name: 'Time off & Leave Management', ent: true, pro: true, starter: true },
      { name: 'Basic Payroll', ent: true, pro: true, starter: true },
      { name: 'Benefits Administration', ent: true, pro: true, starter: false },
      { name: 'Performance Appraisals', ent: true, pro: true, starter: false },
      { name: 'Recruitment (ATS)', ent: true, pro: true, starter: false },
      { name: 'Shift & Roster Scheduling', ent: true, pro: true, starter: false },
      { name: 'Advanced Global Payroll', ent: true, pro: false, starter: false },
      { name: 'Contractor Management', ent: true, pro: false, starter: false },
    ]
  },
  {
    name: 'CRM & Sales',
    features: [
      { name: 'Lead & Contact Management', ent: true, pro: true, starter: true },
      { name: 'Sales Pipeline (Kanban)', ent: true, pro: true, starter: true },
      { name: 'Quotes & Invoices', ent: true, pro: true, starter: true },
      { name: 'Email Integration', ent: true, pro: true, starter: false },
      { name: 'Sales Forecasting', ent: true, pro: true, starter: false },
      { name: 'Territory Management', ent: true, pro: false, starter: false },
      { name: 'CPQ (Configure Price Quote)', ent: true, pro: false, starter: false },
      { name: 'Sales Commissions Engine', ent: true, pro: false, starter: false },
    ]
  },
  {
    name: 'Platform & Security',
    features: [
      { name: 'Data Export (CSV/JSON)', ent: true, pro: true, starter: true },
      { name: '2FA / Authenticator App', ent: true, pro: true, starter: true },
      { name: 'REST API Access', ent: 'Unlimited', pro: '10k req/day', starter: false },
      { name: 'Webhooks', ent: true, pro: true, starter: false },
      { name: 'Custom User Roles (RBAC)', ent: true, pro: true, starter: false },
      { name: 'SSO (SAML 2.0 / OIDC)', ent: true, pro: false, starter: false },
      { name: 'Audit Logs (HIPAA/SOC2)', ent: '7 years', pro: '90 days', starter: false },
      { name: 'Custom Domain & White-label', ent: true, pro: false, starter: false },
      { name: 'Dedicated Infrastructure', ent: true, pro: false, starter: false },
    ]
  }
];

export function FeaturesClient() {
  const [search, setSearch] = useState('');

  const filteredModules = MODULES.map(m => ({
    ...m,
    features: m.features.filter(f => 
      !search || 
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      m.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(m => m.features.length > 0);

  return (
    <div>
      <section className="page-hero" style={{ paddingBottom: '2rem' }}>
        <div className="page-hero-badge hero-enter"><Layers size={13} /> Capability Matrix</div>
        <h1 className="hero-enter-delay-1">Compare all features</h1>
        <p className="hero-enter-delay-2">
          A deep dive into exactly what&apos;s included in each UniERP plan.
        </p>

        <div className="help-search hero-enter-delay-3" style={{ marginTop: '2rem' }}>
          <Search size={18} className="help-search-icon" />
          <input
            type="search"
            className="help-search-input"
            placeholder="Search for a specific feature..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: '1rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="compare-table" style={{ width: '100%', minWidth: '800px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', width: '40%' }}>Feature Area</th>
                <th style={{ width: '20%' }}>Starter</th>
                <th className="our-col" style={{ width: '20%' }}>Professional</th>
                <th style={{ width: '20%' }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((mod, modIdx) => (
                <React.Fragment key={mod.name}>
                  {/* Category Header */}
                  <tr>
                    <td colSpan={4} style={{ 
                      textAlign: 'left', background: 'var(--color-surface)', 
                      fontWeight: 800, padding: '1.25rem 1rem 0.75rem',
                      color: 'var(--color-text-main)', borderTop: modIdx > 0 ? '2px solid var(--glass-border)' : 'none'
                    }}>
                      {mod.name}
                    </td>
                  </tr>
                  
                  {/* Features */}
                  {mod.features.map(f => (
                    <tr key={f.name}>
                      <td style={{ paddingLeft: '2rem' }}>{f.name}</td>
                      <td className={f.starter ? 'compare-check' : 'compare-cross'}>
                        {typeof f.starter === 'boolean' ? (f.starter ? <Check size={18} className="mx-auto" /> : <X size={18} className="mx-auto" />) : f.starter}
                      </td>
                      <td className={`our-col ${f.pro ? 'compare-check' : 'compare-cross'}`}>
                        {typeof f.pro === 'boolean' ? (f.pro ? <Check size={18} className="mx-auto" /> : <X size={18} className="mx-auto" />) : f.pro}
                      </td>
                      <td className={f.ent ? 'compare-check' : 'compare-cross'}>
                        {typeof f.ent === 'boolean' ? (f.ent ? <Check size={18} className="mx-auto" /> : <X size={18} className="mx-auto" />) : f.ent}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Security Teaser */}
      <section className="page-section" style={{ paddingTop: '2rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div className="page-hero-badge" style={{ marginBottom: '1rem' }}><Shield size={13} /> Enterprise Security</div>
            <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Bank-grade security on every plan</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              We don't compromise on security. All plans include AES-256 encryption at rest, TLS 1.3 in transit, and daily automated backups. Enterprise plans unlock advanced compliance and residency options.
            </p>
            <Link href="/security" className="btn-secondary">
              View security practices
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {['SOC 2 Type II', 'GDPR Compliant', 'HIPAA Ready', 'ISO 27001', 'Data Residency', 'Role-Based Access'].map(b => (
              <div key={b} style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                <Check size={16} color="var(--color-primary)" /> {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '2rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '1rem' }}>
            Don't see a specific feature?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            UniERP is highly extensible. Our Marketplace has hundreds of community apps, or you can build your own using our API and Visual Workflow builder.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/marketplace" className="btn-secondary">Explore Marketplace</Link>
            <Link href="/docs/api" className="btn-secondary"><Cpu size={15} /> API Reference</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
