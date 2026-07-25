'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { ADMIN_NAV } from '@/app/admin/nav';

interface AdminBreadcrumbProps {
  pathname: string;
}

export function AdminBreadcrumb({ pathname }: AdminBreadcrumbProps) {
  // Determine current active item from ADMIN_NAV
  const currentNavItem = ADMIN_NAV.find(
    (n) =>
      pathname === n.href ||
      (n.id === 'content' && pathname.startsWith('/admin/content')) ||
      (n.id === 'tools' && pathname.startsWith('/admin/tools'))
  );

  // Generate sub-page labels if inside /admin/content/[collection] or /admin/tools/[tab]
  let subLabel = '';
  if (pathname.startsWith('/admin/content/')) {
    const col = pathname.split('/admin/content/')[1];
    if (col) {
      const contentNames: Record<string, string> = {
        branding: 'Branding & Theme',
        navigation: 'Navigation',
        pages: 'Pages & Sections',
        i18n: 'AI Translation Studio',
        'ab-testing': 'A/B Testing Studio',
        features: 'Features',
        pricing: 'Pricing Tiers',
        testimonials: 'Testimonials',
        faqs: 'FAQs',
        industries: 'Industries',
        'case-studies': 'Case Studies',
        resources: 'Resources',
      };
      subLabel = contentNames[col] || col.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
  } else if (pathname.startsWith('/admin/tools/')) {
    const tab = pathname.split('/admin/tools/')[1];
    if (tab) {
      const tabNames: Record<string, string> = {
        preferences: 'Console Preferences',
        integrations: 'Integrations & Secrets',
        users: 'Admin Users & 2FA',
        automation: 'Workflow Automation',
        datacenter: 'Data Import Center',
        health: 'System Health',
        broadcast: 'Release Broadcasts',
        seo: 'SEO & Site Settings',
        auditlog: 'Audit Log',
      };
      subLabel = tabNames[tab] || tab;
    }
  }

  return (
    <div
      style={{
        height: '36px',
        background: 'var(--color-sidebar-bg)',
        borderBottom: '1px solid var(--color-card-border)',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        position: 'sticky',
        top: 'var(--header-height)',
        zIndex: 40,
        flexShrink: 0,
      }}
    >
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: 'var(--color-text-muted)',
          textDecoration: 'none',
        }}
      >
        <Home size={14} />
        <span>Apps</span>
      </Link>
      <ChevronRight size={13} />
      <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Corporate Admin</span>
      {currentNavItem && (
        <>
          <ChevronRight size={13} />
          <Link
            href={currentNavItem.href}
            style={{
              color: subLabel ? 'var(--color-text-muted)' : 'var(--color-primary)',
              fontWeight: subLabel ? 500 : 700,
              textDecoration: 'none',
            }}
          >
            {currentNavItem.label}
          </Link>
        </>
      )}
      {subLabel && (
        <>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{subLabel}</span>
        </>
      )}
    </div>
  );
}
