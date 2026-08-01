'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Slim gradient progress bar pinned to the top of the viewport.
 * Tracks page scroll; springs back to zero at the top.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1005,
        transformOrigin: '0% 50%',
        scaleX,
        background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-purple), var(--color-emerald))',
      }}
    />
  );
}
