'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
  DollarSign,
  Box,
  Truck,
  RotateCcw,
  Check,
  Shield,
  Zap,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

type Scenario = 'lead-to-cash' | 'procure-to-pay' | 'mrp-bom';

export function SandboxClient() {
  useAnalytics('/sandbox');
  const [scenario, setScenario] = useState<Scenario>('lead-to-cash');
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep((prev) => Math.min(prev + 1, 3));
    }, 600);
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. HERO ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4.5rem 1.5rem 2rem', textAlign: 'center' }}>
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
          <Play size={13} fill="currentColor" />
          <span>Interactive Product Simulator — Zero Signup Required</span>
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
          Test-Drive UniERP <span style={{ color: '#2563eb' }}>in Your Browser</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Experience how interconnected ERP transactions execute in real time across Sales, Inventory, and General Ledger.
        </p>

        {/* Scenario Tabs */}
        <div style={{ display: 'inline-flex', background: 'var(--color-surface)', border: '1.5px solid var(--color-card-border)', borderRadius: '9999px', padding: '0.35rem', gap: '0.35rem' }}>
          {[
            { id: 'lead-to-cash', label: '1. Lead to Cash' },
            { id: 'procure-to-pay', label: '2. Procure to Pay' },
            { id: 'mrp-bom', label: '3. Manufacturing BOM' },
          ].map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setScenario(sc.id as Scenario);
                setStep(1);
              }}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                background: scenario === sc.id ? '#2563eb' : 'transparent',
                color: scenario === sc.id ? '#ffffff' : 'var(--color-text-muted)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ 2. INTERACTIVE SIMULATOR CANVAS ═══ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem 6rem' }}>
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-card-border)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          {/* Progress Steps Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: step >= s ? '#2563eb' : 'var(--color-bg)',
                      color: step >= s ? '#ffffff' : 'var(--color-text-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      border: step >= s ? 'none' : '1px solid var(--color-card-border)',
                    }}
                  >
                    {step > s ? <Check size={16} /> : s}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: step === s ? 800 : 600, color: step === s ? 'var(--color-text-main)' : 'var(--color-text-subtle)' }}>
                    {scenario === 'lead-to-cash' && (s === 1 ? 'Quotation' : s === 2 ? 'Sales Order & Picking' : 'Invoice & GL Post')}
                    {scenario === 'procure-to-pay' && (s === 1 ? 'Purchase Req' : s === 2 ? '3-Way Match Audit' : 'Payment Clearance')}
                    {scenario === 'mrp-bom' && (s === 1 ? 'BOM Explosion' : s === 2 ? 'Inventory Allocation' : 'Work Order Release')}
                  </span>
                  {s < 3 && <span style={{ color: 'var(--color-card-border)', margin: '0 0.5rem' }}>→</span>}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                color: 'var(--color-text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Sandbox</span>
            </button>
          </div>

          {/* Interactive Simulation Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
            {/* Left: Simulated Transaction Slip */}
            <div
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '16px',
                padding: '2rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                    {scenario === 'lead-to-cash' && (step === 1 ? 'Draft Quotation #QT-9021' : step === 2 ? 'Confirmed Sales Order #SO-4402' : 'Tax Invoice #INV-1092')}
                    {scenario === 'procure-to-pay' && (step === 1 ? 'Purchase Requisition #PR-3310' : step === 2 ? 'Goods Receipt Note #GRN-8821' : 'Vendor Bill #VB-7712')}
                    {scenario === 'mrp-bom' && (step === 1 ? 'Multi-Level BOM #BOM-X500' : step === 2 ? 'Material Availability Audit' : 'Released Work Order #WO-5502')}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                    Entity: <strong>UniERP Global Corp</strong> · Ledger: <strong>Consolidated INR</strong>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: step === 3 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(37, 99, 235, 0.15)',
                    color: step === 3 ? '#059669' : '#2563eb',
                  }}
                >
                  {step === 1 ? 'Step 1 / 3' : step === 2 ? 'Step 2 / 3' : '✓ Completed & Balanced'}
                </span>
              </div>

              {/* Line Items Mock */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-subtle)', fontWeight: 700, borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <span>Item / Component</span>
                  <span>Qty</span>
                  <span>Rate</span>
                  <span>Subtotal</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-main)' }}>
                  <span style={{ fontWeight: 600 }}>Enterprise Sensor Array X-1</span>
                  <span>10 units</span>
                  <span>₹25,000</span>
                  <span style={{ fontWeight: 800 }}>₹2,50,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-main)' }}>
                  <span style={{ fontWeight: 600 }}>Precision Optical Module Pro</span>
                  <span>5 units</span>
                  <span>₹45,000</span>
                  <span style={{ fontWeight: 800 }}>₹2,25,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--color-card-border)', fontWeight: 900, fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
                  <span>Total Transaction:</span>
                  <span style={{ color: '#2563eb' }}>₹4,75,000</span>
                </div>
              </div>

              {/* Action Trigger Button */}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  {isProcessing ? 'Processing Transaction…' : scenario === 'lead-to-cash' ? (step === 1 ? 'Approve Quote & Create Sales Order' : 'Dispatch Inventory & Generate Invoice') : 'Execute Next Workflow Step'}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#059669',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Check size={18} />
                  <span>Workflow Complete · Ledger Balanced &amp; Reconciled</span>
                </div>
              )}
            </div>

            {/* Right: Live Automated System Telemetry */}
            <div
              style={{
                background: '#040711',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1.75rem',
                color: '#94a3b8',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                lineHeight: 1.7,
              }}
            >
              <div style={{ color: '#38bdf8', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={14} color="#38bdf8" />
                <span>REAL-TIME ERP EVENT TELEMETRY</span>
              </div>
              <div>[00:00.02] → Validation: RLS Tenant Isolation context verified</div>
              <div>[00:00.05] → Double-Entry Ledger: Dr Accounts Receivable / Cr Revenue</div>
              <div>[00:00.08] → Multi-Bin Inventory: Stock reservations locked</div>
              {step >= 2 && <div style={{ color: '#4ade80' }}>[00:00.12] ✓ 3-Way Match Passed: PO == GRN == Invoice</div>}
              {step >= 3 && <div style={{ color: '#4ade80' }}>[00:00.18] ✓ General Ledger Closed: Period trial balance in equilibrium</div>}

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.5rem' }}>Ready for production?</div>
                <Link
                  href="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#60a5fa',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  <span>Launch your workspace with 30 days free</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
