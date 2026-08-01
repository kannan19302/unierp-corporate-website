'use client';

import type { ReactNode, CSSProperties } from 'react';
import { FramerReveal } from './FramerReveal';

/**
 * Cosmic page hero for marketing sub-pages — aurora + starfield backdrop,
 * animated eyebrow pill, giant headline with accent span, sub copy and
 * optional action slot (search, billing toggle, CTA row).
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  maxWidth = 980,
  padding,
  style,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  maxWidth?: number;
  padding?: CSSProperties['padding'];
  style?: CSSProperties;
}) {
  return (
    <section className="page-hero" style={{ overflow: 'hidden', position: 'relative', ...style }}>
      <div className="cosmic-aurora" aria-hidden />
      <div className="cosmic-stars" aria-hidden />
      <div style={{ maxWidth, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {eyebrow && (
          <FramerReveal as="div">
            <div className="page-hero-badge">{eyebrow}</div>
          </FramerReveal>
        )}
        <FramerReveal as="h1" delay={0.08} style={{ padding }}>
          {title}
        </FramerReveal>
        {sub && (
          <FramerReveal as="p" delay={0.16}>
            {sub}
          </FramerReveal>
        )}
        {children && <FramerReveal as="div" delay={0.24}>{children}</FramerReveal>}
      </div>
    </section>
  );
}
