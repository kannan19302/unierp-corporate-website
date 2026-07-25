'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from './SiteContentProvider';

export function HeroLeadForm() {
  const { settings } = useSiteContent();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const persistDraft = (draftEmail: string, isDraft: boolean) => {
    if (!draftEmail || !draftEmail.includes('@')) return;
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: draftEmail, source: 'hero_form', isDraft }),
    }).catch(() => {});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    persistDraft(email, false);
    setSubmitted(true);
    window.location.href = `${settings.erpAppUrl}${settings.erpLoginPath}?email=${encodeURIComponent(email)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '0.5rem',
        background: 'var(--glass-bg)',
        padding: '0.45rem',
        borderRadius: '16px',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
        maxWidth: '480px',
        width: '100%',
      }}
    >
      <input
        type="email"
        placeholder="Enter your work email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => persistDraft(email, true)}
        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '0.75rem 1rem', color: 'var(--color-text-main)', fontSize: '0.95rem', fontFamily: 'inherit' }}
        required
      />
      <button type="submit" className="btn-primary" style={{ borderRadius: '12px', padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
        <span>{submitted ? 'Redirecting…' : 'Start 30-Day Free Trial'}</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
