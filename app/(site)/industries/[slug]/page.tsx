import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { INDUSTRY_APPS } from '@/lib/productCatalog';
import { Reveal } from '@/components/site/Reveal';

export function generateStaticParams() {
  return INDUSTRY_APPS.map((i) => ({ slug: i.slug }));
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = INDUSTRY_APPS.find((i) => i.slug === slug);
  if (!industry) notFound();

  return (
    <div>
      <section className="page-hero">
        <Link href="/industries" className="page-hero-badge hero-enter" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={13} /> All industries
        </Link>
        <h1 className="hero-enter-delay-1">{industry.label}</h1>
        <p className="hero-enter-delay-2">{industry.desc}</p>
      </section>

      <section className="page-section" style={{ paddingBottom: '5rem' }}>
        <Reveal as="div" className="glass-panel" style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem' }}>
          <span className="tier-badge tier-badge-early" style={{ marginBottom: '1rem' }}>Early Access</span>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>{industry.body}</p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/contact" className="btn-primary btn-ripple">Talk to us about {industry.label}</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
