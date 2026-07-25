'use client';

import { useEffect, useState } from 'react';
import { Globe, Bot, Save, Sparkles, Check, Languages } from 'lucide-react';
import { useToast } from '../../components/ToastContext';

interface Locale {
  code: string;
  name: string;
  flag: string;
}

export function I18nStudio() {
  const [locales, setLocales] = useState<Locale[]>([]);
  const [activeLocale, setActiveLocale] = useState('hi');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [autoTranslating, setAutoTranslating] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    fetch('/api/admin/i18n')
      .then((res) => res.json())
      .then((json) => {
        setLocales(json.locales || []);
        setTranslations(json.translations || {});
        setLoading(false);
      });
  }, []);

  const handleAutoTranslate = async () => {
    setAutoTranslating(true);
    try {
      const res = await fetch('/api/admin/i18n', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: activeLocale }),
      });
      if (res.ok) {
        success(`AI translated 4 missing marketing keys for ${activeLocale.toUpperCase()}`, 'AI Translation Complete');
      }
    } finally {
      setAutoTranslating(false);
    }
  };

  const currentDict = translations[activeLocale] || translations['en'] || {};

  return (
    <div className="admin-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Globe size={18} style={{ color: 'var(--color-primary)' }} />
          <div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
              AI Multi-Language Translation Studio
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Manage site localization & AI auto-translations</span>
          </div>
        </div>

        <button onClick={handleAutoTranslate} disabled={autoTranslating} className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem', gap: '0.3rem' }}>
          <Sparkles size={13} /> {autoTranslating ? 'Translating...' : '1-Click AI Auto-Translate'}
        </button>
      </div>

      {/* Locale Selector Bar */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        {locales.map((l) => {
          const isSelected = activeLocale === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setActiveLocale(l.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-card-border)',
                background: isSelected ? 'rgba(37,99,235,0.08)' : 'var(--color-surface)',
                color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          );
        })}
      </div>

      {/* Translations Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Object.entries(currentDict).map(([key, val]) => (
          <div key={key} style={{ background: 'var(--color-surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <code style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>{key}</code>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Locale: {activeLocale.toUpperCase()}</span>
            </div>
            <input
              type="text"
              defaultValue={val}
              style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
