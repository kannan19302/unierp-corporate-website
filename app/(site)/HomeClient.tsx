'use client';

import Link from 'next/link';
import { Award, ChevronRight, CheckCircle2, Compass, ExternalLink, Globe2, Apple, Smartphone } from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { HeroLeadForm } from '@/components/site/HeroLeadForm';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { SectionRenderer } from '@/components/site/sections/SectionRenderer';
import type { Section } from '@/lib/cms/section-schema';

const PLATFORM_CARDS = [
  { icon: Globe2, label: 'Web', desc: 'Full-featured, responsive web app — works in any modern browser.' },
  { icon: Apple, label: 'iOS', desc: 'Native mobile app built with Flutter, for phones and tablets.' },
  { icon: Smartphone, label: 'Android', desc: 'Native mobile app built with Flutter, for phones and tablets.' },
];

interface PageContentShape {
  badgeText?: string | null;
  heroHeadline?: string | null;
  heroHeadlineAccent?: string | null;
  heroSubheadline?: string | null;
  heroBullets?: string[];
  sections?: unknown;
  jsonLd?: unknown;
}

const DEFAULT_BULLETS = ['30 Days Full Access', 'No Credit Card Required', 'Ready to go'];

export default function HomeClient({ page }: { page: PageContentShape | null }) {
  useAnalytics('/');
  const { settings } = useSiteContent();
  const erpAppUrl = settings.erpAppUrl;

  const sections = (page?.sections as Section[] | undefined) || [];
  const bullets = page?.heroBullets && page.heroBullets.length > 0 ? page.heroBullets : DEFAULT_BULLETS;

  return (
    <div>
      {page?.jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.jsonLd) }} />
      ) : null}

      {/* Hero section with animated mesh background */}
      <section style={{ padding: '6.5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated background orbs */}
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />

        <div style={{ maxWidth: '1040px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Floating badge with animation */}
          <div
            className="float-badge hero-enter"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.45rem 1.25rem', borderRadius: '9999px',
              background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary)',
              color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem',
            }}
          >
            <Award size={16} />
            <span>{page?.badgeText || 'Get Started Today'}</span>
            <ChevronRight size={14} />
          </div>

          {/* Headline */}
          <h1
            className="hero-enter-delay-1"
            style={{ fontSize: 'clamp(3.2rem, 6vw, 4.85rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 1.75rem 0', color: 'var(--color-text-main)' }}
          >
            {page?.heroHeadline || `Welcome to ${settings.brandName}`}
            {page?.heroHeadlineAccent && <> <span className="text-gradient">{page.heroHeadlineAccent}</span></>}
          </h1>

          {/* Subheadline */}
          {page?.heroSubheadline && (
            <p
              className="hero-enter-delay-2"
              style={{ fontSize: '1.3rem', color: 'var(--color-text-muted)', maxWidth: '820px', margin: '0 auto 3rem', lineHeight: 1.65 }}
            >
              {page.heroSubheadline}
            </p>
          )}

          {/* CTAs */}
          <div className="hero-enter-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <HeroLeadForm />
            <a
              href={`${erpAppUrl}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-ripple"
              style={{ padding: '0.9rem 1.75rem', borderRadius: '14px', fontSize: '1rem', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              <Compass size={18} />
              <span>Explore Instant Demo</span>
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Trust bullets */}
          <div
            className="hero-enter-delay-4"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: 'var(--color-text-subtle)', fontSize: '0.875rem', flexWrap: 'wrap' }}
          >
            {bullets.map((b) => (
              <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--color-emerald)" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Platform availability */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            One platform, everywhere your team works
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Available on Web and native Mobile apps.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {PLATFORM_CARDS.map((p) => (
            <div key={p.label} className="glass-panel hover-lift" style={{ padding: '1.75rem', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto 1rem', borderRadius: '12px', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p.icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>{p.label}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionRenderer sections={sections} />

      {sections.length === 0 && (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 6rem', textAlign: 'center' }}>
          <div className="glass-panel cta-glow" style={{ padding: '3rem 2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>Ready to get started?</h2>
            <Link href="/contact" className="btn-primary btn-ripple">Talk to Sales</Link>
          </div>
        </section>
      )}
    </div>
  );
}
