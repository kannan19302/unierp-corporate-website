'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield, ChevronRight, Check, CreditCard, Users, BarChart3,
  Package, Hammer, Activity, Heart, GraduationCap, Building2,
  Wrench, Store, Zap, ArrowRight, Star, Sparkles, Globe, ExternalLink,
  Calculator, CheckCircle2, ChevronDown, Lock, Cpu, Play, Award, DollarSign, Clock, TrendingUp, X, Sliders, Layout, Layers, RefreshCw, Terminal, Copy, Server, CheckSquare, Layers2, Bot, HelpCircle
} from 'lucide-react';

const ERP_APP_URL = process.env.NEXT_PUBLIC_ERP_APP_URL || 'http://localhost:3000';

export default function NextGenCorporateHomePage() {
  // Lead Capture & Modal State
  const [leadEmail, setLeadEmail] = useState('');
  const [isAnnual, setIsAnnual] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'trial' | 'demo' | 'tour'>('trial');
  const [tourStep, setTourStep] = useState(1);

  // Executive Cockpit Persona Switcher State (Dynamics 365 Benchmark)
  const [activePersona, setActivePersona] = useState<'cfo' | 'coo' | 'cto' | 'cmo' | 'chro'>('cfo');

  // AI Agentforce Simulator State (Salesforce Benchmark)
  const [activeAgent, setActiveAgent] = useState<'reconcile' | 'quote' | 'reorder'>('reconcile');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(3);

  // 28-Module App Matrix Filter (Odoo Benchmark)
  const [appFilter, setAppFilter] = useState<'all' | 'ops' | 'verticals' | 'studio' | 'ai'>('all');

  // Live API Playground State
  const [activeApiRoute, setActiveApiRoute] = useState<'finance' | 'builder' | 'inventory'>('finance');
  const [copiedApi, setCopiedApi] = useState(false);

  // Cloud vs Self-Hosted TCO Calculator State (Zoho Benchmark)
  const [tcoUsers, setTcoUsers] = useState(40);
  const [tcoStorage, setTcoStorage] = useState(250); // GB
  const [tcoMode, setTcoMode] = useState<'cloud' | 'selfhosted'>('cloud');

  // Custom Modular Demo Builder State
  const [selectedModules, setSelectedModules] = useState<string[]>(['finance', 'inventory', 'builder']);

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
    const cloudMonthly = tcoUsers * (isAnnual ? 63 : 79) + (tcoStorage / 100) * 15;
    const legacyCloudSpend = tcoUsers * 180 + (tcoStorage / 100) * 45;
    const annualSavings = Math.round((legacyCloudSpend - cloudMonthly) * 12);
    return {
      monthly: Math.round(cloudMonthly),
      annualSavings,
      selfHostedDockerCommand: `docker run -d -p 3000:3000 -p 3001:3001 --name unerp-stack -e TENANT_ID=prod_01 kannan19302/unierp-core:latest`
    };
  }, [tcoUsers, tcoStorage, isAnnual]);

  // Modules List (28 Modules)
  const allModules = [
    { id: 'finance', name: 'General Ledger & Accounting', cat: 'ops', icon: CreditCard, desc: 'Double-entry bookkeeping, automated bank feeds, FX revaluation.' },
    { id: 'inventory', name: 'Multi-Warehouse Inventory', cat: 'ops', icon: Package, desc: 'Serial/batch tracking, serial numbers, drop-shipping, barcodes.' },
    { id: 'manufacturing', name: 'Manufacturing & MRP II', cat: 'ops', icon: Hammer, desc: 'Work orders, bill of materials, routing, capacity planning.' },
    { id: 'crm', name: 'CRM & Deal Pipeline', cat: 'ops', icon: Users, desc: 'Lead scoring, sales funnel analytics, automated quotes.' },
    { id: 'hr', name: 'HR & Payroll Engine', cat: 'ops', icon: Heart, desc: 'Salary structures, tax deductions, leave approvals, attendance.' },
    { id: 'pos', name: 'Retail Point-of-Sale (POS)', cat: 'ops', icon: Store, desc: 'Offline-first cash register, receipt printing, inventory sync.' },

    { id: 'studio', name: 'No-Code Builder Studio', cat: 'studio', icon: Activity, desc: 'Drag-and-drop page builder, form intake builder, workflow triggers.' },
    { id: 'cms', name: 'Tenant Web Portal CMS', cat: 'studio', icon: Globe, desc: 'Customizable / root public site engine with dynamic theme tokens.' },
    { id: 'forms', name: 'Dynamic Form Generator', cat: 'studio', icon: Layout, desc: 'Visual form builder with validation rules and webhook handlers.' },

    { id: 'healthcare', name: 'Healthcare & EMR Suite', cat: 'verticals', icon: Activity, desc: 'Patient records, appointments, prescription logs, lab billing.' },
    { id: 'education', name: 'Education & SIS Portal', cat: 'verticals', icon: GraduationCap, desc: 'Student enrollment, gradebooks, fee collections, timetables.' },
    { id: 'realestate', name: 'Real Estate & Lease Mgmt', cat: 'verticals', icon: Building2, desc: 'Property listings, tenant lease agreements, maintenance tickets.' },
    { id: 'fieldservice', name: 'Field Service Dispatch', cat: 'verticals', icon: Wrench, desc: 'Technician scheduling, mobile work orders, route optimization.' },

    { id: 'copilot', name: 'UniERP AI Copilot', cat: 'ai', icon: Bot, desc: 'Automated financial reconciliation, quote drafting, inventory alerts.' },
    { id: 'analytics', name: 'BI Executive Dashboards', cat: 'ai', icon: BarChart3, desc: '1,500+ real-time metrics, cohort analysis, cashflow forecasting.' },
  ];

  const filteredModules = allModules.filter(m => appFilter === 'all' || m.cat === appFilter);

  return (
    <div className="grid-bg-pattern" style={{ minHeight: '100vh', background: '#030712', color: '#f8fafc', position: 'relative' }}>
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
        <span>UniERP 2.5 Released: Agentforce AI Copilot & Multi-Tenant E-Commerce Portal Engine</span>
        <button onClick={() => openLeadModal('tour')} style={{ background: 'none', border: 'none', color: '#ffffff', textDecoration: 'underline', fontWeight: 700, cursor: 'pointer' }}>
          Watch 2-Min Tour →
        </button>
      </div>

      {/* ── Navigation Header ── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.4rem', color: '#ffffff', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #38bdf8, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
              U
            </div>
            <span style={{ letterSpacing: '-0.02em' }}>Uni<span className="text-gradient">ERP</span></span>
          </Link>

          <nav style={{ display: 'flex', gap: '2.25rem', alignItems: 'center' }}>
            <a href="#cockpit" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>Executive Cockpit</a>
            <a href="#agentforce" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>AI Agentforce</a>
            <a href="#apps" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>28+ Apps</a>
            <a href="#api" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>API Playground</a>
            <a href="#tco" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>TCO & Security</a>
            <a href="#pricing" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>Pricing</a>
          </nav>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href={`${ERP_APP_URL}/`} className="btn-secondary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}>
              <Globe size={15} />
              <span>Tenant Portal</span>
            </a>
            <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.875rem' }}>
              <span>Log In to Desk</span>
              <ArrowRight size={15} />
            </button>
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
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2rem',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.2)'
          }}>
            <Award size={16} />
            <span>Ranked #1 Composable Multi-Tenant ERP Engine</span>
            <ChevronRight size={14} />
          </div>

          <h1 style={{
            fontSize: 'clamp(3.2rem, 6vw, 4.85rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            margin: '0 0 1.75rem 0',
            color: '#ffffff'
          }}>
            The Autonomous Operating System <br />
            For <span className="text-gradient">Modern Global Enterprises</span>
          </h1>

          <p style={{
            fontSize: '1.3rem',
            color: '#94a3b8',
            maxWidth: '820px',
            margin: '0 auto 3rem',
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            Combine <strong style={{ color: '#ffffff' }}>28+ composable ERP modules</strong>, AI Agentforce automation, and visual No-Code Studio into one multi-tenant platform with database-layer security.
          </p>

          {/* High-Converting Work Email Form */}
          <form onSubmit={handleLeadSubmit} style={{
            maxWidth: '580px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(15, 23, 42, 0.85)',
            padding: '0.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15)',
            backdropFilter: 'blur(16px)'
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
                color: '#ffffff',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              required
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: '12px' }}>
              <span>Start 14-Day Trial</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> No Credit Card Required</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> Full 28-Module Access</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> Instant Docker / Cloud Setup</span>
          </div>

        </div>
      </section>

      {/* ── Dynamics 365-Style Executive Cockpit Switcher ── */}
      <section id="cockpit" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <BarChart3 size={18} />
            <span>Role-Tailored Intelligence</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Executive Cockpit Switcher</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Select your leadership persona to preview real-time metrics and tailored operational dashboards.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'cfo', label: 'CFO • Finance & GL', icon: DollarSign, color: '#10b981' },
            { id: 'coo', label: 'COO • Supply Chain & MRP', icon: Package, color: '#f59e0b' },
            { id: 'cto', label: 'CTO • Architecture & RLS', icon: Cpu, color: '#38bdf8' },
            { id: 'cmo', label: 'CMO • Commerce & Leads', icon: Globe, color: '#a855f7' },
            { id: 'chro', label: 'CHRO • People & Payroll', icon: Heart, color: '#ec4899' },
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
                  background: active ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.04)',
                  color: active ? p.color : '#94a3b8',
                  border: '1px solid',
                  borderColor: active ? p.color : 'rgba(255, 255, 255, 0.1)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? `0 0 20px ${p.color}25` : 'none'
                }}
              >
                <Icon size={16} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Cockpit Canvas Card */}
        <div className="glass-panel card-3d-tilt" style={{ padding: '2.5rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            <div>
              <div style={{ display: 'inline-block', padding: '0.35rem 0.85rem', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
                {activePersona.toUpperCase()} Executive Suite
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem 0', color: '#ffffff' }}>
                {activePersona === 'cfo' && 'Automated Multi-Currency Accounting & GL'}
                {activePersona === 'coo' && 'Real-Time Inventory & Manufacturing MRP'}
                {activePersona === 'cto' && 'Row-Level Tenant Isolation & 1,500+ REST APIs'}
                {activePersona === 'cmo' && 'Dynamic Storefront CMS & Lead Conversion'}
                {activePersona === 'chro' && 'Automated Global Payroll & Talent Operations'}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {activePersona === 'cfo' && 'Real-time double-entry general ledger, period-end FX revaluation, automated bank feeds, and NACHA/SEPA payment processing.'}
                {activePersona === 'coo' && 'Multi-warehouse stock replenishment, serial/batch tracking, bill of materials (BOM), and work order scheduling.'}
                {activePersona === 'cto' && 'Enforce tenant_id isolation via PostgreSQL 16 RLS policies with Docker containerized deployment and visual Studio extensibility.'}
                {activePersona === 'cmo' && 'Launch customizable tenant portals at / with drag-and-drop page editing, e-commerce catalog, and CRM lead scoring.'}
                {activePersona === 'chro' && 'Complex multi-component salary structures, tax withholding, leave workflow approvals, and employee performance tracking.'}
              </p>
              <button onClick={() => openLeadModal('demo')} className="btn-primary">
                <span>Explore {activePersona.toUpperCase()} Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Simulated Live KPI Badges */}
            <div style={{ background: '#0b1329', padding: '2rem', borderRadius: '16px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {activePersona === 'cfo' && (
                <>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Monthly Net Revenue</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>$1,248,500.00 <span style={{ color: '#10b981', fontSize: '0.85rem' }}>+18.4%</span></div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Automated Period Reconciliations</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>99.2% Completed</div>
                  </div>
                </>
              )}

              {activePersona === 'coo' && (
                <>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Warehouse Order Fulfillment Velocity</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>4.2 Hours <span style={{ color: '#10b981', fontSize: '0.85rem' }}>-65% Time</span></div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Active MRP Work Orders</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>142 Units Scheduled</div>
                  </div>
                </>
              )}

              {activePersona === 'cto' && (
                <>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Database RLS Isolation Policy</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>100% Non-Bypass Verified</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #a855f7' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Open REST/GraphQL Endpoints</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>1,540 Endpoints Active</div>
                  </div>
                </>
              )}

              {activePersona === 'cmo' && (
                <>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #a855f7' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Storefront Conversion Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>4.85% <span style={{ color: '#10b981', fontSize: '0.85rem' }}>+2.1% boost</span></div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>CRM Pipeline Deals</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>$3.8M Active Qualified</div>
                  </div>
                </>
              )}

              {activePersona === 'chro' && (
                <>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #ec4899' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Automated Payroll Run Speed</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>Under 2 Minutes</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Employee Engagement Index</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>94 / 100 Score</div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── Salesforce Agentforce-Level AI Command Center Simulator ── */}
      <section id="agentforce" style={{ background: '#090d16', padding: '6rem 1.5rem', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#a855f7', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              <Bot size={18} />
              <span>Autonomous AI Execution</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>UniERP AI Agentforce Simulator</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
              Test how autonomous AI agents execute complex ERP workflows step-by-step in real-time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            
            {/* Left Control Panel */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>Select Autonomous Agent</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { id: 'reconcile', title: 'Auto GL Bank Reconciliation Agent', desc: 'Matches bank transactions with journal entries automatically.' },
                  { id: 'quote', title: 'AI Sales Quote & Contract Assistant', desc: 'Drafts custom pricing quotes based on customer order history.' },
                  { id: 'reorder', title: 'Inventory Reorder & MRP Optimizer', desc: 'Predicts stockouts and posts purchase orders to vendors.' },
                ].map(a => (
                  <button
                    key={a.id}
                    onClick={() => runAgentSimulator(a.id as any)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      background: activeAgent === a.id ? 'rgba(168, 85, 247, 0.15)' : '#0b1329',
                      border: activeAgent === a.id ? '1px solid #a855f7' : '1px solid #1e293b',
                      color: '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: activeAgent === a.id ? '#c084fc' : '#ffffff', marginBottom: '0.25rem' }}>
                      {a.title}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{a.desc}</div>
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
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', background: '#0b1329' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                <span style={{ fontWeight: 700, color: '#c084fc', fontSize: '0.95rem' }}>Visual Execution Node Graph</span>
                <span style={{ fontSize: '0.8rem', color: isAgentRunning ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
                  {isAgentRunning ? '⚡ Running Workflow...' : '✅ Complete & Audited'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Node 1 */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: agentStep >= 1 ? 'rgba(56, 189, 248, 0.1)' : '#0f172a',
                  border: agentStep >= 1 ? '1px solid #38bdf8' : '1px solid #1e293b',
                  color: agentStep >= 1 ? '#ffffff' : '#64748b',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>Step 1: Event Triggered</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {activeAgent === 'reconcile' && 'Incoming Bank Feed Stream Ingested (500 Items)'}
                    {activeAgent === 'quote' && 'Customer Requested Custom Quote (RFQ #9402)'}
                    {activeAgent === 'reorder' && 'Inventory Item #SKU-882 Dropped Below Safety Stock'}
                  </div>
                </div>

                {/* Node 2 */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: agentStep >= 2 ? 'rgba(168, 85, 247, 0.1)' : '#0f172a',
                  border: agentStep >= 2 ? '1px solid #a855f7' : '1px solid #1e293b',
                  color: agentStep >= 2 ? '#ffffff' : '#64748b',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase' }}>Step 2: AI Neural Evaluation</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {activeAgent === 'reconcile' && 'AI Matched 498/500 GL Lines (99.6% Confidence Score)'}
                    {activeAgent === 'quote' && 'Evaluated Volume Discount & Auto-Approved 12% Margin'}
                    {activeAgent === 'reorder' && 'Calculated Lead-Time Demand (Optimal Reorder: 500 Units)'}
                  </div>
                </div>

                {/* Node 3 */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: agentStep >= 3 ? 'rgba(16, 185, 129, 0.1)' : '#0f172a',
                  border: agentStep >= 3 ? '1px solid #10b981' : '1px solid #1e293b',
                  color: agentStep >= 3 ? '#ffffff' : '#64748b',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Step 3: Database Mutation & Audit Log</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {activeAgent === 'reconcile' && 'Journal Ledger Updated • Audit Log Entry Posted'}
                    {activeAgent === 'quote' && 'Quotation PDF Generated & Emailed to Customer'}
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
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
            The Complete <span className="text-gradient">28+ Module Ecosystem</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto 2rem' }}>
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
                  background: appFilter === f.id ? '#2563eb' : 'rgba(255, 255, 255, 0.05)',
                  color: appFilter === f.id ? '#ffffff' : '#94a3b8',
                  border: appFilter === f.id ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
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
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem 0' }}>{m.name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{m.desc}</p>
                </div>
                <a
                  href={`${ERP_APP_URL}/login`}
                  style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <span>Launch App Trial</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Live Developer REST & GraphQL API Playground ── */}
      <section id="api" style={{ background: '#090d16', padding: '6rem 1.5rem', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              <Terminal size={18} />
              <span>Developer-First Architecture</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Live Developer API Playground</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
              Test real API endpoints and inspect formatted JSON payloads directly in your browser.
            </p>
          </div>

          <div className="terminal-window" style={{ maxWidth: '900px', margin: '0 auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
            {/* Terminal Header */}
            <div style={{ background: '#0f172a', padding: '0.75rem 1.25rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ marginLeft: '1rem', color: '#64748b', fontSize: '0.85rem' }}>bash — curl -X GET http://localhost:3001/api/v1</span>
              </div>
              <button
                onClick={() => {
                  setCopiedApi(true);
                  setTimeout(() => setCopiedApi(false), 1500);
                }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}
              >
                <Copy size={14} />
                <span>{copiedApi ? 'Copied!' : 'Copy Endpoint'}</span>
              </button>
            </div>

            {/* Terminal Route Tabs */}
            <div style={{ display: 'flex', background: '#0b1329', borderBottom: '1px solid #1e293b' }}>
              <button
                onClick={() => setActiveApiRoute('finance')}
                style={{ padding: '0.6rem 1.25rem', background: activeApiRoute === 'finance' ? '#090d16' : 'transparent', color: activeApiRoute === 'finance' ? '#38bdf8' : '#94a3b8', border: 'none', borderRight: '1px solid #1e293b', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                GET /api/v1/finance/dashboard
              </button>
              <button
                onClick={() => setActiveApiRoute('builder')}
                style={{ padding: '0.6rem 1.25rem', background: activeApiRoute === 'builder' ? '#090d16' : 'transparent', color: activeApiRoute === 'builder' ? '#38bdf8' : '#94a3b8', border: 'none', borderRight: '1px solid #1e293b', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                GET /api/v1/builder/pages
              </button>
              <button
                onClick={() => setActiveApiRoute('inventory')}
                style={{ padding: '0.6rem 1.25rem', background: activeApiRoute === 'inventory' ? '#090d16' : 'transparent', color: activeApiRoute === 'inventory' ? '#38bdf8' : '#94a3b8', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                GET /api/v1/inventory/reorder-alerts
              </button>
            </div>

            {/* JSON Output Display */}
            <pre style={{ padding: '1.75rem', fontSize: '0.9rem', overflowX: 'auto', margin: 0, fontFamily: 'monospace' }}>
              {activeApiRoute === 'finance' && (
                <code>
                  {`{\n`}
                  &nbsp;&nbsp;<span className="json-key">&quot;statusCode&quot;</span>: <span className="json-number">200</span>,<br />
                  &nbsp;&nbsp;<span className="json-key">&quot;tenant_id&quot;</span>: <span className="json-string">&quot;tenant_prod_01&quot;</span>,<br />
                  &nbsp;&nbsp;<span className="json-key">&quot;period&quot;</span>: <span className="json-string">&quot;2026-07&quot;</span>,<br />
                  &nbsp;&nbsp;<span className="json-key">&quot;metrics&quot;</span>: &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;total_revenue&quot;</span>: <span className="json-number">1248500.00</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;unreconciled_items&quot;</span>: <span className="json-number">0</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;multi_currency_revaluation&quot;</span>: <span className="json-boolean">true</span><br />
                  &nbsp;&nbsp;&#125;<br />
                  {`}`}
                </code>
              )}

              {activeApiRoute === 'builder' && (
                <code>
                  {`{\n`}
                  &nbsp;&nbsp;<span className="json-key">&quot;statusCode&quot;</span>: <span className="json-number">200</span>,<br />
                  &nbsp;&nbsp;<span className="json-key">&quot;publishedPages&quot;</span>: [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;slug&quot;</span>: <span className="json-string">&quot;/&quot;</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;title&quot;</span>: <span className="json-string">&quot;Home Storefront&quot;</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;componentsCount&quot;</span>: <span className="json-number">14</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                  &nbsp;&nbsp;]<br />
                  {`}`}
                </code>
              )}

              {activeApiRoute === 'inventory' && (
                <code>
                  {`{\n`}
                  &nbsp;&nbsp;<span className="json-key">&quot;statusCode&quot;</span>: <span className="json-number">200</span>,<br />
                  &nbsp;&nbsp;<span className="json-key">&quot;alerts&quot;</span>: [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;sku&quot;</span>: <span className="json-string">&quot;SKU-882&quot;</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;warehouse&quot;</span>: <span className="json-string">&quot;Main Distribution Center&quot;</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;currentStock&quot;</span>: <span className="json-number">12</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;reorderPoint&quot;</span>: <span className="json-number">50</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">&quot;autoPOTriggered&quot;</span>: <span className="json-boolean">true</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                  &nbsp;&nbsp;]<br />
                  {`}`}
                </code>
              )}
            </pre>
          </div>
        </div>
      </section>

      {/* ── Zoho-Level Cloud vs. Self-Hosted TCO Calculator ── */}
      <section id="tco" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '6rem 1.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <Server size={18} />
            <span>Infrastructure & Security Choice</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Cloud vs. Self-Hosted TCO Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Choose fully managed cloud or run single-tenant Docker containers on your own cloud infrastructure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Controls */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: '#ffffff' }}>Active User Seats</label>
                <span style={{ color: '#38bdf8', fontWeight: 800 }}>{tcoUsers} Users</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                value={tcoUsers}
                onChange={(e) => setTcoUsers(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: '#ffffff' }}>Database Storage (GB)</label>
                <span style={{ color: '#a855f7', fontWeight: 800 }}>{tcoStorage} GB</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={tcoStorage}
                onChange={(e) => setTcoStorage(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#a855f7', cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#ffffff', marginBottom: '0.75rem' }}>Deployment Mode</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setTcoMode('cloud')}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', background: tcoMode === 'cloud' ? '#2563eb' : '#0b1329', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  Managed Cloud
                </button>
                <button
                  onClick={() => setTcoMode('selfhosted')}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', background: tcoMode === 'selfhosted' ? '#2563eb' : '#0b1329', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  Docker On-Premise
                </button>
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="glass-panel" style={{ padding: '3rem', border: '2px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(15, 23, 42, 0.8))' }}>
            <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Estimated Annual Savings vs Legacy SAP/NetSuite
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', lineHeight: 1, marginBottom: '0.5rem' }}>
              ${tcoResult.annualSavings.toLocaleString()} <span style={{ fontSize: '1.25rem', color: '#94a3b8', fontWeight: 400 }}>/ year</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Includes PostgreSQL 16 Row-Level Security (RLS) data isolation guarantees and zero per-module add-on fees.
            </p>

            {tcoMode === 'selfhosted' && (
              <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', fontSize: '0.8rem', color: '#34d399', fontFamily: 'monospace', marginBottom: '1.5rem', overflowX: 'auto' }}>
                {tcoResult.selfHostedDockerCommand}
              </div>
            )}

            <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <span>Deploy Instant Workspace</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section id="pricing" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '6rem 1.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Transparent Enterprise Pricing</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>Zero hidden fees. Deploy instantly with full API and Studio access.</p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: '#1e293b', padding: '0.4rem 0.5rem', borderRadius: '9999px', border: '1px solid #334155' }}>
            <button
              onClick={() => setIsAnnual(false)}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', border: 'none', background: !isAnnual ? '#2563eb' : 'transparent', color: !isAnnual ? '#ffffff' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', border: 'none', background: isAnnual ? '#2563eb' : 'transparent', color: isAnnual ? '#ffffff' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Annual Billing</span>
              <span style={{ background: '#10b981', color: '#ffffff', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 800 }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Starter */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Starter</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Essential core ERP modules for growing small businesses.</p>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
              ${isAnnual ? '23' : '29'} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/ user / month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10b981" /> General Ledger & Inventory</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10b981" /> No-Code Builder Studio Access</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10b981" /> Standard REST APIs</li>
            </ul>
            <button onClick={() => openLeadModal('trial')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Start Starter Plan</button>
          </div>

          {/* Professional (Popular) */}
          <div className="glass-panel" style={{ padding: '2.5rem', border: '2px solid #38bdf8', boxShadow: '0 0 35px rgba(56, 189, 248, 0.2)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Professional</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Complete 28-module enterprise suite with AI Copilot.</p>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
              ${isAnnual ? '63' : '79'} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/ user / month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#38bdf8" /> All 28 ERP Business Modules</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#38bdf8" /> AI Agentforce Execution Engine</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#38bdf8" /> Custom Domain & Web Portal at /</li>
            </ul>
            <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start 14-Day Free Trial</button>
          </div>

          {/* Enterprise */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Enterprise</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Dedicated single-tenant infrastructure with custom SLA.</p>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>Custom</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#a855f7" /> Dedicated Postgres & Redis Stack</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#a855f7" /> Custom SSO & RLS Isolation</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#a855f7" /> Dedicated Solutions Architect</li>
            </ul>
            <button onClick={() => openLeadModal('demo')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Contact Enterprise Sales</button>
          </div>
        </div>
      </section>

      {/* ── Guided Product Tour Modal ── */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', width: '100%', padding: '2.5rem', background: '#0b1329', border: '1px solid rgba(56, 189, 248, 0.3)', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            {modalType === 'tour' ? (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{ flex: 1, height: '4px', borderRadius: '9999px', background: s <= tourStep ? '#38bdf8' : '#1e293b' }} />
                  ))}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  {tourStep === 1 && 'Step 1: Set Up Branding & Domain'}
                  {tourStep === 2 && 'Step 2: Build Pages in No-Code Studio'}
                  {tourStep === 3 && 'Step 3: Run Double-Entry Accounting GL'}
                  {tourStep === 4 && 'Step 4: Launch Multi-Tenant Workspace'}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
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
                    <button onClick={() => { setShowModal(false); openLeadModal('trial'); }} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Claim Trial Workspace</button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  {modalType === 'trial' ? 'Start Your 14-Day Trial' : 'Book an ERP Architect Session'}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                  Instant access to full 28+ ERP modules & No-Code Studio.
                </p>
                <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>Work Email</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', outline: 'none' }}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <span>Launch Workspace Now</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer style={{ background: '#030712', borderTop: '1px solid #1e293b', padding: '4rem 1.5rem 2rem', color: '#64748b', fontSize: '0.9rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.25rem' }}>UniERP Platform</div>
            <p>© {new Date().getFullYear()} UniERP Platform Inc. All rights reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href={`${ERP_APP_URL}/login`} style={{ color: '#94a3b8' }}>ERP Platform Desk</a>
            <a href={`${ERP_APP_URL}/`} style={{ color: '#94a3b8' }}>Tenant Site Portal</a>
            <a href="http://localhost:3001/swagger" style={{ color: '#94a3b8' }}>Swagger API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
