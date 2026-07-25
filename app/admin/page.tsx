'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from './components/PageHeader';
import { StatCardRow } from './components/StatCardRow';
import { SparklineChart } from './components/SparklineChart';
import { AnalyticsConversionChart } from './components/AnalyticsConversionChart';
import { useAdminData } from './AdminDataContext';
import Link from 'next/link';
import { PlusCircle, Send, LayoutTemplate, CheckCircle2, AlertCircle } from 'lucide-react';

interface Analytics {
  topPaths: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
  leadConversionRate: number;
  totalLeads: number;
  wonLeads: number;
}

const ACTION_COLORS: Record<string, string> = {
  create: 'var(--color-emerald)',
  update: 'var(--color-primary)',
  delete: '#ef4444',
  'stage-change': 'var(--color-purple)',
  reply: 'var(--color-primary)',
  broadcast: '#db2777',
  clear: 'var(--color-text-muted)',
};

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const { stats, recentAuditLogs, dailyTrend } = useAdminData();

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((res) => res.json())
      .then((json) => setAnalytics(json.analytics))
      .catch((e) => console.error('Failed to load analytics:', e));
  }, []);

  const providerOk = stats.deliveryRate >= 90 || stats.emailsSent === 0;

  return (
    <div>
      <PageHeader title="Network Analytics & Traffic" description="Real visitor activity from the last 30 days, recorded by the site's first-party analytics events." />

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Add Lead', href: '/admin/leads', icon: PlusCircle, color: 'var(--color-primary)' },
          { label: 'Send Broadcast', href: '/admin/broadcast', icon: Send, color: '#db2777' },
          { label: 'Edit Home Page', href: '/admin/content', icon: LayoutTemplate, color: 'var(--color-emerald)' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.1rem', borderRadius: '10px',
              background: 'var(--color-surface)', border: '1px solid var(--color-card-border)',
              color: action.color, fontWeight: 700, fontSize: '0.85rem',
              textDecoration: 'none', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = action.color; e.currentTarget.style.background = 'var(--color-card)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-card-border)'; e.currentTarget.style.background = 'var(--color-surface)'; }}
          >
            <action.icon size={16} /> {action.label}
          </Link>
        ))}
      </div>

      <StatCardRow />

      <div style={{ marginBottom: '2rem' }}>
        <AnalyticsConversionChart />
      </div>

      {/* System Health */}
      <div className="admin-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>System Health</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          {providerOk ? <CheckCircle2 size={15} color="#059669" /> : <AlertCircle size={15} color="#ef4444" />}
          <span style={{ color: providerOk ? '#059669' : '#ef4444', fontWeight: 600 }}>
            Email provider: {providerOk ? 'Operational' : 'Degraded'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <CheckCircle2 size={15} color="#059669" />
          <span style={{ color: '#059669', fontWeight: 600 }}>Database: Connected</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>
            Subscribers: <strong style={{ color: 'var(--color-text-main)' }}>{stats.totalSubscribers.toLocaleString()}</strong> active
          </span>
        </div>
        {stats.pendingBroadcasts > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
            <AlertCircle size={15} color="#d97706" />
            <span style={{ color: '#d97706', fontWeight: 600 }}>{stats.pendingBroadcasts} broadcasts pending</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Daily Trend Sparkline */}
        {dailyTrend && dailyTrend.length >= 2 && (
          <div className="admin-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>
              Pageview Trend (14 days)
            </h3>
            <SparklineChart data={dailyTrend} color="var(--color-primary)" height={80} label="" />
            <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Peak: <strong style={{ color: 'var(--color-text-main)' }}>
                {Math.max(...dailyTrend.map((d) => d.count)).toLocaleString()}
              </strong> views/day
            </div>
          </div>
        )}

        {/* Lead Funnel */}
        {analytics && (
          <div className="admin-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>Lead Funnel (30 days)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Total leads', value: analytics.totalLeads, color: 'var(--color-primary)', pct: 100 },
                { label: 'High-score (≥80)', value: stats.highScoreLeads, color: '#d97706', pct: analytics.totalLeads > 0 ? Math.round((stats.highScoreLeads / analytics.totalLeads) * 100) : 0 },
                { label: 'Won', value: analytics.wonLeads, color: 'var(--color-emerald)', pct: analytics.totalLeads > 0 ? Math.round((analytics.wonLeads / analytics.totalLeads) * 100) : 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{item.value}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '9999px', background: 'var(--color-surface)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '9999px', transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '1rem' }}>
              Conversion: <strong style={{ color: 'var(--color-emerald)' }}>{analytics.leadConversionRate}%</strong>
            </p>
          </div>
        )}

        {/* Top Referrers */}
        <div className="admin-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>Top Traffic Referrers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics && analytics.topReferrers.length > 0 ? (
              analytics.topReferrers.map((r) => (
                <div key={r.referrer} style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{r.referrer}</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{r.count}</span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No traffic recorded yet — browse the site to generate real analytics events.</p>
            )}
          </div>
        </div>

        {/* Most Visited */}
        <div className="admin-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>Most Visited Routes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics && analytics.topPaths.length > 0 ? (
              analytics.topPaths.map((p) => (
                <div key={p.path} style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--color-primary)', fontSize: '0.85rem' }}>{p.path}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{p.count} hits</span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No pageviews recorded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      {recentAuditLogs && recentAuditLogs.length > 0 && (
        <div className="admin-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {recentAuditLogs.map((e: any, i) => (
              <div key={e.id} style={{ display: 'flex', gap: '1rem', paddingBottom: i < recentAuditLogs.length - 1 ? '0.85rem' : 0, marginBottom: i < recentAuditLogs.length - 1 ? '0.85rem' : 0, borderBottom: i < recentAuditLogs.length - 1 ? '1px solid var(--color-card-border)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACTION_COLORS[e.action] || 'var(--color-text-muted)', marginTop: '0.45rem', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                    <span style={{ fontWeight: 700, color: ACTION_COLORS[e.action] || 'var(--color-text-main)', textTransform: 'uppercase', fontSize: '0.75rem' }}>{e.action}</span>
                    {' '}
                    <span style={{ color: 'var(--color-text-muted)' }}>by</span>
                    {' '}
                    <strong>{e.userEmail}</strong>
                    {e.summary && <span style={{ color: 'var(--color-text-muted)' }}> — {e.summary}</span>}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '0.1rem' }}>
                    {new Date(e.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
