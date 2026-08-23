'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Hammer,
  Store,
  Truck,
  Briefcase,
  Heart,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Building2,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

const INDUSTRIES = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Heavy Industry',
    icon: Hammer,
    desc: 'Discrete & process manufacturing with strict BOM versioning, shop floor routing, and predictive MRP scheduling.',
    highlights: ['Multi-level Bill of Materials (BOM)', 'Shop Floor Work Order Telemetry', 'Predictive Material Requirements (MRP)', 'Scrap & Yield Analysis'],
    compliance: 'ISO 9001 · GMP · Lean Six Sigma',
  },
  {
    slug: 'retail',
    name: 'Retail & Wholesale',
    icon: Store,
    desc: 'Omnichannel inventory sync, offline-first POS registers, multi-store pricing, and customer loyalty management.',
    highlights: ['Offline-First POS Register Grid', 'Barcode & RFID Scanner Sync', 'Omnichannel Customer Loyalty Points', 'Real-Time Multi-Store Rebalancing'],
    compliance: 'PCI-DSS Level 1 · GS1 Barcode Standards',
  },
  {
    slug: 'distribution',
    name: 'Distribution & Logistics',
    icon: Truck,
    desc: 'Multi-warehouse logistics, route planning, fleet tracking, 3PL integrations, and automated 3-way carrier matching.',
    highlights: ['Route & Fleet Dispatch Tracking', 'Multi-Warehouse Cross-Docking', 'Automated Freight Cost Apportionment', 'EDI 850 / 856 Order Exchange'],
    compliance: 'IATA Cargo · GS1 · Incoterms 2020',
  },
  {
    slug: 'services',
    name: 'Professional Services',
    icon: Briefcase,
    desc: 'Milestone invoicing, billable hours tracking, interactive Gantt charts, EVM project accounting, and CRM pipelines.',
    highlights: ['Earned Value Management (EVM)', 'Billable Timesheet Approvals', 'Client Retainer Milestone Billing', 'Consultant Utilization & Margins'],
    compliance: 'SOX Section 404 · IFRS 15 Revenue Recognition',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & Life Sciences',
    icon: Heart,
    desc: 'Clinical scheduling, doctor shift rostering, medical asset calibration, and patient record partitions.',
    highlights: ['Electronic Patient Health Records', 'Doctor & Specialist Shift Rostering', 'Medical Asset Calibration Logs', 'HIPAA & GDPR Isolated Partitions'],
    compliance: 'HIPAA · FDA 21 CFR Part 11 · HL7 / FHIR',
  },
  {
    slug: 'education',
    name: 'Education & Campus Management',
    icon: GraduationCap,
    desc: 'Student admissions, tuition fee schedules, faculty payroll, campus housing, and examination reporting.',
    highlights: ['Student Admissions & Enrollment Queue', 'Tuition Installment Automated Runs', 'Faculty Course Allocation & Payroll', 'Alumni Network & Donor Records'],
    compliance: 'FERPA · GDPR · Accredited Standards',
  },
];

export default function IndustriesPage() {
  useAnalytics('/industries');
  const [selectedSlug, setSelectedSlug] = useState(INDUSTRIES[0].slug);
  const selectedInd = INDUSTRIES.find((i) => i.slug === selectedSlug) || INDUSTRIES[0];

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
          <Building2 size={13} />
          <span>Tailored Vertical Blueprints</span>
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
          Built for every <span style={{ color: '#2563eb' }}>industry</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Pre-built industry data models, automated compliance workflows, and operational schemas for zero-friction deployment.
        </p>
      </section>

      {/* ═══ 2. INDUSTRY BLUEPRINTS GRID ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '1rem 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isSelected = selectedSlug === ind.slug;
            return (
              <div
                key={ind.slug}
                onClick={() => setSelectedSlug(ind.slug)}
                style={{
                  background: 'var(--color-surface)',
                  border: `1.5px solid ${isSelected ? '#2563eb' : 'var(--color-card-border)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: 'var(--glass-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
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
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', background: 'var(--color-bg)', color: '#2563eb', border: '1px solid var(--color-card-border)' }}>
                      Pre-Configured
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
                    {ind.name}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                    {ind.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {ind.highlights.map((h) => (
                      <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                        <CheckCircle2 size={15} color="#2563eb" style={{ flexShrink: 0 }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--color-card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                    {ind.compliance}
                  </span>
                  <Link
                    href={`/contact?type=demo&industry=${ind.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#2563eb',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Request Vertical Demo</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 3. FINAL ROYAL BLUE CTA ═══ */}
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
            Deploy your industry solution in 60 seconds
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Start your 30-day free trial today. Includes pre-configured schemas and sample data for your vertical.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-royal-white">
              <span>Start 30-Day Free Trial</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=demo" className="btn-royal-outline">
              <span>Book Industry Architecture Demo</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
