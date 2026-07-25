'use client';

import { useAnalytics } from '@/lib/useAnalytics';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { DynamicIcon } from '@/components/site/DynamicIcon';

export default function ResourcesPage() {
  useAnalytics('/resources');
  const { resources } = useSiteContent();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1rem' }}>Resources</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)' }}>Guides, webinars, and playbooks to help you run a leaner business.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {resources.map((r) => (
          <div key={r.id} className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DynamicIcon name={r.iconName} size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-subtle)' }}>{r.type}</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{r.title}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{r.description}</p>
          </div>
        ))}
        {resources.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No resources published yet.</p>}
      </div>
    </div>
  );
}
