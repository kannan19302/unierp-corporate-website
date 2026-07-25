'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield, ChevronRight, Check, CreditCard, Users, BarChart3,
  Package, Hammer, Activity, Heart, GraduationCap, Building2,
  Wrench, Store, Zap, ArrowRight, Star, Sparkles, Globe, ExternalLink,
  Calculator, CheckCircle2, ChevronDown, Lock, Cpu, Play, Award, DollarSign, Clock, TrendingUp, X, Sliders, Layout, Layers, RefreshCw, Terminal, Copy, Server, CheckSquare, Layers2, Bot, HelpCircle, FileText, UserPlus, LogIn, Compass, Sun, Moon
} from 'lucide-react';

const ERP_APP_URL = process.env.NEXT_PUBLIC_ERP_APP_URL || 'http://localhost:3000';

export default function ThemeableCorporateHomePage() {
  // Default Light Mode + Toggle to Dark Mode
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Lead Capture & Modal State
  const [leadEmail, setLeadEmail] = useState('');
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'trial' | 'demo' | 'tour'>('trial');
  const [tourStep, setTourStep] = useState(1);

  // Executive Cockpit Persona Switcher State
  const [activePersona, setActivePersona] = useState<'cfo' | 'coo' | 'cto' | 'cmo' | 'chro'>('cfo');

  // AI Agentforce Simulator State
  const [activeAgent, setActiveAgent] = useState<'reconcile' | 'quote' | 'reorder'>('reconcile');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(3);

  // 28-Module App Matrix Filter
  const [appFilter, setAppFilter] = useState<'all' | 'ops' | 'verticals' | 'studio' | 'ai'>('all');

  // Live API Playground State
  const [activeApiRoute, setActiveApiRoute] = useState<'finance' | 'builder' | 'inventory'>('finance');
  const [copiedApi, setCopiedApi] = useState(false);

  // Cloud vs Self-Hosted TCO Calculator State
  const [tcoUsers, setTcoUsers] = useState(40);
  const [tcoStorage, setTcoStorage] = useState(250); // GB
  const [tcoMode, setTcoMode] = useState<'cloud' | 'selfhosted'>('cloud');

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Handle Lead Submit
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    window.location.href = `${ERP_APP_URL}/login?email=${encodeURIComponent(leadEmail)}`;
  };

  const openLeadModal = (type: 'trial' | 'demo' | 'tour') => {
    setModalType(type);
    setShowModal(true);
  };

  // Run AI Agentforce Simulator
  const runAgentSimulator = (agent: 'reconcile' | 'quote' | 'reorder') => {
    setActiveAgent(agent);
    setIsAgentRunning(true);
    setAgentStep(1);
    setTimeout(() => setAgentStep(2), 700);
    setTimeout(() => {
      setAgentStep(3);
      setIsAgentRunning(false);
    }, 1500);
  };

  // TCO Calculations
  const tcoResult = useMemo(() => {
    const isInr = currency === 'INR';
    const userRate = isInr ? (isAnnual ? 3199 : 3999) : (isAnnual ? 63 : 79);
    const cloudMonthly = tcoUsers * userRate + (tcoStorage / 100) * (isInr ? 1200 : 15);
    const legacyCloudSpend = tcoUsers * (isInr ? 9000 : 180) + (tcoStorage / 100) * (isInr ? 3500 : 45);
    const annualSavings = Math.round((legacyCloudSpend - cloudMonthly) * 12);
    return {
      monthly: Math.round(cloudMonthly),
      annualSavings,
      selfHostedDockerCommand: `docker run -d -p 3000:3000 -p 3001:3001 --name unerp-stack -e TENANT_ID=prod_01 kannan19302/unierp-core:latest`
    };
  }, [tcoUsers, tcoStorage, isAnnual, currency]);

  // Modules List (28 Modules)
  const allModules = [
    { id: 'finance', name: 'General Ledger & GST Compliance', cat: 'ops', icon: CreditCard, desc: 'Double-entry bookkeeping, GSTR-1/3B tax reports, E-Way bills, bank feeds.' },
    { id: 'inventory', name: 'Multi-Warehouse Inventory & MRP', cat: 'ops', icon: Package, desc: 'Serial/batch tracking, serial numbers, drop-shipping, barcodes.' },
    { id: 'manufacturing', name: 'Manufacturing & Work Orders', cat: 'ops', icon: Hammer, desc: 'Bill of materials (BOM), routing, work station capacity scheduling.' },
    { id: 'crm', name: 'CRM & Sales Funnel', cat: 'ops', icon: Users, desc: 'Lead scoring, sales funnel analytics, automated GST quotations.' },
    { id: 'hr', name: 'Indian HR & Statutory Payroll', cat: 'ops', icon: Heart, desc: 'EPF, ESI, Professional Tax, TDS withholding, salary slips, attendance.' },
    { id: 'pos', name: 'Retail Point-of-Sale (POS)', cat: 'ops', icon: Store, desc: 'Offline-first cash register, GST receipt printing, stock sync.' },

    { id: 'studio', name: 'No-Code Builder Studio', cat: 'studio', icon: Activity, desc: 'Drag-and-drop page builder, form intake builder, workflow triggers.' },
    { id: 'cms', name: 'Tenant Web Portal CMS', cat: 'studio', icon: Globe, desc: 'Customizable / root public site engine with dynamic theme tokens.' },

    { id: 'healthcare', name: 'Healthcare & EMR Suite', cat: 'verticals', icon: Activity, desc: 'Patient records, appointments, prescription logs, lab billing.' },
    { id: 'education', name: 'Education & SIS Portal', cat: 'verticals', icon: GraduationCap, desc: 'Student enrollment, gradebooks, fee collections, timetables.' },
    { id: 'realestate', name: 'Real Estate & Lease Mgmt', cat: 'verticals', icon: Building2, desc: 'Property listings, tenant lease agreements, maintenance tickets.' },
    { id: 'fieldservice', name: 'Field Service Dispatch', cat: 'verticals', icon: Wrench, desc: 'Technician scheduling, mobile work orders, route optimization.' },

    { id: 'copilot', name: 'UniERP AI Copilot', cat: 'ai', icon: Bot, desc: 'Automated financial reconciliation, quote drafting, inventory alerts.' },
    { id: 'analytics', name: 'BI Executive Dashboards', cat: 'ai', icon: BarChart3, desc: '1,500+ real-time metrics, cohort analysis, cashflow forecasting.' },
  ];

  const filteredModules = allModules.filter(m => appFilter === 'all' || m.cat === appFilter);

  return (
    <div data-theme={theme} className="grid-bg-pattern" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', position: 'relative' }}>
      {/* Ambient Animated Glowing Orbs */}
      <div className="animated-bg-glow glow-blue" style={{ top: '-120px', left: '10%' }} />
      <div className="animated-bg-glow glow-purple" style={{ top: '800px', right: '5%' }} />
      <div className="animated-bg-glow glow-emerald" style={{ top: '1800px', left: '8%' }} />

      {/* ── Top Announcement Banner ── */}
      <div style={{
        background: 'linear-gradient(90deg, #1d4ed8, #7e22ce, #1d4ed8)',
        backgroundSize: '200% auto',
        animation: 'gradient-shift 4s ease infinite',
        color: '#ffffff',
        padding: '0.55rem 1rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem'
      }}>
        <Sparkles size={16} />
        <span>UniERP 2.5 Released: Indian GST E-Invoicing, E-Way Bill & 30-Day Free Trial</span>
        <a href={`${ERP_APP_URL}/`} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: 700 }}>
          🚀 Launch Demo Site →
        </a>
      </div>

      {/* ── Navigation Header with Light/Dark Mode Switcher & Auth Buttons ── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--header-bg)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--glass-border)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 1.5rem', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-text-main)', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #38bdf8, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
              U
            </div>
            <span style={{ letterSpacing: '-0.02em' }}>Uni<span className="text-gradient">ERP</span></span>
          </Link>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#cockpit" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Executive Cockpit</a>
            <a href="#agentforce" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>AI Agentforce</a>
            <a href="#apps" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>28+ Apps</a>
            <a href="#gst-compliance" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>GST & Payroll</a>
            <a href="#pricing" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>India Pricing</a>
          </nav>

          {/* Action Buttons + Theme Toggle (Light Default -> Dark) */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--color-surface)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#f59e0b" />}
            </button>

            {/* 1-Click Instant Demo Launcher Button */}
            <a
              href={`${ERP_APP_URL}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              title="Explore live running demo website instantly without registration"
            >
              <Compass size={15} />
              <span>Launch Demo Site</span>
            </a>

            {/* Explicit Log In Button */}
            <a
              href={`${ERP_APP_URL}/login`}
              className="btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              <LogIn size={15} />
              <span>Log In</span>
            </a>

            {/* Explicit Register Button */}
            <a
              href={`${ERP_APP_URL}/register`}
              className="btn-primary"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
            >
              <UserPlus size={15} />
              <span>Register</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section style={{ padding: '6.5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          
          <div className="floating-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.25rem',
            borderRadius: '9999px',
            background: 'var(--color-primary-glow)',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Award size={16} />
            <span>30-Day Free Trial • No Credit Card Required</span>
            <ChevronRight size={14} />
          </div>

          <h1 style={{
            fontSize: 'clamp(3.2rem, 6vw, 4.85rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            margin: '0 0 1.75rem 0',
            color: 'var(--color-text-main)'
          }}>
            The Universal ERP Operating System <br />
            For <span className="text-gradient">Indian & Global Enterprises</span>
          </h1>

          <p style={{
            fontSize: '1.3rem',
            color: 'var(--color-text-muted)',
            maxWidth: '820px',
            margin: '0 auto 3rem',
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            Seamlessly combine <strong style={{ color: 'var(--color-text-main)' }}>28+ composable ERP modules</strong>, Indian GST E-Invoicing & E-Way Bills, Statutory PF/ESI Payroll, and visual No-Code Builder Studio with database-layer multi-tenancy.
          </p>

          {/* Primary Action Buttons: Start Trial & Launch Live Instant Demo */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <form onSubmit={handleLeadSubmit} style={{
              display: 'flex',
              gap: '0.5rem',
              background: 'var(--glass-bg)',
              padding: '0.45rem',
              borderRadius: '16px',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
              maxWidth: '480px',
              width: '100%'
            }}>
              <input
                type="email"
                placeholder="Enter your work email..."
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '0.75rem 1rem',
                  color: 'var(--color-text-main)',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit'
                }}
                required
              />
              <button type="submit" className="btn-primary" style={{ borderRadius: '12px', padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
                <span>Start 30-Day Free Trial</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Direct Instant Demo Exploration Launcher */}
            <a
              href={`${ERP_APP_URL}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.9rem 1.75rem', borderRadius: '14px', fontSize: '1rem', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              <Compass size={18} />
              <span>Explore Instant Demo Site</span>
              <ExternalLink size={15} />
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: 'var(--color-text-subtle)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="var(--color-emerald)" /> 30 Days Full Access</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="var(--color-emerald)" /> No Credit Card Required</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="var(--color-emerald)" /> GST & Statutory Ready</span>
          </div>

        </div>
      </section>

      {/* ── Social Proof Metrics ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>100%</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>GSTIN & E-Way Bill Compliant</div>
          </div>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-emerald)', marginBottom: '0.25rem' }}>₹4.2 Cr+</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Annual Software License Saved</div>
          </div>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-purple)', marginBottom: '0.25rem' }}>1,500+</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Enterprise REST API Endpoints</div>
          </div>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-amber)', marginBottom: '0.25rem' }}>30 Days</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Full Unrestricted Free Trial</div>
          </div>
        </div>
      </section>

      {/* ── Indian GST Compliance & Statutory Feature Showcase ── */}
      <section id="gst-compliance" style={{ background: 'var(--color-surface)', padding: '6rem 1.5rem', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-emerald)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              <Shield size={18} />
              <span>Built For Indian Enterprise Taxation</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--color-text-main)' }}>Indian GST, E-Invoicing & Statutory Payroll</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
              Built-in compliance engine for GSTIN verification, E-Way Bill generation, GSTR filing, and Indian Statutory Payroll.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--color-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Automated E-Invoicing & E-Way Bills</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Generate QR-coded GST E-Invoices and E-Way bills directly from sales orders with automatic IRN generation and NIC portal synchronization.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>GSTR-1 & GSTR-3B Tax Filing Reports</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Export monthly B2B, B2C, HSN summary, and Input Tax Credit (ITC) reconciliation JSON/Excel reports pre-formatted for GST portal uploads.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(147, 51, 234, 0.1)', color: 'var(--color-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Indian Statutory Payroll (EPF, ESI, TDS)</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Automate Employee Provident Fund (EPF 12%), ESI (3.25%), Professional Tax state-wise tables, and Form 16 TDS tax withholding calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dynamics 365-Style Executive Cockpit Switcher ── */}
      <section id="cockpit" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '6rem 1.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <BarChart3 size={18} />
            <span>Role-Tailored Intelligence</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--color-text-main)' }}>Executive Cockpit Switcher</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Select your leadership persona to preview real-time metrics and tailored operational dashboards.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'cfo', label: 'CFO • Finance & GST GL', icon: DollarSign, color: 'var(--color-emerald)' },
            { id: 'coo', label: 'COO • Supply Chain & MRP', icon: Package, color: 'var(--color-amber)' },
            { id: 'cto', label: 'CTO • Architecture & RLS', icon: Cpu, color: 'var(--color-primary)' },
            { id: 'cmo', label: 'CMO • Commerce & Leads', icon: Globe, color: 'var(--color-purple)' },
            { id: 'chro', label: 'CHRO • Indian Payroll & EPF', icon: Heart, color: '#ec4899' },
          ].map(p => {
            const Icon = p.icon;
            const active = activePersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePersona(p.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '12px',
                  background: active ? 'var(--color-surface)' : 'transparent',
                  color: active ? p.color : 'var(--color-text-muted)',
                  border: '1px solid',
                  borderColor: active ? p.color : 'var(--glass-border)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Cockpit Canvas Card */}
        <div className="glass-panel card-3d-tilt" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            <div>
              <div style={{ display: 'inline-block', padding: '0.35rem 0.85rem', borderRadius: '9999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
                {activePersona.toUpperCase()} Executive Suite
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--color-text-main)' }}>
                {activePersona === 'cfo' && 'Automated Multi-Currency Accounting & GST GL'}
                {activePersona === 'coo' && 'Real-Time Inventory & Manufacturing MRP'}
                {activePersona === 'cto' && 'Row-Level Tenant Isolation & 1,500+ REST APIs'}
                {activePersona === 'cmo' && 'Dynamic Storefront CMS & Lead Conversion'}
                {activePersona === 'chro' && 'Automated Statutory Indian Payroll & EPF'}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {activePersona === 'cfo' && 'Double-entry general ledger with GSTR-1/3B filing exports, automated bank feeds, and IRN E-Way Bill generation.'}
                {activePersona === 'coo' && 'Multi-warehouse stock replenishment, HSN/SAC code tracking, bill of materials (BOM), and work order scheduling.'}
                {activePersona === 'cto' && 'Enforce tenant_id isolation via PostgreSQL 16 RLS policies with Docker containerized deployment and visual Studio extensibility.'}
                {activePersona === 'cmo' && 'Launch customizable tenant portals at / with drag-and-drop page editing, e-commerce catalog, and CRM lead scoring.'}
                {activePersona === 'chro' && 'EPF (12%), ESI, Professional Tax, Form 16 TDS tax withholding, leave approvals, and employee performance tracking.'}
              </p>
              <button onClick={() => openLeadModal('demo')} className="btn-primary">
                <span>Explore {activePersona.toUpperCase()} Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Simulated Live KPI Badges */}
            <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {activePersona === 'cfo' && (
                <>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-emerald)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Monthly Net Revenue</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>₹1,24,85,000.00 <span style={{ color: 'var(--color-emerald)', fontSize: '0.85rem' }}>+18.4%</span></div>
                  </div>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-primary)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Automated GST Reconciliations</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>99.8% GSTR-1 Verified</div>
                  </div>
                </>
              )}

              {activePersona === 'coo' && (
                <>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-amber)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Warehouse Order Fulfillment Velocity</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>4.2 Hours <span style={{ color: 'var(--color-emerald)', fontSize: '0.85rem' }}>-65% Time</span></div>
                  </div>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-primary)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Active MRP Work Orders</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>142 Units Scheduled</div>
                  </div>
                </>
              )}

              {activePersona === 'cto' && (
                <>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-primary)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Database RLS Isolation Policy</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-emerald)' }}>100% Non-Bypass Verified</div>
                  </div>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-purple)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Open REST/GraphQL Endpoints</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>1,540 Endpoints Active</div>
                  </div>
                </>
              )}

              {activePersona === 'cmo' && (
                <>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-purple)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Storefront Conversion Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>4.85% <span style={{ color: 'var(--color-emerald)', fontSize: '0.85rem' }}>+2.1% boost</span></div>
                  </div>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-primary)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>CRM Pipeline Deals</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>₹3.8 Cr Qualified</div>
                  </div>
                </>
              )}

              {activePersona === 'chro' && (
                <>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #ec4899' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Automated Payroll Run Speed</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Under 2 Minutes</div>
                  </div>
                  <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--color-emerald)' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>EPF & ESI Compliance Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>100% Audit Clean</div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── Salesforce Agentforce-Level AI Command Center Simulator ── */}
      <section id="agentforce" style={{ background: 'var(--color-surface)', padding: '6rem 1.5rem', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-purple)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              <Bot size={18} />
              <span>Autonomous AI Execution</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--color-text-main)' }}>UniERP AI Agentforce Simulator</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
              Test how autonomous AI agents execute complex ERP workflows step-by-step in real-time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            
            {/* Left Control Panel */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>Select Autonomous Agent</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { id: 'reconcile', title: 'Auto GL Bank & GST Reconciliation Agent', desc: 'Matches bank feeds with GSTR-2A/2B tax invoices automatically.' },
                  { id: 'quote', title: 'AI Sales Quote & GST Tax Assistant', desc: 'Drafts custom pricing quotes with automated HSN/SAC GST calculations.' },
                  { id: 'reorder', title: 'Inventory Reorder & MRP Optimizer', desc: 'Predicts stockouts and posts purchase orders to vendors.' },
                ].map(a => (
                  <button
                    key={a.id}
                    onClick={() => runAgentSimulator(a.id as any)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      background: activeAgent === a.id ? 'rgba(147, 51, 234, 0.1)' : 'var(--color-bg)',
                      border: activeAgent === a.id ? '1px solid var(--color-purple)' : '1px solid var(--glass-border)',
                      color: 'var(--color-text-main)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: activeAgent === a.id ? 'var(--color-purple)' : 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                      {a.title}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{a.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => runAgentSimulator(activeAgent)}
                disabled={isAgentRunning}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #a855f7, #7e22ce)' }}
              >
                {isAgentRunning ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
                <span>{isAgentRunning ? 'Agent Executing...' : 'Trigger AI Agent Execution'}</span>
              </button>
            </div>

            {/* Right Interactive Node Execution Canvas */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-purple)', fontSize: '0.95rem' }}>Visual Execution Node Graph</span>
                <span style={{ fontSize: '0.8rem', color: isAgentRunning ? 'var(--color-amber)' : 'var(--color-emerald)', fontWeight: 600 }}>
                  {isAgentRunning ? '⚡ Running Workflow...' : '✅ Complete & Audited'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Node 1 */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: agentStep >= 1 ? 'rgba(37, 99, 235, 0.08)' : 'var(--color-bg)',
                  border: agentStep >= 1 ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
                  color: 'var(--color-text-main)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Step 1: Event Triggered</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {activeAgent === 'reconcile' && 'Incoming Bank Stream & GSTR-2B Ingested (500 Lines)'}
                    {activeAgent === 'quote' && 'Customer Requested Custom Quote (RFQ #9402)'}
                    {activeAgent === 'reorder' && 'Inventory Item #SKU-882 Dropped Below Safety Stock'}
                  </div>
                </div>

                {/* Node 2 */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: agentStep >= 2 ? 'rgba(147, 51, 234, 0.08)' : 'var(--color-bg)',
                  border: agentStep >= 2 ? '1px solid var(--color-purple)' : '1px solid var(--glass-border)',
                  color: 'var(--color-text-main)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-purple)', textTransform: 'uppercase' }}>Step 2: AI Neural Evaluation</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {activeAgent === 'reconcile' && 'Matched 498/500 GST & GL Lines (99.6% Confidence Score)'}
                    {activeAgent === 'quote' && 'Evaluated HSN 8471 GST Rate (18%) & Approved 12% Margin'}
                    {activeAgent === 'reorder' && 'Calculated Lead-Time Demand (Optimal Reorder: 500 Units)'}
                  </div>
                </div>

                {/* Node 3 */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: agentStep >= 3 ? 'rgba(5, 150, 105, 0.08)' : 'var(--color-bg)',
                  border: agentStep >= 3 ? '1px solid var(--color-emerald)' : '1px solid var(--glass-border)',
                  color: 'var(--color-text-main)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-emerald)', textTransform: 'uppercase' }}>Step 3: Database Mutation & Audit Log</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {activeAgent === 'reconcile' && 'Journal Ledger Updated • GSTR-1 Audit Log Posted'}
                    {activeAgent === 'quote' && 'GST E-Invoice Draft Generated & Emailed to Customer'}
                    {activeAgent === 'reorder' && 'Purchase Order Sent to Approved Vendor via Webhook'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Odoo-Level 28-Module Interactive Monorepo Matrix ── */}
      <section id="apps" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '6rem 1.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--color-text-main)' }}>
            The Complete <span className="text-gradient">28+ Module Ecosystem</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto 2rem' }}>
            Replace 10+ disjointed software subscriptions with one composable, integrated platform.
          </p>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All 28 Modules' },
              { id: 'ops', label: 'Core Operations' },
              { id: 'verticals', label: 'Industry Solutions' },
              { id: 'studio', label: 'No-Code & Web' },
              { id: 'ai', label: 'AI & Analytics' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setAppFilter(f.id as any)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  background: appFilter === f.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: appFilter === f.id ? '#ffffff' : 'var(--color-text-muted)',
                  border: '1px solid',
                  borderColor: appFilter === f.id ? 'var(--color-primary)' : 'var(--glass-border)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modules 3D Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredModules.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.id} className="glass-panel card-3d-tilt" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.5rem 0' }}>{m.name}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{m.desc}</p>
                </div>
                <a
                  href={`${ERP_APP_URL}/login`}
                  style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <span>Launch App Trial</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Localized India Pricing Tiers with INR (₹) Toggle ── */}
      <section id="pricing" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '6rem 1.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-emerald)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <DollarSign size={18} />
            <span>Transparent Pricing • 30-Day Free Trial</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--color-text-main)' }}>Transparent Enterprise Pricing</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Zero hidden fees. Full 30-day unrestricted trial with GST and statutory payroll ready.</p>

          {/* Currency Switcher (INR vs USD) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', background: 'var(--color-surface)', padding: '0.3rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
              <button
                onClick={() => setCurrency('INR')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: currency === 'INR' ? 'var(--color-emerald)' : 'transparent',
                  color: currency === 'INR' ? '#ffffff' : 'var(--color-text-muted)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                🇮🇳 ₹ INR (India)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: currency === 'USD' ? 'var(--color-primary)' : 'transparent',
                  color: currency === 'USD' ? '#ffffff' : 'var(--color-text-muted)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                🌐 $ USD (Global)
              </button>
            </div>

            {/* Annual Billing Switch */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-surface)', padding: '0.35rem 0.5rem', borderRadius: '9999px', border: '1px solid var(--glass-border)' }}>
              <button
                onClick={() => setIsAnnual(false)}
                style={{ padding: '0.4rem 1rem', borderRadius: '9999px', border: 'none', background: !isAnnual ? 'var(--color-primary)' : 'transparent', color: !isAnnual ? '#ffffff' : 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                style={{ padding: '0.4rem 1rem', borderRadius: '9999px', border: 'none', background: isAnnual ? 'var(--color-primary)' : 'transparent', color: isAnnual ? '#ffffff' : 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <span>Annual</span>
                <span style={{ background: 'var(--color-emerald)', color: '#ffffff', fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '9999px', fontWeight: 800 }}>Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Starter */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--color-text-main)' }}>Starter</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Essential ERP modules for growing Indian small businesses.</p>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
              {currency === 'INR' ? (isAnnual ? '₹1,199' : '₹1,499') : (isAnnual ? '$23' : '$29')}
              <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 400 }}> / user / month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-emerald)" /> General Ledger & Basic GST</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-emerald)" /> Multi-Warehouse Stock</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-emerald)" /> No-Code Builder Studio Access</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-emerald)" /> 30-Day Free Unrestricted Trial</li>
            </ul>
            <button onClick={() => openLeadModal('trial')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Start 30-Day Trial</button>
          </div>

          {/* Professional (Popular) */}
          <div className="glass-panel" style={{ padding: '2.5rem', border: '2px solid var(--color-primary)', boxShadow: 'var(--glass-shadow)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--color-text-main)' }}>Professional</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Complete 28-module suite with full GST E-Invoicing & Statutory Payroll.</p>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
              {currency === 'INR' ? (isAnnual ? '₹3,199' : '₹3,999') : (isAnnual ? '$63' : '$79')}
              <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 400 }}> / user / month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-primary)" /> All 28 ERP Business Modules</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-primary)" /> GST E-Invoices, GSTR-1/3B & E-Way Bills</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-primary)" /> Indian Statutory Payroll (EPF/ESI/TDS)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-primary)" /> Custom Tenant Domain & Website at /</li>
            </ul>
            <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start 30-Day Free Trial</button>
          </div>

          {/* Enterprise */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--color-text-main)' }}>Enterprise</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Dedicated single-tenant infrastructure with custom SLA.</p>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>Custom Quote</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-purple)" /> Dedicated Postgres & Redis Stack</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-purple)" /> Custom SSO & RLS Tenant Isolation</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--color-purple)" /> Dedicated Indian Solutions Architect</li>
            </ul>
            <button onClick={() => openLeadModal('demo')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* ── Guided Product Tour & Trial Modal ── */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', width: '100%', padding: '2.5rem', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            {modalType === 'tour' ? (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{ flex: 1, height: '4px', borderRadius: '9999px', background: s <= tourStep ? 'var(--color-primary)' : 'var(--glass-border)' }} />
                  ))}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.5rem 0' }}>
                  {tourStep === 1 && 'Step 1: Set Up Branding & GSTIN'}
                  {tourStep === 2 && 'Step 2: Build Pages in No-Code Studio'}
                  {tourStep === 3 && 'Step 3: Run Double-Entry Accounting GL'}
                  {tourStep === 4 && 'Step 4: Launch Multi-Tenant Workspace'}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                  {tourStep === 1 && 'Configure tenant_id and customize theme tokens with real-time domain mapping.'}
                  {tourStep === 2 && 'Drag-and-drop components, publish forms, and connect dynamic data sources.'}
                  {tourStep === 3 && 'Automate bank reconciliations, multi-currency valuations, and GL journals.'}
                  {tourStep === 4 && 'Deploy containerized stack instantly on Cloud or On-Premise Docker.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {tourStep > 1 ? (
                    <button onClick={() => setTourStep(tourStep - 1)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Back</button>
                  ) : <div />}
                  {tourStep < 4 ? (
                    <button onClick={() => setTourStep(tourStep + 1)} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Next Step →</button>
                  ) : (
                    <button onClick={() => { setShowModal(false); openLeadModal('trial'); }} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Start 30-Day Free Trial</button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.5rem 0' }}>
                  {modalType === 'trial' ? 'Start Your 30-Day Free Trial' : 'Book an ERP Architect Session'}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                  Unrestricted access to all 28+ ERP modules, GST E-Invoicing & No-Code Studio.
                </p>
                <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>Work Email</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--glass-border)', color: 'var(--color-text-main)', outline: 'none' }}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <span>Launch 30-Day Workspace</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--glass-border)', padding: '4rem 1.5rem 2rem', color: 'var(--color-text-subtle)', fontSize: '0.9rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>UniERP Platform</div>
            <p>© {new Date().getFullYear()} UniERP Platform Inc. All rights reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href={`${ERP_APP_URL}/login`} style={{ color: 'var(--color-text-muted)' }}>Log In to Desk</a>
            <a href={`${ERP_APP_URL}/register`} style={{ color: 'var(--color-text-muted)' }}>Register Account</a>
            <a href={`${ERP_APP_URL}/`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }}>Explore Live Demo</a>
            <a href="http://localhost:3001/swagger" style={{ color: 'var(--color-text-muted)' }}>Swagger API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
