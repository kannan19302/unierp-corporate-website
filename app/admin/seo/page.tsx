'use client';

import { useEffect, useState } from 'react';
import { useAdminData } from '../AdminDataContext';
import { PageHeader } from '../components/PageHeader';
import { useToast } from '../components/ToastContext';

const ROUTES = ['/', '/product', '/pricing', '/industries', '/customers', '/resources', '/contact'];

export default function AdminSeoPage() {
  const { seo, refresh } = useAdminData();
  const { success, error } = useToast();
  const [path, setPath] = useState('/');
  const [form, setForm] = useState({ metaTitle: '', metaDescription: '', canonicalUrl: '', ogImage: '' });

  useEffect(() => {
    const existing = seo.find((s: any) => s.path === path);
    setForm({
      metaTitle: existing?.metaTitle || '',
      metaDescription: existing?.metaDescription || '',
      canonicalUrl: existing?.canonicalUrl || '',
      ogImage: existing?.ogImage || '',
    });
  }, [path, seo]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, ...form }),
      });
      if (res.ok) {
        refresh();
        success(`SEO settings for "${path}" saved successfully!`, 'SEO Saved');
      } else {
        const json = await res.json();
        error(json.error || 'Failed to save SEO settings', 'Save Error');
      }
    } catch (err: any) {
      error(err.message || 'Error saving SEO settings', 'Error');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <PageHeader title="SEO & Site Settings" description="Edits here take effect immediately on the live page's <title> and meta description." />

      <div className="admin-card" style={{ padding: '1.25rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={lblStyle}>Select Page</label>
          <select value={path} onChange={(e) => setPath(e.target.value)} style={inputStyle}>
            {ROUTES.map((r) => (
              <option key={r} value={r}>{r === '/' ? '/ (Home)' : r}</option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label style={lblStyle}>Meta Title</label>
            <input type="text" value={form.metaTitle} onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))} style={inputStyle} required />
          </div>
          <div>
            <label style={lblStyle}>Meta Description</label>
            <textarea rows={3} value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label style={lblStyle}>Canonical URL</label>
            <input type="text" value={form.canonicalUrl} onChange={(e) => setForm((f) => ({ ...f, canonicalUrl: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={lblStyle}>OG Image URL</label>
            <input type="text" value={form.ogImage} onChange={(e) => setForm((f) => ({ ...f, ogImage: e.target.value }))} style={inputStyle} />
          </div>
          <div style={{ paddingTop: '0.25rem' }}>
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.82rem' }}>
              Save SEO Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const lblStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.25rem' };
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
