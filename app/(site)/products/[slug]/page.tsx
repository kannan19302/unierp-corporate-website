import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ALL_MODULES } from '@/lib/productCatalog';
import { Reveal } from '@/components/site/Reveal';

export function generateStaticParams() {
  return ALL_MODULES.map((m) => ({ slug: m.slug }));
}

const TIER_LABEL: Record<string, string> = { core: 'Core Module', 'early-access': 'Early Access' };

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = ALL_MODULES.find((m) => m.slug === slug);
  if (!mod) notFound();

  return (
    <div>
      <section className="page-hero">
        <Link href="/products" className="page-hero-badge hero-enter" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={13} /> All modules
        </Link>
        <h1 className="hero-enter-delay-1">{mod.label}</h1>
        <p className="hero-enter-delay-2">{mod.desc}</p>
      </section>

      <section className="page-section" style={{ paddingBottom: '5rem' }}>
        <Reveal as="div" className="glass-panel" style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem' }}>
          <span className="tier-badge tier-badge-early" style={{ marginBottom: '1rem' }}>{TIER_LABEL[mod.tier]}</span>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>{mod.body}</p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact?type=demo" className="btn-primary btn-ripple">Schedule a demo</Link>
            <Link href="/products" className="btn-secondary">Browse all modules</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
