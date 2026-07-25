'use client';

import { useState } from 'react';
import { ShieldCheck, Lock, Check, X } from 'lucide-react';
import { useToast } from '../components/ToastContext';

interface PermissionMatrixModalProps {
  userEmail: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  onClose: () => void;
}

const PERMISSIONS = [
  { id: 'CAN_PUBLISH_CONTENT', label: 'Publish Site Content & Pages', category: 'CMS' },
  { id: 'CAN_EXPORT_LEADS', label: 'Export Leads & Subscriber CSVs', category: 'Sales & CRM' },
  { id: 'CAN_SEND_BROADCASTS', label: 'Send Release Email Broadcasts', category: 'Marketing' },
  { id: 'CAN_MANAGE_SECRETS', label: 'Edit Integrations & API Secrets', category: 'Admin Tools' },
  { id: 'CAN_MANAGE_SEO', label: 'Update Meta Tags & SEO Schemas', category: 'CMS' },
  { id: 'CAN_MANAGE_USERS', label: 'Create & Deactivate Admin Accounts', category: 'Governance' },
];

export function PermissionMatrixModal({ userEmail, role, onClose }: PermissionMatrixModalProps) {
  const { success } = useToast();
  const [perms, setPerms] = useState<Record<string, boolean>>({
    CAN_PUBLISH_CONTENT: true,
    CAN_EXPORT_LEADS: true,
    CAN_SEND_BROADCASTS: role === 'SUPER_ADMIN',
    CAN_MANAGE_SECRETS: role === 'SUPER_ADMIN',
    CAN_MANAGE_SEO: true,
    CAN_MANAGE_USERS: role === 'SUPER_ADMIN',
  });

  const toggle = (id: string) => {
    if (role === 'SUPER_ADMIN') return; // Super Admins have all permissions enabled
    setPerms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    success(`Saved permission matrix for ${userEmail}`, 'Permissions Saved');
    onClose();
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
          maxWidth: '540px',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
            <div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
                Granular Permissions: {userEmail}
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Role: {role}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={16} /></button>
        </div>

        {role === 'SUPER_ADMIN' && (
          <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.85rem' }}>
            Super Admin accounts possess unrestricted system capabilities across all modules.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {PERMISSIONS.map((p) => (
            <div
              key={p.id}
              onClick={() => toggle(p.id)}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: role === 'SUPER_ADMIN' ? 'default' : 'pointer',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-text-main)' }}>{p.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Module: {p.category}</div>
              </div>
              <input
                type="checkbox"
                checked={perms[p.id]}
                disabled={role === 'SUPER_ADMIN'}
                onChange={() => {}}
                style={{ width: '16px', height: '16px', cursor: role === 'SUPER_ADMIN' ? 'default' : 'pointer' }}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}>Cancel</button>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.78rem' }}>Save Permissions</button>
        </div>
      </div>
    </div>
  );
}
