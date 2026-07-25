import type { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('/product', {
    title: 'Product — 28+ ERP Modules | UniERP',
    description: 'Explore UniERP’s 28+ composable ERP modules: finance & GST, inventory, manufacturing, CRM, HR, and more.',
  });
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
