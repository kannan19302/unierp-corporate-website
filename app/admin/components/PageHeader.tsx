import type { ReactNode } from 'react';

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: description ? '0.35rem' : 0 }}>{title}</h1>
        {description && <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{description}</p>}
      </div>
      {actions}
    </div>
  );
}
