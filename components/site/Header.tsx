'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, LogIn, UserPlus, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';
import { useSiteContent } from './SiteContentProvider';
import { DynamicIcon } from './DynamicIcon';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { settings, navLinks } = useSiteContent();
  const headerLinks = navLinks.filter((l) => l.placement === 'HEADER');
  const erpAppUrl = settings.erpAppUrl;

  return (
    <>
      {settings.announcementEnabled && settings.announcementText && (
        <div
          style={{
            background: 'linear-gradient(90deg, #1d4ed8, #7e22ce, #1d4ed8)',
            backgroundSize: '200% auto',
            animation: 'gradient-shift 4s ease infinite',
            color: '#ffffff',
            padding: '0.55rem 1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
          }}
        >
          <DynamicIcon name={settings.announcementIconName} size={16} />
          <span>{settings.announcementText}</span>
          {settings.announcementCtaLabel && (
            <a href={settings.announcementCtaHref || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: 700 }}>
              {settings.announcementCtaLabel}
            </a>
          )}
        </div>
      )}

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--header-bg)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 1.5rem', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-text-main)', textDecoration: 'none', flexShrink: 0 }}>
            {settings.logoImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logoImageUrl} alt={settings.brandName} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #38bdf8, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
                {settings.logoText}
              </div>
            )}
            <span style={{ letterSpacing: '-0.02em' }}>
              {settings.brandName}
              {settings.brandNameAccent && <span className="text-gradient">{settings.brandNameAccent}</span>}
            </span>
          </Link>

          <nav style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {headerLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                target={link.openInNewTab ? '_blank' : undefined}
                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                style={{
                  color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexShrink: 0 }}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--color-surface)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-text-main)',
                cursor: 'pointer',
              }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#f59e0b" />}
            </button>

            <a href={`${erpAppUrl}/`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
              <Compass size={15} />
              <span>{settings.headerDemoLabel}</span>
            </a>
            <a href={`${erpAppUrl}${settings.erpLoginPath}`} className="btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
              <LogIn size={15} />
              <span>{settings.headerLoginLabel}</span>
            </a>
            <Link href={settings.headerCtaHref} className="btn-primary" style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}>
              <UserPlus size={15} />
              <span>{settings.headerCtaLabel}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
