'use client';

import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Palette, Sliders, Bell, Layout, Table, Check, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useConsoleTheme, type AccentColor, type Density } from '../components/ConsoleThemeContext';
import { useToast } from '../components/ToastContext';

const ACCENT_SWATCHES: { color: AccentColor; name: string }[] = [
  { color: '#2563eb', name: 'Royal Blue (Default)' },
  { color: '#059669', name: 'Emerald Green' },
  { color: '#4f46e5', name: 'Indigo Purple' },
  { color: '#d97706', name: 'Sunset Amber' },
  { color: '#e11d48', name: 'Crimson Rose' },
  { color: '#0891b2', name: 'Deep Cyan' },
];

const DENSITY_OPTIONS: { id: Density; label: string; desc: string }[] = [
  { id: 'ultra', label: 'Ultra-Dense', desc: '44px header, 220px sidebar, maximum screen real estate' },
  { id: 'compact', label: 'Compact (ERPSys Default)', desc: '48px header, 240px sidebar, 100% main workspace width' },
  { id: 'comfortable', label: 'Comfortable', desc: '54px header, 260px sidebar, relaxed padding' },
];

const LANDING_OPTIONS = [
  { path: '/admin', label: 'Network Analytics & Traffic' },
  { path: '/admin/leads', label: 'Lead Management (LMS)' },
  { path: '/admin/content', label: 'Site Content Studio' },
  { path: '/admin/tickets', label: 'Support Tickets & Escalations' },
  { path: '/admin/broadcast', label: 'Release Broadcast Console' },
];

export default function ConsoleSettingsPage() {
  const { prefs, updatePrefs, resetPrefs } = useConsoleTheme();
  const { success } = useToast();

  const handleSave = () => {
    success('Console theme preferences & settings saved!', 'Preferences Saved');
  };

  const handleReset = () => {
    resetPrefs();
    success('Reset all console preferences to system defaults.', 'Reset Complete');
  };

  return (
    <div style={{ width: '100%' }}>
      <PageHeader
        title="Console Preferences & Theme Customizer"
        description="Personalize color accents, layout geometry density, toast notification behaviors, workspace defaults, and data table display styles."
        actions={
          <button onClick={handleReset} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
            <RotateCcw size={13} /> Reset Defaults
          </button>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Section 1: Color Accents & Theme Swatches */}
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <Palette size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
              Primary Accent Color & Swatches
            </h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Choose a primary accent color for active navigation tabs, buttons, focus rings, and metrics across the admin console.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {ACCENT_SWATCHES.map((swatch) => {
              const isSelected = prefs.accentColor === swatch.color;
              return (
                <div
                  key={swatch.color}
                  onClick={() => updatePrefs({ accentColor: swatch.color })}
                  style={{
                    background: 'var(--color-surface)',
                    border: isSelected ? `2px solid ${swatch.color}` : '1px solid var(--color-card-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: swatch.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    {isSelected && <Check size={14} />}
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    {swatch.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Density & Layout Geometry */}
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <Sliders size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
              Interface Geometry & Density
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {DENSITY_OPTIONS.map((opt) => {
              const isSelected = prefs.density === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => updatePrefs({ density: opt.id })}
                  style={{
                    background: 'var(--color-surface)',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)' }}>{opt.label}</strong>
                    {isSelected && <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', background: 'rgba(5,150,105,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Active</span>}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.3 }}>
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Toast Notification Customization */}
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <Bell size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
              Toast Notifications & Alerts
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            <div>
              <label style={labelStyle}>Auto-Dismiss Duration</label>
              <select
                value={prefs.toastDuration}
                onChange={(e) => updatePrefs({ toastDuration: Number(e.target.value) })}
                style={inputStyle}
              >
                <option value={3000}>3 Seconds (Fast)</option>
                <option value={4000}>4 Seconds (Default)</option>
                <option value={7000}>7 Seconds (Extended)</option>
                <option value={0}>Manual Dismiss Only</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Toast Position</label>
              <select
                value={prefs.toastPosition}
                onChange={(e) => updatePrefs({ toastPosition: e.target.value as any })}
                style={inputStyle}
              >
                <option value="top-right">Top Right (Default)</option>
                <option value="top-left">Top Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Notification Sound</label>
              <button
                type="button"
                onClick={() => updatePrefs({ toastSound: !prefs.toastSound })}
                style={{
                  ...inputStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  justifyContent: 'center',
                  background: prefs.toastSound ? 'rgba(5, 150, 105, 0.1)' : 'var(--color-surface)',
                  color: prefs.toastSound ? '#059669' : 'var(--color-text-muted)',
                  borderColor: prefs.toastSound ? '#059669' : 'var(--color-card-border)',
                  fontWeight: 700,
                }}
              >
                {prefs.toastSound ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>{prefs.toastSound ? 'Sound Chime Enabled' : 'Muted'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Workspace & Table Display */}
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <Layout size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
              Workspace & Data Table Defaults
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            <div>
              <label style={labelStyle}>Default Admin Landing Page</label>
              <select
                value={prefs.defaultLanding}
                onChange={(e) => updatePrefs({ defaultLanding: e.target.value })}
                style={inputStyle}
              >
                {LANDING_OPTIONS.map((opt) => (
                  <option key={opt.path} value={opt.path}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Table Rows Per Page</label>
              <select
                value={prefs.tableRowsPerPage}
                onChange={(e) => updatePrefs({ tableRowsPerPage: Number(e.target.value) })}
                style={inputStyle}
              >
                <option value={10}>10 rows</option>
                <option value={25}>25 rows (Default)</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.5rem' }}>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '0.55rem 1.5rem', fontSize: '0.85rem' }}>
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.25rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem', fontFamily: 'inherit' };
