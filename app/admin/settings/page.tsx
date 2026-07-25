'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Key, Mail, Bot, Globe, ShieldCheck, Database, CreditCard, Lock, Download, ExternalLink } from 'lucide-react';
import { useToast } from '../components/ToastContext';
import type { MaskedSetting } from '@/lib/settings';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<MaskedSetting[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('');
  const { success, error } = useToast();

  const load = () => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((json) => {
        const list: MaskedSetting[] = json.settings || [];
        setSettings(list);
        if (list.length > 0 && !activeTab) {
          const uniqueGroups = Array.from(new Set(list.map((s) => s.group)));
          setActiveTab(uniqueGroups[0]);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const downloadBackup = async () => {
    try {
      const res = await fetch('/api/admin/backup');
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `unierp-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        success('Database backup exported successfully!', 'Backup Downloaded');
      } else {
        error('Failed to generate backup export', 'Backup Error');
      }
    } catch (e: any) {
      error(e.message || 'Error exporting backup', 'Error');
    }
  };

  const generatePreviewLink = async () => {
    try {
      const res = await fetch('/api/admin/preview-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
      });
      if (res.ok) {
        const json = await res.json();
        navigator.clipboard.writeText(json.previewUrl);
        success('Preview URL copied to clipboard! (Expires in 24h)', 'Link Copied');
      }
    } catch (e: any) {
      error('Failed to generate preview link', 'Error');
    }
  };

  const save = async (key: string, label: string) => {
    const value = drafts[key] ?? '';
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) {
        const json = await res.json();
        setSettings(json.settings || []);
        setDrafts((prev) => ({ ...prev, [key]: '' }));
        success(`Saved integration key: ${label}`, 'Secret Updated');
      } else {
        error(`Failed to save ${label}`, 'Save Error');
      }
    } catch (e: any) {
      error(e.message || 'Error updating secret', 'Error');
    }
  };

  const groups = Array.from(new Set(settings.map((s) => s.group)));

  const getGroupIcon = (group: string) => {
    const g = group.toLowerCase();
    if (g.includes('email') || g.includes('resend')) return Mail;
    if (g.includes('ai') || g.includes('openai')) return Bot;
    if (g.includes('auth') || g.includes('oauth') || g.includes('sso')) return ShieldCheck;
    if (g.includes('payment') || g.includes('stripe') || g.includes('razorpay')) return CreditCard;
    if (g.includes('storage') || g.includes('cdn') || g.includes('s3')) return Database;
    return Key;
  };

  return (
    <div style={{ width: '100%' }}>
      <PageHeader
        title="Integrations & Secrets Console"
        description="Stored encrypted in database. Changes take effect immediately without redeploying. Server keys (JWT_SECRET, ENCRYPTION_KEY) remain strictly environment-only."
        actions={
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={generatePreviewLink} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
              <ExternalLink size={13} /> Share Preview Link
            </button>
            <button onClick={downloadBackup} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
              <Download size={13} /> Export DB Backup
            </button>
          </div>
        }
      />

      {loading ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Loading settings & secrets…</p>
      ) : (
        <>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--color-sidebar-bg)', padding: '0.3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-card-border)', marginBottom: '1.25rem', width: '100%', flexWrap: 'wrap' }}>
            {groups.map((group) => {
              const Icon = getGroupIcon(group);
              const isActive = activeTab === group;
              return (
                <button
                  key={group}
                  onClick={() => setActiveTab(group)}
                  style={{
                    flex: 1,
                    minWidth: 'max-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    background: isActive ? 'var(--color-card)' : 'transparent',
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    color: isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={14} style={{ color: isActive ? 'var(--color-primary)' : 'inherit' }} /> {group}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          {groups
            .filter((g) => g === activeTab)
            .map((group) => (
              <div key={group} className="admin-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
                  {(() => {
                    const Icon = getGroupIcon(group);
                    return <Icon size={18} style={{ color: 'var(--color-primary)' }} />;
                  })()}
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>{group} Settings</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {settings
                    .filter((s) => s.group === group)
                    .map((s) => (
                      <div key={s.key} style={{ background: 'var(--color-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <label style={{ fontSize: '0.8rem', color: 'var(--color-text-main)', fontWeight: 700 }}>{s.label}</label>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: s.source === 'db' ? '#059669' : s.source === 'env' ? 'var(--color-primary)' : 'var(--color-text-subtle)' }}>
                            {s.source === 'db' ? '● Configured in DB' : s.source === 'env' ? '● Using .env default' : '○ Not configured'}
                          </span>
                        </div>
                        {s.help && <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.45rem' }}>{s.help}</p>}

                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <input
                            type={s.isSecret ? 'password' : 'text'}
                            placeholder={s.isSecret && s.hint ? s.hint : s.placeholder}
                            value={drafts[s.key] ?? (s.isSecret ? '' : s.value || '')}
                            onChange={(e) => setDrafts((prev) => ({ ...prev, [s.key]: e.target.value }))}
                            style={{ flex: 1, padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem', fontFamily: s.isSecret ? 'monospace' : 'inherit' }}
                          />
                          <button onClick={() => save(s.key, s.label)} className="btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}>
                            Save
                          </button>
                          {s.source === 'db' && (
                            <button
                              onClick={() => {
                                setDrafts((prev) => ({ ...prev, [s.key]: '' }));
                                save(s.key, s.label);
                              }}
                              className="btn-secondary"
                              style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </>
      )}

      {/* Security Note Card */}
      <div className="admin-card" style={{ padding: '1rem 1.25rem', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <Lock size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
        <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
          <strong style={{ color: 'var(--color-text-main)' }}>Security Note:</strong> Critical system keys (<code style={{ color: 'var(--color-primary)' }}>JWT_SECRET</code> and <code style={{ color: 'var(--color-primary)' }}>ENCRYPTION_KEY</code>) are intentionally excluded from UI editing to prevent lockout risks and maintain Edge-runtime security integrity.
        </p>
      </div>
    </div>
  );
}
