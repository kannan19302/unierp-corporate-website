'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, ArrowRight, LayoutTemplate, Users, Ticket, Send, KeyRound, ShieldCheck, Sliders, Activity, Globe, FileSpreadsheet, Bot, X } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Actions' | 'Tools';
  icon: any;
  action: () => void;
}

export function CommandPaletteModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!open) return null;

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const commands: CommandItem[] = [
    { id: 'nav-analytics', label: 'Go to Network Analytics & Traffic', category: 'Navigation', icon: Activity, action: () => navigate('/admin') },
    { id: 'nav-content', label: 'Go to Site Content Studio', category: 'Navigation', icon: LayoutTemplate, action: () => navigate('/admin/content/branding') },
    { id: 'nav-leads', label: 'Go to Lead Management (LMS)', category: 'Navigation', icon: Users, action: () => navigate('/admin/leads') },
    { id: 'nav-tickets', label: 'Go to Support Tickets & Escalations', category: 'Navigation', icon: Ticket, action: () => navigate('/admin/tickets') },
    { id: 'nav-broadcast', label: 'Go to Release Broadcast Console', category: 'Navigation', icon: Send, action: () => navigate('/admin/broadcast') },
    { id: 'nav-health', label: 'Go to System Health & Security Auditor', category: 'Navigation', icon: ShieldCheck, action: () => navigate('/admin/system-health') },
    { id: 'nav-i18n', label: 'Go to AI Translation Studio', category: 'Navigation', icon: Globe, action: () => navigate('/admin/content/i18n') },
    { id: 'nav-automation', label: 'Go to Workflow Automation Engine', category: 'Navigation', icon: Bot, action: () => navigate('/admin/automation') },
    { id: 'nav-datacenter', label: 'Go to Data Import & Migration Center', category: 'Navigation', icon: FileSpreadsheet, action: () => navigate('/admin/data-center') },
    { id: 'nav-settings', label: 'Go to Integrations & Secrets', category: 'Navigation', icon: KeyRound, action: () => navigate('/admin/settings') },
    { id: 'nav-console', label: 'Go to Console Preferences & Themes', category: 'Navigation', icon: Sliders, action: () => navigate('/admin/console-settings') },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        className="admin-card"
        style={{
          width: '100%',
          maxWidth: '620px',
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.85rem 1rem', borderBottom: '1px solid var(--color-card-border)', gap: '0.65rem', background: 'var(--color-surface)' }}>
          <Search size={18} style={{ color: 'var(--color-primary)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search route... (Press ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--color-text-main)',
              fontSize: '0.92rem',
              fontWeight: 600,
            }}
          />
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', background: 'var(--color-bg)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--color-card-border)' }}>
            ESC
          </span>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '0.5rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              No matching commands or routes found for &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                  }}
                  className="command-item-hover"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{cmd.label}</span>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
