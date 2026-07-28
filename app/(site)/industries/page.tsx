'use client';

import Link from 'next/link';
import { Building2, Plus, Heart, GraduationCap, Store, Wrench } from 'lucide-react';

const INDUSTRIES = [
  { name: 'Enterprise', slug: 'enterprise', icon: Building2, desc: 'Multi-entity, multi-currency global operations.' },
  { name: 'Healthcare', slug: 'healthcare', icon: Heart, desc: 'Patient management, compliance, and clinical supply chain.' },
  { name: 'Education', slug: 'education', icon: GraduationCap, desc: 'Student lifecycle, curriculum, and campus management.' },
  { name: 'Retail', slug: 'retail', icon: Store, desc: 'Omnichannel POS, inventory, and e-commerce.' },
  { name: 'Manufacturing', slug: 'manufacturing', icon: Plus, desc: 'BOMs, work orders, MRP, and quality control.' },
  { name: 'Field Service', slug: 'field-service', icon: Wrench, desc: 'Dispatching, mobile crew apps, and SLA tracking.' },
];

export default function IndustriesPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-badge hero-enter"><Building2 size={13} /> Solutions by Industry</div>
        <h1 className="hero-enter-delay-1">Tailored for your sector</h1>
        <p className="hero-enter-delay-2">
          UniERP adapts to your industry's unique workflows without expensive custom development.
        </p>
      </section>

      <section className="page-section" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
        <div className="module-grid">
          {INDUSTRIES.map(ind => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className="module-card reveal hover-lift">
              <div className="module-card-icon" style={{ background: 'var(--color-primary-glow)' }}>
                <ind.icon size={20} color="var(--color-primary)" />
              </div>
              <h3 className="module-card-name">{ind.name}</h3>
              <p className="module-card-desc">{ind.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
