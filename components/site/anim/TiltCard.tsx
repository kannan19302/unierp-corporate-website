'use client';

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Max rotation in degrees. */
  max?: number;
  /** Extra hover scale. */
  scale?: number;
  /** Radial spotlight that follows the cursor. */
  glare?: boolean;
  /** Lift on hover (px). */
  lift?: number;
}

/**
 * Premium 3D tilt card with cursor-tracking spotlight glare and springy
 * settle. Used for holographic feature panels across the site.
 */
export function TiltCard({ children, className, style, max = 9, scale = 1.02, glare = true, lift = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springRotY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glowX = useTransform(mx, (v) => `${v}%`);
  const glowY = useTransform(my, (v) => `${v}%`);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(280px circle at ${x} ${y}, rgba(255,255,255,0.16), rgba(56,189,248,0.10) 42%, transparent 72%)`
  );

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * max * 2);
    rotateX.set(-(py - 0.5) * max * 2);
    mx.set(px * 100);
    my.set(py * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mx.set(50);
    my.set(50);
  }

  return (
    <div style={{ perspective: 1200, ...style }}>
      <motion.div
        ref={ref}
        className={className}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale, y: -lift, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 2,
              opacity: 0.9,
              background: glowBg,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
