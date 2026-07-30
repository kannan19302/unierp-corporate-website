'use client';

import { useRef, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { useToast } from '@/app/admin/components/ToastContext';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.45rem 0.75rem',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-card-border)',
  color: 'var(--color-text-main)',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: '0.82rem',
};

/**
 * Minimal media picker: lets the admin either paste a URL directly (existing
 * behavior everywhere else in the CMS) or upload a local image/video file via
 * POST /api/admin/upload, which fills the URL field with the returned path.
 */
export function FilePicker({
  value,
  onChange,
  placeholder = 'Image URL, or upload a file',
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { success, error: toastError } = useToast();

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) {
        toastError(json.error || 'Upload failed', 'Error');
        return;
      }
      onChange(json.url);
      success('File uploaded successfully!', 'Uploaded');
    } catch (e: any) {
      toastError(e.message || 'Error uploading file', 'Error');
    } finally {
      setUploading(false);
      if (inputFileRef.current) inputFileRef.current.value = '';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => inputFileRef.current?.click()}
          disabled={uploading}
          className="btn-secondary"
          title="Upload a file"
          style={{ padding: '0.45rem 0.6rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
        >
          <UploadCloud size={14} /> {uploading ? 'Uploading…' : 'Upload'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="btn-secondary"
            title="Clear"
            style={{ padding: '0.45rem 0.5rem' }}
          >
            <X size={14} />
          </button>
        )}
      </div>
      <input
        ref={inputFileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,video/mp4,video/webm"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {value && /\.(png|jpe?g|webp|gif|svg)$/i.test(value) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          style={{ marginTop: '0.4rem', maxHeight: '90px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)' }}
        />
      )}
    </div>
  );
}
