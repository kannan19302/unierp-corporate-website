'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { SectionRenderer } from '@/components/site/sections/SectionRenderer';
import type { Section } from '@/lib/cms/section-schema';

interface SectionPreviewProps {
  sections: Section[];
}

/**
 * Inline section preview panel that renders sections using the same SectionRenderer
 * as the public site. Wraps in a scaled container so it fits within the admin panel.
 */
export function SectionPreview({ sections }: SectionPreviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn-secondary"
        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginBottom: '0.75rem' }}
      >
        {open ? <EyeOff size={15} /> : <Eye size={15} />}
        {open ? 'Hide Preview' : 'Show Live Preview'}
      </button>

      {open && (
        <div
          style={{
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'var(--color-bg)',
            position: 'relative',
          }}
        >
          <div
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.3rem 0.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Live Preview — Public Site Rendering
          </div>
          <div
            style={{
              transform: 'scale(0.75)',
              transformOrigin: 'top left',
              width: '133.33%',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {sections.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                No sections yet — add sections below to preview them here.
              </div>
            ) : (
              <SectionRenderer sections={sections} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
