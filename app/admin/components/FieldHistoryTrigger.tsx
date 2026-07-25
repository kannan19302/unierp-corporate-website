'use client';

import React, { useState } from 'react';
import { History } from 'lucide-react';
import { FieldHistoryModal } from './FieldHistoryModal';

interface FieldHistoryTriggerProps {
  fieldId: string;
  fieldLabel: string;
  onRestore?: (value: any) => void;
  style?: React.CSSProperties;
}

export function FieldHistoryTrigger({ fieldId, fieldLabel, onRestore, style }: FieldHistoryTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={`View version history for ${fieldLabel}`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-text-muted)',
          opacity: 0.65,
          padding: '0 0.25rem',
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'all 0.15s ease',
          ...style,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.color = 'var(--color-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.65';
          e.currentTarget.style.color = 'var(--color-text-muted)';
        }}
      >
        <History size={13} />
      </button>

      {open && (
        <FieldHistoryModal
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          onClose={() => setOpen(false)}
          onRestore={onRestore}
        />
      )}
    </>
  );
}
