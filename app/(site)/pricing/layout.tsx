import type { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('/pricing', {
    title: 'Pricing — Transparent ERP Plans | UniERP',
    description: 'Transparent UniERP pricing in INR and USD. Start a 30-day free trial, no credit card required.',
  });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
