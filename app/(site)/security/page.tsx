'use client';

import Link from 'next/link';
import { Shield, Lock, FileCheck, CheckCircle2, Server, Eye } from 'lucide-react';

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
            { icon: Lock, title: 'Data Encryption', desc: 'All data is encrypted at rest using AES-256 and in transit using TLS 1.2+.' },
            { icon: FileCheck, title: 'SOC 2 Type II', desc: 'We maintain SOC 2 Type II compliance, audited annually by independent third parties.' },
            { icon: Server, title: 'Global Infrastructure', desc: 'Hosted on AWS with multi-AZ redundancy and automated daily encrypted backups.' },
            { icon: CheckCircle2, title: 'GDPR & CCPA', desc: 'Full compliance with global privacy frameworks. You own your data.' },
            { icon: Shield, title: 'Penetration Testing', desc: 'Continuous vulnerability scanning and bi-annual third-party penetration tests.' },
            { icon: Eye, title: 'Audit Logging', desc: 'Comprehensive audit trails for all user actions, available for export and analysis.' },
          ].map(f => (
            <div key={f.title} className="glass-panel hover-lift" style={{ padding: '2rem' }}>
              <f.icon size={28} color="var(--color-primary)" style={{ marginBottom: '1.25rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>{f.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', background: 'var(--color-surface)' }}>
          <h2 className="section-title">Need our compliance documents?</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Enterprise customers can request our full security whitepaper, SOC 2 report, and penetration testing summaries.
          </p>
          <Link href="/contact" className="btn-primary btn-ripple">
            Request Security Pack
          </Link>
        </div>
      </section>
    </div>
  );
}
