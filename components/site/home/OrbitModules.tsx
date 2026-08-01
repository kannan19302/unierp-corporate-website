'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HERO_MODULES } from '../hero/heroConfig';

/**
 * 2D "modules in orbit" showcase — a slow-rotating ring of module chips
 * around a glowing core. Chips counter-rotate so they stay upright, and
 * lift on hover. Zero WebGL cost, reused across marketing pages.
 */
export function OrbitModules({ className, count = 6 }: { className?: string; count?: number }) {
  const reduced = useReducedMotion();
  const modules = useMemo(() => HERO_MODULES.slice(0, count), [count]);
  const spin = reduced ? undefined : { rotate: 360 };
  const counter = reduced ? undefined : { rotate: -360 };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: 'min(74vw, 560px)',
        aspectRatio: '1 / 1',
        margin: '0 auto',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {/* Core globe */}
      <div style={{ position: 'relative', width: '26%', aspectRatio: '1' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 28%, #38bdf8 0%, #2563eb 45%, #312e81 100%)',
            boxShadow: '0 0 44px 8px rgba(56,189,248,0.4), inset 0 -14px 26px rgba(2,6,23,0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-14%',
            borderRadius: '50%',
            border: '1px solid rgba(56,189,248,0.22)',
          }}
        />
        <div style={{ position: 'absolute', inset: '-34%', borderRadius: '50%', border: '1px dashed rgba(56,189,248,0.12)' }} />
      </div>

      {/* Rotating ring */}
      <motion.div style={{ position: 'absolute', inset: 0 }} animate={spin} transition={reduced ? undefined : { repeat: Infinity, duration: 46, ease: 'linear' }}>
        {modules.map((m, i) => {
          const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 48 * Math.cos(angle);
          const y = 50 + 48 * Math.sin(angle);
          return (
            <motion.div
              key={m.id}
              style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 0, height: 0 }}
              animate={counter}
              transition={reduced ? undefined : { repeat: Infinity, duration: 46, ease: 'linear' }}
            >
              <motion.div style={{ transform: 'translate(-50%, -50%)' }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.96 }}>
                <Link href={m.href} style={{ textDecoration: 'none' }} aria-label={`${m.name} — ${m.tagline}`}>
                  <div
                    className="hologram hologram-sheen"
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: 22,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      background: 'rgba(2,6,23,0.55)',
                      border: `1px solid ${m.color}44`,
                      boxShadow: `0 0 26px -8px ${m.color}88`,
                    }}
                  >
                    <span style={{ fontSize: '1.05rem', fontWeight: 900, color: m.color, letterSpacing: '-0.02em' }}>
                      {m.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {m.name.split(' ')[0]}
                    </span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
