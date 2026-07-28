'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteContent } from './SiteContentProvider';

const FOOTER_COLS = [
  {
    title: 'Products',
    links: [
      { label: 'Finance & Accounting', href: '/products/finance' },
      { label: 'Human Resources', href: '/products/hr' },
      { label: 'CRM & Sales', href: '/products/crm' },
      { label: 'Inventory', href: '/products/inventory' },
      { label: 'Manufacturing', href: '/products/manufacturing' },
      { label: 'Procurement', href: '/products/procurement' },
      { label: 'View All Modules', href: '/products' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Enterprise', href: '/industries/enterprise' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Education', href: '/industries/education' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Retail & E-Commerce', href: '/industries/retail' },
      { label: 'Field Services', href: '/industries/field-service' },
      { label: 'Apps Marketplace', href: '/marketplace' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Blog', href: '/blog' },
      { label: 'Webinars & Videos', href: '/resources' },
      { label: 'Customer Stories', href: '/customers' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Sales', href: '/contact' },
      { label: 'Security', href: '/security' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'System Status', href: '/status' },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: 'X', href: 'https://x.com', title: 'Follow on X' },
  { label: 'Li', href: 'https://linkedin.com', title: 'Connect on LinkedIn' },
  { label: 'Gh', href: 'https://github.com', title: 'View on GitHub' },
  { label: 'Yt', href: 'https://youtube.com', title: 'Watch on YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const { settings } = useSiteContent();
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
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand">
            <div className="footer-brand-name">
              {settings.footerBrandName || settings.brandName}
            </div>
            <p className="footer-brand-desc">
              {settings.footerBlurb ||
                'The composable, multi-tenant ERP platform for modern businesses — finance, HR, CRM, inventory, manufacturing, and 40+ modules.'}
            </p>

            {/* Social links */}
            <div className="footer-socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  title={s.title}
                  aria-label={s.title}
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Compliance badges */}
            <div className="footer-badges">
              <span className="footer-badge">SOC 2</span>
              <span className="footer-badge">GDPR</span>
              <span className="footer-badge">ISO 27001</span>
              <span className="footer-badge">HIPAA Ready</span>
              <span className="footer-badge">99.9% SLA</span>
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-col-links">
                {col.links.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter + bottom bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="footer-newsletter-label">
            Subscribe to product updates & best practices
          </div>
          <form onSubmit={handleSubscribe} className="footer-newsletter-form">
            <input
              type="email"
              required
              placeholder={settings.newsletterPlaceholder || 'Enter your work email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-newsletter-input"
              aria-label="Newsletter email"
            />
            <button type="submit" className="footer-newsletter-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : status === 'done' ? '✓ Subscribed!' : status === 'error' ? 'Try again' : (settings.newsletterCtaLabel || 'Subscribe')}
            </button>
          </form>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            {settings.copyrightText
              ? settings.copyrightText.replace('{year}', String(new Date().getFullYear()))
              : `© ${new Date().getFullYear()} ${settings.footerBrandName || settings.brandName}. All rights reserved.`}
          </div>

          <div className="footer-legal-links">
            <Link href="/privacy" className="footer-legal-link">Privacy</Link>
            <Link href="/terms" className="footer-legal-link">Terms</Link>
            <Link href="/security" className="footer-legal-link">Security</Link>
            <Link href="/status" className="footer-legal-link">
              <span className="footer-status-dot">All systems operational</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
