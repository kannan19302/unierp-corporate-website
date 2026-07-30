'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { DynamicIcon } from '@/components/site/DynamicIcon';
import { TestimonialGrid, LogoWall } from '@/components/site/SocialProof';
import { CardScroller } from '@/components/site/CardScroller';

export default function CustomersPage() {
  useAnalytics('/customers');
  const { caseStudies } = useSiteContent();

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1rem' }}>Customer Stories</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>Real results from businesses running on this platform.</p>
      </div>

      <CardScroller style={{ marginBottom: '4rem' }}>
        {caseStudies.map((c, i) => (
          <div
            key={c.id}
            className={`glass-panel hover-lift reveal visible stagger-${Math.min(i + 1, 6)}`}
            style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, var(--color-emerald), var(--color-primary))',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-emerald)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.75rem' }}>
              <DynamicIcon name={c.metricIconName || 'TrendingUp'} size={22} />
              {c.result}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{c.company}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{c.detail}</p>
          </div>
        ))}
        {caseStudies.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No case studies published yet.</p>}
      </CardScroller>

      <LogoWall />

      <div style={{ margin: '3rem 0 4rem' }}>
        <TestimonialGrid />
      </div>

      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>Become our next success story</h2>
        <Link href="/contact" className="btn-primary">
          Talk to Sales <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
