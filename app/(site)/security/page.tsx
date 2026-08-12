'use client';

import Link from 'next/link';
import { Shield, Lock, FileCheck, CheckCircle2, Server, Eye } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';

export default function SecurityPage() {
  return (
    <div>
      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero-badge hero-enter"><Shield size={13} /> Trust & Security</div>
        <h1 className="hero-enter-delay-1">Enterprise-grade security</h1>
        <p className="hero-enter-delay-2">
          Your data is your most valuable asset. We treat it with the highest level of security, privacy, and compliance.
        </p>
      </section>

      <section className="page-section" style={{ paddingTop: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {[
            { icon: Lock, title: 'Data Encryption', desc: 'Secrets and sensitive fields are encrypted at rest with AES-256-GCM. Traffic to the platform is encrypted in transit.' },
            { icon: FileCheck, title: 'Compliance Roadmap', desc: 'We do not yet hold a SOC 2 Type II or ISO 27001 certification. Our current compliance scope and target dates are documented and available on request.' },
            { icon: Server, title: 'Infrastructure', desc: 'Tenant data is isolated per organization at the application layer.' },
            { icon: CheckCircle2, title: 'Privacy Controls', desc: 'Tenant-scoped data export and erasure tooling for GDPR-style requests. We are not claiming full certified compliance with any specific privacy framework.' },
            { icon: Shield, title: 'Security Testing', desc: 'Internal security review is part of our development process. We have not yet commissioned a third-party penetration test.' },
            { icon: Eye, title: 'Audit Logging', desc: 'Admin actions are recorded to an audit trail.' },
          ].map((f, i) => (
            <Reveal key={f.title} as="div" className="glass-panel hover-lift" delay={i * 60} style={{ padding: '2rem' }}>
              <f.icon size={28} color="var(--color-primary)" style={{ marginBottom: '1.25rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>{f.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section">
        <Reveal as="div" className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', background: 'var(--color-surface)' }}>
          <h2 className="section-title">Questions about our security posture?</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Enterprise customers can request our current security overview, including what is and is not yet certified.
          </p>
          <Link href="/contact" className="btn-primary btn-ripple">
            Request Security Overview
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
