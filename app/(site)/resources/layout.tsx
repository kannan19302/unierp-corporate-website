import type { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('/resources', {
    title: 'Resources | UniERP',
    description: 'Guides, webinars, and playbooks on GST compliance, ERP selection, and running a leaner business.',
  });
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
