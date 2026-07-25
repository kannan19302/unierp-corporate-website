'use client';

import { useEffect, useState } from 'react';
import { Clock, X, RotateCcw, User, ShieldCheck } from 'lucide-react';
import { useToast } from './ToastContext';

interface HistoryItem {
  id: string;
  timestamp: string;
  userEmail: string;
  fieldId: string;
  oldValue: any;
  newValue: any;
}

interface FieldHistoryModalProps {
  fieldId: string;
  fieldLabel: string;
  onClose: () => void;
  onRestore?: (value: any) => void;
}

export function FieldHistoryModal({ fieldId, fieldLabel, onClose, onRestore }: FieldHistoryModalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`/api/admin/field-history?fieldId=${encodeURIComponent(fieldId)}`);
        if (res.ok) {
          const json = await res.json();
          setHistory(json.history || []);
        }
      } catch (e: any) {
        error('Failed to load field history', 'Error');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [fieldId, error]);

  const handleRestore = (val: any) => {
    if (onRestore) {
      onRestore(val);
      success(`Restored field "${fieldLabel}" to previous value`, 'Restored');
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="admin-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} style={{ color: 'var(--color-primary)' }} />
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
                Version History: {fieldLabel}
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                ID: {fieldId}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={iconBtnStyle}>
            <X size={16} />
          </button>
        </div>

        {/* Content list */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {loading ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Loading field audit logs…</p>
          ) : history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              No previous field-level revisions logged yet. Changes will appear here as updates are saved.
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-card-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 0.85rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                    <User size={13} style={{ color: 'var(--color-primary)' }} />
                    <span>{item.userEmail}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: '0.35rem 0' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', color: '#ef4444' }}>
                    <strong style={{ minWidth: '40px' }}>Old:</strong>
                    <span style={{ fontFamily: 'monospace', background: 'rgba(239, 68, 68, 0.08)', padding: '0.1rem 0.35rem', borderRadius: '4px', wordBreak: 'break-all' }}>
                      {typeof item.oldValue === 'object' ? JSON.stringify(item.oldValue) : String(item.oldValue)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', color: '#059669' }}>
                    <strong style={{ minWidth: '40px' }}>New:</strong>
                    <span style={{ fontFamily: 'monospace', background: 'rgba(5, 150, 105, 0.08)', padding: '0.1rem 0.35rem', borderRadius: '4px', wordBreak: 'break-all' }}>
                      {typeof item.newValue === 'object' ? JSON.stringify(item.newValue) : String(item.newValue)}
                    </span>
                  </div>
                </div>

                {onRestore && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem' }}>
                    <button
                      onClick={() => handleRestore(item.newValue)}
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', gap: '0.25rem' }}
                    >
                      <RotateCcw size={11} /> Restore this version
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--color-text-muted)',
  padding: '0.25rem',
  display: 'flex',
};
