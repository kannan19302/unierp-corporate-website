'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  FileCheck,
  CheckCircle2,
  Server,
  Eye,
  ArrowRight,
  Database,
  Key,
  RefreshCw,
  Globe,
  Activity,
  Users,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

const SECURITY_PILLARS = [
  {
    icon: Database,
    title: 'PostgreSQL Row-Level Security (RLS)',
    desc: 'Inviolable tenant isolation enforced at the database kernel level. Every SQL query automatically filters by cryptographic tenant context.',
  },
  {
    icon: Lock,
    title: 'AES-256 GCM & TLS 1.3 Encryption',
    desc: 'All data at rest is encrypted with envelope key encryption (AES-256-GCM). All traffic in transit requires TLS 1.3 with Perfect Forward Secrecy.',
  },
  {
    icon: Key,
    title: 'Zero-Trust Single Sign-On (SSO)',
    desc: 'Native support for OIDC, SAML 2.0, Microsoft Azure AD, Okta, and Google Workspace with mandatory Multi-Factor Authentication (MFA).',
  },
  {
    icon: Eye,
    title: 'Cryptographic Audit Trails',
    desc: 'Immutable, tamper-evident audit logs recording every create, update, delete, and read operation across all financial ledgers.',
  },
  {
    icon: Server,
    title: 'Data Sovereignty & Hybrid Cloud',
    desc: 'Choose your deployment model: Dedicated AWS/GCP VPC, isolated EU/US regional partitions, or air-gapped on-premise Kubernetes Helm charts.',
  },
  {
    icon: RefreshCw,
    title: 'Automated Multi-Region Backups',
    desc: 'Point-in-time recovery (PITR) with continuous write-ahead log replication and automated hourly snapshots stored across redundant availability zones.',
  },
];

export default function SecurityPage() {
  useAnalytics('/security');

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. SECURITY HERO ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4.5rem 1.5rem 3rem', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(37, 99, 235, 0.08)',
            color: '#2563eb',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          <Shield size={13} />
          <span>Trust &amp; Enterprise Compliance</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.85rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.035em',
            margin: '0 0 1rem',
            color: 'var(--color-text-main)',
          }}
        >
          Enterprise-grade security.<br />
          <span style={{ color: '#2563eb' }}>Built for trust.</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Your enterprise data is protected with bank-grade encryption, database-level multi-tenant isolation, and continuous compliance standards.
        </p>

        {/* Badges Pill Row */}
        <div className="ref-security-badges">
          {[
            { label: 'ISO 27001 Certified', icon: Shield },
            { label: 'SOC 2 Compliant', icon: Lock },
            { label: 'GDPR Ready', icon: Globe },
            { label: '99.9% Uptime SLA', icon: Activity },
            { label: 'Role-based Access Control', icon: Users },
            { label: 'End-to-end Data Encryption', icon: Database },
            { label: 'Regular Backups', icon: RefreshCw },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="ref-security-pill">
                <Icon size={16} color="#2563eb" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 2. SECURITY PILLARS ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
          {SECURITY_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-card-border)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: 'var(--glass-shadow)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(37, 99, 235, 0.08)',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 3. RLS CODE ARCHITECTURE CARD ═══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div className="ref-hybrid-cloud-card" style={{ gridTemplateColumns: '1.1fr 1fr' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#60a5fa', marginBottom: '0.5rem' }}>
              Database Kernel Isolation
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 1rem', color: '#ffffff' }}>
              PostgreSQL Row-Level Security
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
              Unlike multi-tenant applications that rely on application-level WHERE clauses, UniERP enforces isolation directly inside the PostgreSQL database engine.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['100% Policy Enforced', 'Zero Data Bleed', 'Cryptographic Partitioning'].map((tag) => (
                <span key={tag} style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' }}>
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#040711',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>-- PostgreSQL Tenant Isolation Engine</div>
            <div style={{ color: '#60a5fa' }}>CREATE POLICY tenant_isolation ON enterprise_records</div>
            <div style={{ color: '#cbd5e1' }}>  FOR ALL</div>
            <div style={{ color: '#cbd5e1' }}>  USING (tenant_id = current_setting(&apos;app.current_tenant_id&apos;)::uuid);</div>
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} /> Active on all 43 schema tables
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. FINAL SECURITY CTA ═══ */}
      <section style={{ padding: '0 1.5rem 6rem' }}>
        <div className="ref-royal-cta">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              margin: '0 0 1rem',
              color: '#ffffff',
            }}
          >
            Request our Enterprise Security Whitepaper
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Get detailed documentation on our encryption architecture, vulnerability scanning, and compliance roadmaps.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=security" className="btn-royal-white">
              <span>Request Security Package</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=demo" className="btn-royal-outline">
              <span>Book Architecture Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
