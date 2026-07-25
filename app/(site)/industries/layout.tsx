import type { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('/industries', {
    title: 'Industries | UniERP',
    description: 'UniERP workflows tailored for Healthcare, Education, Real Estate, Field Service, and Retail & Manufacturing.',
  });
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
