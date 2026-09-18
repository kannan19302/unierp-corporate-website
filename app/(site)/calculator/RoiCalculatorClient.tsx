'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
  Download,
  ArrowRight,
  Sparkles,
  Zap,
  Building2,
  Check,
  X,
  FileText,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

export function RoiCalculatorClient() {
  useAnalytics('/calculator');

  // Input states
  const [users, setUsers] = useState<number>(50);
  const [currentSystem, setCurrentSystem] = useState<string>('sap');
  const [weeklyHours, setWeeklyHours] = useState<number>(20);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Lead modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [pdfGenerated, setPdfGenerated] = useState(false);

  // Cost multiplier based on current system
  const systemMultipliers: Record<string, { label: string; legacyAnnualPerUser: number; name: string }> = {
    sap: { label: 'SAP S/4HANA / ECC', legacyAnnualPerUser: 120000, name: 'SAP' },
    netsuite: { label: 'Oracle NetSuite', legacyAnnualPerUser: 95000, name: 'NetSuite' },
    odoo: { label: 'Odoo Enterprise', legacyAnnualPerUser: 45000, name: 'Odoo' },
    tally: { label: 'Tally / QuickBooks + Spreadsheets', legacyAnnualPerUser: 30000, name: 'Tally/Spreadsheets' },
  };

  const sys = systemMultipliers[currentSystem] || systemMultipliers.sap;

  // Calculations
  const unierpAnnualCostPerUser = 24000; // ~₹2,000/mo on Pro tier
  const licenseSavings = Math.max(0, (sys.legacyAnnualPerUser - unierpAnnualCostPerUser) * users);
  
  // Labor productivity savings (assuming ₹600/hr or $25/hr blended rate)
  const hourlyRate = currency === 'INR' ? 650 : 35;
  const annualHoursSaved = Math.round(weeklyHours * 50 * 0.65); // 65% automation reduction
  const productivitySavings = Math.round(annualHoursSaved * hourlyRate);

  const totalAnnualSavings = licenseSavings + productivitySavings;
  const paybackMonths = Number(Math.max(1.2, ((users * unierpAnnualCostPerUser) / (totalAnnualSavings / 12))).toFixed(1));
  const monthEndCloseReductionDays = Math.round(weeklyHours > 25 ? 9 : 6);

  const formatCurrency = (amount: number) => {
    if (currency === 'INR') {
      if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakhs`;
      return `₹${amount.toLocaleString('en-IN')}`;
    } else {
      const usdAmount = Math.round(amount / 85);
      return `$${usdAmount.toLocaleString('en-US')}`;
    }
  };

  const handleDownloadPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;
    setPdfGenerated(true);
    setTimeout(() => {
      setPdfGenerated(false);
      setModalOpen(false);
      setLeadName('');
      setLeadEmail('');
      setLeadCompany('');
    }, 3000);
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. HERO ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4.5rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#059669',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          <Calculator size={13} />
          <span>Interactive TCO &amp; ROI Engine</span>
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
          Calculate Your <span style={{ color: '#2563eb' }}>Enterprise ROI</span> with UniERP
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '680px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Discover how much your business can save on legacy software licensing, IT maintenance, and manual reconciliation overhead.
        </p>

        {/* Currency Switcher */}
        <div style={{ display: 'inline-flex', background: 'var(--color-surface)', border: '1.5px solid var(--color-card-border)', borderRadius: '9999px', padding: '0.25rem' }}>
          <button
            type="button"
            onClick={() => setCurrency('INR')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              border: 'none',
              background: currency === 'INR' ? '#0f172a' : 'transparent',
              color: currency === 'INR' ? '#ffffff' : 'var(--color-text-muted)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            INR (₹)
          </button>
          <button
            type="button"
            onClick={() => setCurrency('USD')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              border: 'none',
              background: currency === 'USD' ? '#0f172a' : 'transparent',
              color: currency === 'USD' ? '#ffffff' : 'var(--color-text-muted)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            USD ($)
          </button>
        </div>
      </section>

      {/* ═══ 2. CALCULATOR ENGINE ═══ */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2.5rem', alignItems: 'stretch' }}>
          {/* Left Column: Interactive Sliders & Inputs */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: 'var(--glass-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                  Number of Active Users / Employees
                </label>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#2563eb' }}>
                  {users} Users
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '0.35rem' }}>
                <span>5 Users</span>
                <span>250 Users</span>
                <span>500+ Users</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
                Current ERP or Primary Software System
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {Object.entries(systemMultipliers).map(([key, info]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCurrentSystem(key)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: currentSystem === key ? '2px solid #2563eb' : '1px solid var(--color-card-border)',
                      background: currentSystem === key ? 'rgba(37, 99, 235, 0.06)' : 'var(--color-bg)',
                      color: currentSystem === key ? '#2563eb' : 'var(--color-text-main)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    {info.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                  Weekly Hours Spent on Manual Reconciliations &amp; Spreadsheets
                </label>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#2563eb' }}>
                  {weeklyHours} hrs/wk
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '0.35rem' }}>
                <span>5 hrs</span>
                <span>40 hrs (1 FTE)</span>
                <span>80+ hrs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Projected ROI Dashboard Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                Estimated Annual Impact
              </div>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#10b981', margin: '0 0 0.5rem' }}>
                {formatCurrency(totalAnnualSavings)}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 2rem' }}>
                Total projected annual financial return combining software license cost reduction and automated operational hours saved.
              </p>

              {/* 3 Metric Breakdown Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Payback Period</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
                    {paybackMonths} Months
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '2px' }}>Instant ROI</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Productivity Gain</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
                    {annualHoursSaved.toLocaleString()} hrs/yr
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#93c5fd', marginTop: '2px' }}>Automated Workflows</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Accelerates Month-End Close by <strong>{monthEndCloseReductionDays} Days</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
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
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                }}
              >
                <Download size={16} />
                <span>Download Executive Business Case PDF</span>
              </button>

              <Link
                href={`/register?plan=pro&seats=${users}&currency=${currency}&source=roi_calculator`}
                style={{
                  textAlign: 'center',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34d399',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.15s',
                }}
              >
                <Sparkles size={16} />
                <span>Switch to UniERP &amp; Claim Savings ({users} seats)</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEAD GENERATION MODAL ═══ */}
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

            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileText size={20} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
              Download Your Custom ROI Report
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
              Includes executive breakdown, 3-year TCO projections, and migration roadmap customized for <strong>{users} users</strong> migrating from <strong>{sys.name}</strong>.
            </p>

            {pdfGenerated ? (
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
                  ROI Business Case Generated!
                </div>
                <p style={{ fontSize: '0.82rem', color: '#047857', margin: '0.25rem 0 0' }}>
                  A copy has been dispatched to {leadEmail}. Check your inbox!
                </p>
              </div>
            ) : (
              <form onSubmit={handleDownloadPdf} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
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
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Enterprises"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
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
                  Download Report (PDF)
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
