'use client';

import { useState } from 'react';
import { useAdminData } from '../AdminDataContext';
import { PageHeader } from '../components/PageHeader';
import { DeliverabilityMetrics } from './DeliverabilityMetrics';
import { Eye } from 'lucide-react';

type StatusFilter = 'ALL' | 'SENT' | 'FAILED' | 'QUEUED';

export default function AdminEmailsPage() {
  const { emailLogs, loading } = useAdminData();
  const [filter, setFilter] = useState<StatusFilter>('ALL');
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const provider = process.env.NEXT_PUBLIC_EMAIL_PROVIDER_LABEL || 'Resend';

  const filtered = filter === 'ALL' ? emailLogs : emailLogs.filter((l: any) => l.status === filter);

  const tabs: StatusFilter[] = ['ALL', 'SENT', 'FAILED', 'QUEUED'];
  const tabCounts = {
    ALL: emailLogs.length,
    SENT: emailLogs.filter((l: any) => l.status === 'SENT').length,
    FAILED: emailLogs.filter((l: any) => l.status === 'FAILED').length,
    QUEUED: emailLogs.filter((l: any) => l.status === 'QUEUED').length,
  };

  return (
    <div>
      <PageHeader
        title="Outbound Email Logs"
        description={`Real delivery logs from ${provider}. Entries marked FAILED mean RESEND_API_KEY is not configured or the send errored.`}
      />

      <DeliverabilityMetrics />

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--color-surface)', padding: '0.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-card-border)', marginBottom: '1.5rem', width: 'fit-content' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-md)', border: 'none',
              fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
              background: filter === tab ? 'var(--color-primary)' : 'transparent',
              color: filter === tab ? '#fff' : 'var(--color-text-muted)',
              transition: 'all 0.15s',
            }}
          >
            {tab}
            <span style={{
              fontSize: '0.7rem', fontWeight: 800,
              background: filter === tab ? 'rgba(255,255,255,0.2)' : 'var(--color-card-border)',
              borderRadius: '9999px', padding: '0 0.4rem',
              color: filter === tab ? '#fff' : 'var(--color-text-muted)',
            }}>
              {tabCounts[tab]}
            </span>
          </button>
        ))}
      </div>

      <div className="admin-card" style={{ padding: '1.75rem' }}>
        {loading ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Loading email logs…</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No {filter !== 'ALL' ? filter.toLowerCase() + ' ' : ''}emails found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map((log: any) => (
              <div
                key={log.id}
                style={{
                  background: 'var(--color-surface)', padding: '1rem 1.1rem',
                  borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-card-border)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  flexWrap: 'wrap', gap: '0.75rem',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-card-border)')}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.95rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {log.subject}
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                    To: <strong>{log.to}</strong> • {new Date(log.sentAt).toLocaleString()}
                    {log.providerId && <span style={{ marginLeft: '0.5rem', fontFamily: 'monospace', fontSize: '0.75rem', opacity: 0.6 }}>id:{log.providerId.slice(0, 12)}…</span>}
                    {log.error && <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>— {log.error}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <span
                    style={{
                      padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800,
                      background: log.status === 'SENT' ? 'rgba(5, 150, 105, 0.12)' : log.status === 'FAILED' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(217,119,6,0.12)',
                      color: log.status === 'SENT' ? '#059669' : log.status === 'FAILED' ? '#ef4444' : '#d97706',
                    }}
                  >
                    {log.status}
                  </span>
                  <button
                    onClick={() => setSelectedLog(log)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', padding: '0.2rem' }}
                    title="View detail"
                  >
                    <Eye size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedLog && (
        <div className="modal-backdrop" onClick={() => setSelectedLog(null)}>
          <div
            className="admin-card"
            style={{ padding: '2rem', maxWidth: '640px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>Email Detail</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              {[
                ['Subject', selectedLog.subject],
                ['To', selectedLog.to],
                ['Status', selectedLog.status],
                ['Provider', selectedLog.provider],
                ['Provider ID', selectedLog.providerId || '—'],
                ['Sent At', new Date(selectedLog.sentAt).toLocaleString()],
                ['Error', selectedLog.error || '—'],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                  <td style={{ padding: '0.6rem 0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{k}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: 'var(--color-text-main)', wordBreak: 'break-all' }}>{v}</td>
                </tr>
              ))}
            </table>
            <button onClick={() => setSelectedLog(null)} className="btn-secondary" style={{ marginTop: '1.25rem' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
