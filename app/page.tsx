'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield, ChevronRight, Check, CreditCard, Users, BarChart3,
  Package, Hammer, Activity, Heart, GraduationCap, Building2,
  Wrench, Store, Zap, ArrowRight, Star, Sparkles, Globe, ExternalLink,
  Calculator, CheckCircle2, ChevronDown, Lock, Cpu, Play, Award, DollarSign, Clock, TrendingUp, X, Sliders, Layout, Layers, RefreshCw, Terminal, Copy, Server, CheckSquare, Layers2, Bot, HelpCircle, FileText, UserPlus, LogIn, Compass, Sun, Moon, MessageSquare, Send
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
  const [modalType, setModalType] = useState<'trial' | 'demo' | 'tour' | 'chat'>('trial');
  const [tourStep, setTourStep] = useState(1);

  // AI Chatbot Widget State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user' | 'system'; text: string; showEscalate?: boolean }>>([
    { sender: 'ai', text: 'Hello! I am your UniERP AI Assistant. Ask me anything about our 28+ ERP modules, ₹ INR pricing, GST compliance, or No-Code Studio!' }
  ]);
  const [incidentCreated, setIncidentCreated] = useState<string | null>(null);

  // Executive Cockpit Persona Switcher State
  const [activePersona, setActivePersona] = useState<'cfo' | 'coo' | 'cto' | 'cmo' | 'chro'>('cfo');

  // AI Agentforce Simulator State
  const [activeAgent, setActiveAgent] = useState<'reconcile' | 'quote' | 'reorder'>('reconcile');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(3);

  // 28-Module App Matrix Filter
  const [appFilter, setAppFilter] = useState<'all' | 'ops' | 'verticals' | 'studio' | 'ai'>('all');

  // Visitor Network Analytics Ping
  useEffect(() => {
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer || 'Direct',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });
    } catch (e) { }
  }, []);

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

  // AI Chat Submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply, showEscalate: data.escalateOption }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: 'I am currently processing your request. Feel free to launch our live demo site or create an incident ticket!', showEscalate: true }]);
    }
  };

  // Create Support Incident Ticket
  const createIncidentTicket = () => {
    const ticketId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;
    setIncidentCreated(ticketId);
    setChatMessages(prev => [
      ...prev,
      { sender: 'system', text: `✅ Support Incident Ticket ${ticketId} created! Our enterprise sales & support team will contact you shortly.` }
    ]);
  };

  const openLeadModal = (type: 'trial' | 'demo' | 'tour' | 'chat') => {
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

  // SEO JSON-LD Structured Data Schema
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UniERP Operating System',
    operatingSystem: 'Linux, Windows, Web, Cloud, Docker',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '520'
    },
    offers: {
      '@type': 'Offer',
      price: '1499.00',
      priceCurrency: 'INR'
    }
  };

  return (
    <div data-theme={theme} className="grid-bg-pattern" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', position: 'relative' }}>
      
      {/* Google SEO JSON-LD Injected Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

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

      {/* ── Navigation Header with Admin Command Console Link ── */}
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

          <nav style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            <a href="#cockpit" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Executive Cockpit</a>
            <a href="#agentforce" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>AI Agentforce</a>
            <a href="#apps" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>28+ Apps</a>
            <a href="#gst-compliance" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>GST & Payroll</a>
            <a href="#pricing" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>India Pricing</a>
            <Link href="/admin" style={{ color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Shield size={15} />
              <span>Admin Console</span>
            </Link>
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
            >
              <Compass size={15} />
              <span>Launch Demo</span>
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

      {/* ── Localized India Pricing Tiers ── */}
      <section id="pricing" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '6rem 1.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--color-text-main)' }}>Transparent Enterprise Pricing</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Zero hidden fees. Full 30-day unrestricted trial with GST and statutory payroll ready.</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', background: 'var(--color-surface)', padding: '0.3rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
              <button onClick={() => setCurrency('INR')} style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: currency === 'INR' ? 'var(--color-emerald)' : 'transparent', color: currency === 'INR' ? '#ffffff' : 'var(--color-text-muted)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                🇮🇳 ₹ INR (India)
              </button>
              <button onClick={() => setCurrency('USD')} style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: currency === 'USD' ? 'var(--color-primary)' : 'transparent', color: currency === 'USD' ? '#ffffff' : 'var(--color-text-muted)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                🌐 $ USD (Global)
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
            <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start 30-Day Free Trial</button>
          </div>

          {/* Enterprise */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--color-text-main)' }}>Enterprise</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Dedicated single-tenant infrastructure with custom SLA.</p>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>Custom Quote</div>
            <button onClick={() => openLeadModal('demo')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* ── Floating AI Marketing Chatbot Widget ── */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 90 }}>
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            style={{
              padding: '0.85rem 1.35rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #2563eb, #7e22ce)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Bot size={20} />
            <span>Ask UniERP AI Assistant</span>
          </button>
        ) : (
          <div className="glass-panel" style={{ width: '360px', height: '480px', display: 'flex', flexDirection: 'column', background: 'var(--header-bg)', border: '1px solid var(--color-primary)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}>
            {/* Header */}
            <div style={{ padding: '0.85rem 1.15rem', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', borderTopLeftRadius: '18px', borderTopRightRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
                <Bot size={18} />
                <span>UniERP AI Assistant</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '0.65rem 0.95rem',
                    borderRadius: '12px',
                    background: msg.sender === 'user' ? '#2563eb' : msg.sender === 'system' ? 'rgba(16, 185, 129, 0.15)' : 'var(--color-surface)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--color-text-main)',
                    border: msg.sender === 'system' ? '1px solid #10b981' : 'none'
                  }}>
                    {msg.text}
                  </div>
                  {msg.showEscalate && !incidentCreated && (
                    <button
                      onClick={createIncidentTicket}
                      style={{ marginTop: '0.4rem', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', border: '1px solid #ec4899', borderRadius: '6px', padding: '0.35rem 0.65rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      🚨 Escalate to Human Specialist
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} style={{ padding: '0.75rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.4rem' }}>
              <input
                type="text"
                placeholder="Ask about pricing, GST, apps..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--glass-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.85rem' }}
              />
              <button type="submit" style={{ background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer' }}>
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--glass-border)', padding: '4rem 1.5rem 2rem', color: 'var(--color-text-subtle)', fontSize: '0.9rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>UniERP Platform</div>
            <p>© {new Date().getFullYear()} UniERP Platform Inc. All rights reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/admin" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Admin Command Tower</Link>
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
