'use client';

import { useState } from 'react';
import { CheckCircle2, RefreshCw, Send, Calendar, Clock, History, XCircle, Play } from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { PageHeader } from '../components/PageHeader';
import { useToast } from '../components/ToastContext';

type Tab = 'compose' | 'scheduled' | 'history';

const TEMPLATES = [
  {
    name: 'Release Announcement',
    subject: 'UniERP 2.5 Released — GST E-Invoicing & No-Code Studio',
    body: '<p>We are excited to announce <strong>UniERP 2.5</strong> with Indian GST E-Invoicing, E-Way Bills, and the visual No-Code Builder Studio.</p><p>Log in to your workspace to explore the new features!</p>',
  },
  {
    name: 'Feature Spotlight',
    subject: 'Spotlight: UniERP\'s Multi-Currency Finance Module',
    body: '<p>Did you know UniERP handles <strong>multi-currency transactions</strong> with automatic exchange rate updates?</p><p>This month we\'re spotlighting our Finance module. Learn more in the product tour.</p>',
  },
  {
    name: 'Maintenance Notice',
    subject: 'Scheduled Maintenance — UniERP Platform',
    body: '<p>We will be performing scheduled maintenance on <strong>[DATE]</strong> from [TIME] to [TIME] UTC.</p><p>During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.</p>',
  },
  {
    name: 'Onboarding Reminder',
    subject: 'Getting started with UniERP — Tips & Resources',
    body: '<p>Thank you for your interest in UniERP! Here are some resources to get you started:</p><ul><li>Watch the 5-minute demo</li><li>Read the implementation guide</li><li>Book a personalized onboarding call</li></ul>',
  },
];

export default function AdminBroadcastPage() {
  const { stats, emailLogs, scheduledBroadcasts, refresh } = useAdminData();
  const { success, error: toastError } = useToast();
  const [tab, setTab] = useState<Tab>('compose');
  const [subject, setSubject] = useState('UniERP 2.5 Released: GST E-Invoicing & No-Code Studio');
  const [body, setBody] = useState('We are excited to announce UniERP 2.5 with Indian GST E-Invoicing, E-Way Bills, and the visual No-Code Builder Studio. Log in to your workspace to explore!');
  const [sendMode, setSendMode] = useState<'now' | 'scheduled'>('now');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ recipients: number; sent: number } | null>(null);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');
    try {
      if (sendMode === 'now') {
        const res = await fetch('/api/admin/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject, body }),
        });
        if (res.ok) {
          const json = await res.json();
          setResult({ recipients: json.recipients, sent: json.sent });
          refresh();
          success(`Broadcast sent to ${json.sent} subscribers!`, 'Broadcast Sent');
        } else {
          const json = await res.json();
          setError(json.error || 'Broadcast failed');
          toastError(json.error || 'Broadcast failed', 'Error');
        }
      } else {
        const res = await fetch('/api/admin/broadcast/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'schedule', subject, htmlBody: body, scheduledAt }),
        });
        if (res.ok) {
          setError('');
          setResult(null);
          refresh();
          setTab('scheduled');
          success('Broadcast scheduled successfully!', 'Scheduled');
        } else {
          const json = await res.json();
          setError(json.error || 'Schedule failed');
          toastError(json.error || 'Schedule failed', 'Error');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelSchedule = async (id: string) => {
    const res = await fetch('/api/admin/broadcast/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel', id }),
    });
    if (res.ok) {
      refresh();
      success('Scheduled broadcast cancelled', 'Cancelled');
    }
  };

  const processDue = async () => {
    setProcessing(true);
    try {
      const res = await fetch('/api/admin/broadcast/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'process-due' }),
      });
      if (res.ok) {
        refresh();
        success('Processed due scheduled broadcasts!', 'Processed');
      }
    } finally {
      setProcessing(false);
    }
  };

  const tabStyle = (t: Tab): React.CSSProperties => ({
    flex: 1,
    minWidth: 'max-content',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
    padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-md)', border: 'none',
    fontSize: '0.78rem', fontWeight: tab === t ? 600 : 500, cursor: 'pointer',
    background: tab === t ? 'var(--color-card)' : 'transparent',
    boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
    color: tab === t ? 'var(--color-text-main)' : 'var(--color-text-muted)',
    transition: 'all 0.15s',
  });

  const broadcastHistory = emailLogs.filter((l: any) => l.subject && l.to !== '');

  return (
    <div style={{ width: '100%' }}>
      <PageHeader
        title="Release Broadcast Console"
        description={`Send emails to all ${stats.totalSubscribers.toLocaleString()} active subscribers via Resend.`}
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--color-sidebar-bg)', padding: '0.3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-card-border)', marginBottom: '1.25rem', width: '100%' }}>
        <button onClick={() => setTab('compose')} style={tabStyle('compose')}><Send size={13} /> Compose</button>
        <button onClick={() => setTab('scheduled')} style={tabStyle('scheduled')}>
          <Calendar size={13} /> Scheduled
          {scheduledBroadcasts?.length > 0 && (
            <span style={{ background: '#d97706', color: '#fff', borderRadius: '9999px', fontSize: '0.68rem', padding: '0 0.35rem', fontWeight: 800 }}>
              {scheduledBroadcasts.length}
            </span>
          )}
        </button>
        <button onClick={() => setTab('history')} style={tabStyle('history')}><History size={13} /> History</button>
      </div>

      {/* Compose Tab */}
      {tab === 'compose' && (
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          {/* Subscriber count preview */}
          <div style={{ background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.85rem', marginBottom: '1rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Send size={14} />
            This broadcast will reach <strong>{stats.totalSubscribers.toLocaleString()}</strong> active subscribers
          </div>

          {result && (
            <div style={{ background: 'rgba(5, 150, 105, 0.12)', border: '1px solid #059669', color: '#059669', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} />
              <span>Sent to {result.sent} of {result.recipients} subscribers.</span>
            </div>
          )}

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontWeight: 600, fontSize: '0.82rem' }}>
              {error}
            </div>
          )}

          {/* Template Library */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.35rem' }}>
              Quick Templates
            </label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.name}
                  onClick={() => { setSubject(tmpl.subject); setBody(tmpl.body); success(`Loaded template: ${tmpl.name}`, 'Template Loaded'); }}
                  className="btn-secondary"
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={lblStyle}>Email Subject</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={lblStyle}>HTML Content</label>
              <textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.82rem' }} required />
            </div>

            {/* Send mode toggle */}
            <div>
              <label style={lblStyle}>Send Timing</label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={() => setSendMode('now')}
                  style={{
                    flex: 1, padding: '0.5rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                    background: sendMode === 'now' ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: sendMode === 'now' ? '#fff' : 'var(--color-text-muted)',
                    border: '1px solid var(--color-card-border)',
                  }}
                >
                  <Send size={13} style={{ marginRight: '0.3rem' }} /> Send Now
                </button>
                <button
                  type="button"
                  onClick={() => setSendMode('scheduled')}
                  style={{
                    flex: 1, padding: '0.5rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                    background: sendMode === 'scheduled' ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: sendMode === 'scheduled' ? '#fff' : 'var(--color-text-muted)',
                    border: '1px solid var(--color-card-border)',
                  }}
                >
                  <Calendar size={13} style={{ marginRight: '0.3rem' }} /> Schedule
                </button>
              </div>
            </div>

            {sendMode === 'scheduled' && (
              <div>
                <label style={lblStyle}>Send at</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  required={sendMode === 'scheduled'}
                  min={new Date().toISOString().slice(0, 16)}
                  style={inputStyle}
                />
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
              {loading ? <RefreshCw size={15} /> : sendMode === 'now' ? <Send size={15} /> : <Calendar size={15} />}
              <span>{loading ? 'Processing…' : sendMode === 'now' ? 'Send Broadcast' : 'Schedule Broadcast'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Scheduled Tab */}
      {tab === 'scheduled' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              Pending broadcasts waiting to be sent.
            </p>
            <button
              onClick={processDue}
              disabled={processing}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
            >
              {processing ? <RefreshCw size={13} /> : <Play size={13} />}
              Process Due Now
            </button>
          </div>
          {!scheduledBroadcasts || scheduledBroadcasts.length === 0 ? (
            <div className="admin-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No scheduled broadcasts. Use Compose → Schedule to create one.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {scheduledBroadcasts.map((b: any) => (
                <div key={b.id} className="admin-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.88rem', marginBottom: '0.15rem' }}>{b.subject}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={12} />
                      Scheduled: {new Date(b.scheduledAt).toLocaleString()}
                      {b.createdByEmail && <span>• by {b.createdByEmail}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(217,119,6,0.12)', color: '#d97706' }}>PENDING</span>
                    <button
                      onClick={() => cancelSchedule(b.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      <XCircle size={12} /> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {tab === 'history' && (
        <div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.85rem' }}>Past sent broadcasts and delivery logs.</p>
          {broadcastHistory.length === 0 ? (
            <div className="admin-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No broadcast history yet.</p>
            </div>
          ) : (
            <div className="admin-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {broadcastHistory.slice(0, 50).map((log: any) => (
                  <div key={log.id} style={{ background: 'var(--color-surface)', padding: '0.75rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.85rem' }}>{log.subject}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                        To: {log.to} • {new Date(log.sentAt).toLocaleString()}
                      </div>
                    </div>
                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, background: log.status === 'SENT' ? 'rgba(5,150,105,0.12)' : 'rgba(239,68,68,0.12)', color: log.status === 'SENT' ? '#059669' : '#ef4444' }}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const lblStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.25rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontFamily: 'inherit', fontSize: '0.82rem' };
