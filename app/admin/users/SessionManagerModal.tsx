'use client';

import { useState } from 'react';
import { ShieldAlert, Laptop, Trash2, X, RefreshCw } from 'lucide-react';
import { useToast } from '../components/ToastContext';

interface SessionManagerModalProps {
  userEmail: string;
  onClose: () => void;
}

export function SessionManagerModal({ userEmail, onClose }: SessionManagerModalProps) {
  const { success } = useToast();
  const [sessions, setSessions] = useState([
    { id: 'sess_1', device: 'Chrome on Windows 11', ip: '127.0.0.1 (Current)', lastActive: 'Just now', current: true },
    { id: 'sess_2', device: 'Safari on macOS Sonoma', ip: '192.168.1.45', lastActive: '2 hours ago', current: false },
    { id: 'sess_3', device: 'Mobile Chrome on Android 14', ip: '10.0.0.88', lastActive: 'Yesterday', current: false },
  ]);

  const revokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    success(`Revoked login session for ${userEmail}`, 'Session Revoked');
  };

  const revokeAllOther = () => {
    setSessions((prev) => prev.filter((s) => s.current));
    success(`Revoked all other remote sessions for ${userEmail}`, 'Revoked All');
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
          maxWidth: '520px',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Laptop size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
              Active Sessions: {userEmail}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
          {sessions.map((s) => (
            <div key={s.id} style={{ background: 'var(--color-surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
                  {s.device} {s.current && <span style={{ color: '#059669', fontSize: '0.72rem', marginLeft: '0.35rem', fontWeight: 800 }}>(This device)</span>}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                  IP: {s.ip} • Last active: {s.lastActive}
                </div>
              </div>

              {!s.current && (
                <button onClick={() => revokeSession(s.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Trash2 size={12} /> Revoke
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={revokeAllOther} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', color: '#ef4444' }}>
            Revoke All Other Sessions
          </button>
          <button onClick={onClose} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.78rem' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
