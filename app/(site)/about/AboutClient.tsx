'use client';

import Link from 'next/link';
import { Rocket, Globe, Users, ArrowRight, Star, Shield, Zap, Heart } from 'lucide-react';

const VALUES = [
  { icon: Rocket, title: 'Move Fast, Ship Quality', desc: 'We build enterprise software at startup velocity — with zero compromise on production readiness.' },
  { icon: Globe, title: 'Global by Default', desc: 'Multi-currency, multi-language, multi-entity. Built for businesses that operate across borders.' },
  { icon: Shield, title: 'Security First', desc: 'SOC 2, GDPR, HIPAA-ready. Your data is yours — fully encrypted, audited, and never sold.' },
  { icon: Heart, title: 'Customer Obsessed', desc: 'Every feature starts with a customer problem. Our support team is an extension of your team.' },
  { icon: Users, title: 'Open Collaboration', desc: 'We build in public, share roadmaps openly, and treat customer feedback as our product spec.' },
  { icon: Zap, title: 'Composable Architecture', desc: 'Install only what you need. UniERP grows with your business, not the other way around.' },
];

const TEAM = [
  { name: 'Priya Krishnamurthy', role: 'CEO & Co-Founder', initials: 'PK', color: '#4f46e5' },
  { name: 'Akira Tanaka', role: 'CTO & Co-Founder', initials: 'AT', color: '#2563eb' },
  { name: 'Santiago Reyes', role: 'Chief Product Officer', initials: 'SR', color: '#7c3aed' },
  { name: 'Amara Osei', role: 'VP of Engineering', initials: 'AO', color: '#059669' },
  { name: 'Elena Vasquez', role: 'Head of Design', initials: 'EV', color: '#d97706' },
  { name: 'James Okafor', role: 'VP of Customer Success', initials: 'JO', color: '#dc2626' },
  { name: 'Mei-Lin Zhang', role: 'Head of Finance', initials: 'MZ', color: '#7c3aed' },
  { name: 'David Müller', role: 'Head of Partnerships', initials: 'DM', color: '#0891b2' },
];

const STATS = [
  { num: '2,500+', label: 'Businesses served' },
  { num: '24', label: 'ERP modules' },
  { num: '19', label: 'Countries' },
  { num: '99.97%', label: 'Uptime SLA' },
];

export function AboutClient() {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="page-hero-badge hero-enter"><Globe size={13} /> About UniERP</div>
        <h1 className="hero-enter-delay-1">
          Building the ERP platform<br />
          <span className="text-gradient">businesses deserve</span>
        </h1>
        <p className="hero-enter-delay-2">
          We believe enterprise software should be powerful, composable, and beautiful —
          not bloated, expensive, or painful to use. That&apos;s why we built UniERP.
        </p>
        <div className="hero-enter-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/careers" className="btn-primary btn-ripple">
            <Rocket size={16} /> Join the Team
          </Link>
          <Link href="/contact" className="btn-secondary">
            Talk to us <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="page-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="stats-row">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item reveal">
              <span className="stat-number">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="page-section" style={{ paddingTop: '0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'
        }}>
          <div className="reveal reveal-left">
            <div className="page-hero-badge" style={{ margin: '0 0 1.5rem' }}>
              <Star size={13} /> Our Mission
            </div>
            <h2 className="section-title">
              Democratize enterprise-grade ERP for every business
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Legacy ERP systems cost millions to implement and require armies of consultants.
              UniERP changes that. We ship production-ready ERP features at a fraction of the cost,
              with zero implementation chaos.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Our modular platform means you install only what you need today,
              and add modules as your business grows — Finance, HR, CRM, Manufacturing,
              Supply Chain, and 40+ more.
            </p>
            <Link href="/products" className="btn-primary btn-ripple">
              Explore Platform <ArrowRight size={15} />
            </Link>
          </div>
          <div className="reveal reveal-right">
            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--color-surface)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Founded', value: '2022' },
                  { label: 'HQ', value: 'Remote-first' },
                  { label: 'Team size', value: '85+' },
                  { label: 'Funding', value: 'Series A' },
                  { label: 'Customers', value: '2,500+' },
                  { label: 'Countries', value: '19' },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: 'var(--color-card)', border: '1px solid var(--glass-border)',
                    borderRadius: '12px', padding: '1rem', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>{value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)', marginTop: '0.25rem' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--color-surface)', padding: '5rem 1.5rem' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="page-hero-badge" style={{ margin: '0 auto 1.5rem' }}>Our Values</div>
            <div className="section-title">What we stand for</div>
          </div>
          <div className="module-grid">
            {VALUES.map((v) => (
              <div key={v.title} className="module-card reveal hover-lift" style={{ cursor: 'default' }}>
                <div className="module-card-icon" style={{ background: 'var(--color-primary-glow)' }}>
                  <v.icon size={20} color="var(--color-primary)" />
                </div>
                <div className="module-card-name">{v.title}</div>
                <div className="module-card-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="page-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="page-hero-badge" style={{ margin: '0 auto 1.5rem' }}>
            <Users size={13} /> Leadership Team
          </div>
          <div className="section-title">Meet the builders</div>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Former engineers and operators from top ERP, SaaS, and enterprise software companies.
          </p>
        </div>
        <div className="team-grid">
          {TEAM.map((m) => (
            <div key={m.name} className="team-card reveal">
              <div className="team-avatar" style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}88)` }}>
                {m.initials}
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/careers" className="btn-secondary">
            <Rocket size={15} /> View open roles
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 1.5rem 6rem', textAlign: 'center' }}>
        <div className="glass-panel cta-glow" style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Ready to join 2,500+ businesses on UniERP?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Start your free trial today or talk to our team.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary btn-ripple">
              Get Started Free <ArrowRight size={15} />
            </Link>
            <Link href="/customers" className="btn-secondary">
              Read customer stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
