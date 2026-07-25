import type { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('/contact', {
    title: 'Contact Sales | UniERP',
    description: 'Talk to a UniERP specialist and get a demo tailored to your business.',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
