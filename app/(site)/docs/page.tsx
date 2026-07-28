'use client';

import Link from 'next/link';
import { BookOpen, Terminal, FileCode2, PlayCircle, Search, ArrowRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div>
      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero-badge hero-enter"><BookOpen size={13} /> Documentation</div>
        <h1 className="hero-enter-delay-1">UniERP Documentation</h1>
        <p className="hero-enter-delay-2">
          Everything you need to build, integrate, and deploy with UniERP.
        </p>

        <div className="help-search hero-enter-delay-3" style={{ marginTop: '2rem' }}>
          <Search size={18} className="help-search-icon" />
          <input
            type="search"
            className="help-search-input"
            placeholder="Search docs, tutorials, API..."
          />
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
        <div className="module-grid">
          {[
            { icon: PlayCircle, title: 'Quickstart Guide', desc: 'Get your first tenant up and running in 5 minutes.', href: '/docs/quickstart' },
            { icon: BookOpen, title: 'User Guides', desc: 'Detailed manuals for every core ERP module.', href: '/docs/guides' },
            { icon: Terminal, title: 'API Reference', desc: 'REST API endpoints, webhooks, and rate limits.', href: '/docs/api' },
            { icon: FileCode2, title: 'Developer SDKs', desc: 'Libraries for Node.js, Python, Go, and more.', href: '/docs/sdks' },
          ].map(d => (
            <Link key={d.title} href={d.href} className="glass-panel hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <d.icon size={28} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>{d.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0, flex: 1 }}>{d.desc}</p>
              <div style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem' }}>
                Read docs <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
