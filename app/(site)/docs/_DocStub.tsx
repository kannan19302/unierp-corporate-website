import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';

export function DocStub({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <Link href="/docs" className="page-hero-badge hero-enter" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={13} /> Documentation
        </Link>
        <h1 className="hero-enter-delay-1">{title}</h1>
        <p className="hero-enter-delay-2">{desc}</p>
      </section>
      <section className="page-section" style={{ paddingBottom: '5rem' }}>
        <Reveal as="div" className="glass-panel" style={{ maxWidth: '640px', margin: '0 auto', padding: '2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
            This section is being actively written. In the meantime, our team can walk you through it directly.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/contact" className="btn-primary btn-ripple">Talk to us</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
