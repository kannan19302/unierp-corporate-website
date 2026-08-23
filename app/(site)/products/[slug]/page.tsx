import { notFound } from 'next/navigation';
import { ALL_MODULES } from '@/lib/productCatalog';
import { ProductDetailClient } from './ProductDetailClient';

export function generateStaticParams() {
  return ALL_MODULES.map((m) => ({ slug: m.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = ALL_MODULES.find((m) => m.slug === slug);
  if (!mod) notFound();

  return <ProductDetailClient module={mod} />;
}
