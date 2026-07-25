import type { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('/customers', {
    title: 'Customer Stories | UniERP',
    description: 'Real results from businesses running finance, inventory, and payroll on UniERP.',
  });
}

export default function CustomersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
