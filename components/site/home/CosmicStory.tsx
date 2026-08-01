'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface StoryStep {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  visual: ReactNode;
}

function StoryPanel({ progress, index, total, step }: { progress: ReturnType<typeof useScroll>['scrollYProgress']; index: number; total: number; step: StoryStep }) {
  const start = index / total;
  const end = (index + 1) / total;
  const seg = end - start;
  const fade = Math.min(0.2, seg * 0.25);

  const opacity = useTransform(progress, [start, start + fade, end - fade, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [70, -70]);
  const scale = useTransform(progress, [start, start + fade], [0.94, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale, position: 'absolute', inset: 0 }}
      className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16"
    >
      <div style={{ textAlign: 'left' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 9999,
            background: 'var(--color-primary-glow)',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {step.eyebrow}
        </div>
        <h3
          style={{
            fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-main)',
            margin: '0 0 1.1rem',
          }}
        >
          {step.title}
          {step.accent ? <span className="cosmic-text"> {step.accent}</span> : null}
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: 460, margin: 0 }}>
          {step.body}
        </p>
      </div>
      <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>{step.visual}</div>
    </motion.div>
  );
}

/**
 * Cinematic pinned scroll-story: chapters stack in a sticky viewport and
 * crossfade as the visitor scrolls — "the story of the operating system".
 */
export function CosmicStory({ steps }: { steps: StoryStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <div ref={ref} style={{ position: 'relative', height: `${steps.length * 110}vh` }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
        }}
      >
        <div className="cosmic-aurora cosmic-aurora--conic" aria-hidden />
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', position: 'relative' }}>
          {steps.map((step, i) => (
            <StoryPanel key={i} progress={scrollYProgress} index={i} total={steps.length} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}
