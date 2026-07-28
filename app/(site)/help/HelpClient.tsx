'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, HelpCircle, CreditCard, Users, BarChart3, Package,
  ShoppingCart, Truck, Hammer, Briefcase, Cpu, ArrowRight,
  MessageSquare, BookOpen, Zap, Phone
} from 'lucide-react';

const CATEGORIES = [
  { icon: CreditCard, title: 'Finance & Accounting', articles: 48, color: '#2563eb', href: '/help/finance' },
  { icon: Users, title: 'Human Resources', articles: 36, color: '#059669', href: '/help/hr' },
  { icon: BarChart3, title: 'CRM & Sales', articles: 29, color: '#7c3aed', href: '/help/crm' },
  { icon: Package, title: 'Inventory & Warehouse', articles: 41, color: '#d97706', href: '/help/inventory' },
  { icon: ShoppingCart, title: 'Procurement', articles: 22, color: '#0891b2', href: '/help/procurement' },
  { icon: Truck, title: 'Supply Chain', articles: 17, color: '#6366f1', href: '/help/supply-chain' },
  { icon: Hammer, title: 'Manufacturing', articles: 33, color: '#dc2626', href: '/help/manufacturing' },
  { icon: Briefcase, title: 'Project Management', articles: 25, color: '#ea580c', href: '/help/projects' },
  { icon: Cpu, title: 'Platform & API', articles: 31, color: '#0f172a', href: '/help/api' },
];

const POPULAR = [
  { title: 'Getting started: Your first login and tenant setup', href: '/help/getting-started/first-login' },
  { title: 'How to set up your chart of accounts', href: '/help/finance/chart-of-accounts' },
  { title: 'Processing payroll for the first time', href: '/help/hr/first-payroll' },
  { title: 'Importing data from Excel or CSV', href: '/help/platform/csv-import' },
  { title: 'Setting up multi-currency transactions', href: '/help/finance/multi-currency' },
  { title: 'Creating your first Bill of Materials (BOM)', href: '/help/manufacturing/bom' },
  { title: 'Configuring role-based access control', href: '/help/platform/rbac' },
  { title: 'Connecting Stripe for payment processing', href: '/help/ecommerce/stripe' },
];

export function HelpClient() {
  const [query, setQuery] = useState('');

  return (
    <div>
      {/* Hero */}
      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero-badge hero-enter"><HelpCircle size={13} /> Help Center</div>
        <h1 className="hero-enter-delay-1">How can we help?</h1>
        <p className="hero-enter-delay-2">
          Search our knowledge base of 300+ articles, or browse by module below.
        </p>

        <div className="help-search hero-enter-delay-3">
          <Search size={18} className="help-search-icon" />
          <input
            type="search"
            className="help-search-input"
            placeholder="Search articles, guides, FAQs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search help articles"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="page-section" style={{ paddingTop: '2rem' }}>
        <h2 className="section-title">Browse by module</h2>
        <div className="module-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href} className="module-card reveal">
              <div className="module-card-icon" style={{ background: `${cat.color}18` }}>
                <cat.icon size={20} color={cat.color} />
              </div>
              <div className="module-card-name">{cat.title}</div>
              <div className="module-card-desc">{cat.articles} articles</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular articles */}
      <section style={{ background: 'var(--color-surface)', padding: '4rem 1.5rem' }}>
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <div className="section-title" style={{ marginBottom: '1.5rem' }}>Popular articles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {POPULAR.map((a) => (
                  <Link key={a.href} href={a.href} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.85rem 1rem', borderRadius: '10px',
                    background: 'var(--color-card)', border: '1px solid var(--glass-border)',
                    color: 'var(--color-text-main)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                    transition: 'border-color 0.15s, background 0.15s',
                  }} className="hover-lift">
                    <BookOpen size={15} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    {a.title}
                    <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--color-text-subtle)', flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="section-title" style={{ marginBottom: '1.5rem' }}>Still need help?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: MessageSquare, title: 'Live Chat', desc: 'Talk to our support team in real-time. Available Mon–Fri 9am–6pm IST.', cta: 'Start chat', href: '#chat', color: '#2563eb' },
                  { icon: Phone, title: 'Schedule a Call', desc: 'Book a 30-minute call with a product expert to walk through your questions.', cta: 'Book a call', href: '/contact', color: '#7c3aed' },
                  { icon: Zap, title: 'Submit a Ticket', desc: 'Create a support ticket and we\'ll respond within 24 hours (4h for Professional+).', cta: 'Open ticket', href: '/contact?type=support', color: '#059669' },
                ].map((item) => (
                  <div key={item.title} className="module-card reveal" style={{ cursor: 'default', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="module-card-icon" style={{ background: `${item.color}18`, flexShrink: 0 }}>
                      <item.icon size={20} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="module-card-name">{item.title}</div>
                      <div className="module-card-desc" style={{ marginBottom: '0.75rem' }}>{item.desc}</div>
                      <Link href={item.href} className="mega-footer-link" style={{ padding: '0.3rem 0', fontWeight: 700 }}>
                        {item.cta} <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API/Developer section */}
      <section className="page-section" style={{ textAlign: 'center' }}>
        <div className="page-hero-badge" style={{ margin: '0 auto 1.5rem' }}>
          <Cpu size={13} /> Developer Resources
        </div>
        <h2 className="section-title">Building something with UniERP?</h2>
        <p className="section-sub" style={{ margin: '0 auto 2rem' }}>
          Full API documentation, webhooks reference, SDK guides, and integration tutorials.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/docs/api" className="btn-primary btn-ripple">
            API Reference <ArrowRight size={15} />
          </Link>
          <Link href="/docs" className="btn-secondary">
            <BookOpen size={15} /> Documentation
          </Link>
        </div>
      </section>
    </div>
  );
}
