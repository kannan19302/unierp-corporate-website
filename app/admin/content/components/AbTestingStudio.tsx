'use client';

import { useEffect, useState } from 'react';
import { Split, Trophy, Play, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/app/admin/components/ToastContext';

interface AbTest {
  id: string;
  name: string;
  status: string;
  variantA: { headline?: string; label?: string; conversions: number; traffic: number };
  variantB: { headline?: string; label?: string; conversions: number; traffic: number };
  startDate: string;
}

export function AbTestingStudio() {
  const [tests, setTests] = useState<AbTest[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const load = () => {
    fetch('/api/admin/ab-testing')
      .then((res) => res.json())
      .then((json) => setTests(json.abTests || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const declareWinner = async (id: string, winner: 'A' | 'B') => {
    const res = await fetch('/api/admin/ab-testing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, winner }),
    });
    if (res.ok) {
      success(`Declared Variant ${winner} as the winning headline!`, 'Winner Declared');
      load();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="admin-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
          <Split size={18} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>A/B Testing Studio</h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
          Automatically split-test public site hero headlines and CTAs 50/50. View real-time conversion lift and pick a winner to lock in as default.
        </p>
      </div>

      {loading ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>Loading active A/B tests…</p>
      ) : (
        tests.map((test) => {
          const rateA = ((test.variantA.conversions / test.variantA.traffic) * 100).toFixed(1);
          const rateB = ((test.variantB.conversions / test.variantB.traffic) * 100).toFixed(1);
          const leader = Number(rateB) > Number(rateA) ? 'B' : 'A';

          return (
            <div key={test.id} className="admin-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{test.name}</div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.55rem', borderRadius: '9999px', background: 'rgba(5,150,105,0.12)', color: '#059669' }}>
                  {test.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Variant A */}
                <div style={{ background: 'var(--color-surface)', border: leader === 'A' ? '1px solid var(--color-primary)' : '1px solid var(--color-card-border)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>Variant A (Control)</strong>
                    {leader === 'A' && <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Trophy size={11} /> Leading (+{(Number(rateA) - Number(rateB)).toFixed(1)}%)</span>}
                  </div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.6rem' }}>
                    "{test.variantA.headline || test.variantA.label}"
                  </p>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Traffic: {test.variantA.traffic}</span>
                    <span>Conversions: {test.variantA.conversions}</span>
                    <strong style={{ color: 'var(--color-text-main)' }}>Rate: {rateA}%</strong>
                  </div>
                  <button onClick={() => declareWinner(test.id, 'A')} className="btn-secondary" style={{ marginTop: '0.65rem', width: '100%', padding: '0.35rem', fontSize: '0.75rem', justifyContent: 'center' }}>
                    <CheckCircle2 size={12} /> Set as Winner
                  </button>
                </div>

                {/* Variant B */}
                <div style={{ background: 'var(--color-surface)', border: leader === 'B' ? '1px solid var(--color-primary)' : '1px solid var(--color-card-border)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '0.8rem', color: '#9333ea' }}>Variant B (Challenger)</strong>
                    {leader === 'B' && <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Trophy size={11} /> Leading (+{(Number(rateB) - Number(rateA)).toFixed(1)}%)</span>}
                  </div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.6rem' }}>
                    "{test.variantB.headline || test.variantB.label}"
                  </p>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Traffic: {test.variantB.traffic}</span>
                    <span>Conversions: {test.variantB.conversions}</span>
                    <strong style={{ color: 'var(--color-text-main)' }}>Rate: {rateB}%</strong>
                  </div>
                  <button onClick={() => declareWinner(test.id, 'B')} className="btn-secondary" style={{ marginTop: '0.65rem', width: '100%', padding: '0.35rem', fontSize: '0.75rem', justifyContent: 'center' }}>
                    <CheckCircle2 size={12} /> Set as Winner
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
