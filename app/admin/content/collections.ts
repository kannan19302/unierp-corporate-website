import { Palette, Menu, FileStack, Boxes, BadgeIndianRupee, Quote, HelpCircle, Building2, TrendingUp, BookOpen, Split, Languages } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ContentCollectionMeta {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  kind: 'singleton' | 'list' | 'pages' | 'ab-testing' | 'i18n';
}

export const CONTENT_COLLECTIONS: ContentCollectionMeta[] = [
  { id: 'branding', label: 'Branding & Theme', icon: Palette, kind: 'singleton' },
  { id: 'navigation', label: 'Navigation', icon: Menu, kind: 'list' },
  { id: 'pages', label: 'Pages & Sections', icon: FileStack, kind: 'pages' },
  { id: 'i18n', label: 'AI Translation Studio', icon: Languages, kind: 'i18n' },
  { id: 'ab-testing', label: 'A/B Testing Studio', icon: Split, kind: 'ab-testing' },
  { id: 'features', label: 'Features', icon: Boxes, kind: 'list' },
  { id: 'pricing', label: 'Pricing Tiers', icon: BadgeIndianRupee, kind: 'list' },
  { id: 'testimonials', label: 'Testimonials', icon: Quote, kind: 'list' },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle, kind: 'list' },
  { id: 'industries', label: 'Industries', icon: Building2, kind: 'list' },
  { id: 'case-studies', label: 'Case Studies', icon: TrendingUp, kind: 'list' },
  { id: 'resources', label: 'Resources', icon: BookOpen, kind: 'list' },
];
