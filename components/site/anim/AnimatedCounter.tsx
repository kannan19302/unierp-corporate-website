'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

function format(value: number, decimals: number, prefix: string, suffix: string) {
  return `${prefix}${value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
}

/**
 * Count-up number that fires when scrolled into view. Prefix/suffix support
 * ("$", "+", "%") for the trust-stat bar and hero telemetry.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className,
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const [text, setText] = useState(() => format(0, decimals, prefix, suffix));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setText(format(value, decimals, prefix, suffix));
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(format(v, decimals, prefix, suffix)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, prefix, suffix, duration, reduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}
