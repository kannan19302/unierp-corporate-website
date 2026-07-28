'use client';

import Link from 'next/link';
import { Rocket, MapPin, Clock, ArrowRight, Heart, Zap, Globe, Coffee } from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Senior Full Stack Engineer (Next.js/NestJS)', dept: 'Engineering', loc: 'Remote (EMEA/US)', type: 'Full-time' },
  { id: 2, title: 'Product Manager, ERP Core', dept: 'Product', loc: 'Remote (US)', type: 'Full-time' },
  { id: 3, title: 'Senior Product Designer', dept: 'Design', loc: 'Remote (Global)', type: 'Full-time' },
  { id: 4, title: 'Enterprise Account Executive', dept: 'Sales', loc: 'New York / Remote', type: 'Full-time' },
  { id: 5, title: 'Customer Success Manager', dept: 'Support', loc: 'Remote (APAC)', type: 'Full-time' },
  { id: 6, title: 'Developer Advocate', dept: 'Developer Relations', loc: 'Remote (Global)', type: 'Full-time' },
];

const PERKS = [
  { icon: Globe, title: 'Work anywhere', desc: 'We are a remote-first team spread across 19 countries. Work from wherever you are happiest.' },
  { icon: Heart, title: 'Comprehensive health', desc: 'Premium medical, dental, and vision coverage for you and your dependents.' },
  { icon: Clock, title: 'Flexible time off', desc: 'Take the time you need to recharge. We mandate a minimum of 4 weeks off per year.' },
  { icon: Coffee, title: 'Home office stipend', desc: '$1,000 setup budget plus a monthly stipend for internet and co-working spaces.' },
];

export function CareersClient() {
  return (
    <div>
      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero-badge hero-enter"><Rocket size={13} /> Join the Team</div>
        <h1 className="hero-enter-delay-1">Build the future of enterprise software</h1>
        <p className="hero-enter-delay-2">
          We're looking for passionate builders who want to democratize ERP and make business software beautiful.
        </p>
      </section>

      {/* Perks */}
      <section className="page-section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
        <div className="module-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {PERKS.map(p => (
            <div key={p.title} className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto 1.25rem', background: 'var(--color-primary-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p.icon size={24} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>{p.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section className="page-section" style={{ background: 'var(--color-surface)', borderRadius: '24px', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title">Open Roles</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Don't see a perfect fit? Send your resume to careers@unierp.com</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '860px', margin: '0 auto' }}>
          {JOBS.map(job => (
            <Link key={job.id} href={`/careers/${job.id}`} className="module-card reveal hover-lift" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', background: 'var(--color-card)' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{job.title}</h3>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-subtle)', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} /> {job.loc}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {job.type}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="status-pill status-operational" style={{ background: 'var(--color-primary-glow)', color: 'var(--color-primary)' }}>{job.dept}</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-surface)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
