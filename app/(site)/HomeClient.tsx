'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Zap,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Check,
  ChevronRight,
  Play,
  Building2,
  DollarSign,
  Users,
  Package,
  Hammer,
  BarChart3,
  ShoppingCart,
  Briefcase,
  Store,
  PenTool,
  Lock,
  Cpu,
  Layers,
  Globe,
  Database,
  Truck,
  Heart,
  GraduationCap,
  Wrench,
  Server,
  Star,
  RefreshCw,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { DashboardPreview } from '@/components/site/home/DashboardPreview';
import { WorkflowEngine } from '@/components/site/home/WorkflowEngine';

/* ── 6 Core ERP Modules Data ── */
const CORE_MODULES = [
  {
    icon: DollarSign,
    name: 'Finance & Accounting',
    desc: 'Manage finance, accounts, taxation, and compliance with confidence.',
    href: '/products/finance',
  },
  {
    icon: Users,
    name: 'Sales & CRM',
    desc: 'Close more deals and build lasting customer relationships.',
    href: '/products/crm',
  },
  {
    icon: Package,
    name: 'Inventory & Supply Chain',
    desc: 'Optimize stock, streamline purchases, and reduce operational costs.',
    href: '/products/inventory',
  },
  {
    icon: Briefcase,
    name: 'HR & Payroll',
    desc: 'Manage your people, payroll, performance, and culture effortlessly.',
    href: '/products/hr',
  },
  {
    icon: Activity,
    name: 'Projects & Services',
    desc: 'Plan, track, and deliver projects on time and within budget.',
    href: '/products/projects',
  },
  {
    icon: Hammer,
    name: 'Manufacturing',
    desc: 'Streamline production, quality, and shop floor operations.',
    href: '/products/manufacturing',
  },
];

/* ── 6 Industry Solutions Data ── */
const INDUSTRY_SOLUTIONS = [
  {
    icon: FactoryIcon,
    name: 'Manufacturing',
    desc: 'End-to-end production planning and control.',
    href: '/industries/manufacturing',
  },
  {
    icon: Store,
    name: 'Retail & Wholesale',
    desc: 'Inventory, POS, and omnichannel sales.',
    href: '/industries/retail',
  },
  {
    icon: Truck,
    name: 'Distribution',
    desc: 'Smarter distribution and route management.',
    href: '/industries/distribution',
  },
  {
    icon: Briefcase,
    name: 'Services',
    desc: 'Project, contract, and billing made easy.',
    href: '/industries/services',
  },
  {
    icon: Heart,
    name: 'Healthcare',
    desc: 'Patient, clinic, and hospital management.',
    href: '/industries/healthcare',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    desc: 'Institute, staff, and student management.',
    href: '/industries/education',
  },
];

function FactoryIcon(props: any) {
  return <Hammer {...props} />;
}

/* ── 3 Verified Testimonials ── */
const TESTIMONIALS = [
  {
    quote: 'UniERP helped us reduce our month-end closing time by 60% and improved overall visibility.',
    author: 'Ravi Sharma',
    role: 'CFO, Havells India',
    company: 'HAVELLS',
    avatar: 'RS',
  },
  {
    quote: 'The platform is powerful yet easy to use. Our teams adopted it in just a few days.',
    author: 'Neha Patel',
    role: 'COO, Metamorph',
    company: 'METAMORPH',
    avatar: 'NP',
  },
  {
    quote: 'From sales to finance, everything is now connected. Best decision for our growing business.',
    author: 'Arun Kumar',
    role: 'Managing Director, SAI Exports',
    company: 'SAI EXPORTS',
    avatar: 'AK',
  },
];

/* ── Pricing Tiers ── */
const PRICING_PLANS = [
  {
    name: 'Standard',
    price: '₹999',
    period: '/user/month',
    billed: 'billed annually',
    desc: 'For small businesses getting started with ERP fundamentals.',
    popular: false,
    features: ['Core Modules', 'Up to 5 Users', 'Standard Reports', 'Email Support'],
    cta: 'Start Free',
    ctaHref: '/register?plan=standard',
  },
  {
    name: 'Professional',
    price: '₹1,999',
    period: '/user/month',
    billed: 'billed annually',
    desc: 'For growing businesses that need full workflow automation.',
    popular: true,
    features: ['All Standard Features', 'Advanced Reports', 'Workflow Automation', 'Priority Support'],
    cta: 'Start Free',
    ctaHref: '/register?plan=pro',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    billed: 'tailored solution',
    desc: 'For large organizations with complex needs & dedicated SLA.',
    popular: false,
    features: ['Unlimited Users', 'Dedicated VPC / On-Prem', 'Custom Integrations', '24/7 SLA & Success Manager'],
    cta: 'Talk to Sales',
    ctaHref: '/contact?type=enterprise',
  },
];

export default function HomeClient({ page }: { page?: any }) {
  useAnalytics('/');
  const { settings } = useSiteContent();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. EXECUTIVE HERO SECTION (2-Column Reference Layout) ═══ */}
      <section className="ref-hero-section">
        {/* Left Column: Value Prop, Checkmarks, CTAs, 30-Day Guarantee */}
        <div className="hero-content-col">
          <h1 className="ref-hero-title">
            One Business Platform.<br />
            <span style={{ color: '#2563eb' }}>Infinite Possibilities.</span>
          </h1>

          <p className="ref-hero-subtitle">
            UniERP unifies your business operations, applications, and data on a single platform to help you work smarter,
            serve customers better, and grow faster.
          </p>

          <div className="ref-hero-checkmarks">
            {[
              'All-in-one Business Suite',
              'Low-Code Application Platform',
              'Built-in Workflows & Automation',
              'Secure, Scalable, Future-Ready',
            ].map((check) => (
              <div key={check} className="ref-check-item">
                <CheckCircle2 size={18} color="#2563eb" style={{ flexShrink: 0 }} />
                <span>{check}</span>
              </div>
            ))}
          </div>

          <div className="ref-hero-actions">
            <Link href="/products" className="btn-ref-primary">
              <span>Explore Platform</span>
              <ArrowRight size={16} />
            </Link>

            <Link href="/contact?type=demo" className="btn-ref-secondary">
              <Play size={15} fill="currentColor" />
              <span>Watch Demo</span>
            </Link>
          </div>

          <div className="ref-hero-guarantee">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Check size={14} color="#10b981" /> No credit card required
            </span>
            <span>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Check size={14} color="#10b981" /> 30-days free trial
            </span>
          </div>
        </div>

        {/* Right Column: Live Interactive ERP Dashboard Showcase */}
        <div className="hero-visual-col">
          <DashboardPreview />
        </div>
      </section>

      {/* ═══ 2. CORE ERP MODULES GRID ("Everything you need to run and grow your business") ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div className="ref-section-header">
          <h2 className="ref-section-title">Everything you need to run and grow your business</h2>
          <p className="ref-section-subtitle">Powerful modules. Seamless integration. Real results.</p>
        </div>

        <div className="ref-modules-grid">
          {CORE_MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Link key={m.name} href={m.href} className="ref-module-card">
                <div className="ref-module-icon-box">
                  <Icon size={24} />
                </div>
                <h3 className="ref-module-name">{m.name}</h3>
                <p className="ref-module-desc">{m.desc}</p>
                <div className="ref-module-link">
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#2563eb',
              textDecoration: 'none',
            }}
          >
            <span>Explore all modules</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ 3. INTERACTIVE WORKFLOW ENGINE ("See UniERP in action") ═══ */}
      <section style={{ padding: '2rem 1.5rem 6rem' }}>
        <WorkflowEngine />
      </section>

      {/* ═══ 4. INDUSTRY SOLUTIONS GRID ("Built for every industry") ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>
        <div className="ref-section-header">
          <h2 className="ref-section-title">Built for every industry</h2>
          <p className="ref-section-subtitle">Pre-built solutions that fit your industry, not the other way around.</p>
        </div>

        <div className="ref-industries-grid">
          {INDUSTRY_SOLUTIONS.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link key={ind.name} href={ind.href} className="ref-industry-card">
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(37, 99, 235, 0.08)',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.4rem' }}>
                  {ind.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {ind.desc}
                </p>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/industries"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#2563eb',
              textDecoration: 'none',
            }}
          >
            <span>View all industries</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ 5. TRUST & SECURITY CENTER ("Enterprise-grade security. Built for trust.") ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
        <div className="ref-section-header">
          <h2 className="ref-section-title">Enterprise-grade security. Built for trust.</h2>
          <p className="ref-section-subtitle">Your data is protected with industry-leading security and compliance.</p>
        </div>

        {/* 7 Badges Row */}
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

        {/* Hybrid Cloud / Data Control Card */}
        <div className="ref-hybrid-cloud-card">
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0 0 0.75rem', color: '#ffffff' }}>
              Your data. Your control.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
              Deploy on cloud, on-premise, or hybrid. You choose. Complete data sovereignty, air-gapped support, and private PostgreSQL partitions.
            </p>
            <Link
              href="/security"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#60a5fa',
                textDecoration: 'none',
              }}
            >
              <span>Learn more</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(37, 99, 235, 0.05) 70%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 0 35px rgba(37, 99, 235, 0.3)',
              }}
            >
              <Lock size={48} color="#60a5fa" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. CUSTOMER TESTIMONIALS ("Loved by businesses. Proven by results.") ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
        <div className="ref-section-header">
          <h2 className="ref-section-title">Loved by businesses. Proven by results.</h2>
        </div>

        <div className="ref-testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="ref-testimonial-card">
              <div style={{ fontSize: '1.05rem', color: 'var(--color-text-main)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                &ldquo;{t.quote}&rdquo;
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-card-border)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-text-main)' }}>{t.author}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{t.role}</div>
                  </div>
                </div>

                <div style={{ fontWeight: 900, fontSize: '0.85rem', color: 'var(--color-text-subtle)', letterSpacing: '0.05em' }}>
                  {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/customers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#2563eb',
              textDecoration: 'none',
            }}
          >
            <span>View all success stories</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ 7. TRANSPARENT PRICING ("Simple pricing. Maximum value.") ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
        <div className="ref-section-header">
          <h2 className="ref-section-title">Simple pricing. Maximum value.</h2>
          <p className="ref-section-subtitle">Choose the plan that fits your business today. All plans include 30 days full access.</p>
        </div>

        <div className="ref-pricing-grid">
          {PRICING_PLANS.map((plan) => (
            <div key={plan.name} className={`ref-pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-13px',
                    right: '24px',
                    background: '#2563eb',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.85rem',
                    borderRadius: '9999px',
                    letterSpacing: '0.05em',
                  }}
                >
                  Most Popular
                </div>
              )}

              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
                {plan.name}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {plan.desc}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text-main)' }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', marginLeft: '4px' }}>
                    {plan.period}
                  </span>
                )}
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                  {plan.billed}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
                {plan.features.map((feat) => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                    <Check size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.ctaHref}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: plan.popular ? '#2563eb' : 'var(--color-surface)',
                  color: plan.popular ? '#ffffff' : 'var(--color-text-main)',
                  border: plan.popular ? 'none' : '1.5px solid var(--color-card-border)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: plan.popular ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'none',
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#2563eb',
              textDecoration: 'none',
            }}
          >
            <span>Compare all features</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ 8. HIGH-IMPACT ROYAL BLUE BANNER CTA ═══ */}
      <section style={{ padding: '0 1.5rem 6rem' }}>
        <div className="ref-royal-cta">
          <h2
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              margin: '0 0 1rem',
              color: '#ffffff',
            }}
          >
            Ready to transform your business with UniERP?
          </h2>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Join thousands of businesses that run better with UniERP. 30 days full access, no credit card required.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-royal-white">
              <span>Start Free Trial</span>
              <ArrowRight size={16} />
            </Link>

            <Link href="/contact?type=demo" className="btn-royal-outline">
              <span>Talk to Sales</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
