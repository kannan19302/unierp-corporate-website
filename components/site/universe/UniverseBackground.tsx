'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const UniverseGL = dynamic(() => import('./UniverseGL').then((m) => m.UniverseGL), {
  ssr: false,
  loading: () => <div className="cosmic-stars" aria-hidden />,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

/**
 * Site-wide universe backdrop: a lightweight WebGL starfield + neural
 * network rendered behind all content. Falls back to a CSS starfield when
 * WebGL is unavailable or the user prefers reduced motion. Sits at z-index 0.
 */
export function UniverseBackground() {
  const [mode, setMode] = useState<'gl' | 'css'>('css');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !supportsWebGL()) {
      setMode('css');
      return;
    }
    setMode('gl');
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {mode === 'gl' ? <UniverseGL /> : <div className="cosmic-stars" style={{ position: 'absolute', inset: 0 }} />}
    </div>
  );
}
