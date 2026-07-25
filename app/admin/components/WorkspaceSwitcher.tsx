'use client';

import { useState } from 'react';
import { Building2, ChevronDown, Check } from 'lucide-react';
import { useToast } from './ToastContext';

interface Workspace {
  id: string;
  name: string;
  domain: string;
  region: string;
}

const WORKSPACES: Workspace[] = [
  { id: 'unierp-global', name: 'UniERP Global (HQ)', domain: 'unierp.com', region: 'US East' },
  { id: 'unierp-india', name: 'UniERP India (GST & E-Way)', domain: 'in.unierp.com', region: 'Asia South' },
  { id: 'unierp-eu', name: 'UniERP Europe (GDPR)', domain: 'eu.unierp.com', region: 'EU Central' },
];

export function WorkspaceSwitcher() {
  const [active, setActive] = useState<Workspace>(WORKSPACES[0]);
  const [open, setOpen] = useState(false);
  const { success } = useToast();

  const selectWorkspace = (ws: Workspace) => {
    setActive(ws);
    setOpen(false);
    success(`Switched active workspace to ${ws.name}`, 'Workspace Switched');
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.65rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-card-border)',
          color: 'var(--color-text-main)',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        <Building2 size={14} style={{ color: 'var(--color-primary)' }} />
        <span>{active.name}</span>
        <ChevronDown size={13} style={{ color: 'var(--color-text-muted)' }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.35rem',
            width: '240px',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 9999,
            padding: '0.35rem',
          }}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', padding: '0.35rem 0.5rem', textTransform: 'uppercase' }}>
            Switch Workspace
          </div>
          {WORKSPACES.map((ws) => {
            const isSelected = active.id === ws.id;
            return (
              <div
                key={ws.id}
                onClick={() => selectWorkspace(ws)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(37,99,235,0.08)' : 'transparent',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)' }}>{ws.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{ws.domain} • {ws.region}</div>
                </div>
                {isSelected && <Check size={14} style={{ color: 'var(--color-primary)' }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
