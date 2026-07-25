'use client';

import { TrendingUp, Users, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export function AnalyticsConversionChart() {
  const steps = [
    { label: 'Total Public Pageviews', count: 12480, rate: '100%', color: 'var(--color-primary)' },
    { label: 'Interactive CTA Clicks', count: 3120, rate: '25.0%', color: '#9333ea' },
    { label: 'Leads & Inquiries Captured', count: 486, rate: '3.89%', color: '#d97706' },
    { label: 'Qualified Enterprise Deals', count: 142, rate: '1.14%', color: '#059669' },
  ];

  return (
    <div className="admin-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
            Conversion Funnel & Traffic Performance
          </h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Last 30 Days</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        {steps.map((step, idx) => (
          <div
            key={step.label}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
              Step {idx + 1}
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: step.color }}>
              {step.count.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0.2rem 0' }}>
              {step.label}
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: step.color, background: 'rgba(37,99,235,0.06)', padding: '0.1rem 0.4rem', borderRadius: '4px', display: 'inline-block' }}>
              Conversion: {step.rate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
