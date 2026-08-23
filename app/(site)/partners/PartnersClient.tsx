'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Handshake,
  Award,
  Globe,
  ArrowRight,
  CheckCircle2,
  Check,
  Search,
  Sparkles,
  Users,
  Briefcase,
  Layers,
  X,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

interface Partner {
  name: string;
  tier: 'Diamond Implementation Partner' | 'Gold Certified Partner' | 'Technology Alliance';
  region: string;
  industries: string[];
  certifiedEngineers: number;
  logo: string;
}

const PARTNERS_LIST: Partner[] = [
  {
    name: 'Cognitive Enterprise Systems',
    tier: 'Diamond Implementation Partner',
    region: 'India / Southeast Asia',
    industries: ['Discrete Manufacturing', 'Wholesale Distribution'],
    certifiedEngineers: 45,
    logo: 'CES',
  },
  {
    name: 'Apex Advisory & ERP Solutions',
    tier: 'Diamond Implementation Partner',
    region: 'Middle East & Europe',
    industries: ['Healthcare & Life Sciences', 'Financial Services'],
    certifiedEngineers: 38,
    logo: 'AA',
  },
  {
    name: 'OmniCloud Systems Integrators',
    tier: 'Gold Certified Partner',
    region: 'North America / APAC',
    industries: ['Omnichannel Retail', 'Field Services'],
    certifiedEngineers: 22,
    logo: 'OSI',
  },
  {
    name: 'Vanguard FinTech Consulting',
    tier: 'Gold Certified Partner',
    region: 'India & GCC',
    industries: ['Banking & NBFC', 'Education & Universities'],
    certifiedEngineers: 18,
    logo: 'VFC',
  },
];

export function PartnersClient() {
  useAnalytics('/partners');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCompany, setApplicantCompany] = useState('');
  const [partnerType, setPartnerType] = useState('Implementation');
  const [submitted, setSubmitted] = useState(false);

  const filteredPartners = PARTNERS_LIST.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.region.toLowerCase().includes(search.toLowerCase()) ||
      p.industries.some((i) => i.toLowerCase().includes(search.toLowerCase()))
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantCompany('');
    }, 2500);
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. HERO ═══ */}
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
          <Handshake size={13} />
          <span>UniERP Partner &amp; Integrator Network</span>
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
          Grow Your Enterprise Practice with <span style={{ color: '#2563eb' }}>UniERP</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Join leading system integrators, accounting advisory firms, and technology consultants building recurring enterprise practices on UniERP composable platform.
        </p>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            padding: '0.85rem 2rem',
            borderRadius: '10px',
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
          }}
        >
          <span>Apply to Become a Partner</span>
          <ArrowRight size={16} />
        </button>
      </section>

      {/* ═══ 2. TIERED PARTNER PROGRAMS ═══ */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {[
            {
              tier: 'Certified Implementation Partner',
              desc: 'For consulting and ERP engineering firms delivering end-to-end migrations, custom workflows, and white-glove deployments.',
              perks: ['Up to 30% recurring margin share', 'Dedicated Technical Partner Manager', 'Co-selling enterprise leads', 'Sandbox developer licenses'],
            },
            {
              tier: 'Value-Added Reseller (VAR)',
              desc: 'For regional software distributors and IT solution providers packaging UniERP with local cloud hosting and Level 1 support.',
              perks: ['Exclusive regional exclusivity', 'Co-branded marketing collateral', 'Tiered margin incentives', 'Priority executive deal desk support'],
            },
            {
              tier: 'Technology & ISV Alliance',
              desc: 'For SaaS vendors, payment gateways, IoT sensor providers, and fintech platforms building certified connectors in our marketplace.',
              perks: ['Direct Marketplace featured listing', 'Early access to core REST APIs & SDKs', 'Joint press releases & webinars', 'Verified security badge'],
            },
          ].map((prog) => (
            <div
              key={prog.tier}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '20px',
                padding: '2.25rem',
                boxShadow: 'var(--glass-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.75rem' }}>
                  {prog.tier}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                  {prog.desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                  {prog.perks.map((p) => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                      <CheckCircle2 size={15} color="#2563eb" style={{ flexShrink: 0 }} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPartnerType(prog.tier);
                  setModalOpen(true);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-main)',
                  border: '1px solid var(--color-card-border)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                Apply for {prog.tier.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. CERTIFIED PARTNER DIRECTORY ═══ */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem' }}>
            Find a Certified UniERP Partner
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
            Connect with verified systems integrators for regional implementation and consulting.
          </p>

          <div style={{ maxWidth: '480px', margin: '1.5rem auto 0', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="search"
              placeholder="Search by partner name, region, or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: '9999px',
                border: '1px solid var(--color-card-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                fontSize: '0.9rem',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredPartners.map((part) => (
            <div
              key={part.name}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: 'var(--glass-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', color: '#ffffff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {part.logo}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>{part.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 700 }}>{part.tier}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                  📍 {part.region} · 🎓 <strong>{part.certifiedEngineers} Certified Pros</strong>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {part.industries.map((ind) => (
                    <span key={ind} style={{ fontSize: '0.72rem', background: 'var(--color-bg)', padding: '0.2rem 0.5rem', borderRadius: '6px', color: 'var(--color-text-main)' }}>
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/contact?partner=${encodeURIComponent(part.name)}`}
                style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  textDecoration: 'none',
                }}
              >
                <span>Request Introduction</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PARTNER APPLICATION MODAL ═══ */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
              Partner Application
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 1.5rem' }}>
              Join the UniERP Certified Partner Network ({partnerType}).
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  textAlign: 'center',
                  color: '#059669',
                }}
              >
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#065f46' }}>
                  Application Received!
                </div>
                <p style={{ fontSize: '0.82rem', color: '#047857', margin: '0.25rem 0 0' }}>
                  Our Global Alliances team will reach out to {applicantEmail} within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-card-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Consulting"
                    value={applicantCompany}
                    onChange={(e) => setApplicantCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-card-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@company.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-card-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  Submit Partner Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
