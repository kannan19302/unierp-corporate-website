'use client';

import { Mail, CheckCircle2, XCircle, Clock, Wifi } from 'lucide-react';
import { useAdminData } from '../AdminDataContext';

export function DeliverabilityMetrics() {
  const { stats } = useAdminData();
  const { emailsSent, emailsFailed, emailsQueued, deliveryRate } = stats;
  const total = emailsSent + emailsFailed + emailsQueued;

  const providerOk = emailsFailed === 0 || deliveryRate >= 90;

  const cards = [
    {
      label: 'Delivery Rate',
      value: `${deliveryRate}%`,
      icon: CheckCircle2,
      color: deliveryRate >= 95 ? '#059669' : deliveryRate >= 80 ? '#d97706' : '#ef4444',
      bg: deliveryRate >= 95 ? 'rgba(5,150,105,0.1)' : deliveryRate >= 80 ? 'rgba(217,119,6,0.1)' : 'rgba(239,68,68,0.1)',
    },
    {
      label: 'Sent',
      value: emailsSent.toLocaleString(),
      icon: Mail,
      color: 'var(--color-primary)',
      bg: 'var(--color-primary-glow)',
    },
    {
      label: 'Failed',
      value: emailsFailed.toLocaleString(),
      icon: XCircle,
      color: emailsFailed > 0 ? '#ef4444' : 'var(--color-text-subtle)',
      bg: emailsFailed > 0 ? 'rgba(239,68,68,0.1)' : 'var(--color-surface)',
    },
    {
      label: 'Queued',
      value: emailsQueued.toLocaleString(),
      icon: Clock,
      color: emailsQueued > 0 ? '#d97706' : 'var(--color-text-subtle)',
      bg: emailsQueued > 0 ? 'rgba(217,119,6,0.1)' : 'var(--color-surface)',
    },
  ];

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {/* Provider health banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.65rem 1rem',
        borderRadius: 'var(--radius-lg)',
        background: providerOk ? 'rgba(5,150,105,0.08)' : 'rgba(239,68,68,0.08)',
        border: `1px solid ${providerOk ? 'rgba(5,150,105,0.25)' : 'rgba(239,68,68,0.25)'}`,
        marginBottom: '1rem',
        fontSize: '0.85rem', fontWeight: 600,
        color: providerOk ? '#059669' : '#ef4444',
      }}>
        <Wifi size={15} />
        <span>
          Resend provider: <strong>{providerOk ? 'Operational' : 'Degraded'}</strong>
          {total === 0 && ' — No emails sent yet. Configure RESEND_API_KEY in Integrations & Secrets.'}
        </span>
        <div style={{
          marginLeft: 'auto',
          width: '8px', height: '8px', borderRadius: '50%',
          background: providerOk ? '#059669' : '#ef4444',
          boxShadow: providerOk ? '0 0 8px #059669' : '0 0 8px #ef4444',
        }} />
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {cards.map((card) => (
          <div
            key={card.label}
            className="admin-card"
            style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: card.bg, color: card.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <card.icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
