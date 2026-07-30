'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { DynamicIcon } from '@/components/site/DynamicIcon';

export default function ProductPage() {
  useAnalytics('/product');
  const { features, settings } = useSiteContent();
  const [filter, setFilter] = useState<string>('all');

  const categories = Array.from(new Map(features.map((f) => [f.category, f.categoryLabel || f.category])).entries());
  const filtered = filter === 'all' ? features : features.filter((f) => f.category === filter);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1rem' }}>The {settings.brandName} Platform</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Composable modules that work together out of the box — deploy only what you need, add more as you grow.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <button
          onClick={() => setFilter('all')}
          style={{ padding: '0.55rem 1.1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid var(--glass-border)', background: filter === 'all' ? 'var(--color-primary)' : 'var(--color-surface)', color: filter === 'all' ? '#fff' : 'var(--color-text-muted)', cursor: 'pointer' }}
        >
          All Modules
        </button>
        {categories.map(([cat, label]) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{ padding: '0.55rem 1.1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid var(--glass-border)', background: filter === cat ? 'var(--color-primary)' : 'var(--color-surface)', color: filter === cat ? '#fff' : 'var(--color-text-muted)', cursor: 'pointer' }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {filtered.map((m) => (
          <div key={m.id} id={m.slug} className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <DynamicIcon name={m.iconName} size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{m.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.description}</p>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No features published yet.</p>}
      </div>

      {/* Product walkthrough video */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>See the platform in action</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>A 3-minute walkthrough of how modules connect across finance, HR, CRM, and inventory.</p>
        </div>
        <div
          className="hover-lift"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            paddingBottom: `${(9 / 16) * 100}%`,
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--glass-shadow)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, var(--color-surface), var(--color-card))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4)',
              }}
            >
              <Play size={28} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>Want to see it in action?</h2>
        <Link href="/contact" className="btn-primary">
          Request a Demo <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
