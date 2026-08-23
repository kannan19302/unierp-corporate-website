'use client';

import React from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  ArrowRight,
  TrendingDown,
  Clock,
  Shield,
  Zap,
  Layers,
  Sparkles,
  Database,
  Building2,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

interface CompareData {
  competitor: string;
  competitorName: string;
  headline: string;
  subheadline: string;
  keyTakeaway: string;
  tco3Year: { unierp: string; competitor: string; savings: string };
  migrationTimeline: string;
  features: {
    category: string;
    items: { name: string; unierp: boolean | string; competitor: boolean | string; note?: string }[];
  }[];
}

export function CompareClient({ data }: { data: CompareData }) {
  useAnalytics(`/compare/${data.competitor}`);

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. HERO ═══ */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4.5rem 1.5rem 3rem', textAlign: 'center' }}>
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
          <Layers size={13} />
          <span>Enterprise Comparison Guide</span>
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
          UniERP vs <span style={{ color: '#2563eb' }}>{data.competitorName}</span>
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          {data.headline}. {data.subheadline}
        </p>

        {/* 3-Year TCO Summary Banner */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '2rem 2.5rem',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>UniERP 3-Year TCO</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#10b981', marginTop: '4px' }}>
              {data.tco3Year.unierp}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>Transparent per-user pricing</div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{data.competitorName} 3-Year TCO</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ef4444', marginTop: '4px' }}>
              {data.tco3Year.competitor}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>Licensing + consulting overhead</div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#93c5fd', fontWeight: 700 }}>Total Estimated Savings</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#60a5fa', marginTop: '4px' }}>
              {data.tco3Year.savings}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#93c5fd', marginTop: '2px' }}>Migration in {data.migrationTimeline}</div>
          </div>
        </div>
      </section>

      {/* ═══ 2. DEEP FEATURE COMPARISON MATRIX ═══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem 5rem' }}>
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-card-border)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              padding: '1.25rem 1.75rem',
              background: 'var(--color-bg)',
              borderBottom: '1px solid var(--color-card-border)',
              fontWeight: 900,
              fontSize: '0.92rem',
              color: 'var(--color-text-main)',
            }}
          >
            <span>Core Capabilities &amp; Architecture</span>
            <span style={{ textAlign: 'center', color: '#2563eb' }}>UniERP</span>
            <span style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>{data.competitorName}</span>
          </div>

          {data.features.map((cat) => (
            <div key={cat.category}>
              <div
                style={{
                  padding: '0.85rem 1.75rem',
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

              {cat.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    padding: '1rem 1.75rem',
                    borderBottom: '1px solid var(--color-card-border)',
                    fontSize: '0.9rem',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{item.name}</span>
                    {item.note && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                        {item.note}
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    {typeof item.unierp === 'boolean' ? (
                      item.unierp ? (
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={14} />
                        </div>
                      ) : (
                        <X size={16} color="#ef4444" />
                      )
                    ) : (
                      <span style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.82rem' }}>{item.unierp}</span>
                    )}
                  </div>

                  <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    {typeof item.competitor === 'boolean' ? (
                      item.competitor ? (
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(100, 116, 139, 0.15)', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={14} />
                        </div>
                      ) : (
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={14} />
                        </div>
                      )
                    ) : (
                      <span style={{ color: 'var(--color-text-subtle)', fontSize: '0.82rem' }}>{item.competitor}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. ROYAL BANNER CTA ═══ */}
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
            Ready to switch from {data.competitorName}?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Our migration engineering team provides automated ETL schema migration and white-glove onboarding to ensure zero operational downtime.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=migration" className="btn-royal-white">
              <span>Request Migration Assessment</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/register" className="btn-royal-outline">
              <span>Start 30-Day Free Trial</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
