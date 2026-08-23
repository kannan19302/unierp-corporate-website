'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  Users,
  ArrowRight,
  CheckCircle2,
  Play,
  Download,
  Filter,
  Sparkles,
  MapPin,
  Check,
  X,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

interface EventItem {
  id: string;
  title: string;
  category: 'Live Webinar' | 'Product Keynote' | 'Customer Workshop' | 'Executive Roundtable';
  date: string;
  time: string;
  duration: string;
  speaker: { name: string; role: string; company: string; avatar: string };
  desc: string;
  topics: string[];
  isUpcoming: boolean;
  recordingUrl?: string;
}

const EVENTS: EventItem[] = [
  {
    id: 'webinar-mrp-ai',
    title: 'Automating Discrete Manufacturing & MRP II with Predictive AI',
    category: 'Live Webinar',
    date: 'August 28, 2026',
    time: '2:00 PM IST / 4:30 AM EDT',
    duration: '45 mins',
    speaker: {
      name: 'Vikramaditya Sharma',
      role: 'VP of Product Engineering',
      company: 'UniERP Core Labs',
      avatar: 'VS',
    },
    desc: 'Discover how multi-level BOM versioning and shop-floor machine telemetry eliminate inventory stockouts and reduce scrap by over 30%.',
    topics: ['Predictive Material Requirements', 'Shop Floor Work Order Telemetry', 'Automated 3-Way Quality Control'],
    isUpcoming: true,
  },
  {
    id: 'keynote-q3-release',
    title: 'UniERP Q3 Platform Keynote: Composable Multi-Entity Mesh',
    category: 'Product Keynote',
    date: 'September 10, 2026',
    time: '6:00 PM IST / 8:30 AM EDT',
    duration: '60 mins',
    speaker: {
      name: 'Rohan Deshmukh',
      role: 'Chief Technology Officer',
      company: 'UniERP',
      avatar: 'RD',
    },
    desc: 'Live unveiling of our next-generation multi-entity consolidation engine, zero-downtime PostgreSQL RLS schema migrations, and native mobile scanner apps.',
    topics: ['Multi-Entity General Ledger', 'Sub-millisecond Offline POS Sync', 'Developer REST & Webhook APIs'],
    isUpcoming: true,
  },
  {
    id: 'workshop-finance-close',
    title: 'Masterclass: Closing Month-End Books in Under 4 Hours',
    category: 'Customer Workshop',
    date: 'September 18, 2026',
    time: '3:00 PM IST / 5:30 AM EDT',
    duration: '50 mins',
    speaker: {
      name: 'Ananya Sen',
      role: 'Head of Financial Systems',
      company: 'UniERP',
      avatar: 'AS',
    },
    desc: 'Step-by-step masterclass on automated bank feed reconciliation, multi-currency revaluations, and one-click financial audit statements.',
    topics: ['Automated AR/AP Clearing', 'Continuous GAAP & IFRS 15 Compliance', 'Instant P&L / Balance Sheet Exports'],
    isUpcoming: true,
  },
  {
    id: 'roundtable-cfo-summit',
    title: 'Executive Roundtable: The Future of Composable Enterprise ERP',
    category: 'Executive Roundtable',
    date: 'July 15, 2026',
    time: 'On-Demand Replay',
    duration: '55 mins',
    speaker: {
      name: 'Kavita Sundaram',
      role: 'Managing Director',
      company: 'Enterprise FinTech Advisory',
      avatar: 'KS',
    },
    desc: 'Industry CFOs discuss moving away from monolithic legacy ERP systems to agile, PostgreSQL-powered composable platforms.',
    topics: ['Legacy ERP TCO Reductions', 'Data Sovereignty & Hybrid Cloud', 'Fast-Track Implementation Blueprints'],
    isUpcoming: false,
    recordingUrl: '#',
  },
  {
    id: 'webinar-retail-pos',
    title: 'Omnichannel POS & Real-Time Multi-Store Inventory Sync',
    category: 'Live Webinar',
    date: 'June 25, 2026',
    time: 'On-Demand Replay',
    duration: '40 mins',
    speaker: {
      name: 'Priya Iyer',
      role: 'VP of Retail Solutions',
      company: 'UniERP',
      avatar: 'PI',
    },
    desc: 'How 40+ retail chains achieved zero downtime register operations with offline-first SQLite sync and automated warehouse replenishments.',
    topics: ['Offline Register Architecture', 'Barcode & RFID Scanner Integration', 'Omnichannel Customer Loyalty'],
    isUpcoming: false,
    recordingUrl: '#',
  },
];

export function EventsClient() {
  useAnalytics('/events');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const categories = ['All', 'Live Webinar', 'Product Keynote', 'Customer Workshop', 'On-Demand'];

  const filteredEvents = EVENTS.filter((e) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'On-Demand') return !e.isUpcoming;
    return e.category === activeFilter;
  });

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEvent(null);
      setRsvpName('');
      setRsvpEmail('');
    }, 2500);
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. HERO ═══ */}
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
          <Calendar size={13} />
          <span>Events &amp; Live Keynotes</span>
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
          Learn, connect, and scale with <span style={{ color: '#2563eb' }}>UniERP Events</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Join live platform webinars, architecture masterclasses, and executive roundtables led by enterprise systems leaders.
        </p>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                border: activeFilter === cat ? 'none' : '1px solid var(--color-card-border)',
                background: activeFilter === cat ? '#2563eb' : 'var(--color-surface)',
                color: activeFilter === cat ? '#ffffff' : 'var(--color-text-muted)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeFilter === cat ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ 2. EVENTS GRID ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '1rem 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: 'var(--glass-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      background: evt.isUpcoming ? 'rgba(37, 99, 235, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                      color: evt.isUpcoming ? '#2563eb' : '#64748b',
                    }}
                  >
                    {evt.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                    <Clock size={13} />
                    <span>{evt.duration}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.75rem', lineHeight: 1.35 }}>
                  {evt.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                  {evt.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {evt.topics.map((t) => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                      <CheckCircle2 size={14} color="#2563eb" style={{ flexShrink: 0 }} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Speaker Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 0', borderTop: '1px solid var(--color-card-border)', borderBottom: '1px solid var(--color-card-border)', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {evt.speaker.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-text-main)' }}>{evt.speaker.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{evt.speaker.role} · {evt.speaker.company}</div>
                  </div>
                </div>

                {/* Event Schedule & CTA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{evt.date}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>{evt.time}</div>
                  </div>

                  {evt.isUpcoming ? (
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(evt)}
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                      }}
                    >
                      <span>RSVP Free</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(evt)}
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        background: 'var(--color-bg)',
                        color: 'var(--color-text-main)',
                        border: '1px solid var(--color-card-border)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Play size={13} fill="currentColor" color="#2563eb" />
                      <span>Watch Replay</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RSVP / REPLAY MODAL ═══ */}
      {selectedEvent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb', marginBottom: '0.5rem' }}>
              {selectedEvent.category}
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
              {selectedEvent.title}
            </h3>

            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              📅 {selectedEvent.date} · ⏰ {selectedEvent.time}
            </div>

            {rsvpSuccess ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  color: '#059669',
                }}
              >
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#065f46' }}>
                  {selectedEvent.isUpcoming ? 'You are registered!' : 'Access granted!'}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#047857', margin: '0.25rem 0 0' }}>
                  Calendar invite and live stream access link sent to {rsvpEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-card-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-card-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  {selectedEvent.isUpcoming ? 'Confirm Free Registration' : 'Unlock On-Demand Replay'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ═══ 3. ROYAL BANNER CTA ═══ */}
      <section style={{ padding: '0 1.5rem 6rem' }}>
        <div className="ref-royal-cta">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              margin: '0 0 1rem',
              color: '#ffffff',
            }}
          >
            Looking for a custom private workshop?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Our enterprise solutions architects can conduct tailored deep-dive workshops for your technical and executive teams.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=workshop" className="btn-royal-white">
              <span>Request Private Workshop</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/register" className="btn-royal-outline">
              <span>Start 30-Day Free Trial</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
