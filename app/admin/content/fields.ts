import { ICON_NAMES } from '@/lib/icon-registry';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'icon' | 'string-list' | 'select';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export const COLLECTION_FIELDS: Record<string, FieldDef[]> = {
  navigation: [
    { name: 'label', label: 'Label', type: 'text', required: true },
    { name: 'href', label: 'URL / Path', type: 'text', required: true, placeholder: '/pricing' },
    { name: 'placement', label: 'Placement', type: 'select', options: ['HEADER', 'FOOTER', 'LEGAL'], required: true },
    { name: 'group', label: 'Footer group (footer links only)', type: 'text', placeholder: 'Product' },
    { name: 'external', label: 'External link', type: 'boolean' },
    { name: 'openInNewTab', label: 'Open in new tab', type: 'boolean' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
  features: [
    { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'finance' },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'category', label: 'Category (internal key)', type: 'text', required: true, placeholder: 'ops' },
    { name: 'categoryLabel', label: 'Category label (shown as filter tab)', type: 'text', placeholder: 'Core Operations' },
    { name: 'iconName', label: 'Icon', type: 'icon', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'highlighted', label: 'Highlight on home page', type: 'boolean' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
  testimonials: [
    { name: 'quote', label: 'Quote', type: 'textarea', required: true },
    { name: 'authorName', label: 'Author name', type: 'text', required: true },
    { name: 'authorTitle', label: 'Author title', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'avatarUrl', label: 'Avatar URL', type: 'text' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
  pricing: [
    { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'starter' },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'blurb', label: 'Blurb', type: 'textarea' },
    { name: 'priceInrAnnual', label: 'Price INR (annual)', type: 'number' },
    { name: 'priceInrMonthly', label: 'Price INR (monthly)', type: 'number' },
    { name: 'priceUsdAnnual', label: 'Price USD (annual)', type: 'number' },
    { name: 'priceUsdMonthly', label: 'Price USD (monthly)', type: 'number' },
    { name: 'priceLabelOverride', label: 'Price label override (e.g. "Custom Quote")', type: 'text' },
    { name: 'unitLabel', label: 'Unit label', type: 'text', placeholder: '/ user / month' },
    { name: 'ctaLabel', label: 'CTA label', type: 'text', required: true },
    { name: 'ctaHref', label: 'CTA link (optional, else opens lead modal)', type: 'text' },
    { name: 'highlight', label: 'Highlight tier', type: 'boolean' },
    { name: 'features', label: 'Feature bullets', type: 'string-list' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
  faqs: [
    { name: 'question', label: 'Question', type: 'text', required: true },
    { name: 'answer', label: 'Answer', type: 'textarea', required: true },
    { name: 'page', label: 'Shown on page', type: 'text', placeholder: '/pricing' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
  industries: [
    { name: 'slug', label: 'Slug', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'iconName', label: 'Icon', type: 'icon', required: true },
    { name: 'blurb', label: 'Description', type: 'textarea', required: true },
    { name: 'appSlug', label: 'Linked app (optional)', type: 'text' },
    { name: 'ctaLabel', label: 'CTA label', type: 'text' },
    { name: 'ctaHref', label: 'CTA link', type: 'text' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
  'case-studies': [
    { name: 'slug', label: 'Slug', type: 'text', required: true },
    { name: 'company', label: 'Company', type: 'text', required: true },
    { name: 'result', label: 'Result headline', type: 'text', required: true, placeholder: '60% faster GST reconciliation' },
    { name: 'detail', label: 'Detail', type: 'textarea', required: true },
    { name: 'logoUrl', label: 'Logo URL', type: 'text' },
    { name: 'metricIconName', label: 'Metric icon', type: 'icon' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
  resources: [
    { name: 'slug', label: 'Slug', type: 'text', required: true },
    { name: 'type', label: 'Type', type: 'text', placeholder: 'Guide' },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'iconName', label: 'Icon', type: 'icon', required: true },
    { name: 'url', label: 'URL', type: 'text' },
    { name: 'visible', label: 'Visible', type: 'boolean' },
  ],
};

export { ICON_NAMES };
