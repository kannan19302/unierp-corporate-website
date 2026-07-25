'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { DynamicIcon } from '@/components/site/DynamicIcon';

export default function IndustriesPage() {
  useAnalytics('/industries');
  const { industries } = useSiteContent();
  const [activeId, setActiveId] = useState<string | null>(industries[0]?.id ?? null);
  const activeIndustry = industries.find((i) => i.id === activeId) || industries[0];

  if (!activeIndustry) {
    return (
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>No industries published yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1rem' }}>Built for your industry</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Purpose-built workflows on top of the same core — pick your vertical to see what&apos;s tailored for you.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {industries.map((i) => (
          <button
            key={i.id}
            onClick={() => setActiveId(i.id)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              border: '1px solid var(--glass-border)',
              background: activeIndustry.id === i.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: activeIndustry.id === i.id ? '#fff' : 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <DynamicIcon name={i.iconName} size={16} />
            {i.name}
          </button>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '760px', margin: '0 auto 3rem', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <DynamicIcon name={activeIndustry.iconName} size={32} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>{activeIndustry.name}</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>{activeIndustry.blurb}</p>
        <Link href={activeIndustry.ctaHref || '/contact'} className="btn-primary">
          {activeIndustry.ctaLabel || 'Talk to a specialist'} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
