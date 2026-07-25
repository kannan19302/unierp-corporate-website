'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield, ChevronRight, Check, CreditCard, Users, BarChart3,
  Package, Hammer, Activity, Heart, GraduationCap, Building2,
  Wrench, Store, Zap, ArrowRight, Star, Sparkles, Globe, ExternalLink,
  Calculator, CheckCircle2, ChevronDown, Lock, Cpu, Play, Award, DollarSign, Clock, TrendingUp, X, Sliders, Layout, Layers, RefreshCw
} from 'lucide-react';

const ERP_APP_URL = process.env.NEXT_PUBLIC_ERP_APP_URL || 'http://localhost:3000';

export default function CorporateHomePage() {
  // Lead Capture State
  const [leadEmail, setLeadEmail] = useState('');
  const [isAnnual, setIsAnnual] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'trial' | 'demo'>('trial');
  
  // Interactive Module Showcase State
  const [activeTab, setActiveTab] = useState('studio');

  // Live Studio Sandbox State (Interactive Demo Widget on Page)
  const [sandboxBrandName, setSandboxBrandName] = useState('Acme Global');
  const [sandboxColor, setSandboxColor] = useState('#38bdf8');
  const [sandboxLayout, setSandboxLayout] = useState<'store' | 'corporate' | 'blog'>('store');

  // ROI Calculator State & Presets
  const [teamSize, setTeamSize] = useState(25);
  const [currentSpend, setCurrentSpend] = useState(2500);
  const [manualHours, setManualHours] = useState(30);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Industry ROI Presets
  const applyPreset = (preset: 'healthcare' | 'education' | 'realestate' | 'fieldservice' | 'retail') => {
    switch (preset) {
      case 'healthcare':
        setTeamSize(45);
        setCurrentSpend(6500);
        setManualHours(50);
        break;
      case 'education':
        setTeamSize(60);
        setCurrentSpend(4800);
        setManualHours(40);
        break;
      case 'realestate':
        setTeamSize(30);
        setCurrentSpend(3500);
        setManualHours(35);
        break;
      case 'fieldservice':
        setTeamSize(35);
        setCurrentSpend(4200);
        setManualHours(45);
        break;
      case 'retail':
        setTeamSize(20);
        setCurrentSpend(2200);
        setManualHours(25);
        break;
    }
  };

  // Computed ROI
  const calculatedSavings = useMemo(() => {
    const unierpCost = teamSize * (isAnnual ? 63 : 79);
    const monthlySoftwareSavings = Math.max(0, currentSpend - unierpCost);
    const laborSavings = manualHours * 4 * 45 * 0.6; // 60% reduction in manual admin time @ $45/hr
    const totalMonthly = monthlySoftwareSavings + laborSavings;
    return {
      monthly: Math.round(totalMonthly),
      annual: Math.round(totalMonthly * 12),
      hoursSavedMonth: Math.round(manualHours * 4 * 0.6),
    };
  }, [teamSize, currentSpend, manualHours, isAnnual]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    window.location.href = `${ERP_APP_URL}/login?email=${encodeURIComponent(leadEmail)}`;
  };

  const openLeadModal = (type: 'trial' | 'demo') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f8fafc', position: 'relative' }}>
      {/* Background Animated Glowing Orbs */}
      <div className="animated-bg-glow glow-blue" style={{ top: '-100px', left: '15%' }} />
      <div className="animated-bg-glow glow-purple" style={{ top: '700px', right: '10%' }} />
      <div className="animated-bg-glow glow-emerald" style={{ top: '1600px', left: '5%' }} />

      {/* ── Top Announcement Banner ── */}
      <div style={{
        background: 'linear-gradient(90deg, #1d4ed8, #7e22ce, #1d4ed8)',
        backgroundSize: '200% auto',
        animation: 'gradient-shift 4s ease infinite',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem'
      }}>
        <Sparkles size={16} />
        <span>UniERP 2.5 Released: Instant No-Code Builder Studio & Multi-Tenant E-Commerce Portal Engine</span>
        <a href={`${ERP_APP_URL}/`} style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: 700 }}>
          View Live Demo →
        </a>
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
            <a href="#sandbox" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>Live Sandbox</a>
            <a href="#showcase" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>Features</a>
            <a href="#roi-calculator" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>ROI Calculator</a>
            <a href="#comparison" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>Comparison</a>
            <a href="#pricing" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>Pricing</a>
            <a href="http://localhost:3001/swagger" style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>API Docs</a>
          </nav>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href={`${ERP_APP_URL}/`} className="btn-secondary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}>
              <Globe size={15} />
              <span>Tenant Site Engine</span>
            </a>
            <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.875rem' }}>
              <span>Log In to Desk</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section style={{ padding: '7rem 1.5rem 5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          
          {/* Floating Release Badge */}
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
            <span>Ranked #1 Composable Multi-Tenant ERP Architecture</span>
            <ChevronRight size={14} />
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 4.75rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            margin: '0 0 1.75rem 0',
            color: '#ffffff'
          }}>
            Run Your Entire Enterprise With <br />
            <span className="text-gradient">Zero Code & 10x Velocity</span>
          </h1>

          <p style={{
            fontSize: '1.3rem',
            color: '#94a3b8',
            maxWidth: '780px',
            margin: '0 auto 3rem',
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            The industry’s first composable ERP platform with an embedded <strong style={{ color: '#ffffff' }}>No-Code Builder Studio</strong>, automated financial GL, inventory, payroll, and customizable tenant web portals.
          </p>

          {/* High-Converting Lead Capture Form */}
          <form onSubmit={handleLeadSubmit} style={{
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '0.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(56, 189, 248, 0.3)',
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
              <span>Start Free Trial</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> No Credit Card Required</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> 14-Day Full Access</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> Instant Workspace Setup</span>
          </div>

        </div>
      </section>

      {/* ── Social Proof Metrics ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#38bdf8', marginBottom: '0.25rem' }}>$4.2M+</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>Client Operating Cost Saved</div>
          </div>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#10b981', marginBottom: '0.25rem' }}>99.99%</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>Uptime SLA Guarantee</div>
          </div>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#a855f7', marginBottom: '0.25rem' }}>1,500+</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>Enterprise REST API Endpoints</div>
          </div>
          <div>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#f59e0b', marginBottom: '0.25rem' }}>10x</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>Faster Deployment Velocity</div>
          </div>
        </div>
      </section>

      {/* ── Live No-Code Studio Sandbox (Interactive Motion Feature) ── */}
      <section id="sandbox" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <Sliders size={18} />
            <span>Interactive Live Demo</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
            Try the <span className="text-gradient">No-Code Studio Builder</span> Right Now
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Test customization controls live — edit your brand name, pick brand tokens, and select layout presets.
          </p>
        </div>

        <div className="glass-panel shine-effect" style={{ padding: '2rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
            
            {/* Left Controls Bar */}
            <div style={{ background: '#0b1329', padding: '1.75rem', borderRadius: '14px', border: '1px solid #1e293b' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layout size={18} color="#38bdf8" />
                <span>Studio Controls</span>
              </h3>

              {/* Brand Name Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>Tenant Brand Name</label>
                <input
                  type="text"
                  value={sandboxBrandName}
                  onChange={(e) => setSandboxBrandName(e.target.value)}
                  style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              {/* Theme Color Picker */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>Brand Primary Token</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { color: '#38bdf8', label: 'Sky' },
                    { color: '#10b981', label: 'Emerald' },
                    { color: '#a855f7', label: 'Purple' },
                    { color: '#f59e0b', label: 'Amber' },
                  ].map(c => (
                    <button
                      key={c.color}
                      onClick={() => setSandboxColor(c.color)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: c.color,
                        border: sandboxColor === c.color ? '3px solid #ffffff' : 'none',
                        cursor: 'pointer',
                        boxShadow: sandboxColor === c.color ? `0 0 15px ${c.color}` : 'none'
                      }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Layout Preset Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>Page Template Preset</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { id: 'store', label: 'E-Commerce Storefront' },
                    { id: 'corporate', label: 'Corporate Portal' },
                    { id: 'blog', label: 'Blog & Media Center' },
                  ].map(l => (
                    <button
                      key={l.id}
                      onClick={() => setSandboxLayout(l.id as any)}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: '8px',
                        background: sandboxLayout === l.id ? 'rgba(56, 189, 248, 0.15)' : '#1e293b',
                        color: sandboxLayout === l.id ? '#38bdf8' : '#94a3b8',
                        border: sandboxLayout === l.id ? '1px solid #38bdf8' : '1px solid #334155',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Canvas Preview */}
            <div style={{ background: '#090d16', borderRadius: '14px', border: '1px solid #1e293b', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#0f172a', padding: '0.75rem 1.25rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ marginLeft: '0.75rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 500 }}>
                    http://localhost:3000/ — Live Preview
                  </span>
                </div>
                <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={12} />
                  <span>Real-time Studio Sync</span>
                </div>
              </div>

              {/* Dynamic Live Rendered Sandbox Web Page */}
              <div style={{ padding: '2.5rem', flex: 1, background: '#ffffff', color: '#0f172a', transition: 'all 0.3s ease' }}>
                {/* Navbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: sandboxColor, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                      {sandboxBrandName.substring(0, 1)}
                    </div>
                    <span>{sandboxBrandName}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>
                    <span>Home</span>
                    <span>{sandboxLayout === 'store' ? 'Catalog' : sandboxLayout === 'blog' ? 'Articles' : 'Services'}</span>
                    <span>Contact</span>
                  </div>
                  <button style={{ background: sandboxColor, color: '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem' }}>
                    {sandboxLayout === 'store' ? 'View Cart' : 'Client Portal'}
                  </button>
                </div>

                {/* Hero Banner */}
                <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '2.5rem 2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.75rem 0' }}>
                    Welcome to <span style={{ color: sandboxColor }}>{sandboxBrandName}</span>
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
                    {sandboxLayout === 'store' && 'Discover premium product collections powered directly by UniERP Inventory.'}
                    {sandboxLayout === 'corporate' && 'Leading enterprise services and customer portal solutions.'}
                    {sandboxLayout === 'blog' && 'Latest announcements, technical articles, and industry insights.'}
                  </p>
                  <button style={{ background: sandboxColor, color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                    Explore Now →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Interactive Module Showcase ── */}
      <section id="showcase" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
            Experience the <span className="text-gradient">UniERP Suite</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Explore our core suite built with row-level tenant security, visual layout builders, and deep transactional intelligence.
          </p>
        </div>

        {/* Interactive Workspace Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'studio', label: 'No-Code Builder Studio', icon: Activity },
            { id: 'finance', label: 'Finance & Accounting', icon: CreditCard },
            { id: 'inventory', label: 'Inventory & MRP', icon: Package },
            { id: 'cms', label: 'Customizable Tenant Web CMS', icon: Globe },
            { id: 'crm', label: 'CRM & Sales Pipeline', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  background: active ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'rgba(255, 255, 255, 0.05)',
                  color: active ? '#ffffff' : '#94a3b8',
                  border: '1px solid',
                  borderColor: active ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 10px 20px rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Screen Preview Container */}
        <div className="glass-panel shine-effect" style={{ padding: '2rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          <div style={{ background: '#0b1329', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
            {/* Window Top Bar */}
            <div style={{ background: '#0f172a', padding: '0.75rem 1.25rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ marginLeft: '1rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                {activeTab === 'studio' && 'http://localhost:3000/apps/builder/web/pages'}
                {activeTab === 'finance' && 'http://localhost:3000/apps/finance'}
                {activeTab === 'inventory' && 'http://localhost:3000/apps/inventory'}
                {activeTab === 'cms' && 'http://localhost:3000/'}
                {activeTab === 'crm' && 'http://localhost:3000/apps/crm'}
              </span>
            </div>

            {/* Interactive Preview Content */}
            <div style={{ padding: '3rem', minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {activeTab === 'studio' && (
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Activity size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#ffffff' }}>Visual Drag-and-Drop Page Builder</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Design custom landing pages, e-commerce storefronts, customer intake forms, and automated business workflows visually with real-time publishing.
                  </p>
                  <button onClick={() => openLeadModal('demo')} className="btn-primary">
                    <span>Try Builder Studio Live</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {activeTab === 'finance' && (
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CreditCard size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#ffffff' }}>Automated Accounting & Multi-Currency GL</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Double-entry bookkeeping, automated bank reconciliation, period-end FX revaluations, and 1,500+ weighted accounting metrics.
                  </p>
                  <button onClick={() => openLeadModal('demo')} className="btn-primary">
                    <span>Open Finance Workspace</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Package size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#ffffff' }}>Multi-Warehouse & Automated Reordering</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Serial/batch tracking, drop-shipping, bill of materials (MRP), barcode scanning, and automated inventory replenishment rules.
                  </p>
                  <button onClick={() => openLeadModal('demo')} className="btn-primary">
                    <span>Launch Inventory Suite</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {activeTab === 'cms' && (
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Globe size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#ffffff' }}>Tenant-Customizable Web & Storefront</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Every ERP tenant gets a fully customizable public website rendered live at <code style={{ color: '#38bdf8' }}>/</code> with shop storefront, blogs, and dynamic tokens.
                  </p>
                  <a href={`${ERP_APP_URL}/`} className="btn-primary">
                    <span>View Live Tenant Site</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}

              {activeTab === 'crm' && (
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Users size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#ffffff' }}>CRM Deal Pipelines & Revenue Analytics</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Lead scoring, win/loss analytics, partner deal registration, automated quotations, and AI-assisted email drafting.
                  </p>
                  <button onClick={() => openLeadModal('demo')} className="btn-primary">
                    <span>Open CRM Workspace</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industry Presets ROI Calculator ── */}
      <section id="roi-calculator" style={{ background: '#090d16', padding: '6rem 1.5rem', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              <Calculator size={18} />
              <span>Interactive ROI Estimator</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Calculate Your Annual Savings</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Select your industry vertical preset to instantly benchmark operational cost savings.
            </p>

            {/* Presets Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => applyPreset('healthcare')} className="btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>🏥 Healthcare</button>
              <button onClick={() => applyPreset('education')} className="btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>🎓 Education</button>
              <button onClick={() => applyPreset('realestate')} className="btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>🏢 Real Estate</button>
              <button onClick={() => applyPreset('fieldservice')} className="btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>🔧 Field Service</button>
              <button onClick={() => applyPreset('retail')} className="btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>🛍️ Retail & POS</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Controls */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontWeight: 600, color: '#f8fafc' }}>Team Size (Users)</label>
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>{teamSize} Users</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontWeight: 600, color: '#f8fafc' }}>Current Software Costs ($/mo)</label>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>${currentSpend.toLocaleString()}/mo</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={currentSpend}
                  onChange={(e) => setCurrentSpend(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontWeight: 600, color: '#f8fafc' }}>Manual Work Hours (hrs/week)</label>
                  <span style={{ color: '#a855f7', fontWeight: 800 }}>{manualHours} hrs/wk</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#a855f7', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Computed Output Card */}
            <div className="glass-panel" style={{ padding: '3rem', border: '2px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(15, 23, 42, 0.8))' }}>
              <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Estimated Total Savings
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', lineHeight: 1, marginBottom: '0.5rem' }}>
                ${calculatedSavings.annual.toLocaleString()} <span style={{ fontSize: '1.25rem', color: '#94a3b8', fontWeight: 400 }}>/ year</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '2rem' }}>
                Save roughly <strong style={{ color: '#10b981' }}>${calculatedSavings.monthly.toLocaleString()}/month</strong> in license fees and regain <strong style={{ color: '#38bdf8' }}>{calculatedSavings.hoursSavedMonth} hours/month</strong> of staff productivity.
              </p>

              <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <DollarSign size={18} />
                <span>Claim Your Savings & Start Trial</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Competitor Replacement Comparison Matrix ── */}
      <section id="comparison" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '6rem 1.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Why Enterprises Choose <span className="text-gradient">UniERP</span></h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Compare UniERP against legacy monolithic enterprise systems.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <th style={{ padding: '1rem', color: '#f8fafc', fontSize: '1.05rem' }}>Feature / Capability</th>
                <th style={{ padding: '1rem', color: '#38bdf8', fontSize: '1.05rem', fontWeight: 800 }}>UniERP Platform</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.95rem' }}>SAP S/4HANA</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.95rem' }}>NetSuite</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.95rem' }}>Odoo</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Embedded No-Code Studio & CMS', unierp: '✅ Built-in', sap: '❌ Requires ABAP', netsuite: '❌ Custom SuiteScript', odoo: '⚠️ Basic Web Editor' },
                { f: 'Multi-Tenant PostgreSQL 16 RLS', unierp: '✅ DB-Layer Enforced', sap: '❌ Complex Instances', netsuite: '⚠️ Shared Schema', odoo: '❌ Multi-Database' },
                { f: 'Deployment Time', unierp: '🚀 Instant (Minutes)', sap: '🐢 12-18 Months', netsuite: '🐢 6-9 Months', odoo: '⚡ Weeks' },
                { f: 'API & Developer Swagger Docs', unierp: '✅ 1,500+ Open Endpoints', sap: '⚠️ Complex OData', netsuite: '⚠️ RESTlet Limits', odoo: '⚠️ XML-RPC' },
                { f: 'Customizable Public Tenant Website', unierp: '✅ Native at /', sap: '❌ Requires Portal Addon', netsuite: '❌ Commerceweb Extra', odoo: '✅ Website App' },
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: '#ffffff' }}>{row.f}</td>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.05)' }}>{row.unierp}</td>
                  <td style={{ padding: '1.25rem 1rem', color: '#94a3b8' }}>{row.sap}</td>
                  <td style={{ padding: '1.25rem 1rem', color: '#94a3b8' }}>{row.netsuite}</td>
                  <td style={{ padding: '1.25rem 1rem', color: '#94a3b8' }}>{row.odoo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Pricing Tiers with Annual Switcher ── */}
      <section id="pricing" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Transparent, Scalable Pricing</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>Zero hidden fees. Deploy instantly with full API and Studio access.</p>

          {/* Billing Switch */}
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
          <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Starter</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Essential core ERP modules for growing small businesses.</p>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
              ${isAnnual ? '23' : '29'} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/ user / month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10b981" /> Finance & General Ledger</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10b981" /> Inventory & Stock Management</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10b981" /> Standard Reporting Suite</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10b981" /> Up to 5 User Accounts</li>
            </ul>
            <button onClick={() => openLeadModal('trial')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Start Starter Plan</button>
          </div>

          {/* Professional (Popular) */}
          <div className="glass-panel" style={{ padding: '2.5rem', border: '2px solid #38bdf8', boxShadow: '0 0 35px rgba(56, 189, 248, 0.2)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#38bdf8', color: '#030712', padding: '0.3rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Most Popular Choice
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Professional</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Complete enterprise suite with full Builder Studio & CMS.</p>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
              ${isAnnual ? '63' : '79'} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/ user / month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#38bdf8" /> All 20+ ERP Business Modules</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#38bdf8" /> No-Code Builder Studio & Page CMS</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#38bdf8" /> Unlimited Users & Multi-Tenancy</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#38bdf8" /> Custom Domain & Web Portal Support</li>
            </ul>
            <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start 14-Day Free Trial</button>
          </div>

          {/* Enterprise */}
          <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Enterprise</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>Dedicated single-tenant infrastructure with custom SLA.</p>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
              Custom
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#a855f7" /> Dedicated Postgres & Redis Stack</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#a855f7" /> Custom SSO / SAML Integration</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#a855f7" /> Dedicated Solutions Architect</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#a855f7" /> 99.99% Uptime Guarantee SLA</li>
            </ul>
            <button onClick={() => openLeadModal('demo')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Contact Enterprise Sales</button>
          </div>
        </div>
      </section>

      {/* ── Interactive FAQ Accordion ── */}
      <section style={{ background: '#090d16', padding: '6rem 1.5rem', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.75rem 0' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Everything you need to know about UniERP deployment and architecture.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: 'How does multi-tenancy work in UniERP?', a: 'UniERP enforces row-level security (RLS) directly at the database layer (PostgreSQL 16) with non-bypassable tenant_id transaction contexts, keeping every customer data completely isolated.' },
              { q: 'Can non-technical staff build custom web pages & forms?', a: 'Yes! Our Zero-Code Builder Studio lets non-technical users visually create intake forms, customize published tenant pages, drag-and-drop content blocks, and edit design tokens.' },
              { q: 'How is the public tenant website hosted?', a: 'Every tenant gets a dynamic website portal at the root / endpoint of their tenant domain, powered automatically by published content in Builder Studio.' },
              { q: 'Can we migrate our existing legacy ERP data?', a: 'UniERP includes automated data import wizards for CSV/JSON schemas and dedicated REST APIs to sync historical GL journals, inventory items, and customer records.' },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="glass-panel" style={{ overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.5rem', color: '#94a3b8', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Lead Conversion CTA Banner ── */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div className="glass-panel shine-effect" style={{ maxWidth: '1020px', margin: '0 auto', padding: '4.5rem 2rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, margin: '0 0 1.25rem 0', color: '#ffffff' }}>
            Ready to Transform Your Enterprise Operations?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            Join 500+ forward-thinking organizations using UniERP to automate business workflows and eliminate legacy software bloat.
          </p>
          <button onClick={() => openLeadModal('trial')} className="btn-primary" style={{ padding: '1.1rem 2.75rem', fontSize: '1.1rem' }}>
            <span>Start Free 14-Day Trial</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── High-Converting Lead Capture Modal ── */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', width: '100%', padding: '2.5rem', background: '#0b1329', border: '1px solid rgba(56, 189, 248, 0.3)', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
              {modalType === 'trial' ? 'Start Your 14-Day Trial' : 'Book an ERP Architect Session'}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              {modalType === 'trial' ? 'Instant access to full 20+ ERP modules & No-Code Studio.' : 'Live 1-on-1 walkthrough with an enterprise software engineer.'}
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
        </div>
      )}

      {/* ── Footer ── */}
      <footer style={{ background: '#030712', borderTop: '1px solid #1e293b', padding: '4rem 1.5rem 2rem', color: '#64748b', fontSize: '0.9rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.25rem' }}>UniERP Company</div>
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
