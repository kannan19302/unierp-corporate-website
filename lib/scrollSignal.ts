/**
 * A single, render-loop-friendly source of scroll state.
 *
 * The universe backdrop reads scroll position every frame inside `useFrame`.
 * Routing that through React state would re-render the whole tree 60 times a
 * second, so this keeps a plain mutable object updated from one passive
 * listener and lets consumers read it directly.
 */

export interface ScrollState {
  /** Raw scroll offset in pixels. */
  y: number;
  /** 0 at the top of the document, 1 at the bottom. */
  progress: number;
  /** Smoothed progress — eased toward `progress`, for camera work. */
  eased: number;
  /** Pixels-per-frame delta, signed. Useful for motion-reactive effects. */
  velocity: number;
}

export const scrollState: ScrollState = { y: 0, progress: 0, eased: 0, velocity: 0 };

let listening = false;
let lastY = 0;

function read() {
  const y = window.scrollY || window.pageYOffset || 0;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  scrollState.velocity = y - lastY;
  lastY = y;
  scrollState.y = y;
  scrollState.progress = Math.min(1, Math.max(0, y / max));
}

/**
 * Begin tracking scroll. Safe to call from several components — the listener
 * is installed once. Returns a teardown for the last caller to use.
 */
export function startScrollTracking(): () => void {
  if (typeof window === 'undefined' || listening) return () => {};
  listening = true;
  read();
  window.addEventListener('scroll', read, { passive: true });
  window.addEventListener('resize', read, { passive: true });
  return () => {
    window.removeEventListener('scroll', read);
    window.removeEventListener('resize', read);
    listening = false;
  };
}

/**
 * Advance the smoothed value. Call once per frame from the render loop.
 * `lambda` is a frame-rate-independent smoothing factor.
 */
export function advanceEased(delta: number, lambda = 4) {
  const t = 1 - Math.exp(-lambda * delta);
  scrollState.eased += (scrollState.progress - scrollState.eased) * t;
  return scrollState.eased;
}
