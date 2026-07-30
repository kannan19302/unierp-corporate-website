'use client';

import type { ReactNode, CSSProperties } from 'react';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';

/**
 * Shared scroll-reveal wrapper (same pattern as SectionRenderer's RevealSection).
 * Wrap any static content section below a page hero to fade/slide it in on scroll.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
  style?: CSSProperties;
}) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.06 });
  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
