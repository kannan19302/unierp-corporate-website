import type { Metadata } from 'next';
import { ProductsClient } from './ProductsClient';

export const metadata: Metadata = {
  title: 'UniERP Products — 45+ Enterprise ERP Modules',
  description: 'Explore all UniERP modules: Finance, HR, CRM, Inventory, Manufacturing, Projects, Supply Chain, and 40+ more enterprise applications.',
};

export default function ProductsPage() {
  return <ProductsClient />;
}
