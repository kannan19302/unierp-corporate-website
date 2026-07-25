'use client';

import { useState, useCallback } from 'react';
import { useAdminData } from '../AdminDataContext';
import { PageHeader } from '../components/PageHeader';
import { StatCardRow } from '../components/StatCardRow';
import { BulkActionBar } from '../leads/BulkActionBar';
import { useToast } from '../components/ToastContext';

export default function AdminTicketsPage() {
  const { tickets, loading, refresh } = useAdminData();
  const { success, error } = useToast();
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleReply = async (ticketId: string) => {
    const replyText = replyDrafts[ticketId];
    if (!replyText) return;
    try {
      const res = await fetch('/api/admin/tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, replyText }),
      });
      if (res.ok) {
        setReplyDrafts((prev) => ({ ...prev, [ticketId]: '' }));
        refresh();
        success('Reply sent to customer via email!', 'Reply Sent');
      } else {
        error('Failed to send reply', 'Error');
      }
    } catch (e: any) {
      error(e.message || 'Error sending reply', 'Error');
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
    if (selected.size === tickets.length) setSelected(new Set());
    else setSelected(new Set(tickets.map((t: any) => t.id)));
  };

  const handleBulkAction = useCallback(async (action: string, value?: string) => {
    const ids = Array.from(selected);
    if (action === 'delete' && !confirm(`Delete ${ids.length} tickets? This cannot be undone.`)) return;

    try {
      const res = await fetch('/api/admin/tickets/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, action, value }),
      });
      if (res.ok) {
        setSelected(new Set());
        refresh();
        success(`Performed ${action} on ${ids.length} support tickets!`, 'Bulk Action Complete');
      } else {
        error('Bulk action failed', 'Error');
      }
    } catch (e: any) {
      error(e.message || 'Error running bulk action', 'Error');
    }
  }, [selected, refresh, success, error]);

  return (
    <div>
      <PageHeader title="Support Tickets & Escalations" description="Includes tickets escalated directly from the AI chat widget on the public site." />
      <StatCardRow />

      {loading ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Loading tickets…</p>
      ) : tickets.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No support tickets yet.</p>
      ) : (
        <>
          {/* Bulk controls header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <input
              type="checkbox"
              checked={selected.size === tickets.length && tickets.length > 0}
              onChange={toggleSelectAll}
              style={{ width: '15px', height: '15px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              {selected.size > 0 ? `${selected.size} selected` : `${tickets.length} tickets`}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tickets.map((ticket: any) => (
              <div
                key={ticket.id}
                className="admin-card"
                style={{
                  padding: '1.25rem',
                  border: selected.has(ticket.id) ? '1px solid var(--color-primary)' : undefined,
                  background: selected.has(ticket.id) ? 'rgba(37,99,235,0.04)' : undefined,
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <input
                      type="checkbox"
                      checked={selected.has(ticket.id)}
                      onChange={() => toggleSelect(ticket.id)}
                      style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                    {ticket.aiEscalated && (
                      <span style={{ fontFamily: 'monospace', background: 'rgba(219, 39, 119, 0.12)', color: '#db2777', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>AI ESCALATED</span>
                    )}
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>{ticket.subject}</h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
                      {ticket.priority}
                    </span>
                    <span
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        background: ticket.status === 'OPEN' ? 'rgba(239, 68, 68, 0.12)' : ticket.status === 'RESOLVED' ? 'rgba(5, 150, 105, 0.12)' : 'rgba(217, 119, 6, 0.12)',
                        color: ticket.status === 'OPEN' ? '#ef4444' : ticket.status === 'RESOLVED' ? '#059669' : '#d97706',
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.85rem', background: 'var(--color-surface)', padding: '0.75rem 0.85rem', borderRadius: 'var(--radius-md)', whiteSpace: 'pre-wrap' }}>
                  <strong style={{ color: 'var(--color-text-main)' }}>From:</strong> {ticket.name} ({ticket.email})<br />
                  {ticket.message}
                </p>

                {ticket.reply ? (
                  <div style={{ background: 'rgba(5, 150, 105, 0.1)', border: '1px solid #059669', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', color: '#059669', fontSize: '0.82rem' }}>
                    <strong>Reply sent:</strong> {ticket.reply}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <input
                      type="text"
                      placeholder="Type email reply to customer..."
                      value={replyDrafts[ticket.id] || ''}
                      onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [ticket.id]: e.target.value }))}
                      style={{ flex: 1, padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem' }}
                    />
                    <button onClick={() => handleReply(ticket.id)} style={{ padding: '0.45rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-primary)', color: '#fff', border: 'none', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <BulkActionBar
        selectedCount={selected.size}
        selectedIds={Array.from(selected)}
        entityType="tickets"
        onAction={handleBulkAction}
        onClear={() => setSelected(new Set())}
      />
    </div>
  );
}
