'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Download, Upload, UserMinus, Trash2, Search, RefreshCw } from 'lucide-react';
import { useToast } from '../components/ToastContext';

interface Subscriber {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
}

interface Stats {
  total: number;
  active: number;
  newLast30d: number;
}

export default function AdminSubscribersPage() {
  const { success, error: toastError } = useToast();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, newLast30d: 0 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [importing, setImporting] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (q = '') => {
    setLoading(true);
    const res = await fetch(`/api/admin/subscribers${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    if (res.ok) {
      const json = await res.json();
      setSubscribers(json.subscribers || []);
      setStats(json.stats || { total: 0, active: 0, newLast30d: 0 });
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === subscribers.length) setSelected(new Set());
    else setSelected(new Set(subscribers.map((s) => s.id)));
  };

  const bulkAction = async (action: string) => {
    if (action === 'bulk-delete' && !confirm(`Delete ${selected.size} subscribers? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ids: Array.from(selected) }),
      });
      if (res.ok) {
        setSelected(new Set());
        load();
        success(`Action "${action}" completed on ${selected.size} subscribers!`, 'Action Complete');
      } else {
        toastError('Bulk action failed', 'Error');
      }
    } catch (e: any) {
      toastError(e.message || 'Error executing bulk action', 'Error');
    } finally {
      setBusy(false);
    }
  };

  const exportAll = async () => {
    try {
      const res = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'export' }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        success('Exported subscribers to CSV file!', 'Export Success');
      } else {
        toastError('Failed to export subscribers', 'Export Error');
      }
    } catch (e: any) {
      toastError(e.message || 'Error exporting subscribers', 'Error');
    }
  };

  const importEmails = async () => {
    if (!importText.trim()) return;
    setImporting(true);
    try {
      const emails = importText.split(/[\n,;]/).map((e) => e.trim()).filter(Boolean);
      const res = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails }),
      });
      if (res.ok) {
        setImportText('');
        setShowImport(false);
        load();
        success(`Successfully imported ${emails.length} subscribers!`, 'Import Success');
      } else {
        toastError('Failed to import emails', 'Import Error');
      }
    } catch (e: any) {
      toastError(e.message || 'Error importing emails', 'Error');
    } finally {
      setImporting(false);
    }
  };

  const filtered = subscribers.filter((s) => s.email.includes(search));

  return (
    <div>
      <PageHeader
        title="Subscriber Management"
        description="Manage all newsletter subscribers. Export, import, and bulk unsubscribe from here."
        actions={
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={exportAll} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
              <Download size={13} /> Export CSV
            </button>
            <button onClick={() => setShowImport((v) => !v)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
              <Upload size={13} /> Import
            </button>
          </div>
        }
      />

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Total Subscribers', value: stats.total },
          { label: 'Active', value: stats.active },
          { label: 'New (30 days)', value: stats.newLast30d },
        ].map((s) => (
          <div key={s.label} className="admin-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--color-text-main)' }}>{s.value.toLocaleString()}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Import panel */}
      {showImport && (
        <div className="admin-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>Import Emails</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>Paste emails separated by newlines, commas, or semicolons.</p>
          <textarea
            rows={4}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="user1@example.com&#10;user2@example.com"
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontFamily: 'monospace', fontSize: '0.82rem', resize: 'vertical', marginBottom: '0.65rem' }}
          />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={importEmails} disabled={importing} className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}>
              {importing ? <RefreshCw size={14} /> : <Upload size={14} />}
              {importing ? 'Importing…' : 'Import'}
            </button>
            <button onClick={() => setShowImport(false)} className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Search + bulk toolbar */}
      <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email…"
            style={{ width: '100%', padding: '0.45rem 0.75rem 0.45rem 2rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem' }}
          />
        </div>
        {selected.size > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={() => bulkAction('bulk-unsubscribe')} disabled={busy} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.75rem', borderRadius: '6px', background: 'rgba(217,119,6,0.1)', color: '#d97706', border: '1px solid rgba(217,119,6,0.25)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
              <UserMinus size={13} /> Unsubscribe ({selected.size})
            </button>
            <button onClick={() => bulkAction('bulk-delete')} disabled={busy} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.75rem', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
              <Trash2 size={13} /> Delete ({selected.size})
            </button>
          </div>
        )}
      </div>

      {/* Subscribers table */}
      <div className="admin-card" style={{ padding: '1.25rem', overflowX: 'auto' }}>
        {loading ? (
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>Loading subscribers…</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>No subscribers found{search ? ` matching "${search}"` : ' yet'}.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '0.65rem 0.75rem', width: '32px' }}>
                  <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
                </th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Email</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Status</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub, idx) => (
                <tr
                  key={sub.id}
                  style={{
                    borderBottom: '1px solid var(--color-card-border)',
                    background: selected.has(sub.id) ? 'rgba(37,99,235,0.06)' : idx % 2 === 0 ? 'transparent' : 'var(--color-surface)',
                  }}
                >
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <input type="checkbox" checked={selected.has(sub.id)} onChange={() => toggleSelect(sub.id)} style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: 'var(--color-text-main)', fontWeight: 600 }}>{sub.email}</td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: sub.active ? '#059669' : '#94a3b8' }}>
                      {sub.active ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
