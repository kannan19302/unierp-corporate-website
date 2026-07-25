'use client';

import { Lock } from 'lucide-react';
import { canEdit } from '@/lib/rbac';
import { useAdminData } from '@/app/admin/AdminDataContext';
import type { ReactNode } from 'react';

interface RbacFieldProps {
  /** The field identifier used to look up permissions (e.g. "chatSystemPrompt", "erpAppUrl") */
  fieldId: string;
  /** Label shown above the field */
  label: string;
  /** The actual form control to render when editable */
  children: ReactNode;
  /** Optional: what to show when read-only. Defaults to a masked value display. */
  readOnlyValue?: string;
}

/**
 * Wraps a form field with RBAC gating.
 * - SUPER_ADMIN: sees and can edit the field normally
 * - ADMIN (if fieldId is restricted): sees a lock icon + read-only display
 */
export function RbacField({ fieldId, label, children, readOnlyValue }: RbacFieldProps) {
  const { role } = useAdminData();
  const editable = canEdit(role, fieldId);

  const labelStyle: React.CSSProperties = {
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--color-text-main)',
    marginBottom: '0.35rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  };

  if (editable) {
    return (
      <div>
        <label style={labelStyle as React.CSSProperties}>{label}</label>
        {children}
      </div>
    );
  }

  // Read-only display for restricted roles
  return (
    <div>
      <label style={{ ...labelStyle as React.CSSProperties, color: 'var(--color-text-muted)' }}>
        <Lock size={13} />
        {label}
        <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--color-text-subtle)', marginLeft: '0.25rem' }}>
          (Super Admin only)
        </span>
      </label>
      <div
        style={{
          padding: '0.6rem 0.85rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-card-border)',
          color: 'var(--color-text-subtle)',
          fontSize: '0.85rem',
          fontFamily: readOnlyValue ? 'monospace' : 'inherit',
          opacity: 0.7,
          cursor: 'not-allowed',
        }}
      >
        {readOnlyValue ? (
          <span>
            {readOnlyValue.length > 4
              ? readOnlyValue.slice(0, 4) + '•'.repeat(Math.max(8, readOnlyValue.length - 4))
              : '••••••••'}
          </span>
        ) : (
          <span style={{ fontStyle: 'italic' }}>Only visible to Super Admins</span>
        )}
      </div>
    </div>
  );
}
