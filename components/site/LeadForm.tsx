'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { useSiteContent } from './SiteContentProvider';

interface LeadFormProps {
  variant?: 'inline' | 'modal';
  defaultSource?: string;
  onClose?: () => void;
}

const SIZES = ['1-19', '20-50', '50-250', '250-1000', '500+'];

export function LeadForm({ variant = 'inline', defaultSource = 'contact_page', onClose }: LeadFormProps) {
  const { features, settings } = useSiteContent();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    size: '',
    budget: '',
    modules: [] as string[],
    message: '',
  });

  const update = (field: keyof typeof form, value: string | string[]) => setForm((prev) => ({ ...prev, [field]: value }));

  const saveDraft = () => {
    if (!form.email || !form.email.includes('@')) return;
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, source: defaultSource, isDraft: true }),
    }).catch(() => {});
  };

  const toggleModule = (id: string) => {
    update('modules', form.modules.includes(id) ? form.modules.filter((m) => m !== id) : [...form.modules, id]);
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: defaultSource, isDraft: false }),
      });
      if (res.ok) setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  const content = done ? (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <CheckCircle2 size={48} color="var(--color-emerald)" style={{ marginBottom: '1rem' }} />
      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Request received</h3>
      <p style={{ color: 'var(--color-text-muted)' }}>A {settings.brandName} specialist will reach out to {form.email} shortly.</p>
    </div>
  ) : (
    <>
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ flex: 1, height: '4px', borderRadius: '999px', background: s <= step ? 'var(--color-primary)' : 'var(--glass-border)' }} />
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Let&apos;s get started</h3>
          <input required placeholder="Full name" value={form.name} onChange={(e) => update('name', e.target.value)} style={inputStyle} />
          <input required type="email" placeholder="Work email" value={form.email} onChange={(e) => update('email', e.target.value)} onBlur={saveDraft} style={inputStyle} />
          <button
            type="button"
            className="btn-primary"
            disabled={!form.name || !form.email}
            onClick={() => setStep(2)}
            style={{ justifyContent: 'center', opacity: !form.name || !form.email ? 0.5 : 1 }}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Tell us about your company</h3>
          <input placeholder="Company name" value={form.company} onChange={(e) => update('company', e.target.value)} onBlur={saveDraft} style={inputStyle} />
          <input placeholder="Phone number" value={form.phone} onChange={(e) => update('phone', e.target.value)} onBlur={saveDraft} style={inputStyle} />
          <select value={form.size} onChange={(e) => update('size', e.target.value)} style={inputStyle}>
            <option value="">Company size</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>{s} employees</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(1)} style={{ justifyContent: 'center' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <button type="button" className="btn-primary" onClick={() => setStep(3)} style={{ flex: 1, justifyContent: 'center' }}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Which modules interest you?</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {features.slice(0, 8).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleModule(m.slug)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: '1px solid var(--glass-border)',
                  background: form.modules.includes(m.slug) ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: form.modules.includes(m.slug) ? '#fff' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                }}
              >
                {m.name.split(' &')[0]}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Anything specific we should know? (optional)"
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' as const }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(2)} style={{ justifyContent: 'center' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <button type="button" className="btn-primary" disabled={submitting} onClick={submit} style={{ flex: 1, justifyContent: 'center' }}>
              {submitting ? 'Submitting…' : 'Request Demo'}
            </button>
          </div>
        </div>
      )}
    </>
  );

  if (variant === 'modal') {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', width: '100%', padding: '2rem', background: 'var(--header-bg)', position: 'relative' }}>
          {onClose && (
            <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          )}
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ maxWidth: '480px', width: '100%', padding: '2rem' }}>
      {content}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  border: '1px solid var(--glass-border)',
  background: 'var(--color-surface)',
  color: 'var(--color-text-main)',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  outline: 'none',
};
