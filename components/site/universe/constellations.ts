/**
 * The constellation map for the site-wide universe backdrop.
 *
 * Each constellation stands for one ERP domain and sits at its own depth along
 * the camera's flight path. As the visitor scrolls, the camera travels forward
 * through `z`, and whichever constellation it is passing ignites — so the
 * backdrop narrates the product as you read down the page.
 */

export interface Constellation {
  id: string;
  label: string;
  /** Hex colour used for both nodes and links when ignited. */
  color: string;
  /** Depth along the flight path, in world units (negative = further away). */
  z: number;
  /** Lateral offset so consecutive constellations do not stack up. */
  offset: [number, number];
  /** Node coordinates in local space, roughly within a 6 x 4 box. */
  points: [number, number, number][];
  /** Index pairs into `points` describing the drawn links. */
  links: [number, number][];
}

/* Hand-placed rather than random: a constellation needs to read as a
   deliberate figure, and random point clouds never do. */
export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'finance',
    label: 'Finance',
    color: '#38bdf8',
    z: -12,
    offset: [-2.4, 0.8],
    points: [
      [0, 1.6, 0], [1.4, 0.9, 0.4], [2.2, -0.4, -0.3],
      [1.0, -1.4, 0.2], [-0.6, -1.1, -0.4], [-1.6, 0.2, 0.3],
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3]],
  },
  {
    id: 'hr',
    label: 'HR & Payroll',
    color: '#a78bfa',
    z: -26,
    offset: [2.8, -0.6],
    points: [
      [0, 1.8, 0], [-1.2, 0.6, 0.3], [1.2, 0.6, -0.3],
      [0, 0.1, 0.1], [-1.6, -1.3, 0.2], [1.6, -1.3, -0.2],
    ],
    links: [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [1, 2]],
  },
  {
    id: 'crm',
    label: 'CRM & Sales',
    color: '#34d399',
    z: -40,
    offset: [-3.0, -1.0],
    points: [
      [-2.0, -1.2, 0], [-0.8, -0.2, 0.3], [0.4, 0.6, -0.2],
      [1.6, 1.5, 0.2], [2.4, 0.4, -0.3], [1.0, -1.4, 0.4],
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1]],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    color: '#f472b6',
    z: -54,
    offset: [2.2, 1.2],
    points: [
      [-1.5, 1.2, 0], [1.5, 1.2, 0], [1.5, -1.2, 0],
      [-1.5, -1.2, 0], [0, 0, 0.9], [0, 2.0, -0.5],
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4], [0, 5], [1, 5]],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    color: '#fbbf24',
    z: -68,
    offset: [-2.0, 0.4],
    points: [
      [0, 1.7, 0], [1.5, 0.8, 0.2], [1.5, -0.9, -0.2],
      [0, -1.7, 0.2], [-1.5, -0.9, -0.3], [-1.5, 0.8, 0.3], [0, 0, 0],
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [6, 0], [6, 2], [6, 4]],
  },
  {
    id: 'analytics',
    label: 'Analytics & BI',
    color: '#22d3ee',
    z: -82,
    offset: [2.6, -0.8],
    points: [
      [-2.2, -1.4, 0], [-1.1, -0.3, 0.2], [0, 0.4, -0.2],
      [1.1, 1.6, 0.3], [2.2, 0.9, -0.3],
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
];

/** Total depth the camera travels, with headroom past the last constellation. */
export const FLIGHT_DEPTH = 96;
