'use client';

import type { ReactNode } from 'react';
import { FramerReveal } from './FramerReveal';

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** The portion of the title to render as a cosmic gradient accent. */
  accent?: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}

/**
 * Signature cinematic section heading: glowing eyebrow pill, oversized
 * display title with optional gradient accent, and a muted subheadline.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = 'center',
  as = 'h2',
  className,
  id,
}: SectionHeadingProps) {
  const Tag = as;

  return (
    <FramerReveal
      as="div"
      direction="up"
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        gap: '1.1rem',
        margin: '0 auto',
        maxWidth: 860,
      }}
    >
      {eyebrow && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1rem',
            borderRadius: 9999,
            background: 'var(--color-primary-glow)',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        id={id}
        style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          color: 'var(--color-text-main)',
          margin: 0,
        }}
      >
        {title}
        {accent ? <span className="cosmic-text"> {accent}</span> : null}
      </Tag>
      {sub && (
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            maxWidth: 620,
            margin: 0,
          }}
        >
          {sub}
        </p>
      )}
    </FramerReveal>
  );
}
