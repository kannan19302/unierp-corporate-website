'use client';

import { useAdminData } from '../AdminDataContext';

const STAGES: { status: string; label: string; color: string }[] = [
  { status: 'NEW', label: 'New', color: 'var(--color-primary)' },
  { status: 'QUALIFIED', label: 'Qualified', color: '#d97706' },
  { status: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'var(--color-purple)' },
  { status: 'WON', label: 'Won', color: 'var(--color-emerald)' },
  { status: 'LOST', label: 'Lost', color: '#ef4444' },
];

export function LeadPipeline() {
  const { leads, refresh } = useAdminData();

  const moveLead = async (leadId: string, status: string) => {
    const res = await fetch('/api/admin/leads/qualify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, status }),
    });
    if (res.ok) refresh();
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
      {STAGES.map((stage, stageIdx) => {
        const stageLeads = leads.filter((l: any) => l.status === stage.status);
        return (
          <div key={stage.status} style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: stage.color }} />
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>{stage.label}</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>{stageLeads.length}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minHeight: '80px' }}>
              {stageLeads.map((lead: any) => (
                <div key={lead.id} className="admin-card" style={{ padding: '0.85rem', fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.15rem' }}>{lead.name || lead.email}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{lead.company || '—'}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: lead.score >= 70 ? 'var(--color-emerald)' : '#d97706' }}>{lead.score}/100</span>
                    <select
                      value={stage.status}
                      onChange={(e) => moveLead(lead.id, e.target.value)}
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.35rem', borderRadius: '5px', border: '1px solid var(--color-card-border)', background: 'var(--color-surface)', color: 'var(--color-text-main)' }}
                    >
                      {STAGES.map((s) => (
                        <option key={s.status} value={s.status}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {stageLeads.length === 0 && (
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', padding: '0.5rem 0.25rem' }}>No leads</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
