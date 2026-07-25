'use client';

import Link from 'next/link';
import type { ComponentType } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  href: string;
  superAdminOnly?: boolean;
}

interface AdminTabBarProps {
  tabs: TabItem[];
  activeTabId: string;
}

export function AdminTabBar({ tabs, activeTabId }: AdminTabBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.25rem',
        background: 'var(--color-sidebar-bg)',
        padding: '0.3rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-card-border)',
        marginBottom: '1.25rem',
        width: '100%',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      } as React.CSSProperties}
    >
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = activeTabId === t.id;
        return (
          <Link
            key={t.id}
            href={t.href}
            style={{
              flex: 1,
              minWidth: 'max-content',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              fontWeight: isActive ? 600 : 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              background: isActive ? 'var(--color-card)' : 'transparent',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              color: isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              scrollSnapAlign: 'start',
            }}
          >
            {Icon && <Icon size={14} style={{ color: isActive ? 'var(--color-primary)' : 'inherit', flexShrink: 0 }} />}
            <span>{t.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
