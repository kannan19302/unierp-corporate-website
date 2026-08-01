'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { HeroPoster } from './HeroPoster';

const EarthScene = dynamic(() => import('./EarthScene').then((m) => m.EarthScene), {
  ssr: false,
  loading: () => null,
});

/** Below this width the globe is too small to read and too costly to justify. */
const MIN_WIDTH_FOR_GL = 768;

function canRunHeroScene(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.innerWidth < MIN_WIDTH_FOR_GL) return false;
  // Low core count is a strong proxy for a phone or a very weak tablet, where
  // an 11k-point globe costs more than it returns.
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

/**
 * Capability-gated wrapper for the WebGL hero.
 *
 * Renders the CSS poster immediately and unconditionally, then layers the
 * three.js scene on top once it has actually produced a frame — the poster
 * cross-fades out only at that point, so there is never an empty hero and
 * never a visible pop-in. Clients that cannot or should not run the scene
 * simply keep the poster.
 */
export function HeroSceneCanvas() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canRunHeroScene()) return;
    // Defer past first paint so the scene never competes with LCP.
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
    const useIdle = typeof w.requestIdleCallback === 'function';
    const handle = useIdle
      ? w.requestIdleCallback!(() => setEnabled(true), { timeout: 1500 })
      : window.setTimeout(() => setEnabled(true), 300);
    return () => {
      if (useIdle) w.cancelIdleCallback?.(handle);
      else clearTimeout(handle);
    };
  }, []);

  // Stop rendering once the hero scrolls away — the single biggest saving on a
  // 10,000px page, where the scene would otherwise keep animating off-screen
  // for the entire visit.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '120px',
    });
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} style={{ position: 'absolute', inset: 0 }}>
      <div className="hero-poster-layer" style={{ opacity: ready ? 0 : 1 }}>
        <HeroPoster animated={!ready} />
      </div>

      {enabled ? <EarthScene paused={!inView} onReady={() => setReady(true)} /> : null}
    </div>
  );
}
