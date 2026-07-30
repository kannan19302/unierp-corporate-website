'use client';

import { useEffect, useRef } from 'react';

/**
 * Site-wide ambient gradient-orb canvas, in the spirit of antigravity.google's
 * hero motion. Mounted once in the root layout, sits fixed behind all page content.
 * Orbs drift on independent sine paths (not linear bounce) and ease toward the
 * pointer for a subtle parallax feel. Respects prefers-reduced-motion.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let t = 0;

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    // Brand-aligned palette: primary blue, purple, emerald — matches the
    // existing .glow-blue/.glow-purple/.glow-emerald accents used elsewhere.
    const PALETTE = [
      { h: 221, s: 83 }, // primary blue
      { h: 262, s: 75 }, // purple
      { h: 158, s: 64 }, // emerald
      { h: 199, s: 80 }, // cyan accent
    ];

    type Orb = {
      baseX: number; baseY: number; r: number;
      ampX: number; ampY: number; speed: number; phase: number;
      color: { h: number; s: number };
    };
    let orbs: Orb[] = [];

    let pointerX = 0.5;
    let pointerY = 0.35;
    let pointerTargetX = 0.5;
    let pointerTargetY = 0.35;

    function onPointerMove(e: PointerEvent) {
      pointerTargetX = e.clientX / window.innerWidth;
      pointerTargetY = e.clientY / window.innerHeight;
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = Math.min(window.innerHeight, 980);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 720 ? 4 : width < 1200 ? 5 : 7;
      orbs = Array.from({ length: count }, (_, i) => {
        const color = PALETTE[i % PALETTE.length];
        return {
          baseX: (0.12 + Math.random() * 0.76) * width,
          baseY: (0.05 + Math.random() * 0.75) * height,
          r: (width < 720 ? 130 : 190) + Math.random() * 220,
          ampX: 60 + Math.random() * 140,
          ampY: 50 + Math.random() * 120,
          speed: 0.15 + Math.random() * 0.18,
          phase: Math.random() * Math.PI * 2,
          color,
        };
      });
    }

    function drawFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const dark = isDark();
      ctx.globalCompositeOperation = 'lighter';

      const parallaxX = (pointerX - 0.5) * 70;
      const parallaxY = (pointerY - 0.5) * 50;

      for (const o of orbs) {
        const x = o.baseX + Math.sin(t * o.speed + o.phase) * o.ampX + parallaxX;
        const y = o.baseY + Math.cos(t * o.speed * 0.85 + o.phase) * o.ampY + parallaxY;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, o.r);
        const alpha = dark ? 0.16 : 0.11;
        grad.addColorStop(0, `hsla(${o.color.h}, ${o.color.s}%, ${dark ? 62 : 56}%, ${alpha})`);
        grad.addColorStop(0.6, `hsla(${o.color.h}, ${o.color.s}%, ${dark ? 58 : 54}%, ${alpha * 0.35})`);
        grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    let raf = 0;
    function tick() {
      t += 0.006;
      pointerX += (pointerTargetX - pointerX) * 0.04;
      pointerY += (pointerTargetY - pointerY) * 0.04;
      drawFrame();
      raf = requestAnimationFrame(tick);
    }

    resize();
    drawFrame();
    window.addEventListener('resize', resize);
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

    if (!reduceMotion) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(38px)',
        opacity: 0.9,
      }}
    />
  );
}
