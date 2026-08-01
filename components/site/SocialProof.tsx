'use client';

import { useSiteContent } from './SiteContentProvider';
import { AnimatedCounter } from './anim/AnimatedCounter';
import { StaggerGroup, StaggerItem, FramerReveal } from './anim/FramerReveal';
import { TiltCard } from './anim/TiltCard';

/** Parse a value like "3,400+" or "99.9%" into a base number + affixes. */
function parseValue(raw: string): { num: number; prefix: string; suffix: string; decimals: number } {
  const match = raw.match(/^([^0-9]*)([0-9,]+\.?[0-9]*)(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: raw, decimals: 0 };
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
  return { num: parseFloat(match[2].replace(/,/g, '')), prefix: match[1], suffix: match[3], decimals };
}

export function StatBar() {
  const { settings } = useSiteContent();
  if (settings.trustStats.length === 0) return null;

  return (
    <section style={{ padding: '3.5rem 1.5rem', position: 'relative', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="cosmic-aurora" aria-hidden style={{ position: 'absolute', inset: 0 }} />
      <StaggerGroup
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}
        stagger={0.08}
      >
        {settings.trustStats.map((s) => {
          const { num, prefix, suffix, decimals } = parseValue(s.value);
          return (
            <StaggerItem key={s.label}>
              <div className="hologram" style={{ padding: '1.75rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--color-text-main)', lineHeight: 1 }}>
                  <AnimatedCounter value={num} prefix={prefix} suffix={suffix} decimals={decimals} />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>{s.label}</div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}

export function LogoWall() {
  const { settings } = useSiteContent();
  if (settings.logoWallNames.length === 0) return null;

  const items = [...settings.logoWallNames, ...settings.logoWallNames];

  return (
    <section style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
      {settings.logoWallHeading && (
        <FramerReveal as="p" className="text-[0.85rem] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--color-text-subtle)', marginBottom: '1.75rem' }}>
          {settings.logoWallHeading}
        </FramerReveal>
      )}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="hologram"
              style={{
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--color-text-muted)',
                padding: '0.6rem 1.4rem',
                borderRadius: 12,
                background: 'var(--glass-bg)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialGrid() {
  const { testimonials } = useSiteContent();
  if (testimonials.length === 0) return null;

  return (
    <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.09}>
      {testimonials.map((t) => (
        <StaggerItem key={t.id}>
          <TiltCard className="hologram hologram-sheen" style={{ padding: '2rem', height: '100%' }}>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 1.5rem' }}>&ldquo;{t.quote}&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
              <div
                className="testimonial-avatar"
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
                }}
              >
                {t.authorName.trim().charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{t.authorName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{[t.authorTitle, t.company].filter(Boolean).join(', ')}</div>
              </div>
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
