'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Globe, Plus, Download, Star, ExternalLink } from 'lucide-react';

const APPS = [
  { name: 'Stripe Payments', developer: 'UniERP Core', installs: '2.5k', rating: 4.9, category: 'Finance', icon: 'S' },
  { name: 'Shopify Connector', developer: 'UniERP Core', installs: '1.2k', rating: 4.8, category: 'E-Commerce', icon: 'Sh' },
  { name: 'Slack Notifications', developer: 'UniERP Core', installs: '1.8k', rating: 4.9, category: 'Communication', icon: 'Sl' },
  { name: 'HubSpot Sync', developer: 'DataTech Partners', installs: '850', rating: 4.5, category: 'CRM', icon: 'H' },
  { name: 'DHL Shipping', developer: 'Logistics Pro', installs: '640', rating: 4.7, category: 'Supply Chain', icon: 'D' },
  { name: 'G Suite Auth', developer: 'UniERP Core', installs: '2.1k', rating: 4.9, category: 'Platform', icon: 'G' },
  { name: 'Twilio SMS', developer: 'UniERP Core', installs: '1.4k', rating: 4.8, category: 'Communication', icon: 'T' },
  { name: 'Avalara Tax', developer: 'Avalara', installs: '1.1k', rating: 4.6, category: 'Finance', icon: 'A' },
];

const CATEGORIES = ['All', 'Finance', 'CRM', 'E-Commerce', 'Supply Chain', 'Communication', 'Platform'];

export function MarketplaceClient() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = APPS.filter(a => 
    (activeCat === 'All' || a.category === activeCat) && 
    (search === '' || a.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <section className="page-hero" style={{ paddingBottom: '2rem' }}>
        <div className="page-hero-badge hero-enter"><Globe size={13} /> Apps Marketplace</div>
        <h1 className="hero-enter-delay-1">Extend your platform</h1>
        <p className="hero-enter-delay-2">
          Connect UniERP with the tools you already use, or add new capabilities built by our community.
        </p>
        
        <div className="help-search hero-enter-delay-3" style={{ marginTop: '2rem', maxWidth: '500px' }}>
          <Search size={18} className="help-search-icon" />
          <input
            type="search"
            className="help-search-input"
            placeholder="Search apps, integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`toggle-option ${activeCat === cat ? 'toggle-option-active' : ''}`}
              style={{ border: '1px solid var(--glass-border)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="module-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filtered.map(app => (
            <div key={app.name} className="module-card reveal hover-lift" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {app.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>{app.name}</h3>
                  <p style={{ color: 'var(--color-text-subtle)', fontSize: '0.85rem', margin: 0 }}>by {app.developer}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Download size={13} /> {app.installs}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b' }}><Star size={13} fill="currentColor" /> {app.rating}</span>
                </div>
                <div style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Install <Plus size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '2rem 1.5rem 6rem' }}>
        <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Build your own app</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Use our robust API and Developer Platform to build custom integrations or publish apps to the marketplace.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/docs/api" className="btn-primary btn-ripple">
              Developer Docs
            </Link>
            <Link href="/contact" className="btn-secondary">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
