'use client';

import { Activity, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

const SERVICES = [
  { name: 'Core API', status: 'operational', uptime: '99.99%' },
  { name: 'Web Dashboard (US-East)', status: 'operational', uptime: '99.99%' },
  { name: 'Web Dashboard (EU-West)', status: 'operational', uptime: '99.98%' },
  { name: 'Authentication (SSO)', status: 'operational', uptime: '100%' },
  { name: 'Background Workers', status: 'operational', uptime: '99.99%' },
  { name: 'Webhooks Delivery', status: 'operational', uptime: '99.97%' },
];

export default function StatusPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="page-hero-badge"><Activity size={13} /> System Status</div>
        <h1 className="section-title">All systems operational</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Last updated: Just now</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem', border: '1px solid var(--color-emerald)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-emerald)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>No active incidents</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>All services are running normally.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {SERVICES.map(s => (
          <div key={s.name} className="status-card">
            <div className="status-name">{s.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>{s.uptime} uptime</div>
              <div className="status-pill status-operational">Operational</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Past Incidents</h3>
        <div style={{ borderLeft: '2px solid var(--glass-border)', paddingLeft: '1.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-subtle)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <Clock size={14} /> July 14, 2026
            </div>
            <h4 style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Delayed Webhook Delivery</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>A subset of webhooks experienced delivery delays of up to 5 minutes due to queue backlog. The issue was identified and autoscaling was adjusted to clear the backlog.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
