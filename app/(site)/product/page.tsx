'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>Want to see it in action?</h2>
        <Link href="/contact" className="btn-primary">
          Request a Demo <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
