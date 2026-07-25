'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CONTENT_COLLECTIONS } from '../collections';

export function ContentSubTabs() {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        marginBottom: 'var(--space-6)',
        borderBottom: '1px solid var(--color-card-border)',
        paddingBottom: '0.5rem',
      }}
    >
      {CONTENT_COLLECTIONS.map((c) => {
        const href = `/admin/content/${c.id}`;
        const isActive = pathname === href;
        const Icon = c.icon;
        return (
          <Link
            key={c.id}
            href={href}
            className="admin-tab"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
              color: isActive ? '#fff' : 'var(--color-text-muted)',
              fontSize: '0.82rem',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon size={14} />
            {c.label}
          </Link>
        );
      })}
    </div>
  );
}
