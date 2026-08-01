'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/**
 * Global buttery-smooth scrolling via Lenis, wired into GSAP's ticker so
 * ScrollTrigger stays perfectly in sync. Falls back to native scroll for
 * `prefers-reduced-motion` users and exposes the instance through context.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Must be a stable reference: gsap.ticker.remove() compares by identity,
    // so passing a fresh arrow function to remove() would leave the original
    // callback running against a destroyed Lenis instance.
    const raf = (time: number) => instance.raf(time * 1000);

    instance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Access the Lenis instance (for programmatic smooth-scroll, e.g. anchor CTAs). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
