'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3, Users, Mail, Ticket, CheckCircle2, AlertTriangle, Send, RefreshCw, Eye, Shield, Globe, Award, DollarSign, ArrowLeft, Search, Filter, MessageSquare, ExternalLink, Sparkles, Sliders, Play, Check, X, FileText, Lock
} from 'lucide-react';

export default function AdvancedAdminCommandTower() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'lms' | 'incidents' | 'broadcast' | 'emails' | 'seo' | 'testimonials'>('analytics');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Mock / Initial Data Store for Real-Time Interaction
  const [stats, setStats] = useState({
    totalPageviews: 14280,
    activeLeads: 24,
    highScoreLeads: 9,
    openTickets: 5,
    totalSubscribers: 1840,
    emailsSent: 3420,
  });

  // LMS Leads State
  const [leads, setLeads] = useState([
    { id: 'LD-1001', name: 'Rajesh Kumar', email: 'rajesh@techcorp.in', phone: '+91 98765 43210', company: 'TechCorp India', size: '50-250', budget: '₹15,000,000', score: 92, status: 'QUALIFIED', modules: ['Finance', 'GST', 'Inventory', 'Studio'], date: '2026-07-25' },
    { id: 'LD-1002', name: 'Sarah Jenkins', email: 'sarah@globalmed.com', phone: '+1 415 555 0192', company: 'GlobalMed Inc', size: '250-1000', budget: '$45,000', score: 88, status: 'NEW', modules: ['Healthcare', 'Finance', 'HR'], date: '2026-07-25' },
    { id: 'LD-1003', name: 'Ananya Sharma', email: 'ananya@edulearn.org', phone: '+91 91234 56789', company: 'EduLearn Systems', size: '20-50', budget: '₹4,500,000', score: 78, status: 'PROPOSAL_SENT', modules: ['Education', 'Payroll'], date: '2026-07-24' },
    { id: 'LD-1004', name: 'Michael Zhang', email: 'michael@apexretail.cn', phone: '+86 21 6888 1234', company: 'Apex Retail Group', size: '500+', budget: '$120,000', score: 95, status: 'WON', modules: ['POS', 'Inventory', 'E-Commerce'], date: '2026-07-24' },
  ]);

  // Support Tickets / Incidents State
  const [tickets, setTickets] = useState([
    { id: 'TICK-1001', name: 'Vikram Malhotra', email: 'vikram@logistics.in', subject: 'Custom GSTIN Validation for Multi-Branch Invoices', message: 'How do we handle state-wise GSTIN registration for 5 warehouses?', status: 'OPEN', priority: 'HIGH', aiEscalated: true, reply: '', date: '2026-07-25' },
    { id: 'TICK-1002', name: 'Elena Rostova', email: 'elena@nordicstyle.se', subject: 'SEPA Direct Debit XML Export Format', message: 'Need assistance configuring SEPA B2B Mandate XML files.', status: 'IN_PROGRESS', priority: 'MEDIUM', aiEscalated: true, reply: 'Our solutions engineer is reviewing SEPA XML schemas.', date: '2026-07-25' },
    { id: 'TICK-1003', name: 'Amitabh Gupta', email: 'agupta@realestate.in', subject: 'Lease Agreement Auto-Renewal Trigger', message: 'Can Builder Studio trigger automated SMS alerts 30 days before lease expiry?', status: 'RESOLVED', priority: 'LOW', aiEscalated: false, reply: 'Yes, use the Workflow Trigger node in Builder Studio.', date: '2026-07-24' },
  ]);

  // Email Logs State (with Ethereal Email Preview Links)
  const [emailLogs, setEmailLogs] = useState([
    { id: 'EM-9001', to: 'rajesh@techcorp.in', subject: 'Welcome to UniERP 30-Day Free Trial Workspace', status: 'SENT', provider: 'ETHEREAL', previewUrl: 'https://ethereal.email/message/X9s2a1b9c3d4e5f6', sentAt: '10 mins ago' },
    { id: 'EM-9002', to: 'vikram@logistics.in', subject: 'Support Incident Ticket TICK-1001 Confirmation', status: 'SENT', provider: 'ETHEREAL', previewUrl: 'https://ethereal.email/message/Y8r3b2c1d4e5f6g7', sentAt: '25 mins ago' },
    { id: 'EM-9003', to: 'all-subscribers@unierp-broadcast', subject: 'UniERP 2.5 Released: Agentforce AI Copilot & GST E-Invoicing', status: 'SENT', provider: 'SMTP_BROADCAST', previewUrl: 'https://ethereal.email/message/Z7q4c3d2e1f6g7h8', sentAt: '2 hours ago' },
  ]);

  // Broadcast Composer State
  const [broadcastSubject, setBroadcastSubject] = useState('UniERP v2.5 Released: Agentforce AI Copilot & Multi-Tenant E-Commerce Portal Engine');
  const [broadcastBody, setBroadcastBody] = useState('We are excited to announce UniERP v2.5 with Indian GST E-Invoicing, E-Way Bills, 28+ ERP apps, and visual No-Code Builder Studio. Log in to your workspace to explore!');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Ticket Reply Handler
  const handleTicketReply = (ticketId: string, replyText: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED', reply: replyText } : t));
    // Add Email Log
    const newLog = {
      id: `EM-${Math.floor(1000 + Math.random() * 9000)}`,
      to: tickets.find(t => t.id === ticketId)?.email || 'customer@company.com',
      subject: `Re: ${tickets.find(t => t.id === ticketId)?.subject}`,
      status: 'SENT',
      provider: 'ETHEREAL',
      previewUrl: `https://ethereal.email/message/eth_${Math.random().toString(36).substring(7)}`,
      sentAt: 'Just now'
    };
    setEmailLogs([newLog, ...emailLogs]);
  };

  // Broadcast Trigger Handler
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setBroadcastSuccess(true);
      setStats(prev => ({ ...prev, emailsSent: prev.emailsSent + stats.totalSubscribers }));
      // Add Email Log
      setEmailLogs([
        {
          id: `EM-BCAST-${Date.now()}`,
          to: `${stats.totalSubscribers} Subscribers`,
          subject: broadcastSubject,
          status: 'SENT',
          provider: 'SMTP_BROADCAST',
          previewUrl: `https://ethereal.email/message/bcast_${Date.now()}`,
          sentAt: 'Just now'
        },
        ...emailLogs
      ]);
      setTimeout(() => setBroadcastSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Top Admin Navigation */}
      <header style={{ background: '#0b1329', borderBottom: '1px solid #1e293b', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} />
            <span>Back to Main Site</span>
          </Link>
          <span style={{ color: '#334155' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #38bdf8, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900 }}>
              U
            </div>
            <span>UniERP <span style={{ color: '#38bdf8' }}>Admin Command Tower</span></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <span>Backend Sync: Connected (Port 3001 & Postgres 16)</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
        
        {/* KPI Counter Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Total Site Pageviews</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#38bdf8', marginTop: '0.25rem' }}>{stats.totalPageviews.toLocaleString()}</div>
          </div>
          <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Active Sales Leads</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#10b981', marginTop: '0.25rem' }}>{stats.activeLeads} <span style={{ fontSize: '0.85rem', color: '#10b981' }}>({stats.highScoreLeads} High Score)</span></div>
          </div>
          <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Open Support Incidents</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#f59e0b', marginTop: '0.25rem' }}>{stats.openTickets}</div>
          </div>
          <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Newsletter Subscribers</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#a855f7', marginTop: '0.25rem' }}>{stats.totalSubscribers.toLocaleString()}</div>
          </div>
          <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Outbound Emails Sent</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#ec4899', marginTop: '0.25rem' }}>{stats.emailsSent.toLocaleString()}</div>
          </div>
        </div>

        {/* Tab Selector Navigation */}
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { id: 'analytics', label: 'Network Analytics & Traffic', icon: BarChart3 },
            { id: 'lms', label: 'Lead Management (LMS)', icon: Users },
            { id: 'incidents', label: 'Support Tickets & AI Escalations', icon: Ticket },
            { id: 'emails', label: 'Email Delivery Logs & Ethereal Inbox', icon: Mail },
            { id: 'broadcast', label: 'Release Broadcast Console', icon: Send },
            { id: 'seo', label: 'SEO & Site Settings', icon: Globe },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  background: active ? '#2563eb' : '#0b1329',
                  color: active ? '#ffffff' : '#94a3b8',
                  border: active ? '1px solid #3b82f6' : '1px solid #1e293b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: NETWORK ANALYTICS */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '16px', padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', color: '#ffffff' }}>Top Traffic Referrers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Google Organic Search', views: '6,420 (45%)', color: '#38bdf8' },
                  { name: 'Direct Visits (localhost / bookmarks)', views: '4,110 (28%)', color: '#10b981' },
                  { name: 'LinkedIn Enterprise SaaS Campaign', views: '2,350 (16%)', color: '#a855f7' },
                  { name: 'GitHub Repositories (ERPSys)', views: '1,400 (11%)', color: '#f59e0b' },
                ].map((r, i) => (
                  <div key={i} style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.name}</span>
                    <span style={{ color: r.color, fontWeight: 700, fontSize: '0.9rem' }}>{r.views}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '16px', padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', color: '#ffffff' }}>Most Visited Site Routes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { path: '/', title: 'Home Page & Instant Demo Launcher', views: '8,920 hits' },
                  { path: '#pricing', title: 'India Pricing Tiers (₹1,499 / ₹3,999)', views: '3,210 hits' },
                  { path: '#sandbox', title: 'Live No-Code Studio Sandbox', views: '2,150 hits' },
                  { path: '#cockpit', title: 'Executive Cockpit Switcher', views: '1,840 hits' },
                ].map((p, i) => (
                  <div key={i} style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontSize: '0.85rem' }}>{p.path}</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{p.views}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEAD MANAGEMENT SYSTEM (LMS) */}
        {activeTab === 'lms' && (
          <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '16px', padding: '1.75rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Sales Lead Pipeline & Auto Lead Scoring</h3>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Scored 0-100 based on budget, company size, and required modules</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.85rem' }}>
                  <th style={{ padding: '0.85rem' }}>Lead ID</th>
                  <th style={{ padding: '0.85rem' }}>Prospect Name</th>
                  <th style={{ padding: '0.85rem' }}>Company</th>
                  <th style={{ padding: '0.85rem' }}>Budget</th>
                  <th style={{ padding: '0.85rem' }}>Lead Score</th>
                  <th style={{ padding: '0.85rem' }}>Status</th>
                  <th style={{ padding: '0.85rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '1rem 0.85rem', fontFamily: 'monospace', color: '#38bdf8', fontWeight: 600 }}>{lead.id}</td>
                    <td style={{ padding: '1rem 0.85rem' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{lead.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{lead.email}</div>
                    </td>
                    <td style={{ padding: '1rem 0.85rem' }}>{lead.company} ({lead.size})</td>
                    <td style={{ padding: '1rem 0.85rem', fontWeight: 700, color: '#10b981' }}>{lead.budget}</td>
                    <td style={{ padding: '1rem 0.85rem' }}>
                      <span style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        background: lead.score >= 85 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: lead.score >= 85 ? '#10b981' : '#f59e0b',
                        border: `1px solid ${lead.score >= 85 ? '#10b981' : '#f59e0b'}`
                      }}>
                        {lead.score} / 100
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.85rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '6px', background: '#1e293b', color: '#ffffff' }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.85rem' }}>
                      <button
                        onClick={() => {
                          setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'QUALIFIED' } : l));
                        }}
                        style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', background: '#2563eb', color: '#ffffff', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Qualify Lead
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: SUPPORT TICKETS & AI ESCALATIONS */}
        {activeTab === 'incidents' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {tickets.map(ticket => (
              <div key={ticket.id} style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'monospace', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '0.25rem 0.65rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.85rem' }}>
                      {ticket.id}
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{ticket.subject}</h4>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    background: ticket.status === 'OPEN' ? 'rgba(239, 68, 68, 0.15)' : ticket.status === 'RESOLVED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: ticket.status === 'OPEN' ? '#ef4444' : ticket.status === 'RESOLVED' ? '#10b981' : '#f59e0b'
                  }}>
                    {ticket.status}
                  </span>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1rem', background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                  <strong style={{ color: '#ffffff' }}>From:</strong> {ticket.name} ({ticket.email})<br />
                  {ticket.message}
                </p>

                {ticket.reply ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '0.85rem 1rem', borderRadius: '8px', color: '#10b981', fontSize: '0.85rem' }}>
                    <strong>Admin Reply Sent:</strong> {ticket.reply}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Type email reply to customer..."
                      id={`reply-${ticket.id}`}
                      style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', outline: 'none', fontSize: '0.85rem' }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById(`reply-${ticket.id}`) as HTMLInputElement;
                        if (input && input.value) {
                          handleTicketReply(ticket.id, input.value);
                          input.value = '';
                        }
                      }}
                      className="btn-primary"
                      style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      Send Email Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: EMAIL DELIVERY LOGS & ETHEREAL INBOX */}
        {activeTab === 'emails' && (
          <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '16px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Outbound SMTP Email Delivery Logs</h3>
              <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700 }}>Nodemailer Ethereal Live Test Inbox Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {emailLogs.map(log => (
                <div key={log.id} style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{log.subject}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.2rem' }}>To: {log.to} • Sent {log.sentAt}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '0.75rem', fontWeight: 800 }}>
                      {log.status}
                    </span>
                    <a
                      href={log.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', borderColor: '#38bdf8', color: '#38bdf8' }}
                    >
                      <Eye size={14} />
                      <span>View Live Rendered Email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RELEASE BROADCAST CONSOLE */}
        {activeTab === 'broadcast' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '16px', padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>Product Release Email Broadcast Console</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Broadcast release notes to all <strong style={{ color: '#38bdf8' }}>{stats.totalSubscribers.toLocaleString()} subscribers</strong> via SMTP / Ethereal Email.
              </p>

              {broadcastSuccess && (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} />
                  <span>Broadcast successfully dispatched to {stats.totalSubscribers.toLocaleString()} subscribers!</span>
                </div>
              )}

              <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>Email Announcement Subject</label>
                  <input
                    type="text"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>HTML Release Announcement Content</label>
                  <textarea
                    rows={6}
                    value={broadcastBody}
                    onChange={(e) => setBroadcastBody(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', outline: 'none', fontFamily: 'inherit' }}
                    required
                  />
                </div>

                <button type="submit" disabled={isLoading} className="btn-primary" style={{ padding: '0.9rem', justifyContent: 'center' }}>
                  {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
                  <span>{isLoading ? 'Dispatching Broadcast Emails...' : 'Send Release Broadcast to All Subscribers'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: SEO SETTINGS */}
        {activeTab === 'seo' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: '#0b1329', border: '1px solid #1e293b', borderRadius: '16px', padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>SEO & JSON-LD Structured Data Settings</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>Default Meta Title</label>
                  <input type="text" defaultValue="UniERP — The Universal ERP Platform For Indian & Global Enterprises" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>JSON-LD Schema Type</label>
                  <input type="text" defaultValue="SoftwareApplication (Enterprise ERP, GST, No-Code Studio)" disabled style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: '#0f172a', border: '1px solid #1e293b', color: '#38bdf8' }} />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
