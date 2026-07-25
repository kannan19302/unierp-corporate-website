import { z } from 'zod';

const baseSection = { id: z.string() };

export const featureCardsSection = z.object({
  ...baseSection,
  type: z.literal('feature-cards'),
  eyebrowIconName: z.string().optional(),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  items: z
    .array(
      z.object({
        iconName: z.string(),
        title: z.string(),
        body: z.string(),
        accent: z.enum(['primary', 'emerald', 'purple', 'amber']).optional(),
      })
    )
    .max(12),
  background: z.enum(['default', 'surface']).optional(),
});

export const ctaSection = z.object({
  ...baseSection,
  type: z.literal('cta'),
  heading: z.string(),
  body: z.string().optional(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});

export const testimonialsSection = z.object({ ...baseSection, type: z.literal('testimonials'), heading: z.string().optional() });
export const statBarSection = z.object({ ...baseSection, type: z.literal('stat-bar') });
export const logoWallSection = z.object({ ...baseSection, type: z.literal('logo-wall') });

export const featureGridSection = z.object({
  ...baseSection,
  type: z.literal('feature-grid'),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  source: z.enum(['highlighted', 'all']).default('highlighted'),
  limit: z.number().int().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
});

export const richTextSection = z.object({ ...baseSection, type: z.literal('rich-text'), heading: z.string().optional(), body: z.string() });

/** Numbered process steps — common on ERP "How it works" sections */
export const processStepsSection = z.object({
  ...baseSection,
  type: z.literal('process-steps'),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  steps: z.array(
    z.object({
      number: z.number().int().min(1).max(10),
      title: z.string(),
      body: z.string(),
      iconName: z.string().optional(),
    })
  ).max(8),
});

/** Feature vs competitor comparison table */
export const comparisonTableSection = z.object({
  ...baseSection,
  type: z.literal('comparison-table'),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  competitors: z.array(z.string()).max(4), // e.g. ["UniERP", "SAP B1", "Zoho"]
  rows: z.array(
    z.object({
      feature: z.string(),
      values: z.array(z.union([z.boolean(), z.string()])), // true/false or custom label
    })
  ).max(20),
  ourColumnIndex: z.number().int().default(0), // which column is highlighted
});

/** Embedded video section */
export const videoEmbedSection = z.object({
  ...baseSection,
  type: z.literal('video-embed'),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  videoUrl: z.string(), // YouTube/Loom embed URL
  aspectRatio: z.enum(['16/9', '4/3', '1/1']).default('16/9'),
});

/** Two-column hero with image split */
export const heroSplitSection = z.object({
  ...baseSection,
  type: z.literal('hero-split'),
  heading: z.string(),
  body: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  imagePosition: z.enum(['left', 'right']).default('right'),
});

export const sectionSchema = z.discriminatedUnion('type', [
  featureCardsSection,
  ctaSection,
  testimonialsSection,
  statBarSection,
  logoWallSection,
  featureGridSection,
  richTextSection,
  processStepsSection,
  comparisonTableSection,
  videoEmbedSection,
  heroSplitSection,
]);

export const sectionsArraySchema = z.array(sectionSchema).max(20);

export type Section = z.infer<typeof sectionSchema>;

export const SECTION_TYPES: Section['type'][] = [
  'feature-cards',
  'cta',
  'testimonials',
  'stat-bar',
  'logo-wall',
  'feature-grid',
  'rich-text',
  'process-steps',
  'comparison-table',
  'video-embed',
  'hero-split',
];

export function defaultSection(type: Section['type'], id: string): Section {
  switch (type) {
    case 'feature-cards':
      return { id, type, items: [] };
    case 'cta':
      return { id, type, heading: 'Ready to get started?', ctaLabel: 'Contact Us', ctaHref: '/contact' };
    case 'testimonials':
      return { id, type };
    case 'stat-bar':
      return { id, type };
    case 'logo-wall':
      return { id, type };
    case 'feature-grid':
      return { id, type, source: 'highlighted' };
    case 'rich-text':
      return { id, type, body: '' };
    case 'process-steps':
      return { id, type, steps: [{ number: 1, title: 'Step One', body: 'Describe this step.' }] };
    case 'comparison-table':
      return { id, type, competitors: ['UniERP', 'Competitor A'], rows: [], ourColumnIndex: 0 };
    case 'video-embed':
      return { id, type, videoUrl: '', aspectRatio: '16/9' };
    case 'hero-split':
      return { id, type, heading: 'Section Heading', imagePosition: 'right' };
  }
}
