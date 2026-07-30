'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { useContentData } from '../ContentDataContext';
import { COLLECTION_FIELDS, ICON_NAMES, type FieldDef } from '../fields';
import { DynamicIcon } from '@/components/site/DynamicIcon';
import { useToast } from '@/app/admin/components/ToastContext';
import { FilePicker } from './FilePicker';

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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--color-text-main)',
  marginBottom: '0.25rem',
};

function emptyValueFor(field: FieldDef) {
  if (field.type === 'boolean') return field.name === 'visible';
  if (field.type === 'string-list') return [];
  if (field.type === 'number') return '';
  return '';
}

export function CollectionCrud({ collectionId }: { collectionId: string }) {
  const contentData = useContentData();
  const { success, error: toastError } = useToast();
  const fields = COLLECTION_FIELDS[collectionId] || [];
  const items = (contentData as any)[collectionId] || [];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const selected = items.find((i: any) => i.id === selectedId);

  useEffect(() => {
    if (selected) {
      const next: Record<string, any> = {};
      fields.forEach((f) => (next[f.name] = selected[f.name] ?? emptyValueFor(f)));
      setForm(next);
    } else {
      const next: Record<string, any> = {};
      fields.forEach((f) => (next[f.name] = emptyValueFor(f)));
      setForm(next);
    }
    setError('');
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (name: string, value: any) => setForm((prev) => ({ ...prev, [name]: value }));

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      fields.forEach((f) => {
        if (f.type === 'number' && payload[f.name] === '') payload[f.name] = null;
        if (f.type === 'number' && typeof payload[f.name] === 'string') payload[f.name] = parseInt(payload[f.name], 10);
      });

      const isEdit = !!selectedId;
      const url = isEdit ? `/api/admin/content/${collectionId}/${selectedId}` : `/api/admin/content/${collectionId}`;
      const res = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Save failed');
        toastError(json.error || 'Failed to save item', 'Error');
        return;
      }
      await contentData.refresh();
      if (!selectedId) setSelectedId(json.item.id);
      success(isEdit ? 'Item updated successfully!' : 'Item created successfully!', 'Success');
    } catch (e: any) {
      toastError(e.message || 'Error saving item', 'Error');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/content/${collectionId}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedId === id) setSelectedId(null);
        await contentData.refresh();
        success('Item deleted successfully!', 'Deleted');
      } else {
        toastError('Failed to delete item', 'Error');
      }
    } catch (e: any) {
      toastError(e.message || 'Error deleting item', 'Error');
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const reordered = [...items];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    const res = await fetch(`/api/admin/content/${collectionId}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: reordered.map((i) => i.id) }),
    });
    if (res.ok) {
      await contentData.refresh();
      success('Items reordered!', 'Reordered');
    }
  };

  const toggleVisible = async (item: any) => {
    const nextVis = !item.visible;
    const res = await fetch(`/api/admin/content/${collectionId}/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: nextVis }),
    });
    if (res.ok) {
      await contentData.refresh();
      success(nextVis ? 'Item set to visible' : 'Item hidden', 'Visibility Updated');
    }
  };

  const filteredItems = items.filter((item: any) => {
    const labelText = String(item.name || item.label || item.title || item.company || item.question || item.authorName || item.slug || '').toLowerCase();
    return labelText.includes(search.toLowerCase());
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 290px) 1fr', gap: '1rem' }}>
      {/* Left List Card */}
      <div className="admin-card" style={{ padding: '0.85rem' }}>
        <button
          onClick={() => setSelectedId(null)}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', marginBottom: '0.65rem', padding: '0.45rem', fontSize: '0.82rem' }}
        >
          <Plus size={15} /> New item
        </button>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '0.65rem' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-subtle)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items…"
            style={{ ...inputStyle, paddingLeft: '2rem', fontSize: '0.78rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
          {filteredItems.map((item: any, idx: number) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.5rem',
                borderRadius: 'var(--radius-md)',
                background: selectedId === item.id ? 'var(--color-primary-glow)' : 'transparent',
                border: selectedId === item.id ? '1px solid var(--color-primary)' : '1px solid transparent',
              }}
            >
              <button onClick={() => setSelectedId(item.id)} style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)', fontSize: '0.82rem', opacity: item.visible ? 1 : 0.55, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.name || item.label || item.title || item.company || item.question || item.authorName || item.slug || 'Untitled'}
              </button>
              <button onClick={() => move(idx, -1)} style={iconBtn} title="Move up"><ArrowUp size={12} /></button>
              <button onClick={() => move(idx, 1)} style={iconBtn} title="Move down"><ArrowDown size={12} /></button>
              <button onClick={() => toggleVisible(item)} style={iconBtn} title={item.visible ? 'Hide' : 'Show'}>
                {item.visible ? <Eye size={12} /> : <EyeOff size={12} />}
              </button>
              <button onClick={() => remove(item.id)} style={{ ...iconBtn, color: '#ef4444' }} title="Delete"><Trash2 size={12} /></button>
            </div>
          ))}
          {filteredItems.length === 0 && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', padding: '0.5rem' }}>No items found.</p>}
        </div>
      </div>

      {/* Right Form Card */}
      <div className="admin-card" style={{ padding: '1.25rem' }}>
        {error && <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '0.75rem' }}>{error}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {fields.map((field) => (
            <div key={field.name}>
              <label style={labelStyle}>
                {field.label}{field.required && ' *'}
              </label>

              {field.type === 'textarea' && (
                <textarea rows={3} value={form[field.name] ?? ''} onChange={(e) => update(field.name, e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
              )}
              {field.type === 'text' && (
                <input type="text" placeholder={field.placeholder} value={form[field.name] ?? ''} onChange={(e) => update(field.name, e.target.value)} style={inputStyle} />
              )}
              {field.type === 'image' && (
                <FilePicker value={form[field.name] ?? ''} onChange={(url) => update(field.name, url)} placeholder={field.placeholder || 'Image URL, or upload a file'} />
              )}
              {field.type === 'number' && (
                <input type="number" value={form[field.name] ?? ''} onChange={(e) => update(field.name, e.target.value)} style={inputStyle} />
              )}
              {field.type === 'boolean' && (
                <input type="checkbox" checked={!!form[field.name]} onChange={(e) => update(field.name, e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              )}
              {field.type === 'select' && (
                <select value={form[field.name] ?? ''} onChange={(e) => update(field.name, e.target.value)} style={inputStyle}>
                  {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              )}
              {field.type === 'icon' && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <select value={form[field.name] ?? ''} onChange={(e) => update(field.name, e.target.value)} style={inputStyle}>
                    <option value="">Select an icon…</option>
                    {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  {form[field.name] && <DynamicIcon name={form[field.name]} size={20} />}
                </div>
              )}
              {field.type === 'string-list' && (
                <textarea
                  rows={3}
                  placeholder="One item per line"
                  value={(form[field.name] || []).join('\n')}
                  onChange={(e) => update(field.name, e.target.value.split('\n').filter(Boolean))}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              )}
            </div>
          ))}

          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--color-card-border)' }}>
            <button onClick={save} disabled={saving} className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}>
              {saving ? 'Saving…' : selectedId ? 'Save Changes' : 'Create Item'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.2rem', display: 'flex' };
