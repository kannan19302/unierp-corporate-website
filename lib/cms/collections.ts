import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ICON_NAMES } from '@/lib/icon-registry';

const iconSchema = z.enum(ICON_NAMES as [string, ...string[]]);

export const navLinkSchema = z.object({
  label: z.string().trim().min(1).max(100),
  href: z.string().trim().min(1).max(300),
  placement: z.enum(['HEADER', 'FOOTER', 'LEGAL']).default('HEADER'),
  group: z.string().trim().max(100).optional(),
  external: z.boolean().optional().default(false),
  openInNewTab: z.boolean().optional().default(false),
  visible: z.boolean().optional().default(true),
});

export const featureSchema = z.object({
  slug: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(200),
  category: z.string().trim().min(1).max(100),
  categoryLabel: z.string().trim().max(150).optional(),
  iconName: iconSchema,
  description: z.string().trim().min(1).max(1000),
  highlighted: z.boolean().optional().default(false),
  visible: z.boolean().optional().default(true),
});

export const testimonialSchema = z.object({
  quote: z.string().trim().min(1).max(2000),
  authorName: z.string().trim().min(1).max(200),
  authorTitle: z.string().trim().max(200).optional(),
  company: z.string().trim().max(200).optional(),
  avatarUrl: z.string().trim().max(500).optional(),
  visible: z.boolean().optional().default(true),
});

export const pricingTierSchema = z.object({
  slug: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(200),
  blurb: z.string().trim().max(500).optional(),
  priceInrAnnual: z.number().int().optional().nullable(),
  priceInrMonthly: z.number().int().optional().nullable(),
  priceUsdAnnual: z.number().int().optional().nullable(),
  priceUsdMonthly: z.number().int().optional().nullable(),
  priceLabelOverride: z.string().trim().max(100).optional(),
  unitLabel: z.string().trim().max(100).optional(),
  ctaLabel: z.string().trim().min(1).max(100),
  ctaHref: z.string().trim().max(300).optional(),
  ctaOpensLeadModal: z.boolean().optional().default(true),
  highlight: z.boolean().optional().default(false),
  features: z.array(z.string().max(200)).max(30).optional().default([]),
  visible: z.boolean().optional().default(true),
});

export const faqItemSchema = z.object({
  question: z.string().trim().min(1).max(500),
  answer: z.string().trim().min(1).max(2000),
  page: z.string().trim().max(200).optional().default('/pricing'),
  visible: z.boolean().optional().default(true),
});

export const industrySchema = z.object({
  slug: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(200),
  iconName: iconSchema,
  blurb: z.string().trim().min(1).max(1000),
  appSlug: z.string().trim().max(200).optional(),
  ctaLabel: z.string().trim().max(100).optional(),
  ctaHref: z.string().trim().max(300).optional(),
  visible: z.boolean().optional().default(true),
});

export const caseStudySchema = z.object({
  slug: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(200),
  result: z.string().trim().min(1).max(300),
  detail: z.string().trim().min(1).max(1000),
  logoUrl: z.string().trim().max(500).optional(),
  metricIconName: iconSchema.optional(),
  visible: z.boolean().optional().default(true),
});

export const resourceSchema = z.object({
  slug: z.string().trim().min(1).max(100),
  type: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(300),
  description: z.string().trim().min(1).max(1000),
  iconName: iconSchema,
  url: z.string().trim().max(500).optional(),
  visible: z.boolean().optional().default(true),
});

export interface CollectionDef {
  model: 'navLink' | 'feature' | 'testimonial' | 'pricingTier' | 'faqItem' | 'industry' | 'caseStudy' | 'resource';
  // z.ZodObject's generic signature varies across zod versions; keep this
  // registry-level type loose (schemas are still individually well-typed
  // above) so `.partial()`/spreading work regardless of the exact version.
  schema: z.ZodObject<Record<string, z.ZodTypeAny>>;
  uniqueOn?: 'slug';
}

export const COLLECTIONS: Record<string, CollectionDef> = {
  navigation: { model: 'navLink', schema: navLinkSchema },
  features: { model: 'feature', schema: featureSchema, uniqueOn: 'slug' },
  testimonials: { model: 'testimonial', schema: testimonialSchema },
  pricing: { model: 'pricingTier', schema: pricingTierSchema, uniqueOn: 'slug' },
  faqs: { model: 'faqItem', schema: faqItemSchema },
  industries: { model: 'industry', schema: industrySchema, uniqueOn: 'slug' },
  'case-studies': { model: 'caseStudy', schema: caseStudySchema, uniqueOn: 'slug' },
  resources: { model: 'resource', schema: resourceSchema, uniqueOn: 'slug' },
};

export type CollectionId = keyof typeof COLLECTIONS;

export function getPrismaDelegate(collectionId: string) {
  const def = COLLECTIONS[collectionId];
  if (!def) return null;
  return { def, delegate: (prisma as any)[def.model] };
}
