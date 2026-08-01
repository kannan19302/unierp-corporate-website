'use client';

import type { ReactNode, CSSProperties } from 'react';
import { FramerReveal } from '@/components/site/anim/FramerReveal';

/**
 * Shared scroll-reveal wrapper backed by Framer Motion's viewport observer
 * (same API as the previous CSS-based Reveal). Wrap any static content
 * section below a page hero to fade/slide it in on scroll.
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
  return (
    <FramerReveal as={as} className={className} delay={delay} style={style} amount={0.1}>
      {children}
    </FramerReveal>
  );
}
