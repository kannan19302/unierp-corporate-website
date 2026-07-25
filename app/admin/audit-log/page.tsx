'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';

interface AuditEntry {
  id: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string | null;
  summary: string | null;
  createdAt: string;
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

export default function AuditLogPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/audit-log')
      .then((res) => res.json())
      .then((json) => setEntries(json.entries || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Audit Log" description="Every content, settings, and user change made from this admin console, most recent first." />

      <div className="admin-card" style={{ padding: '1.75rem' }}>
        {loading ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
        ) : entries.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No admin actions recorded yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '0.75rem' }}>When</th>
                <th style={{ padding: '0.75rem' }}>Admin</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
                <th style={{ padding: '0.75rem' }}>Entity</th>
                <th style={{ padding: '0.75rem' }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                  <td style={{ padding: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{new Date(e.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>{e.userEmail}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: ACTION_COLORS[e.action] || 'var(--color-text-main)' }}>{e.action}</span>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{e.entityType}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>{e.summary || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
