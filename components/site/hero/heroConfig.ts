/**
 * Config + procedural texture helpers for the "Universal Business Operating
 * System" hero scene. Pure functions only — no rendering here.
 */

export const EARTH_RADIUS = 1;

export interface HeroModule {
  id: string;
  name: string;
  tagline: string;
  href: string;
  color: string;
  /** Orbit radius in world units. */
  radius: number;
  /** Ring tilt in radians. */
  inclination: number;
  /** Starting angle on the ring. */
  phase: number;
  /** Orbital angular speed. */
  speed: number;
}

export const HERO_MODULES: HeroModule[] = [
  { id: 'finance', name: 'Finance', tagline: 'GL · AR/AP · Multi-currency', href: '/products/finance', color: '#38bdf8', radius: 1.85, inclination: 0.42, phase: 0.0, speed: 0.32 },
  { id: 'hr', name: 'HR & Payroll', tagline: 'Payroll · Leave · Performance', href: '/products/hr', color: '#a78bfa', radius: 2.2, inclination: -0.38, phase: 1.4, speed: -0.26 },
  { id: 'crm', name: 'CRM & Sales', tagline: 'Pipelines · CPQ · Forecast', href: '/products/crm', color: '#34d399', radius: 2.55, inclination: 0.62, phase: 2.8, speed: 0.22 },
  { id: 'inventory', name: 'Inventory', tagline: 'Warehouse · Barcode · Batch', href: '/products/inventory', color: '#f472b6', radius: 1.95, inclination: -0.62, phase: 4.2, speed: 0.3 },
  { id: 'manufacturing', name: 'Manufacturing', tagline: 'BOM · Work orders · QC', href: '/products/manufacturing', color: '#fbbf24', radius: 2.4, inclination: 0.18, phase: 5.4, speed: -0.24 },
  { id: 'analytics', name: 'Analytics & BI', tagline: 'Dashboards · KPIs · AI', href: '/products/analytics', color: '#22d3ee', radius: 2.75, inclination: -0.22, phase: 6.6, speed: 0.18 },
];

/* ── Deterministic value noise (seeded) ──────────────────────────────── */
function hash(x: number, y: number, seed: number) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function noise2D(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = smooth(xf);
  const v = smooth(yf);
  return lerp(
    lerp(hash(xi, yi, seed), hash(xi + 1, yi, seed), u),
    lerp(hash(xi, yi + 1, seed), hash(xi + 1, yi + 1, seed), u),
    v
  );
}

function fbm(x: number, y: number, seed: number, octaves = 3) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise2D(x * freq, y * freq, seed + i * 101);
    amp *= 0.5;
    freq *= 2.05;
  }
  return sum;
}

/* Stylised continents: seeded elliptical blobs with ragged noise edges. */
const BLOBS: { cx: number; cy: number; rx: number; ry: number }[] = [
  { cx: 0.7, cy: 0.42, rx: 0.15, ry: 0.13 }, // Africa
  { cx: 0.26, cy: 0.38, rx: 0.12, ry: 0.15 }, // South America
  { cx: 0.53, cy: 0.63, rx: 0.1, ry: 0.07 }, // Australia
  { cx: 0.18, cy: 0.26, rx: 0.18, ry: 0.12 }, // North America
  { cx: 0.5, cy: 0.2, rx: 0.26, ry: 0.11 }, // Eurasia
  { cx: 0.62, cy: 0.55, rx: 0.07, ry: 0.09 }, // India
  { cx: 0.55, cy: 0.86, rx: 0.18, ry: 0.05 }, // Antarctica
];

export function createLandMap(width = 512, height = 256, seed = 1337): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(width, height);

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const u = px / width;
      const v = py / height;
      let land = false;
      for (let i = 0; i < BLOBS.length; i++) {
        const b = BLOBS[i];
        const dx = (u - b.cx) / b.rx;
        const dy = (v - b.cy) / b.ry;
        const n = fbm(u * 3.2 + i * 7.3, v * 3.2 + i * 3.1, seed + i * 41, 3) * 0.38;
        if (dx * dx + dy * dy + n < 1.02) {
          land = true;
          break;
        }
      }
      const idx = (py * width + px) * 4;
      if (land) {
        img.data[idx] = 190;
        img.data[idx + 1] = 255;
        img.data[idx + 2] = 235;
        img.data[idx + 3] = 255;
      } else {
        img.data[idx] = 0;
        img.data[idx + 1] = 0;
        img.data[idx + 2] = 0;
        img.data[idx + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

/** Distribute `count` glow-dots over land only, projected onto a sphere. */
export function generateEarthPoints(radius: number, count: number, seed = 1337): Float32Array {
  const map = createLandMap(512, 256, seed);
  const ctx = map.getContext('2d')!;
  const { data, width, height } = ctx.getImageData(0, 0, map.width, map.height);

  const positions = new Float32Array(count * 3);
  let placed = 0;
  let guard = 0;
  while (placed < count && guard < count * 48) {
    guard++;
    const u = Math.random();
    const v = Math.random();
    const px = Math.min(width - 1, Math.floor(u * width));
    const py = Math.min(height - 1, Math.floor(v * height));
    const idx = (py * width + px) * 4;
    if (data[idx + 1] < 140) continue;
    const lat = -Math.PI / 2 + v * Math.PI;
    const lon = u * Math.PI * 2;
    const cl = Math.cos(lat);
    positions[placed * 3] = radius * cl * Math.cos(lon);
    positions[placed * 3 + 1] = radius * Math.sin(lat);
    positions[placed * 3 + 2] = radius * cl * Math.sin(lon);
    placed++;
  }
  return positions;
}
