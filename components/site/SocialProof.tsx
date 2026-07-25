'use client';

import { useEffect, useRef, useState } from 'react';
import { useSiteContent } from './SiteContentProvider';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';

/** Animated count-up number hook */
function useCountUp(target: number, duration = 1200, active = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setCurrent(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return current;
}

/** Parse a value like "3,400+" or "99.9%" into a base number */
function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
  const match = raw.match(/^([^0-9]*)([0-9,]+\.?[0-9]*)(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: raw };
  return { num: parseFloat(match[2].replace(/,/g, '')), prefix: match[1], suffix: match[3] };
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.4 });
  const { num, prefix, suffix } = parseValue(value);
  const animated = useCountUp(num, 1200, isVisible);

  const display = isVisible
    ? `${prefix}${Number.isInteger(num) ? animated.toLocaleString() : animated.toFixed(1)}${suffix}`
    : `${prefix}0${suffix}`;

  return (
    <div ref={ref} style={{ textAlign: 'center', transition: 'opacity 0.4s' }}>
      <div
        className={isVisible ? 'stat-value counting' : 'stat-value'}
        style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-text-main)' }}
      >
        {display}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{label}</div>
    </div>
  );
}

export function StatBar() {
  const { settings } = useSiteContent();
  if (settings.trustStats.length === 0) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', padding: '2.5rem 1.5rem', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      {settings.trustStats.map((s) => (
        <AnimatedStat key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  );
}

export function LogoWall() {
  const { settings } = useSiteContent();
  if (settings.logoWallNames.length === 0) return null;

  // Duplicate array to create seamless infinite scroll
  const items = [...settings.logoWallNames, ...settings.logoWallNames];

  return (
    <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
      {settings.logoWallHeading && (
        <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: '1.5rem' }}>
          {settings.logoWallHeading}
        </p>
      )}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {items.map((name, i) => (
            <span key={`${name}-${i}`} style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-subtle)', opacity: 0.7, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialGrid() {
  const { testimonials } = useSiteContent();
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.08 });

  if (testimonials.length === 0) return null;

  return (
    <div
      ref={ref}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
    >
      {testimonials.map((t, i) => (
        <div
          key={t.id}
          className={`glass-panel reveal hover-lift ${isVisible ? 'visible' : ''} stagger-${Math.min(i + 1, 6)}`}
          style={{ padding: '2rem' }}
        >
          <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>&ldquo;{t.quote}&rdquo;</p>
          <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{t.authorName}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{[t.authorTitle, t.company].filter(Boolean).join(', ')}</div>
        </div>
      ))}
    </div>
  );
}
