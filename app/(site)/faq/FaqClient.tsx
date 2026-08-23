'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Shield,
  Zap,
  Building2,
  Database,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

interface FaqEntry {
  category: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FaqEntry[] = [
  // General & Overview
  {
    category: 'General',
    question: 'What makes UniERP different from traditional ERPs like SAP or NetSuite?',
    answer: 'UniERP is built on a composable, modern TypeScript and PostgreSQL architecture. Instead of monolithic codebases that take 18 months and millions of dollars to implement, UniERP offers 40+ modular applications that share a single unified data model, deploy in minutes, and can be customized with low-code workflows without vendor lock-in.',
  },
  {
    category: 'General',
    question: 'Can we install only the modules we need today and expand later?',
    answer: 'Yes! UniERP is completely modular. You can start with just Finance & Accounting, or CRM & Sales, and activate Supply Chain, Manufacturing (MRP), HR & Payroll, or Project Management whenever your business expands — with zero database migration overhead.',
  },
  {
    category: 'General',
    question: 'Does UniERP support multi-currency, multi-entity, and multi-location operations?',
    answer: 'Yes. UniERP natively supports multi-company consolidation, inter-company journal entries, real-time FX revaluations across 40+ currencies, and hierarchical multi-warehouse bin management.',
  },

  // Pricing & Licensing
  {
    category: 'Pricing & Trial',
    question: 'How does the 30-day free trial work? Is a credit card required?',
    answer: 'No credit card is required. You get 30 days of full, unrestricted access to the entire platform including all core modules, workflows, API access, and sample industry data to evaluate with your team.',
  },
  {
    category: 'Pricing & Trial',
    question: 'Is pricing per user or per module?',
    answer: 'Pricing is transparent and per-user/month. All included modules within your tier (Standard, Professional, or Enterprise) are available to all authorized users without separate per-module licensing fees.',
  },
  {
    category: 'Pricing & Trial',
    question: 'Do you offer non-profit, NGO, or education discounts?',
    answer: 'Yes! We offer a 50% discount on all plans for registered non-profit organizations, charities, and accredited educational institutions.',
  },

  // Security & Compliance
  {
    category: 'Security & Compliance',
    question: 'How is tenant data isolated? How does PostgreSQL Row-Level Security work?',
    answer: 'UniERP enforces multi-tenant isolation directly inside the PostgreSQL database engine using cryptographic Row-Level Security (RLS) policies. Every SQL query executed automatically scopes data to the tenant context, preventing data bleed across organizations even in shared cluster environments.',
  },
  {
    category: 'Security & Compliance',
    question: 'What encryption standards are used for data at rest and in transit?',
    answer: 'All data at rest is encrypted using AES-256-GCM envelope encryption with per-tenant encryption keys. All communication in transit is strictly enforced using TLS 1.3 with Perfect Forward Secrecy.',
  },
  {
    category: 'Security & Compliance',
    question: 'Can enterprise customers deploy on private dedicated VPCs or on-premise?',
    answer: 'Yes. Enterprise tier customers can choose dedicated private AWS, GCP, or Azure VPC clusters, isolated sovereign regional partitions (EU GDPR, US HIPAA), or air-gapped on-premise Kubernetes Helm charts.',
  },

  // Architecture & Integrations
  {
    category: 'Architecture',
    question: 'What APIs and webhooks does UniERP expose for external integrations?',
    answer: 'UniERP provides comprehensive RESTful APIs, OpenAPI/Swagger specifications, and real-time Webhooks. You can connect to Stripe, Salesforce, Shopify, QuickBooks, Zebra barcode scanners, and custom legacy databases with sub-millisecond response latency.',
  },
  {
    category: 'Architecture',
    question: 'How does the offline-first Point of Sale (POS) function during network outages?',
    answer: 'Our Point of Sale and Mobile Warehouse scanner clients utilize local SQLite storage with CRDT (Conflict-Free Replicated Data Types) replication. Cashiers can continue ringing sales offline; transactions automatically synchronize and clear when connectivity restores.',
  },

  // Migration & Switching
  {
    category: 'Migration',
    question: 'How difficult is it to migrate data from QuickBooks, Tally, SAP, or spreadsheets?',
    answer: 'Our Data Center import engine includes automated CSV/JSON mapping templates and pre-built ETL migration pipelines for QuickBooks, Tally, NetSuite, and SAP. Our solutions architecture team provides white-glove data cleansing and historical ledger migration.',
  },
  {
    category: 'Migration',
    question: 'Can we export our full database if we ever decide to leave?',
    answer: 'Yes, 100%. We believe in zero vendor lock-in. You can export complete PostgreSQL database dumps, schema definitions, and CSV tables at any time directly from the Admin Console.',
  },
];

export function FaqClient() {
  useAnalytics('/faq');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'General', 'Pricing & Trial', 'Security & Compliance', 'Architecture', 'Migration'];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchSearch =
      !search ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. FAQ HERO ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4.5rem 1.5rem 3rem', textAlign: 'center' }}>
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
          <HelpCircle size={13} />
          <span>Knowledge &amp; FAQ Hub</span>
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
          Frequently Asked <span style={{ color: '#2563eb' }}>Questions</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Everything you need to know about UniERP features, licensing, security architecture, and implementation.
        </p>

        {/* Live Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 2rem', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="search"
            placeholder="Search questions (e.g. RLS, trial, migration, SAP, pricing)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.95rem 1.25rem 0.95rem 3rem',
              borderRadius: '9999px',
              border: '1.5px solid var(--color-card-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-main)',
              fontSize: '0.95rem',
              boxShadow: 'var(--glass-shadow)',
              outline: 'none',
            }}
          />
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                border: activeCategory === cat ? 'none' : '1px solid var(--color-card-border)',
                background: activeCategory === cat ? '#2563eb' : 'var(--color-surface)',
                color: activeCategory === cat ? '#ffffff' : 'var(--color-text-muted)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ 2. ACCORDION LIST ═══ */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 1.5rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                style={{
                  background: 'var(--color-surface)',
                  border: `1.5px solid ${isOpen ? '#2563eb' : 'var(--color-card-border)'}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'var(--glass-shadow)',
                  transition: 'all 0.2s',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.35rem 1.75rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-text-main)',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    gap: '1rem',
                  }}
                >
                  <span>{faq.question}</span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? '#2563eb' : 'var(--color-bg)',
                      color: isOpen ? '#ffffff' : 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                    }}
                  >
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.75rem 1.5rem',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--color-card-border)',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--color-text-muted)' }}>
              <HelpCircle size={40} style={{ margin: '0 auto 1rem', color: '#94a3b8' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>No matching questions found</div>
              <p style={{ margin: '0.5rem 0 1.5rem' }}>Try different keywords or ask our AI assistant directly.</p>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div
          style={{
            marginTop: '3.5rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-card-border)',
            borderRadius: '20px',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <MessageSquare size={24} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
            Still have questions?
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Our solutions engineering team is available 24/7. Ask our live AI assistant in the bottom right corner or talk to a product specialist.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-ref-primary">
              <span>Talk to an ERP Specialist</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/docs" className="btn-ref-secondary">
              <span>Explore Documentation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
