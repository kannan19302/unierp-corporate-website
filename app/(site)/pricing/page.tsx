'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Building2, Rocket, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    monthly: 49,
    annual: 39,
    desc: 'Perfect for small teams getting started with ERP fundamentals.',
    color: '#6366f1',
    features: [
      'Up to 10 users',
      'Finance & Accounting',
      'Basic HR & Payroll',
      'CRM (500 contacts)',
      'Inventory (1 warehouse)',
      '5 GB storage',
      'Email support',
      'Community access',
    ],
    cta: 'Start Free Trial',
    ctaHref: '/contact',
  },
  {
    name: 'Professional',
    monthly: 149,
    annual: 119,
    desc: 'For growing businesses that need the full ERP suite.',
    color: '#2563eb',
    popular: true,
    features: [
      'Up to 50 users',
      'All Core ERP Modules',
      'Manufacturing & MRP',
      'Project Management',
      'Unlimited contacts',
      '5 warehouses',
      '50 GB storage',
      'Priority email & chat',
      'API access (10k req/day)',
      'Custom dashboards',
    ],
    cta: 'Start Free Trial',
    ctaHref: '/contact',
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    desc: 'For large organizations with custom needs, multi-entity, and advanced compliance.',
    color: '#7c3aed',
    features: [
      'Unlimited users',
      'All modules included',
      'Multi-entity & multi-currency',
      'Dedicated infrastructure',
      'Unlimited storage',
      'SSO & SAML 2.0',
      'Custom SLA & uptime',
      '24/7 dedicated support',
      'Unlimited API access',
      'On-premise option',
      'Custom integrations',
      'Professional services',
    ],
    cta: 'Contact Sales',
    ctaHref: '/contact?type=enterprise',
  },
];

const FAQS = [
  { q: 'Is there a free trial?', a: 'Yes — all plans include a 30-day free trial with full access to every feature. No credit card required.' },
  { q: 'Can I change my plan later?', a: 'Absolutely. You can upgrade, downgrade, or switch billing cycles at any time. Prorated credits apply immediately.' },
  { q: 'What happens to my data if I cancel?', a: 'Your data is safely exported in standard CSV/JSON formats within 30 days of cancellation. We never delete data without consent.' },
  { q: 'Do you offer discounts for non-profits or education?', a: 'Yes — we offer 50% discounts for verified non-profits, NGOs, and educational institutions. Contact us to verify.' },
  { q: 'Is the pricing per user or per module?', a: 'Per user. All included modules are available to every user on your plan — no per-module fees.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, bank transfers (ACH/SEPA), and can arrange invoicing for Enterprise plans.' },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="page-hero-badge hero-enter">
          <Zap size={13} /> Simple, transparent pricing
        </div>
        <h1 className="hero-enter-delay-1">
          Plans for every team size
        </h1>
        <p className="hero-enter-delay-2">
          Start free, scale as you grow. No hidden fees, no lock-in.
          Every plan includes 30 days free and all core features.
        </p>

        {/* Billing toggle */}
        <div className="hero-enter-delay-3" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div className="toggle-pill">
            <button
              className={`toggle-option ${billing === 'monthly' ? 'toggle-option-active' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-option ${billing === 'annual' ? 'toggle-option-active' : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual <span style={{ fontSize: '0.75rem', marginLeft: '0.25rem', opacity: 0.85 }}>Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="page-section" style={{ paddingTop: '2rem' }}>
        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`pricing-card reveal ${plan.popular ? 'pricing-card-popular' : ''}`}>
              {plan.popular && <div className="pricing-popular-badge">Most Popular</div>}
              <div className="pricing-tier-name">{plan.name}</div>

              {plan.monthly !== null ? (
                <>
                  <div className="pricing-price">
                    <sup>$</sup>
                    {billing === 'annual' ? plan.annual : plan.monthly}
                  </div>
                  <div className="pricing-period">per user / month, billed {billing}</div>
                </>
              ) : (
                <>
                  <div className="pricing-price" style={{ fontSize: '2rem' }}>Custom</div>
                  <div className="pricing-period">tailored to your needs</div>
                </>
              )}

              <p className="pricing-desc">{plan.desc}</p>

              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f} className="pricing-feature">
                    <div className="pricing-feature-check"><Check size={11} /></div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={plan.popular ? 'btn-primary btn-ripple' : 'btn-secondary'}
                style={{ textAlign: 'center', justifyContent: 'center' }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--color-text-subtle)' }}>
          All prices in USD. Sales tax may apply.{' '}
          <Link href="/contact" style={{ color: 'var(--color-primary)' }}>
            Need a custom quote? <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </Link>
        </p>
      </section>

      {/* Feature comparison */}
      <section className="page-section" style={{ background: 'var(--color-surface)', borderRadius: '24px', marginBottom: '3rem', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-title">Compare plans</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="compare-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Feature</th>
                <th>Starter</th>
                <th className="our-col">Professional</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Finance & Accounting', '✓', '✓', '✓'],
                ['HR & Payroll', '✓', '✓', '✓'],
                ['CRM & Sales', '✓', '✓', '✓'],
                ['Inventory Management', 'Basic', '✓', '✓'],
                ['Manufacturing (MRP)', '—', '✓', '✓'],
                ['Project Management', '—', '✓', '✓'],
                ['API Access', '—', '10k/day', 'Unlimited'],
                ['SSO / SAML', '—', '—', '✓'],
                ['Multi-entity', '—', '—', '✓'],
                ['White-label', '—', '—', '✓'],
              ].map(([feature, starter, pro, ent]) => (
                <tr key={feature as string}>
                  <td>{feature}</td>
                  <td className={starter === '—' ? 'compare-cross' : 'compare-check'}>{starter}</td>
                  <td className={`our-col ${pro === '—' ? 'compare-cross' : 'compare-check'}`}>{pro}</td>
                  <td className={ent === '—' ? 'compare-cross' : 'compare-check'}>{ent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/features" className="btn-secondary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
            View full feature comparison <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section" style={{ paddingTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="page-hero-badge" style={{ margin: '0 auto 1rem' }}>
            <HelpCircle size={13} /> Frequently Asked Questions
          </div>
          <div className="section-title">Have questions?</div>
        </div>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <ChevronDown size={18} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              <div className={`faq-answer ${openFaq === i ? 'faq-answer-open' : ''}`}>
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '4rem 1.5rem 6rem' }}>
        <div className="glass-panel cta-glow" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem' }}>
          <Rocket size={36} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Ready to transform your business?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Start your 30-day free trial today. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary btn-ripple">
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=demo" className="btn-secondary">
              <Building2 size={16} /> Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
