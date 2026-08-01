'use client';

import { motion, type Variants } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

/** Shared signature ease used across the whole cosmic animation system. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FramerRevealProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'li' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
  amount?: number;
}

const TAGS = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

/**
 * Scroll-into-view reveal with directional travel and the signature
 * cubic-bezier ease. Disabled automatically for reduced-motion users by the
 * global <MotionConfig reducedMotion="user"> wrapper.
 */
export function FramerReveal({
  children,
  direction = 'up',
  distance = 32,
  delay = 0,
  duration = 0.8,
  once = true,
  className,
  style,
  as = 'div',
  amount = 0.2,
}: FramerRevealProps) {
  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction];

  const Tag = TAGS[as];

  return (
    <Tag
      data-reveal=""
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Tag>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  direction?: Direction;
  distance?: number;
}

/** Parent orchestrator — children reveal one after another. */
export function StaggerGroup({
  children,
  className,
  style,
  stagger = 0.09,
  delay = 0,
  once = true,
  amount = 0.2,
  direction = 'up',
  distance = 30,
}: StaggerGroupProps) {
  const hidden: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { staggerChildren: stagger, delayChildren: delay, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <motion.div data-reveal="" className={className} style={style} variants={hidden} initial="hidden" whileInView="visible" viewport={{ once, amount }}>
      {children}
    </motion.div>
  );
}

/** Single staggered child. Must be nested inside <StaggerGroup>. */
export function StaggerItem({
  children,
  className,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y: 0, x: 0 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration, ease: EASE_OUT_EXPO } },
  };
  return (
    <motion.div data-reveal="" className={className} variants={item}>
      {children}
    </motion.div>
  );
}
