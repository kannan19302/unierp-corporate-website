'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield, ChevronRight, Check, CreditCard, Users, BarChart3,
  Package, Hammer, Activity, Heart, GraduationCap, Building2,
  Wrench, Store, Zap, ArrowRight, Star, Sparkles, Globe, ExternalLink
} from 'lucide-react';

const ERP_APP_URL = process.env.NEXT_PUBLIC_ERP_APP_URL || 'http://localhost:3000';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Industries', href: '#industries' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'API Docs', href: 'http://localhost:3001/swagger' },
];

const FEATURES = [
  { icon: CreditCard, title: 'Finance & Accounting', desc: 'Double-entry bookkeeping, multi-currency, automated reconciliation, and real-time P&L reports.', color: '#6366f1' },
  { icon: Users, title: 'Human Resources', desc: 'Payroll, leave management, performance reviews, attendance tracking, and org charts.', color: '#10b981' },
  { icon: Users, title: 'CRM & Sales', desc: 'Contact management, deal pipelines, quotations, sales orders, and revenue analytics.', color: '#f59e0b' },
  { icon: Package, title: 'Inventory & Warehouse', desc: 'Multi-warehouse, serial/batch tracking, reorder automation, and barcode scanning.', color: '#0ea5e9' },
  { icon: Hammer, title: 'Manufacturing (MRP)', desc: 'Bill of materials, work orders, production planning, quality control, and scrap tracking.', color: '#f43f5e' },
  { icon: Activity, title: 'No-Code Builder Studio', desc: 'Custom page builder, form builder, dynamic workflow engine, and e-commerce CMS.', color: '#8b5cf6' },
];

const INDUSTRIES = [
  { id: 'healthcare', icon: Heart, label: 'Healthcare', title: 'Complete Hospital & Clinic Management', desc: 'Patient records, appointments, pharmacy inventory, EHR, and billing in one platform.' },
  { id: 'education', icon: GraduationCap, label: 'Education', title: 'Smart Campus & Student Information System', desc: 'Admissions, timetable scheduling, fee collection, gradebooks, and library management.' },
  { id: 'realestate', icon: Building2, label: 'Real Estate', title: 'Property & Lease Management Suite', desc: 'Unit listings, tenant onboarding, rent collection, maintenance requests, and contract management.' },
  { id: 'fieldservice', icon: Wrench, label: 'Field Service', title: 'Dispatch & Work Order Automation', desc: 'Technician scheduling, GPS routing, mobile job sign-offs, and spare parts tracking.' },
  { id: 'retail', icon: Store, label: 'Retail & POS', title: 'Multi-Store Point of Sale & Storefront', desc: 'Cloud POS, barcode checkout, loyalty rewards, e-commerce sync, and inventory management.' },
];

const PRICING = [
  { name: 'Starter', price: '$29', period: '/user/mo', desc: 'Ideal for small growing businesses needing core ERP modules.', features: ['Up to 5 users', 'Finance & Accounting', 'Basic Inventory', 'Standard Reports', 'Community Support'], popular: false },
  { name: 'Professional', price: '$79', period: '/user/mo', desc: 'Complete enterprise suite with Builder Studio and automations.', features: ['Unlimited users', 'All 20+ ERP Modules', 'Full Builder Studio & CMS', 'Advanced BI Analytics', '24/7 Priority Support'], popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'Dedicated cloud deployment with custom SLA and security guarantees.', features: ['Dedicated Postgres & Redis', 'Custom Domain & SSO', 'Unlimited Storage & API', 'Dedicated Solutions Engineer', 'SLA Guarantee'], popular: false },
];

export default function CorporateHomePage() {
  const [activeIndustry, setActiveIndustry] = useState('healthcare');
  const industryData = INDUSTRIES.find(i => i.id === activeIndustry) || INDUSTRIES[0];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.4rem', color: '#ffffff' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900 }}>
              U
            </div>
            <span>Uni<span style={{ color: '#38bdf8' }}>ERP</span></span>
          </Link>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {NAV_LINKS.map((link, idx) => (
              <a key={idx} href={link.href} style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>
                {link.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href={`${ERP_APP_URL}/`} style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Globe size={15} />
              <span>Tenant Site Engine</span>
            </a>
            <a href={`${ERP_APP_URL}/login`} style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', background: '#2563eb', color: '#ffffff', fontSize: '0.9rem', fontWeight: 600 }}>
              Log In to ERP Desk
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '7rem 1.5rem 5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            <Sparkles size={16} />
            <span>Universal Multi-Tenant ERP Platform</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 1.5rem 0' }}>
            One Platform to Run Your Entire <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enterprise</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Composable, industry-agnostic SaaS ERP system with visual No-Code Builder Studio, dynamic website CMS, automated accounting, HR, and supply chain.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`${ERP_APP_URL}/login`} style={{ padding: '0.95rem 2rem', borderRadius: '10px', background: '#2563eb', color: '#ffffff', fontWeight: 700, fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.5)' }}>
              <span>Launch ERP Platform</span>
              <ArrowRight size={18} />
            </a>

            <a href={`${ERP_APP_URL}/`} style={{ padding: '0.95rem 2rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid #334155', color: '#ffffff', fontWeight: 600, fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>View Tenant Website Demo</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.75rem 0' }}>Comprehensive Module Ecosystem</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>20+ deeply integrated ERP modules designed for high-scale enterprise operations.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {FEATURES.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} style={{ background: '#1e293b', borderRadius: '16px', padding: '2rem', border: '1px solid #334155' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{f.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Industry Solutions */}
      <section id="industries" style={{ background: '#090d16', padding: '6rem 1.5rem', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.75rem 0' }}>Tailored for Your Industry</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Pre-configured industry vertical apps ready for instant deployment.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {INDUSTRIES.map(i => {
              const Icon = i.icon;
              const active = i.id === activeIndustry;
              return (
                <button
                  key={i.id}
                  onClick={() => setActiveIndustry(i.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    background: active ? '#2563eb' : '#1e293b',
                    color: active ? '#ffffff' : '#94a3b8',
                    border: '1px solid',
                    borderColor: active ? '#3b82f6' : '#334155',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  <Icon size={18} />
                  <span>{i.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ background: '#1e293b', borderRadius: '20px', padding: '3rem', border: '1px solid #334155', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 1rem 0', color: '#ffffff' }}>{industryData.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>{industryData.desc}</p>
            <a href={`${ERP_APP_URL}/login`} style={{ padding: '0.85rem 1.75rem', borderRadius: '10px', background: '#2563eb', color: '#ffffff', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Explore {industryData.label} Solution</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.75rem 0' }}>Simple, Transparent Pricing</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Deploy in minutes. Upgrade or scale anytime.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {PRICING.map((p, idx) => (
            <div key={idx} style={{ background: p.popular ? '#1e293b' : '#0f172a', borderRadius: '20px', padding: '2.5rem', border: p.popular ? '2px solid #2563eb' : '1px solid #334155', position: 'relative' }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: '#ffffff', padding: '0.25rem 0.85rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{p.name}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '40px' }}>{p.desc}</p>
              <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
                {p.price} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {p.features.map((feat, fidx) => (
                  <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
                    <Check size={16} color="#38bdf8" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a href={`${ERP_APP_URL}/login`} style={{ display: 'block', textAlign: 'center', padding: '0.85rem', borderRadius: '10px', background: p.popular ? '#2563eb' : 'rgba(255,255,255,0.08)', color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>
                Start {p.name} Plan
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#090d16', borderTop: '1px solid #1e293b', padding: '4rem 1.5rem 2rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} UniERP Company. All rights reserved.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
            <a href={`${ERP_APP_URL}/login`} style={{ color: '#94a3b8' }}>ERP Platform Desk</a>
            <a href={`${ERP_APP_URL}/`} style={{ color: '#94a3b8' }}>Tenant Website Portal</a>
            <a href="http://localhost:3001/swagger" style={{ color: '#94a3b8' }}>Swagger API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
