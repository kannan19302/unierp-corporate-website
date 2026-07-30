'use client';

import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { INDUSTRY_APPS } from '@/lib/productCatalog';

export default function IndustriesPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-badge hero-enter"><Building2 size={13} /> Solutions by Industry</div>
        <h1 className="hero-enter-delay-1">Tailored for your sector</h1>
        <p className="hero-enter-delay-2">
          Early-access industry apps built on the UniERP core platform. These are newer, focused
          services — expect fast iteration as we deepen each one.
        </p>
      </section>

      <section className="page-section" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
        <div className="module-grid">
          {INDUSTRY_APPS.map((ind) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className="module-card reveal hover-lift">
              <span className="tier-badge tier-badge-early">Early Access</span>
              <h3 className="module-card-name">{ind.label}</h3>
              <p className="module-card-desc">{ind.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
