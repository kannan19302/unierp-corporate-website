'use client';

import { useEffect, useState } from 'react';
import { useContentData } from '../ContentDataContext';
import { RbacField } from '@/app/admin/components/RbacField';
import { useToast } from '@/app/admin/components/ToastContext';
import { AutoResizeTextArea } from '@/app/admin/components/AutoResizeTextArea';
import { FieldHistoryTrigger } from '@/app/admin/components/FieldHistoryTrigger';

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

const DEFAULTS = {
  brandName: '',
  brandNameAccent: '',
  logoText: '',
  brandTagline: '',
  themePrimary: '',
  themeAccent: '',
  themeEmerald: '',
  themePurple: '',
  announcementEnabled: true,
  announcementText: '',
  announcementCtaLabel: '',
  announcementCtaHref: '',
  headerDemoLabel: '',
  headerLoginLabel: '',
  headerCtaLabel: '',
  headerCtaHref: '',
  erpAppUrl: '',
  erpLoginPath: '',
  erpRegisterPath: '',
  siteUrl: '',
  logoWallHeading: '',
  logoWallNames: [] as string[],
  trustStats: [] as { label: string; value: string }[],
  footerBrandName: '',
  footerBlurb: '',
  newsletterPlaceholder: '',
  newsletterCtaLabel: '',
  copyrightText: '',
  chatEnabled: true,
  chatTitle: '',
  chatGreeting: '',
  chatSystemPrompt: '',
  chatFallbackMessage: '',
  demoBookingUrl: '',
};

export function BrandingForm() {
  const { siteSettings, refresh } = useContentData();
  const { success, error } = useToast();
  const [form, setForm] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setForm({ ...DEFAULTS, ...siteSettings, trustStats: siteSettings.trustStats || [] });
    }
  }, [siteSettings]);

  const update = (name: keyof typeof DEFAULTS, value: any) => setForm((prev) => ({ ...prev, [name]: value }));

  const updateTrustStat = (index: number, key: 'label' | 'value', value: string) => {
    setForm((prev) => {
      const next = [...prev.trustStats];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, trustStats: next };
    });
  };

  const addTrustStat = () => setForm((prev) => ({ ...prev, trustStats: [...prev.trustStats, { label: '', value: '' }] }));
  const removeTrustStat = (index: number) => setForm((prev) => ({ ...prev, trustStats: prev.trustStats.filter((_, i) => i !== index) }));

  const save = async () => {
    setSaving(true);
    try {
      // Log field changes if modified
      if (siteSettings) {
        Object.keys(form).forEach((k) => {
          const key = k as keyof typeof DEFAULTS;
          if (JSON.stringify(form[key]) !== JSON.stringify((siteSettings as any)[key])) {
            fetch('/api/admin/field-history', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fieldId: key, oldValue: (siteSettings as any)[key], newValue: form[key] }),
            });
          }
        });
      }

      const res = await fetch('/api/admin/content/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await refresh();
        success('Branding & theme settings saved successfully!', 'Saved');
      } else {
        const json = await res.json();
        error(json.error || 'Failed to save branding settings', 'Save Error');
      }
    } catch (e: any) {
      error(e.message || 'Network error saving settings', 'Error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <section>
        <h3 style={sectionHeading}>Brand</h3>
        <div style={grid4}>
          <Field label="Brand name" fieldId="brandName" onRestore={(v) => update('brandName', v)}><input style={inputStyle} value={form.brandName} onChange={(e) => update('brandName', e.target.value)} /></Field>
          <Field label="Brand name accent" fieldId="brandNameAccent" onRestore={(v) => update('brandNameAccent', v)}><input style={inputStyle} value={form.brandNameAccent || ''} onChange={(e) => update('brandNameAccent', e.target.value)} /></Field>
          <Field label="Logo badge text" fieldId="logoText" onRestore={(v) => update('logoText', v)}><input style={inputStyle} value={form.logoText || ''} onChange={(e) => update('logoText', e.target.value)} /></Field>
          <Field label="Tagline" fieldId="brandTagline" onRestore={(v) => update('brandTagline', v)}><input style={inputStyle} value={form.brandTagline || ''} onChange={(e) => update('brandTagline', e.target.value)} /></Field>
        </div>
      </section>

      <section>
        <h3 style={sectionHeading}>Theme colors (leave blank for default)</h3>
        <div style={grid4}>
          <Field label="Primary" fieldId="themePrimary" onRestore={(v) => update('themePrimary', v)}><input type="color" style={{ ...inputStyle, height: '34px', padding: '0.15rem' }} value={form.themePrimary || '#2563eb'} onChange={(e) => update('themePrimary', e.target.value)} /></Field>
          <Field label="Accent" fieldId="themeAccent" onRestore={(v) => update('themeAccent', v)}><input type="color" style={{ ...inputStyle, height: '34px', padding: '0.15rem' }} value={form.themeAccent || '#4f46e5'} onChange={(e) => update('themeAccent', e.target.value)} /></Field>
          <Field label="Emerald" fieldId="themeEmerald" onRestore={(v) => update('themeEmerald', v)}><input type="color" style={{ ...inputStyle, height: '34px', padding: '0.15rem' }} value={form.themeEmerald || '#059669'} onChange={(e) => update('themeEmerald', e.target.value)} /></Field>
          <Field label="Purple" fieldId="themePurple" onRestore={(v) => update('themePurple', v)}><input type="color" style={{ ...inputStyle, height: '34px', padding: '0.15rem' }} value={form.themePurple || '#9333ea'} onChange={(e) => update('themePurple', e.target.value)} /></Field>
        </div>
      </section>

      <section>
        <h3 style={sectionHeading}>Announcement bar</h3>
        <div style={grid4}>
          <Field label="Enabled" fieldId="announcementEnabled" onRestore={(v) => update('announcementEnabled', v)}><input type="checkbox" checked={form.announcementEnabled} onChange={(e) => update('announcementEnabled', e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} /></Field>
          <Field label="Text" fieldId="announcementText" onRestore={(v) => update('announcementText', v)}><input style={inputStyle} value={form.announcementText || ''} onChange={(e) => update('announcementText', e.target.value)} /></Field>
          <Field label="CTA label" fieldId="announcementCtaLabel" onRestore={(v) => update('announcementCtaLabel', v)}><input style={inputStyle} value={form.announcementCtaLabel || ''} onChange={(e) => update('announcementCtaLabel', e.target.value)} /></Field>
          <Field label="CTA href" fieldId="announcementCtaHref" onRestore={(v) => update('announcementCtaHref', v)}><input style={inputStyle} value={form.announcementCtaHref || ''} onChange={(e) => update('announcementCtaHref', e.target.value)} /></Field>
        </div>
      </section>

      <section>
        <h3 style={sectionHeading}>Header</h3>
        <div style={grid4}>
          <Field label="Demo button label" fieldId="headerDemoLabel" onRestore={(v) => update('headerDemoLabel', v)}><input style={inputStyle} value={form.headerDemoLabel || ''} onChange={(e) => update('headerDemoLabel', e.target.value)} /></Field>
          <Field label="Login button label" fieldId="headerLoginLabel" onRestore={(v) => update('headerLoginLabel', v)}><input style={inputStyle} value={form.headerLoginLabel || ''} onChange={(e) => update('headerLoginLabel', e.target.value)} /></Field>
          <Field label="Primary CTA label" fieldId="headerCtaLabel" onRestore={(v) => update('headerCtaLabel', v)}><input style={inputStyle} value={form.headerCtaLabel || ''} onChange={(e) => update('headerCtaLabel', e.target.value)} /></Field>
          <Field label="Primary CTA href" fieldId="headerCtaHref" onRestore={(v) => update('headerCtaHref', v)}><input style={inputStyle} value={form.headerCtaHref || ''} onChange={(e) => update('headerCtaHref', e.target.value)} /></Field>
        </div>
      </section>

      <section>
        <h3 style={sectionHeading}>Platform links</h3>
        <div style={grid4}>
          <RbacField fieldId="erpAppUrl" label="App URL (login/demo app)" readOnlyValue={form.erpAppUrl}>
            <input style={inputStyle} value={form.erpAppUrl || ''} onChange={(e) => update('erpAppUrl', e.target.value)} />
          </RbacField>
          <RbacField fieldId="siteUrl" label="Site URL (marketing site URL)" readOnlyValue={form.siteUrl}>
            <input style={inputStyle} value={form.siteUrl || ''} onChange={(e) => update('siteUrl', e.target.value)} />
          </RbacField>
          <RbacField fieldId="erpLoginPath" label="Login path" readOnlyValue={form.erpLoginPath}>
            <input style={inputStyle} value={form.erpLoginPath || ''} onChange={(e) => update('erpLoginPath', e.target.value)} />
          </RbacField>
          <RbacField fieldId="erpRegisterPath" label="Register path" readOnlyValue={form.erpRegisterPath}>
            <input style={inputStyle} value={form.erpRegisterPath || ''} onChange={(e) => update('erpRegisterPath', e.target.value)} />
          </RbacField>
        </div>
      </section>

      <section>
        <h3 style={sectionHeading}>Trust stats (home page stat bar)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {form.trustStats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <input style={inputStyle} placeholder="Value (e.g. 3,400+)" value={stat.value} onChange={(e) => updateTrustStat(i, 'value', e.target.value)} />
              <input style={inputStyle} placeholder="Label" value={stat.label} onChange={(e) => updateTrustStat(i, 'label', e.target.value)} />
              <button onClick={() => removeTrustStat(i)} className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}>Remove</button>
            </div>
          ))}
        </div>
        <button onClick={addTrustStat} className="btn-secondary" style={{ marginTop: '0.4rem', padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}>Add stat</button>
      </section>

      <section>
        <h3 style={sectionHeading}>Social proof / logo wall</h3>
        <div style={grid2}>
          <Field label="Logo wall heading" fieldId="logoWallHeading" onRestore={(v) => update('logoWallHeading', v)}><input style={inputStyle} value={form.logoWallHeading || ''} onChange={(e) => update('logoWallHeading', e.target.value)} /></Field>
          <Field label="Client names (one per line)" fieldId="logoWallNames" onRestore={(v) => update('logoWallNames', v)}>
            <AutoResizeTextArea
              minRows={3}
              style={inputStyle}
              value={form.logoWallNames.join('\n')}
              onChange={(e) => update('logoWallNames', e.target.value.split('\n').filter(Boolean))}
            />
          </Field>
        </div>
      </section>

      <section>
        <h3 style={sectionHeading}>Footer</h3>
        <div style={grid2}>
          <Field label="Footer brand name" fieldId="footerBrandName" onRestore={(v) => update('footerBrandName', v)}><input style={inputStyle} value={form.footerBrandName || ''} onChange={(e) => update('footerBrandName', e.target.value)} /></Field>
          <Field label="Copyright text" fieldId="copyrightText" onRestore={(v) => update('copyrightText', v)}><input style={inputStyle} value={form.copyrightText || ''} onChange={(e) => update('copyrightText', e.target.value)} /></Field>
          <Field label="Newsletter placeholder" fieldId="newsletterPlaceholder" onRestore={(v) => update('newsletterPlaceholder', v)}><input style={inputStyle} value={form.newsletterPlaceholder || ''} onChange={(e) => update('newsletterPlaceholder', e.target.value)} /></Field>
          <Field label="Footer blurb" fieldId="footerBlurb" onRestore={(v) => update('footerBlurb', v)}>
            <AutoResizeTextArea
              minRows={2}
              style={inputStyle}
              value={form.footerBlurb || ''}
              onChange={(e) => update('footerBlurb', e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section>
        <h3 style={sectionHeading}>AI Chat & Demo Booking</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '0.65rem 0.85rem', alignItems: 'center', marginBottom: '0.75rem' }}>
          <Field label="Enabled" fieldId="chatEnabled" onRestore={(v) => update('chatEnabled', v)}><input type="checkbox" checked={form.chatEnabled} onChange={(e) => update('chatEnabled', e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} /></Field>
          <Field label="Widget title" fieldId="chatTitle" onRestore={(v) => update('chatTitle', v)}><input style={inputStyle} value={form.chatTitle || ''} onChange={(e) => update('chatTitle', e.target.value)} /></Field>
          <Field label="Demo Booking Calendar URL" fieldId="demoBookingUrl" onRestore={(v) => update('demoBookingUrl', v)}><input style={inputStyle} placeholder="https://calendly.com/your-org/demo" value={form.demoBookingUrl || ''} onChange={(e) => update('demoBookingUrl', e.target.value)} /></Field>
        </div>

        <div style={grid2}>
          <Field label="Greeting message" fieldId="chatGreeting" onRestore={(v) => update('chatGreeting', v)}>
            <AutoResizeTextArea
              minRows={2}
              style={{ ...inputStyle, lineHeight: 1.4 }}
              value={form.chatGreeting || ''}
              onChange={(e) => update('chatGreeting', e.target.value)}
            />
          </Field>
          <Field label="Fallback message" fieldId="chatFallbackMessage" onRestore={(v) => update('chatFallbackMessage', v)}>
            <AutoResizeTextArea
              minRows={2}
              style={{ ...inputStyle, lineHeight: 1.4 }}
              value={form.chatFallbackMessage || ''}
              onChange={(e) => update('chatFallbackMessage', e.target.value)}
            />
          </Field>
        </div>

        <div style={{ marginTop: '0.75rem' }}>
          <RbacField fieldId="chatSystemPrompt" label="Custom system prompt (leave blank to auto-generate from Features/Pricing/FAQs)">
            <AutoResizeTextArea
              minRows={3}
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.4 }}
              value={form.chatSystemPrompt || ''}
              onChange={(e) => update('chatSystemPrompt', e.target.value)}
            />
          </RbacField>
        </div>
      </section>

      <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--color-card-border)' }}>
        <button onClick={save} disabled={saving} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
          {saving ? 'Saving…' : 'Save Branding'}
        </button>
      </div>
    </div>
  );
}

function Field({ label: l, fieldId, onRestore, children }: { label: string; fieldId?: string; onRestore?: (v: any) => void; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
        <label style={{ ...labelStyle, marginBottom: 0 }}>{l}</label>
        {fieldId && <FieldHistoryTrigger fieldId={fieldId} fieldLabel={l} onRestore={onRestore} />}
      </div>
      {children}
    </div>
  );
}

const sectionHeading: React.CSSProperties = { fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.6rem' };
const grid4: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem 0.85rem' };
const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.65rem 0.85rem' };
