'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Zap,
  Building2,
  Rocket,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Shield,
  Layers,
  Activity,
  Globe,
  Sparkles,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

const CURRENCIES = {
  INR: { symbol: '₹', mult: 1, standard: { annual: 999, monthly: 1249 }, pro: { annual: 1999, monthly: 2499 } },
  USD: { symbol: '$', mult: 0.012, standard: { annual: 39, monthly: 49 }, pro: { annual: 89, monthly: 109 } },
  EUR: { symbol: '€', mult: 0.011, standard: { annual: 35, monthly: 45 }, pro: { annual: 82, monthly: 99 } },
  GBP: { symbol: '£', mult: 0.0095, standard: { annual: 29, monthly: 39 }, pro: { annual: 69, monthly: 85 } },
};

const FEATURE_COMPARISON = [
  {
    category: 'Core Modules',
    features: [
      { name: 'Finance & Accounting (GL, AR, AP)', standard: true, pro: true, enterprise: true },
      { name: 'CRM & Lead Pipeline', standard: true, pro: true, enterprise: true },
      { name: 'Inventory & Warehouse Management', standard: true, pro: true, enterprise: true },
      { name: 'HR & Payroll Management', standard: 'Up to 25 employees', pro: 'Unlimited', enterprise: 'Unlimited + Global' },
      { name: 'Manufacturing & MRP II', standard: false, pro: true, enterprise: true },
      { name: 'Projects & Timesheets', standard: false, pro: true, enterprise: true },
      { name: 'Point of Sale (POS)', standard: false, pro: true, enterprise: true },
    ],
  },
  {
    category: 'Workflows & Automation',
    features: [
      { name: 'Visual Workflow Builder', standard: '5 Workflows', pro: 'Unlimited', enterprise: 'Unlimited + Custom DAGs' },
      { name: 'Automated 3-Way Matching', standard: false, pro: true, enterprise: true },
      { name: 'Email & In-App Alerts', standard: true, pro: true, enterprise: true },
      { name: 'Multi-Sig Approval Chains', standard: false, pro: true, enterprise: true },
    ],
  },
  {
    category: 'Platform, Security & Infrastructure',
    features: [
      { name: 'PostgreSQL RLS Multi-Tenant Mesh', standard: true, pro: true, enterprise: true },
      { name: 'Single Sign-On (SSO / OIDC / SAML 2.0)', standard: false, pro: false, enterprise: true },
      { name: 'Dedicated VPC / On-Premise Helm Chart', standard: false, pro: false, enterprise: true },
      { name: 'Audit Trail Retention', standard: '30 Days', pro: '1 Year', enterprise: '7 Years / Unlimited' },
      { name: 'REST API & Webhooks', standard: '1,000 req/day', pro: '50,000 req/day', enterprise: 'Unlimited' },
      { name: 'Uptime SLA Guarantee', standard: '99.9%', pro: '99.95%', enterprise: '99.999% Guaranteed' },
    ],
  },
  {
    category: 'Support & Success',
    features: [
      { name: 'Community & Documentation', standard: true, pro: true, enterprise: true },
      { name: 'Email & Chat Support', standard: 'Standard (24h)', pro: 'Priority (4h)', enterprise: '24/7 Dedicated (15m SLA)' },
      { name: 'Dedicated Solutions Architect', standard: false, pro: false, enterprise: true },
      { name: 'Custom ERP Data Migration', standard: false, pro: 'Assisted', enterprise: 'Full White-Glove' },
    ],
  },
];

const FAQS = [
  { q: 'How does the 30-day free trial work?', a: 'All plans include 30 days full access with no credit card required. You get access to all core modules and can invite your entire team immediately.' },
  { q: 'Can I change my plan or user count later?', a: 'Yes. You can upgrade, downgrade, add seats, or remove seats at any time. Prorated credits apply automatically to your billing statement.' },
  { q: 'What happens to my data if I cancel?', a: 'Your data belongs to you. You can export complete PostgreSQL partitions, CSVs, and JSON schemas at any time without vendor lock-in.' },
  { q: 'Do you offer non-profit or education discounts?', a: 'Yes! We offer a 50% discount for verified non-profit organizations, NGOs, and accredited educational institutions.' },
  { q: 'Can we deploy UniERP on our own cloud infrastructure?', a: 'Yes. Enterprise customers can choose our private AWS/GCP/Azure dedicated VPC deployment or self-host with our Kubernetes Helm charts.' },
];

export default function PricingPage() {
  useAnalytics('/pricing');
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const curr = CURRENCIES[currency];
  const standardPrice = billing === 'annual' ? curr.standard.annual : curr.standard.monthly;
  const proPrice = billing === 'annual' ? curr.pro.annual : curr.pro.monthly;

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. PRICING HERO ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4.5rem 1.5rem 3rem', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(37, 99, 235, 0.08)',
            color: '#2563eb',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          <Zap size={13} />
          <span>Simple, transparent enterprise pricing</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.85rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.035em',
            margin: '0 0 1rem',
            color: 'var(--color-text-main)',
          }}
        >
          Plans for every <span style={{ color: '#2563eb' }}>stage of growth</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Start with a 30-day free trial. Full access to enterprise capabilities with zero lock-in and no credit card required.
        </p>

        {/* Currency & Billing Toggles */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Monthly / Annual Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-card-border)',
              borderRadius: '9999px',
              padding: '0.25rem',
            }}
          >
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                background: billing === 'monthly' ? '#2563eb' : 'transparent',
                color: billing === 'monthly' ? '#ffffff' : 'var(--color-text-muted)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling('annual')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                background: billing === 'annual' ? '#2563eb' : 'transparent',
                color: billing === 'annual' ? '#ffffff' : 'var(--color-text-muted)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>Annual</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  background: billing === 'annual' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(16, 185, 129, 0.15)',
                  color: billing === 'annual' ? '#ffffff' : '#059669',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                }}
              >
                Save 20%
              </span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-card-border)',
              borderRadius: '9999px',
              padding: '0.25rem',
            }}
          >
            {(['INR', 'USD', 'EUR', 'GBP'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: currency === c ? 'var(--color-brand-navy)' : 'transparent',
                  color: currency === c ? 'var(--color-surface)' : 'var(--color-text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2. PRICING CARDS ═══ */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div className="ref-pricing-grid">
          {/* Standard Card */}
          <div className="ref-pricing-card">
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
              Standard
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              For small teams getting started with ERP fundamentals.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text-main)' }}>
                {curr.symbol}{standardPrice}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', marginLeft: '4px' }}>
                /user/month
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                {billing === 'annual' ? 'billed annually' : 'billed monthly'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
              {['Core ERP Modules', 'Up to 5 Users', 'Standard Financial Reports', 'Email Support', '30-Day Free Trial'].map((feat) => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                  <Check size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Link
              href="/register?plan=standard"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '10px',
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                border: '1.5px solid var(--color-card-border)',
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              Start Free (30 Days)
            </Link>
          </div>

          {/* Professional Card (Most Popular) */}
          <div className="ref-pricing-card popular">
            <div
              style={{
                position: 'absolute',
                top: '-13px',
                right: '24px',
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.25rem 0.85rem',
                borderRadius: '9999px',
                letterSpacing: '0.05em',
              }}
            >
              Most Popular
            </div>

            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
              Professional
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              For growing businesses that need full automation and advanced modules.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text-main)' }}>
                {curr.symbol}{proPrice}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', marginLeft: '4px' }}>
                /user/month
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                {billing === 'annual' ? 'billed annually' : 'billed monthly'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
              {[
                'All Standard Features',
                'Manufacturing & MRP II',
                'Visual Workflow Automation',
                'Advanced BI Dashboards',
                'Priority 4h Support',
                '30-Day Free Trial',
              ].map((feat) => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                  <Check size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Link
              href="/register?plan=pro"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '10px',
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
              }}
            >
              Start Free (30 Days)
            </Link>
          </div>

          {/* Enterprise Card */}
          <div className="ref-pricing-card">
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
              Enterprise
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              For large organizations with complex multi-entity and dedicated compliance needs.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text-main)' }}>
                Custom
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                tailored enterprise SLA &amp; deployment
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
              {[
                'Unlimited Users & Tenants',
                'Dedicated VPC / On-Premise',
                'SAML 2.0 & OIDC SSO',
                '24/7 Dedicated Support & SLA',
                'White-Glove Migration Services',
              ].map((feat) => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                  <Check size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact?type=enterprise"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '10px',
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                border: '1.5px solid var(--color-card-border)',
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 3. DETAILED FEATURE COMPARISON TABLE ═══ */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem' }}>
            Compare All Features
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
            Detailed breakdown of capabilities across all tiers.
          </p>
        </div>

        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-card-border)',
            borderRadius: '18px',
            boxShadow: 'var(--glass-shadow)',
            position: 'relative',
          }}
        >
          {/* Table Header (Sticky) */}
          <div
            style={{
              position: 'sticky',
              top: '72px',
              zIndex: 20,
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '1.25rem 1.5rem',
              background: 'var(--color-surface)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--color-card-border)',
              borderTopLeftRadius: '17px',
              borderTopRightRadius: '17px',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: 'var(--color-text-main)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            }}
          >
            <span>Feature / Capability</span>
            <span style={{ textAlign: 'center' }}>Standard</span>
            <span style={{ textAlign: 'center', color: '#2563eb' }}>Professional</span>
            <span style={{ textAlign: 'center' }}>Enterprise</span>
          </div>

          {/* Table Categories */}
          {FEATURE_COMPARISON.map((cat) => (
            <div key={cat.category}>
              <div
                style={{
                  padding: '0.85rem 1.5rem',
                  background: 'var(--color-surface-hover)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#2563eb',
                  borderBottom: '1px solid var(--color-card-border)',
                }}
              >
                {cat.category}
              </div>

              {cat.features.map((row, idx) => (
                <div
                  key={row.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--color-card-border)',
                    fontSize: '0.88rem',
                    color: 'var(--color-text-main)',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{row.name}</span>

                  <div style={{ textAlign: 'center' }}>
                    {typeof row.standard === 'boolean' ? (
                      row.standard ? <Check size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <span style={{ color: 'var(--color-text-subtle)' }}>—</span>
                    ) : (
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{row.standard}</span>
                    )}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check size={18} color="#2563eb" style={{ margin: '0 auto' }} /> : <span style={{ color: 'var(--color-text-subtle)' }}>—</span>
                    ) : (
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563eb' }}>{row.pro}</span>
                    )}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    {typeof row.enterprise === 'boolean' ? (
                      row.enterprise ? <Check size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <span style={{ color: 'var(--color-text-subtle)' }}>—</span>
                    ) : (
                      <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{row.enterprise}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 4. PRICING FAQ ═══ */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Everything you need to know about our pricing and licensing.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                style={{
                  borderRadius: '12px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-card-border)',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-text-main)',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                      color: 'var(--color-text-subtle)',
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 5. FINAL ROYAL BLUE CTA ═══ */}
      <section style={{ padding: '0 1.5rem 6rem' }}>
        <div className="ref-royal-cta">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              margin: '0 0 1rem',
              color: '#ffffff',
            }}
          >
            Start your 30-day free trial today
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Deploy your dedicated multi-tenant workspace in under 60 seconds with full access to all 40+ modules.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-royal-white">
              <span>Start 30-Day Free Trial</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=enterprise" className="btn-royal-outline">
              <span>Book Enterprise Demo</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
