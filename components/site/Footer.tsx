'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteContent } from './SiteContentProvider';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const { settings, navLinks } = useSiteContent();

  const footerLinks = navLinks.filter((l) => l.placement === 'FOOTER');
  const groups = Array.from(new Set(footerLinks.map((l) => l.group || 'More')));
  const erpAppUrl = settings.erpAppUrl;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'done' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--glass-border)', padding: '4rem 1.5rem 2rem', color: 'var(--color-text-subtle)', fontSize: '0.9rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{ maxWidth: '320px' }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{settings.footerBrandName}</div>
            {settings.footerBlurb && <p style={{ marginBottom: '1.25rem' }}>{settings.footerBlurb}</p>}
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="email"
                required
                placeholder={settings.newsletterPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, padding: '0.55rem 0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.85rem', outline: 'none' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
                {status === 'sending' ? '...' : status === 'done' ? 'Subscribed' : settings.newsletterCtaLabel}
              </button>
            </form>
          </div>

          {groups.map((group) => (
            <div key={group}>
              <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.85rem' }}>{group}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {footerLinks
                  .filter((l) => (l.group || 'More') === group)
                  .map((link) =>
                    link.external ? (
                      <a key={link.id} href={link.href} target={link.openInNewTab ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }}>
                        {link.label}
                      </a>
                    ) : (
                      <Link key={link.id} href={link.href} style={{ color: 'var(--color-text-muted)' }}>
                        {link.label}
                      </Link>
                    )
                  )}
              </div>
            </div>
          ))}

          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.85rem' }}>Platform</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href={`${erpAppUrl}${settings.erpLoginPath}`} style={{ color: 'var(--color-text-muted)' }}>Log In</a>
              <a href={`${erpAppUrl}${settings.erpRegisterPath}`} style={{ color: 'var(--color-text-muted)' }}>Register Account</a>
              <a href={`${erpAppUrl}/`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }}>Explore Live Demo</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
          {settings.copyrightText
            ? settings.copyrightText.replace('{year}', String(new Date().getFullYear()))
            : `© ${new Date().getFullYear()} ${settings.footerBrandName}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
