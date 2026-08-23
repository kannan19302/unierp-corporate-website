'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  Shield,
  Zap,
  Activity,
  Layers,
  Database,
  Cpu,
  Lock,
  Globe,
  Star,
  DollarSign,
  Package,
  Users,
  Hammer,
  Play,
} from 'lucide-react';
import type { ProductModule } from '@/lib/productCatalog';

interface ProductDetailProps {
  module: ProductModule;
}

export function ProductDetailClient({ module: mod }: ProductDetailProps) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  // Module-specific workflows & metrics mapping
  const MODULE_EXTRAS: Record<string, {
    kpi: string;
    kpiLabel: string;
    workflows: { step: string; title: string; desc: string }[];
    features: { title: string; desc: string }[];
    integrations: string[];
    compliance: string[];
  }> = {
    finance: {
      kpi: '3.4x Faster Close',
      kpiLabel: 'Month-End Automation',
      workflows: [
        { step: '01', title: 'Automated Bank Feeds & GL Sync', desc: 'Real-time ingestion of wire transfers, card transactions, and ACH clearing.' },
        { step: '02', title: '3-Way Invoice & PO Reconciliation', desc: 'Instant cryptographic matching between purchase order, goods receipt, and vendor invoice.' },
        { step: '03', title: 'Multi-Currency Revaluation & FX Hedging', desc: 'Automated currency adjustments across 40+ fiat currencies with continuous GAAP compliance.' },
        { step: '04', title: 'One-Click Financial Statement Generation', desc: 'Produce audit-ready P&L, Balance Sheet, and Cash Flow statements instantly.' },
      ],
      features: [
        { title: 'Multi-Entity General Ledger', desc: 'Consolidated trial balance across holding companies and regional subsidiaries.' },
        { title: 'Tax & E-Invoicing Engine', desc: 'Automated VAT, GST, Sales Tax, and electronic invoice dispatch.' },
        { title: 'Budgeting & Rolling Forecasts', desc: 'Variance analytics comparing planned CAPEX/OPEX with actual ledger entries.' },
        { title: 'Fixed Assets Lifecycle', desc: 'Automated depreciation schedules (Straight-line, MACRS, Reducing Balance).' },
      ],
      integrations: ['Stripe', 'Plaid', 'Avalara', 'QuickBooks', 'SAP', 'Xero'],
      compliance: ['IFRS 15 & 16', 'US GAAP', 'SOX Section 404', 'SOC 2 Type II'],
    },
    crm: {
      kpi: '2.8x Pipeline Velocity',
      kpiLabel: 'Sales Acceleration',
      workflows: [
        { step: '01', title: 'Omnichannel Inbound Lead Capture', desc: 'Enrich lead data automatically from webforms, emails, and LinkedIn ads.' },
        { step: '02', title: 'Intelligent Deal Scoring & Routing', desc: 'Route high-intent enterprise opportunities to dedicated account executives.' },
        { step: '03', title: 'Visual CPQ Quote Builder', desc: 'Configure tiered subscription pricing and generate PDF proposals with digital signature.' },
        { step: '04', title: 'Automated ERP Order Conversion', desc: 'Convert signed deals into active revenue contracts and ERP delivery orders in 1 click.' },
      ],
      features: [
        { title: 'Visual Kanban Deal Pipelines', desc: 'Custom stage probabilities, revenue weighting, and milestone tracking.' },
        { title: 'Contact & Account Timelines', desc: 'Complete activity history of meetings, calls, notes, and transactional interactions.' },
        { title: 'Sales Commission Calculation', desc: 'Automated rep quota calculation tied directly to cleared invoice revenue.' },
        { title: 'Predictive Sales Forecasting', desc: 'AI-driven quarterly close forecasts based on historical pipeline velocity.' },
      ],
      integrations: ['Gmail / Outlook', 'DocuSign', 'Twilio', 'HubSpot', 'Slack', 'Zoom'],
      compliance: ['GDPR & CCPA', 'CAN-SPAM Act', 'SOC 2 Type II'],
    },
    inventory: {
      kpi: '+42% Stock Turn',
      kpiLabel: 'Supply Chain Efficiency',
      workflows: [
        { step: '01', title: 'Barcode / RFID Inbound Receiving', desc: 'Scan inventory lots, assign serial numbers, and route to optimal storage bin.' },
        { step: '02', title: 'Dynamic Multi-Warehouse Stock Tracking', desc: 'Real-time visibility into in-transit, reserved, on-hand, and damaged stock.' },
        { step: '03', title: 'Automated Reorder Threshold Triggers', desc: 'Generate purchase requisitions automatically before safety stock breaches.' },
        { step: '04', title: 'Batch & Lot Traceability Audit', desc: 'Trace raw material lots to finished goods delivery slips in under 2 seconds.' },
      ],
      features: [
        { title: 'Multi-Location Bin Management', desc: 'Hierarchical zone, aisle, rack, and shelf location coordinates.' },
        { title: 'FEFO / FIFO Expiration Routing', desc: 'Prioritize older perishable lots automatically for fulfillment.' },
        { title: 'Mobile Warehouse Scanner App', desc: 'Native iOS and Android scanner client for pick, pack, and ship operations.' },
        { title: 'Automated Landed Cost Calculation', desc: 'Apportion freight, customs, and handling costs directly to unit inventory value.' },
      ],
      integrations: ['Zebra Scanners', 'DHL / FedEx', 'Shopify', 'Amazon FBA', 'SAP'],
      compliance: ['FDA 21 CFR Part 11', 'ISO 9001:2015', 'GS1 Standards'],
    },
  };

  const extras = MODULE_EXTRAS[mod.slug] || {
    kpi: '99.99% Uptime',
    kpiLabel: 'Enterprise Reliability',
    workflows: [
      { step: '01', title: 'Configuration & Entity Setup', desc: 'Initialize data models, roles, and business rules in minutes.' },
      { step: '02', title: 'Event-Driven Transactional Execution', desc: 'Seamless orchestration across all connected ERP modules.' },
      { step: '03', title: 'Automated Verification & Policy Checks', desc: 'PostgreSQL Row-Level Security checks on every operation.' },
      { step: '04', title: 'Real-Time Telemetry & Reports', desc: 'Audit-ready dashboards and instantaneous PDF / Excel exports.' },
    ],
    features: [
      { title: 'Zero-Friction Integration', desc: 'Share unified database models with all other UniERP modules.' },
      { title: 'Granular Role-Based Access', desc: 'Enforce principle of least privilege down to individual field level.' },
      { title: 'Custom Automation DAGs', desc: 'Trigger cross-module webhooks and email alerts on threshold conditions.' },
      { title: 'Audit Trail & Immutable Logs', desc: 'Complete historical timeline of all data mutations and approvals.' },
    ],
    integrations: ['REST APIs', 'Webhooks', 'PostgreSQL', 'Slack', 'Zapier'],
    compliance: ['SOC 2 Type II', 'ISO 27001', 'GDPR Ready'],
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. PRODUCT HERO ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4rem 1.5rem 4rem' }}>
        <Link
          href="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#2563eb',
            textDecoration: 'none',
            marginBottom: '1.5rem',
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to All Modules</span>
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                background: 'rgba(37, 99, 235, 0.1)',
                color: '#2563eb',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              <Layers size={14} />
              <span>UniERP Core Module</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 900,
                fontFamily: 'var(--font-display)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                margin: '0 0 1.25rem',
                color: 'var(--color-text-main)',
              }}
            >
              {mod.label}
            </h1>

            <p style={{ fontSize: '1.18rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 2rem' }}>
              {mod.desc}. {mod.body}
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link href={`/register?module=${mod.slug}`} className="btn-ref-primary">
                <span>Start 30-Day Free Trial</span>
                <ArrowRight size={16} />
              </Link>
              <Link href={`/contact?type=demo&module=${mod.slug}`} className="btn-ref-secondary">
                <Play size={15} fill="currentColor" />
                <span>Book Live Demo</span>
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--color-text-subtle)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} color="#10b981" /> 30-days free trial
              </span>
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} color="#10b981" /> No credit card required
              </span>
            </div>
          </div>

          {/* Module Metric Hero Card */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: 'var(--hero-shadow)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: '0.5rem' }}>
              {extras.kpiLabel}
            </div>
            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--color-text-main)', letterSpacing: '-0.03em', margin: '0 0 1rem' }}>
              {extras.kpi}
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.75rem' }}>
              Audited performance improvements recorded across enterprise deployments running {mod.label}.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', textAlign: 'left' }}>
              {extras.compliance.slice(0, 4).map((c) => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. INTERACTIVE WORKFLOW STEPPER ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem' }}>
            How {mod.label} Works
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            Seamless end-to-end automation from event trigger to final audit.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {extras.workflows.map((wf, idx) => {
            const isCurrent = activeWorkflowStep === idx;
            return (
              <div
                key={wf.step}
                onClick={() => setActiveWorkflowStep(idx)}
                style={{
                  background: 'var(--color-surface)',
                  border: `1.5px solid ${isCurrent ? '#2563eb' : 'var(--color-card-border)'}`,
                  borderRadius: '16px',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--glass-shadow)',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isCurrent ? '#2563eb' : 'rgba(37, 99, 235, 0.1)',
                    color: isCurrent ? '#ffffff' : '#2563eb',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {wf.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
                  {wf.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {wf.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 3. KEY CAPABILITIES BENTO GRID ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem' }}>
            Enterprise Capabilities Included
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            Built into the core engine with zero add-on fees.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {extras.features.map((feat) => (
            <div
              key={feat.title}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: 'var(--glass-shadow)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(37, 99, 235, 0.08)',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Zap size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 4. OUT-OF-THE-BOX INTEGRATIONS ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem 6rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: '0.5rem' }}>
          Ecosystem Connectivity
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 2rem' }}>
          Connects natively with your software stack
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          {extras.integrations.map((app) => (
            <div
              key={app}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                boxShadow: 'var(--glass-shadow)',
              }}
            >
              {app}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 5. FINAL MODULE CTA ═══ */}
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
            Deploy {mod.label} in 60 seconds
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Start your 30-day free trial today. Full access to all features with zero risk and no credit card required.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/register?module=${mod.slug}`} className="btn-royal-white">
              <span>Start 30-Day Free Trial</span>
              <ArrowRight size={16} />
            </Link>
            <Link href={`/contact?type=demo&module=${mod.slug}`} className="btn-royal-outline">
              <span>Request Solution Architecture Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
