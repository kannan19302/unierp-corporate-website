'use client';

import { Trash2, Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const LEAD_STAGES = [
  { value: 'NEW', label: 'New' },
  { value: 'QUALIFIED', label: 'Qualified' },
  { value: 'PROPOSAL_SENT', label: 'Proposal Sent' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
];

interface BulkActionBarProps {
  selectedCount: number;
  selectedIds: string[];
  entityType: 'leads' | 'tickets';
  onAction: (action: string, value?: string) => Promise<void>;
  onClear: () => void;
}

export function BulkActionBar({ selectedCount, selectedIds, entityType, onAction, onClear }: BulkActionBarProps) {
  const [stageOpen, setStageOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  if (selectedCount === 0) return null;

  const run = async (action: string, value?: string) => {
    setBusy(true);
    try {
      await onAction(action, value);
    } finally {
      setBusy(false);
      setStageOpen(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        background: 'var(--color-card)',
        border: '1px solid var(--color-primary)',
        borderRadius: '14px',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 12px 40px -8px rgba(37,99,235,0.35)',
        backdropFilter: 'blur(16px)',
        animation: 'slideUp 0.2s cubic-bezier(0.16,1,0.3,1)',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
        {selectedCount} selected
      </span>

      <div style={{ width: '1px', height: '24px', background: 'var(--color-card-border)' }} />

      {entityType === 'leads' && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setStageOpen((o) => !o)}
            disabled={busy}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 0.9rem', borderRadius: '8px',
              background: 'var(--color-primary)', color: '#fff',
              border: 'none', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
            }}
          >
            Change Stage <ChevronDown size={14} />
          </button>
          {stageOpen && (
            <div style={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
              background: 'var(--color-card)', border: '1px solid var(--color-card-border)',
              borderRadius: '10px', overflow: 'hidden', minWidth: '160px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}>
              {LEAD_STAGES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => run('stage-change', s.value)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '0.6rem 1rem', fontSize: '0.85rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-text-main)', fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-surface)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {entityType === 'tickets' && (
        <>
          {['OPEN', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
            <button
              key={status}
              onClick={() => run('status-change', status)}
              disabled={busy}
              style={{
                padding: '0.5rem 0.85rem', borderRadius: '8px',
                background: 'var(--color-surface)', color: 'var(--color-text-main)',
                border: '1px solid var(--color-card-border)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              → {status.replace('_', ' ')}
            </button>
          ))}
        </>
      )}

      {entityType === 'leads' && (
        <button
          onClick={() => run('export')}
          disabled={busy}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.5rem 0.85rem', borderRadius: '8px',
            background: 'rgba(5,150,105,0.12)', color: '#059669',
            border: '1px solid #059669', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          <Download size={14} /> Export CSV
        </button>
      )}

      <button
        onClick={() => run('delete')}
        disabled={busy}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          padding: '0.5rem 0.85rem', borderRadius: '8px',
          background: 'rgba(239,68,68,0.1)', color: '#ef4444',
          border: '1px solid rgba(239,68,68,0.3)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
        }}
      >
        <Trash2 size={14} /> Delete
      </button>

      <button
        onClick={onClear}
        style={{
          padding: '0.4rem 0.65rem', borderRadius: '8px',
          background: 'none', color: 'var(--color-text-muted)',
          border: 'none', fontSize: '0.8rem', cursor: 'pointer',
        }}
      >
        Cancel
      </button>

      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
