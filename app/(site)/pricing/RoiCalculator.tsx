'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 1rem',
  borderRadius: '10px',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-card-border)',
  color: 'var(--color-text-main)',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: 600,
};

/**
 * Interactive ROI Calculator Widget — Industry standard for ERP sites (SAP, Oracle, Zoho all have one).
 * Estimates annual savings based on employees, current software cost, and implementation hours.
 */
export function RoiCalculator() {
  const [employees, setEmployees] = useState(50);
  const [currentCostPerUser, setCurrentCostPerUser] = useState(120); // monthly per user in USD
  const [hoursPerWeekManual, setHoursPerWeekManual] = useState(8);

  // Assumptions (industry-standard ROI model)
  const hourlyRate = 25; // avg. $ saved per hour of automation
  const unierpCostPerUser = 25; // monthly per user (example)
  const automationEfficiency = 0.65; // 65% of manual time automated

  const currentAnnualCost = employees * currentCostPerUser * 12;
  const unierpAnnualCost = employees * unierpCostPerUser * 12;
  const softwareSavings = currentAnnualCost - unierpAnnualCost;

  const hoursAutomated = employees * hoursPerWeekManual * automationEfficiency * 52;
  const productivityValue = hoursAutomated * hourlyRate;

  const totalAnnualBenefit = softwareSavings + productivityValue;
  const roi = unierpAnnualCost > 0 ? Math.round((totalAnnualBenefit / unierpAnnualCost) * 100) : 0;
  const paybackMonths = totalAnnualBenefit > 0 ? Math.max(1, Math.round((unierpAnnualCost / totalAnnualBenefit) * 12)) : 12;

  const fmt = (n: number) =>
    Math.abs(n) >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${Math.round(n).toLocaleString()}`;

  return (
    <div
      className="glass-panel"
      style={{ padding: '2.5rem', maxWidth: '780px', margin: '3rem auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          <Calculator size={18} /> ROI Calculator
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          Calculate Your Savings
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          See your projected return on investment with UniERP
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Employees */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
            Number of Employees
          </label>
          <input
            type="range"
            min="5"
            max="500"
            step="5"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-primary)', marginBottom: '0.25rem' }}
          />
          <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>{employees}</div>
        </div>

        {/* Current software cost */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
            Current Software Cost ($/user/mo)
          </label>
          <input
            type="range"
            min="0"
            max="300"
            step="5"
            value={currentCostPerUser}
            onChange={(e) => setCurrentCostPerUser(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-primary)', marginBottom: '0.25rem' }}
          />
          <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>${currentCostPerUser}/mo</div>
        </div>

        {/* Manual hours */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
            Manual Admin Hours/Week (per employee)
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={hoursPerWeekManual}
            onChange={(e) => setHoursPerWeekManual(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-primary)', marginBottom: '0.25rem' }}
          />
          <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>{hoursPerWeekManual} hrs</div>
        </div>
      </div>

      {/* Results */}
      <div style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(79,70,229,0.08))', borderRadius: '16px', padding: '2rem', border: '1px solid var(--color-primary)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <DollarSign size={24} color="var(--color-emerald)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-emerald)' }}>{fmt(totalAnnualBenefit)}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>Annual Benefit</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <TrendingUp size={24} color="var(--color-primary)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)' }}>{roi}%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>Return on Investment</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <Calculator size={24} color="var(--color-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-amber)' }}>{paybackMonths}mo</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>Payback Period</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>{fmt(softwareSavings)}/yr</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Software savings</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>{fmt(productivityValue)}/yr</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Productivity value</div>
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '1rem', textAlign: 'center' }}>
        * Estimates based on industry averages. Actual savings may vary. Talk to sales for a personalized analysis.
      </p>
    </div>
  );
}
