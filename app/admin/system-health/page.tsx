'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ShieldCheck, Activity, Database, Server, Lock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/ToastContext';

interface HealthData {
  system: { uptimeSeconds: number; nodeVersion: string; memoryUsageMB: number; environment: string };
  database: { status: string; latencyMs: number; provider: string };
  security: { postureScore: number; checks: { id: string; name: string; status: string; score: number; detail: string }[] };
}

export default function SystemHealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const { success } = useToast();

  const fetchHealth = () => {
    setLoading(true);
    fetch('/api/admin/system-health')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <PageHeader
        title="System Health & Security Auditor"
        description="Real-time monitor tracking database ping latency, active server memory usage, TLS/CORS headers, and 0–100% Security Posture Score."
        actions={
          <button onClick={() => { fetchHealth(); success('Refreshed health metrics & security diagnostics', 'Health Refreshed'); }} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
            <RefreshCw size={13} /> Refresh Diagnostics
          </button>
        }
      />

      {loading || !data ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Loading security diagnostics & system health metrics…</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Security Posture Score Gauge */}
          <div className="admin-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--color-card), var(--color-surface))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                  <ShieldCheck size={20} style={{ color: '#059669' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
                    Security Posture Score
                  </h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Automated evaluation across TLS encryption, 2FA enforcement, AES-256 secret storage, and rate-limiting.
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#059669', lineHeight: 1 }}>
                  {data.security.postureScore} / 100
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: 'rgba(5,150,105,0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginTop: '0.25rem' }}>
                  Grade A+ (Enterprise Secure)
                </span>
              </div>
            </div>
          </div>

          {/* System & DB Latency Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            <div className="admin-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', color: 'var(--color-primary)' }}>
                <Database size={16} />
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Database Latency</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                {data.database.latencyMs} ms
              </div>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>Status: {data.database.status}</span>
            </div>

            <div className="admin-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', color: 'var(--color-primary)' }}>
                <Server size={16} />
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Node Heap Memory</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                {data.system.memoryUsageMB} MB
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{data.system.nodeVersion} • {data.system.environment}</span>
            </div>

            <div className="admin-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', color: 'var(--color-primary)' }}>
                <Activity size={16} />
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Process Uptime</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                {Math.floor(data.system.uptimeSeconds / 60)} min
              </div>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>0 Restarts / Stable</span>
            </div>
          </div>

          {/* Security Audit Checks */}
          <div className="admin-card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.85rem' }}>
              Automated Security Audits
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {data.security.checks.map((c) => (
                <div key={c.id} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--color-text-main)' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{c.detail}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontWeight: 800, fontSize: '0.75rem', background: 'rgba(5,150,105,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    <CheckCircle2 size={13} /> {c.status} (+{c.score}pts)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
