'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  CheckCircle2,
  Building2,
  Zap,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

const STORIES = [
  {
    company: 'Havells India',
    industry: 'Electrical Equipment & Manufacturing',
    metric: '60% Faster',
    metricLabel: 'Month-End Closing Speed',
    quote: 'UniERP helped us reduce our month-end closing time by 60% and improved overall visibility across our multi-entity operations.',
    author: 'Ravi Sharma',
    role: 'CFO, Havells India',
    avatar: 'RS',
  },
  {
    company: 'Metamorph Dynamics',
    industry: 'Technology & Digital Transformation',
    metric: '4.2x Faster',
    metricLabel: 'Cross-Functional Adoption',
    quote: 'The platform is powerful yet remarkably easy to use. Our operations, finance, and engineering teams adopted it in just a few days.',
    author: 'Neha Patel',
    role: 'COO, Metamorph',
    avatar: 'NP',
  },
  {
    company: 'SAI Exports',
    industry: 'Global Supply Chain & Trading',
    metric: '100% Exact',
    metricLabel: 'Multi-Currency Reconciliation',
    quote: 'From sales to inventory to finance, everything is now seamlessly connected. It was the single best operational decision for our growing business.',
    author: 'Arun Kumar',
    role: 'Managing Director, SAI Exports',
    avatar: 'AK',
  },
  {
    company: 'Apex BioPharma',
    industry: 'Healthcare & Life Sciences',
    metric: 'Zero Gaps',
    metricLabel: 'Regulatory Audit Readiness',
    quote: 'With PostgreSQL RLS partitions and automatic batch traceability, our FDA compliance audits went from weeks of stress to instant automated reports.',
    author: 'Dr. Sanjay Sen',
    role: 'Head of Quality Assurance, Apex BioPharma',
    avatar: 'SS',
  },
  {
    company: 'UrbanRetail Hub',
    industry: 'Retail & Omnichannel POS',
    metric: '< 50ms',
    metricLabel: 'Offline Register Checkout',
    quote: 'The offline-first register network kept our 45 store locations running without a glitch during a major internet outage. Invaluable reliability.',
    author: 'Priya Iyer',
    role: 'VP of Retail Operations, UrbanRetail',
    avatar: 'PI',
  },
  {
    company: 'Vanguard Engineering',
    industry: 'Industrial Infrastructure',
    metric: '98.8%',
    metricLabel: 'On-Time Project Delivery',
    quote: 'Earned value management and milestone timesheet billing saved us hundreds of manual administrative hours every quarter.',
    author: 'Vikram Mehta',
    role: 'Director of PMO, Vanguard',
    avatar: 'VM',
  },
];

export default function CustomersPage() {
  useAnalytics('/customers');

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. HERO ═══ */}
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
          <Users size={13} />
          <span>Customer Success Stories</span>
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
          Loved by businesses.<br />
          <span style={{ color: '#2563eb' }}>Proven by results.</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Discover how enterprises streamline finance, automate supply chains, and scale operations with UniERP.
        </p>
      </section>

      {/* ═══ 2. CASE STUDY CARDS ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '1rem 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
          {STORIES.map((s) => (
            <div
              key={s.company}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: 'var(--glass-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
                    {s.industry}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>
                    {s.metric}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.25rem' }}>
                  {s.company}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginBottom: '1.25rem' }}>
                  {s.metricLabel}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 1.5rem' }}>
                  &ldquo;{s.quote}&rdquo;
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-card-border)' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {s.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-text-main)' }}>{s.author}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{s.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. FINAL CUSTOMER CTA ═══ */}
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
            Become our next enterprise success story
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Start your 30-day free trial or talk with our solutions architects to see how UniERP scales your business.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-royal-white">
              <span>Start 30-Day Free Trial</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=demo" className="btn-royal-outline">
              <span>Talk to Sales</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
