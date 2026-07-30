import type { Metadata } from 'next';
import { ProductsClient } from './ProductsClient';

export const metadata: Metadata = {
  title: 'UniERP Products — Core & Early-Access ERP Modules',
  description: 'Explore all UniERP modules: Finance, HR, CRM, Inventory, Manufacturing, Projects, Supply Chain, and more enterprise applications.',
};

export default function ProductsPage() {
  return <ProductsClient />;
}
