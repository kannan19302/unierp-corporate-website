'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Bot, Plus, Zap, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useToast } from '../components/ToastContext';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  actions: string[];
  active: boolean;
}

export default function AutomationPage() {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newRule, setNewRule] = useState({ name: '', trigger: 'HIGH_SCORE_LEAD', condition: 'Lead Score >= 80', actions: 'Send Slack Alert, Auto-Assign Rep' });

  const { success } = useToast();

  const load = () => {
    fetch('/api/admin/automation')
      .then((res) => res.json())
      .then((json) => {
        setRules(json.rules || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/automation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newRule,
        actions: newRule.actions.split(',').map((a) => a.trim()),
        active: true,
      }),
    });
    if (res.ok) {
      setShowModal(false);
      load();
      success(`Created workflow automation rule: ${newRule.name}`, 'Rule Created');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <PageHeader
        title="Workflow Automation Rules Engine"
        description="Configure event-driven trigger-action workflows to automatically route leads, trigger Slack/Teams alerts, and escalate tickets."
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem', gap: '0.3rem' }}>
            <Plus size={14} /> Create Automation Rule
          </button>
        }
      />

      {loading ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Loading automation workflows…</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {rules.map((rule) => (
            <div key={rule.id} className="admin-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Zap size={18} style={{ color: '#d97706' }} />
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>{rule.name}</h3>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: rule.active ? '#059669' : '#ef4444', background: rule.active ? 'rgba(5,150,105,0.1)' : 'rgba(239,68,68,0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  {rule.active ? 'Active Rule' : 'Disabled'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', background: 'var(--color-surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)', fontSize: '0.78rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.7rem' }}>WHEN EVENT FIRES:</span>
                  <strong style={{ color: 'var(--color-primary)' }}>{rule.trigger}</strong>
                </div>

                <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />

                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.7rem' }}>IF CONDITION MET:</span>
                  <code style={{ color: 'var(--color-text-main)', fontWeight: 700 }}>{rule.condition}</code>
                </div>

                <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />

                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.7rem' }}>THEN EXECUTE ACTIONS:</span>
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.15rem' }}>
                    {rule.actions.map((act) => (
                      <span key={act} style={{ background: 'var(--color-card)', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid var(--color-card-border)', fontSize: '0.72rem', fontWeight: 600 }}>
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Rule Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowModal(false)}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '480px', padding: '1.25rem' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={18} style={{ color: '#d97706' }} />
                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>Create Automation Rule</h3>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>Rule Name</label>
                <input required value={newRule.name} onChange={(e) => setNewRule((r) => ({ ...r, name: e.target.value }))} style={inputStyle} placeholder="e.g. VIP Lead Routing" />
              </div>
              <div>
                <label style={labelStyle}>Trigger Event</label>
                <select value={newRule.trigger} onChange={(e) => setNewRule((r) => ({ ...r, trigger: e.target.value }))} style={inputStyle}>
                  <option value="HIGH_SCORE_LEAD">High-Score Lead (Score ≥ 80)</option>
                  <option value="LEAD_CREATED">New Lead Created</option>
                  <option value="TICKET_ESCALATED">Support Ticket Escalated</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Condition Expression</label>
                <input required value={newRule.condition} onChange={(e) => setNewRule((r) => ({ ...r, condition: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Actions (Comma-separated)</label>
                <input required value={newRule.actions} onChange={(e) => setNewRule((r) => ({ ...r, actions: e.target.value }))} style={inputStyle} />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>Save Automation Rule</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.25rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem' };
