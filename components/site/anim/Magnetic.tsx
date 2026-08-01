'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How strongly the element is pulled toward the cursor (0–1). */
  strength?: number;
  style?: React.CSSProperties;
}

/**
 * Magnetic pull — element drifts toward the cursor and springs back on
 * leave. Pairs beautifully with primary CTAs and icon buttons.
 */
export function Magnetic({ children, className, strength = 0.35, style }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex', ...style }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
