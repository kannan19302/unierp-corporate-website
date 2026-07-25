'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, PlusCircle, X } from 'lucide-react';
import { useContentData } from '../ContentDataContext';
import { SECTION_TYPES, defaultSection, type Section } from '@/lib/cms/section-schema';
import { SectionPreview } from './SectionPreview';
import { ICON_NAMES } from '../fields';
import { useToast } from '@/app/admin/components/ToastContext';
import { AutoResizeTextArea } from '@/app/admin/components/AutoResizeTextArea';

const ROUTES = ['/', '/product', '/pricing', '/industries', '/customers', '/resources', '/contact'];

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
  marginBottom: '0.25rem',
  color: 'var(--color-text-main)',
};

const DEFAULTS = {
  title: '',
  badgeIconName: '',
  badgeText: '',
  heroHeadline: '',
  heroHeadlineAccent: '',
  heroSubheadline: '',
  heroPrimaryCtaLabel: '',
  heroPrimaryCtaHref: '',
  heroSecondaryCtaLabel: '',
  heroSecondaryCtaHref: '',
  heroBullets: [] as string[],
  sections: [] as Section[],
};

export function PagesEditor() {
  const { pages, refresh } = useContentData();
  const { success, error } = useToast();
  const [path, setPath] = useState('/');
  const [form, setForm] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const existing = pages.find((p: any) => p.path === path);
    setForm(existing ? { ...DEFAULTS, ...existing } : DEFAULTS);
  }, [path, pages]);

  const update = (name: keyof typeof DEFAULTS, value: any) => setForm((prev) => ({ ...prev, [name]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, ...form }),
      });
      if (res.ok) {
        await refresh();
        success(`Page content for "${path}" saved successfully!`, 'Page Saved');
      } else {
        const json = await res.json();
        error(json.error || 'Failed to save page', 'Error');
      }
    } catch (e: any) {
      error(e.message || 'Error saving page', 'Error');
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type: Section['type']) => {
    const id = `section_${Date.now()}`;
    update('sections', [...form.sections, defaultSection(type, id)]);
    success(`Added section: ${type}`, 'Section Added');
  };

  const updateSection = (index: number, patch: Partial<Section>) => {
    const next = [...form.sections];
    next[index] = { ...next[index], ...patch } as Section;
    update('sections', next);
  };

  const removeSection = (index: number) => {
    update('sections', form.sections.filter((_, i) => i !== index));
    success('Section removed', 'Removed');
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= form.sections.length) return;
    const next = [...form.sections];
    [next[index], next[target]] = [next[target], next[index]];
    update('sections', next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ background: 'var(--color-card)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label style={{ ...labelStyle, marginBottom: 0 }}>Select Page:</label>
        <select value={path} onChange={(e) => setPath(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: '200px' }}>
          {ROUTES.map((r) => <option key={r} value={r}>{r === '/' ? '/ (Home)' : r}</option>)}
        </select>
      </div>

      {/* Live Preview */}
      <SectionPreview sections={form.sections} />

      {/* Hero Form Card */}
      <div className="admin-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>Hero Section Options</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem 0.85rem' }}>
          <div>
            <label style={labelStyle}>Badge text</label>
            <input style={inputStyle} placeholder="Badge text" value={form.badgeText || ''} onChange={(e) => update('badgeText', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Headline</label>
            <input style={inputStyle} placeholder="Headline" value={form.heroHeadline || ''} onChange={(e) => update('heroHeadline', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Headline accent (gradient part)</label>
            <input style={inputStyle} placeholder="Accent text" value={form.heroHeadlineAccent || ''} onChange={(e) => update('heroHeadlineAccent', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Primary CTA label</label>
            <input style={inputStyle} placeholder="CTA label" value={form.heroPrimaryCtaLabel || ''} onChange={(e) => update('heroPrimaryCtaLabel', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Primary CTA href</label>
            <input style={inputStyle} placeholder="CTA href" value={form.heroPrimaryCtaHref || ''} onChange={(e) => update('heroPrimaryCtaHref', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Secondary CTA label</label>
            <input style={inputStyle} placeholder="Secondary label" value={form.heroSecondaryCtaLabel || ''} onChange={(e) => update('heroSecondaryCtaLabel', e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: '0.65rem' }}>
          <label style={labelStyle}>Subheadline</label>
          <AutoResizeTextArea minRows={2} style={inputStyle} placeholder="Subheadline text" value={form.heroSubheadline || ''} onChange={(e) => update('heroSubheadline', e.target.value)} />
        </div>
        <div style={{ marginTop: '0.65rem' }}>
          <label style={labelStyle}>Trust Bullets (one per line)</label>
          <AutoResizeTextArea minRows={2} style={inputStyle} placeholder="Bullets (one per line)" value={form.heroBullets.join('\n')} onChange={(e) => update('heroBullets', e.target.value.split('\n').filter(Boolean))} />
        </div>
      </div>

      {/* Sections Card */}
      <div className="admin-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>Page Sections</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          {form.sections.map((section, idx) => (
            <div key={section.id} style={{ background: 'var(--color-surface)', padding: '0.85rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <strong style={{ color: 'var(--color-primary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{section.type}</strong>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button onClick={() => moveSection(idx, -1)} style={iconBtn} title="Move up"><ArrowUp size={13} /></button>
                  <button onClick={() => moveSection(idx, 1)} style={iconBtn} title="Move down"><ArrowDown size={13} /></button>
                  <button onClick={() => removeSection(idx)} style={{ ...iconBtn, color: '#ef4444' }} title="Delete section"><Trash2 size={13} /></button>
                </div>
              </div>

              {/* Shared fields */}
              {('heading' in section) && (
                <input style={{ ...inputStyle, marginBottom: '0.4rem' }} placeholder="Heading" value={(section as any).heading || ''} onChange={(e) => updateSection(idx, { heading: e.target.value } as any)} />
              )}
              {('subheading' in section) && (
                <input style={{ ...inputStyle, marginBottom: '0.4rem' }} placeholder="Subheading" value={(section as any).subheading || ''} onChange={(e) => updateSection(idx, { subheading: e.target.value } as any)} />
              )}
              {('body' in section) && (
                <textarea rows={2} style={{ ...inputStyle, resize: 'vertical', marginBottom: '0.4rem' }} placeholder="Body" value={(section as any).body || ''} onChange={(e) => updateSection(idx, { body: e.target.value } as any)} />
              )}

              {/* CTA section */}
              {section.type === 'cta' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <input style={inputStyle} placeholder="CTA label" value={section.ctaLabel} onChange={(e) => updateSection(idx, { ctaLabel: e.target.value })} />
                  <input style={inputStyle} placeholder="CTA href" value={section.ctaHref} onChange={(e) => updateSection(idx, { ctaHref: e.target.value })} />
                </div>
              )}

              {/* Feature grid */}
              {section.type === 'feature-grid' && (
                <select style={inputStyle} value={section.source} onChange={(e) => updateSection(idx, { source: e.target.value as 'highlighted' | 'all' })}>
                  <option value="highlighted">Highlighted features only</option>
                  <option value="all">All features</option>
                </select>
              )}

              {/* Feature cards — inline item editor */}
              {section.type === 'feature-cards' && (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {section.items.map((item, iIdx) => (
                      <div key={iIdx} style={{ background: 'var(--color-card)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--color-card-border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.35rem', marginBottom: '0.35rem', alignItems: 'center' }}>
                          <input style={inputStyle} placeholder="Title" value={item.title} onChange={(e) => {
                            const updated = [...section.items]; updated[iIdx] = { ...item, title: e.target.value };
                            updateSection(idx, { items: updated });
                          }} />
                          <select style={inputStyle} value={item.iconName} onChange={(e) => {
                            const updated = [...section.items]; updated[iIdx] = { ...item, iconName: e.target.value };
                            updateSection(idx, { items: updated });
                          }}>
                            <option value="">Select icon…</option>
                            {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
                          </select>
                          <button onClick={() => {
                            updateSection(idx, { items: section.items.filter((_, i2) => i2 !== iIdx) });
                          }} style={{ ...iconBtn, color: '#ef4444', padding: '0.3rem' }}><X size={13} /></button>
                        </div>
                        <textarea rows={2} style={{ ...inputStyle, resize: 'vertical', fontSize: '0.78rem' }} placeholder="Body text" value={item.body} onChange={(e) => {
                          const updated = [...section.items]; updated[iIdx] = { ...item, body: e.target.value };
                          updateSection(idx, { items: updated });
                        }} />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => updateSection(idx, { items: [...section.items, { iconName: 'Boxes', title: 'New Card', body: '' }] })}
                    className="btn-secondary"
                    style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                  >
                    <PlusCircle size={12} /> Add Card
                  </button>
                </div>
              )}

              {/* Process steps inline editor */}
              {section.type === 'process-steps' && (
                <div>
                  {section.steps.map((step, sIdx) => (
                    <div key={sIdx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr auto', gap: '0.35rem', marginBottom: '0.35rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', width: '20px', textAlign: 'center' }}>{step.number}</span>
                      <input style={inputStyle} placeholder="Title" value={step.title} onChange={(e) => {
                        const updated = [...section.steps]; updated[sIdx] = { ...step, title: e.target.value };
                        updateSection(idx, { steps: updated });
                      }} />
                      <input style={inputStyle} placeholder="Body" value={step.body} onChange={(e) => {
                        const updated = [...section.steps]; updated[sIdx] = { ...step, body: e.target.value };
                        updateSection(idx, { steps: updated });
                      }} />
                      <button onClick={() => updateSection(idx, { steps: section.steps.filter((_, i2) => i2 !== sIdx) })} style={{ ...iconBtn, color: '#ef4444', padding: '0.25rem' }}><X size={12} /></button>
                    </div>
                  ))}
                  <button
                    onClick={() => updateSection(idx, { steps: [...section.steps, { number: section.steps.length + 1, title: 'New Step', body: '' }] })}
                    className="btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', marginTop: '0.35rem' }}
                  >
                    <PlusCircle size={12} /> Add Step
                  </button>
                </div>
              )}

              {/* Video embed */}
              {section.type === 'video-embed' && (
                <input style={inputStyle} placeholder="YouTube/Loom embed URL" value={section.videoUrl} onChange={(e) => updateSection(idx, { videoUrl: e.target.value })} />
              )}

              {/* Hero split */}
              {section.type === 'hero-split' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <input style={inputStyle} placeholder="CTA label" value={section.ctaLabel || ''} onChange={(e) => updateSection(idx, { ctaLabel: e.target.value })} />
                  <input style={inputStyle} placeholder="CTA href" value={section.ctaHref || ''} onChange={(e) => updateSection(idx, { ctaHref: e.target.value })} />
                  <input style={inputStyle} placeholder="Image URL" value={section.imageUrl || ''} onChange={(e) => updateSection(idx, { imageUrl: e.target.value })} />
                  <select style={inputStyle} value={section.imagePosition} onChange={(e) => updateSection(idx, { imagePosition: e.target.value as 'left' | 'right' })}>
                    <option value="right">Image Right</option>
                    <option value="left">Image Left</option>
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {SECTION_TYPES.map((t) => (
            <button key={t} onClick={() => addSection(t)} className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
              <Plus size={12} /> {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: '0.25rem' }}>
        <button onClick={save} disabled={saving} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
          {saving ? 'Saving…' : 'Save Page'}
        </button>
      </div>
    </div>
  );
}

const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.2rem', display: 'flex' };
