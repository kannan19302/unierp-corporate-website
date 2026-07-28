'use client';

import Link from 'next/link';
import { FileText, ArrowRight, Clock, Tag } from 'lucide-react';

const POSTS = [
  {
    category: 'Product Update',
    title: 'UniERP v3.8: Enhanced Manufacturing MRP with AI Demand Forecasting',
    excerpt: 'Our latest release ships predictive demand forecasting powered by ML, a completely redesigned BOM editor, and 38 new quality management features.',
    date: 'July 22, 2026',
    readTime: '5 min',
    slug: 'v38-manufacturing-mrp-ai-forecasting',
    gradient: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
  },
  {
    category: 'Best Practice',
    title: 'The 8 Most Common ERP Implementation Mistakes (and How to Avoid Them)',
    excerpt: 'After helping 2,500+ companies go live, we've identified the key failure patterns. Here\'s what separates successful ERP implementations from costly disasters.',
    date: 'July 18, 2026',
    readTime: '9 min',
    slug: 'erp-implementation-mistakes',
    gradient: 'linear-gradient(135deg, #1e1b4b, #4f46e5)',
  },
  {
    category: 'Customer Story',
    title: 'How Meridian Manufacturing Reduced Inventory Costs by 34% in 6 Months',
    excerpt: 'Meridian was running 3 disconnected systems. After migrating to UniERP, they unified operations, eliminated data silos, and cut inventory carrying costs dramatically.',
    date: 'July 14, 2026',
    readTime: '6 min',
    slug: 'meridian-manufacturing-case-study',
    gradient: 'linear-gradient(135deg, #064e3b, #059669)',
  },
  {
    category: 'Engineering',
    title: 'Building Multi-Tenant ERP at Scale: Our Architecture Deep Dive',
    excerpt: 'How we handle 2,500+ tenants, database isolation strategies, performance at scale, and the lessons learned building our NestJS + PostgreSQL + Redis stack.',
    date: 'July 10, 2026',
    readTime: '14 min',
    slug: 'multi-tenant-erp-architecture',
    gradient: 'linear-gradient(135deg, #1c1917, #7c3aed)',
  },
  {
    category: 'Guide',
    title: 'Finance Module Master Guide: From Chart of Accounts to Financial Close',
    excerpt: 'A comprehensive walk-through of the UniERP Finance module — GL setup, AR/AP automation, bank reconciliation, and month-end close best practices.',
    date: 'July 6, 2026',
    readTime: '18 min',
    slug: 'finance-module-master-guide',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)',
  },
  {
    category: 'Product Update',
    title: 'Introducing the Visual Workflow Builder: Automate Anything Without Code',
    excerpt: 'Build complex approval flows, SLA escalations, and automated processes using our new drag-and-drop workflow engine. No code required.',
    date: 'June 28, 2026',
    readTime: '4 min',
    slug: 'visual-workflow-builder',
    gradient: 'linear-gradient(135deg, #0c4a6e, #0891b2)',
  },
];

const CATEGORIES = ['All', 'Product Update', 'Best Practice', 'Customer Story', 'Engineering', 'Guide'];

export function BlogClient() {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="mesh-orb mesh-orb-1" />
        <div className="page-hero-badge hero-enter"><FileText size={13} /> Blog</div>
        <h1 className="hero-enter-delay-1">
          Insights, updates & best practices
        </h1>
        <p className="hero-enter-delay-2">
          Product news, ERP guides, customer stories, and engineering deep dives from the UniERP team.
        </p>
      </section>

      {/* Category tabs */}
      <div className="page-container" style={{ paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="toggle-option"
              style={{ padding: '0.4rem 0.9rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <Link href={`/blog/${POSTS[0].slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
          <div className="blog-card" style={{ flexDirection: 'row', borderRadius: '20px', overflow: 'hidden', maxHeight: '280px' }}>
            <div style={{ width: '380px', flexShrink: 0, background: POSTS[0].gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', minHeight: '200px' }}>
              <FileText size={56} color="rgba(255,255,255,0.3)" />
            </div>
            <div className="blog-card-body" style={{ padding: '2rem' }}>
              <div className="blog-card-category">{POSTS[0].category} · Featured</div>
              <div className="blog-card-title" style={{ fontSize: '1.3rem', lineHeight: 1.3 }}>{POSTS[0].title}</div>
              <div className="blog-card-excerpt" style={{ WebkitLineClamp: 3 }}>{POSTS[0].excerpt}</div>
              <div className="blog-card-meta">
                <Clock size={13} />{POSTS[0].readTime} read · {POSTS[0].date}
                <span style={{ marginLeft: 'auto', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="blog-grid">
          {POSTS.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div style={{ height: '160px', background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={42} color="rgba(255,255,255,0.25)" />
              </div>
              <div className="blog-card-body">
                <div className="blog-card-category">{post.category}</div>
                <div className="blog-card-title">{post.title}</div>
                <div className="blog-card-excerpt">{post.excerpt}</div>
                <div className="blog-card-meta">
                  <Clock size={13} />{post.readTime} read · {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more */}
        <div style={{ textAlign: 'center', margin: '3rem 0' }}>
          <button className="btn-secondary">
            Load more articles <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Newsletter CTA */}
      <section style={{ background: 'var(--color-surface)', padding: '4rem 1.5rem', textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <Tag size={28} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Never miss an update
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Product updates, best practices, and customer success stories — delivered to your inbox twice a month.
          </p>
          <form style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto' }} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your work email"
              className="footer-newsletter-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="footer-newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
