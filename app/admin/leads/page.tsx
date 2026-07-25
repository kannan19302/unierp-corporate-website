'use client';

import { useState, useCallback } from 'react';
import { Table2, Kanban } from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { PageHeader } from '../components/PageHeader';
import { StatCardRow } from '../components/StatCardRow';
import { LeadPipeline } from './LeadPipeline';
import { BulkActionBar } from './BulkActionBar';
import { useToast } from '../components/ToastContext';

export default function AdminLeadsPage() {
  const { leads, loading, refresh } = useAdminData();
  const { success, error } = useToast();
  const [view, setView] = useState<'table' | 'pipeline'>('pipeline');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleQualify = async (leadId: string) => {
    try {
      const res = await fetch('/api/admin/leads/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status: 'QUALIFIED' }),
      });
      if (res.ok) {
        refresh();
        success('Lead status updated to Qualified!', 'Status Updated');
      } else {
        error('Failed to update lead status', 'Error');
      }
    } catch (e: any) {
      error(e.message || 'Network error updating lead', 'Error');
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === leads.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(leads.map((l: any) => l.id)));
    }
  };

  const handleBulkAction = useCallback(async (action: string, value?: string) => {
    const ids = Array.from(selected);

    if (action === 'export') {
      try {
        const res = await fetch('/api/admin/leads/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids, action, value }),
        });
        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `leads-${Date.now()}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          success(`Exported ${ids.length} leads to CSV`, 'Export Success');
        } else {
          error('Failed to export leads', 'Export Error');
        }
      } catch (e: any) {
        error(e.message || 'Error exporting leads', 'Error');
      }
      return;
    }

    if (action === 'delete') {
      if (!confirm(`Delete ${ids.length} leads? This cannot be undone.`)) return;
    }

    try {
      const res = await fetch('/api/admin/leads/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, action, value }),
      });
      if (res.ok) {
        setSelected(new Set());
        refresh();
        success(`Successfully performed bulk ${action} on ${ids.length} leads!`, 'Bulk Action Complete');
      } else {
        error('Bulk action failed', 'Error');
      }
    } catch (e: any) {
      error(e.message || 'Error executing bulk action', 'Error');
    }
  }, [selected, refresh, success, error]);

  return (
    <div>
      <PageHeader
        title="Lead Management (LMS)"
        description="Real leads captured from the public site, scored 0-100 based on budget, company size, and module interest."
        actions={
          <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--color-surface)', padding: '0.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)' }}>
            <button
              onClick={() => setView('pipeline')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', background: view === 'pipeline' ? 'var(--color-primary)' : 'transparent', color: view === 'pipeline' ? '#fff' : 'var(--color-text-muted)' }}
            >
              <Kanban size={13} /> Pipeline
            </button>
            <button
              onClick={() => setView('table')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', background: view === 'table' ? 'var(--color-primary)' : 'transparent', color: view === 'table' ? '#fff' : 'var(--color-text-muted)' }}
            >
              <Table2 size={13} /> Table
            </button>
          </div>
        }
      />
      <StatCardRow />

      {loading ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Loading leads…</p>
      ) : leads.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No leads yet — submissions from the hero form, pricing CTAs, and /contact will appear here in real time.</p>
      ) : view === 'pipeline' ? (
        <LeadPipeline />
      ) : (
        <div className="admin-card" style={{ padding: '1.25rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '0.65rem 0.75rem', width: '32px' }}>
                  <input
                    type="checkbox"
                    checked={selected.size === leads.length && leads.length > 0}
                    onChange={toggleSelectAll}
                    style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Prospect</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Company</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Score</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Status</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Captured</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any, idx: number) => (
                <tr
                  key={lead.id}
                  style={{
                    borderBottom: '1px solid var(--color-card-border)',
                    background: selected.has(lead.id)
                      ? 'rgba(37,99,235,0.06)'
                      : idx % 2 === 0 ? 'transparent' : 'var(--color-surface)',
                  }}
                >
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <input
                      type="checkbox"
                      checked={selected.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                      style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{lead.name || '—'}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{lead.email}</div>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: 'var(--color-text-main)' }}>{lead.company || '—'} {lead.size ? `(${lead.size})` : ''}</td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, background: lead.score >= 70 ? 'rgba(5, 150, 105, 0.12)' : 'rgba(217, 119, 6, 0.12)', color: lead.score >= 70 ? '#059669' : '#d97706' }}>
                      {lead.score} / 100
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'var(--color-surface)', color: 'var(--color-text-main)' }}>{lead.status}</span>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    {lead.status !== 'QUALIFIED' && (
                      <button onClick={() => handleQualify(lead.id)} style={{ padding: '0.3rem 0.65rem', borderRadius: '4px', background: 'var(--color-primary)', color: '#fff', border: 'none', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                        Qualify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BulkActionBar
        selectedCount={selected.size}
        selectedIds={Array.from(selected)}
        entityType="leads"
        onAction={handleBulkAction}
        onClear={() => setSelected(new Set())}
      />
    </div>
  );
}
