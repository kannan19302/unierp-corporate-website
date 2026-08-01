'use client';

import { useEffect } from 'react';

/**
 * Global scroll-reveal driver for the legacy `.reveal` CSS pattern used by
 * several marketing pages (products, pricing, about, help, marketplace,
 * careers, industries, customers). Toggles `.visible` as cards enter the
 * viewport. Mounted once in the site layout; renders nothing.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (els.length === 0) return;

    if (reduceMotion) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
