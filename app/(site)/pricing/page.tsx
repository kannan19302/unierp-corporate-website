'use client';

import { useState } from 'react';
import { useAnalytics } from '@/lib/useAnalytics';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { LeadForm } from '@/components/site/LeadForm';
import { HeroLeadForm } from '@/components/site/HeroLeadForm';
import { ChevronDown } from 'lucide-react';
import { RoiCalculator } from './RoiCalculator';

export default function PricingPage() {
  useAnalytics('/pricing');
  const { pricingTiers, faqItems } = useSiteContent();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [isAnnual, setIsAnnual] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = faqItems.filter((f) => f.page === '/pricing');

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1rem' }}>Transparent Pricing</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Zero hidden fees. Full free trial, no credit card required.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', background: 'var(--color-surface)', padding: '0.3rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
          <button onClick={() => setCurrency('INR')} style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: currency === 'INR' ? 'var(--color-emerald)' : 'transparent', color: currency === 'INR' ? '#fff' : 'var(--color-text-muted)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
            🇮🇳 ₹ INR
          </button>
          <button onClick={() => setCurrency('USD')} style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: currency === 'USD' ? 'var(--color-primary)' : 'transparent', color: currency === 'USD' ? '#fff' : 'var(--color-text-muted)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
            🌐 $ USD
          </button>
        </div>
        <div style={{ display: 'inline-flex', background: 'var(--color-surface)', padding: '0.3rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
          <button onClick={() => setIsAnnual(true)} style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: isAnnual ? 'var(--color-primary)' : 'transparent', color: isAnnual ? '#fff' : 'var(--color-text-muted)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
            Annual
          </button>
          <button onClick={() => setIsAnnual(false)} style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: !isAnnual ? 'var(--color-primary)' : 'transparent', color: !isAnnual ? '#fff' : 'var(--color-text-muted)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
            Monthly
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
        {pricingTiers.map((tier) => {
          const annual = currency === 'INR' ? tier.priceInrAnnual : tier.priceUsdAnnual;
          const monthly = currency === 'INR' ? tier.priceInrMonthly : tier.priceUsdMonthly;
          const symbol = currency === 'INR' ? '₹' : '$';
          const price = isAnnual ? annual : monthly;

          return (
            <div key={tier.id} className="glass-panel" style={{ padding: '2.5rem', border: tier.highlight ? '2px solid var(--color-primary)' : undefined, boxShadow: tier.highlight ? 'var(--glass-shadow)' : undefined }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--color-text-main)' }}>{tier.name}</h3>
              {tier.blurb && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '44px' }}>{tier.blurb}</p>}
              <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
                {price != null ? (
                  <>
                    {symbol}{price.toLocaleString()}
                    <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 400 }}> {tier.unitLabel}</span>
                  </>
                ) : (
                  tier.priceLabelOverride || 'Custom Quote'
                )}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>✓ {f}</li>
                ))}
              </ul>
              {tier.ctaOpensLeadModal || !tier.ctaHref ? (
                <button onClick={() => setModalOpen(true)} className={tier.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center' }}>
                  {tier.ctaLabel}
                </button>
              ) : (
                <a href={tier.ctaHref} className={tier.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center' }}>
                  {tier.ctaLabel}
                </a>
              )}
            </div>
          );
        })}
        {pricingTiers.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No pricing tiers published yet.</p>}
      </div>

      {/* Interactive ROI Calculator */}
      <RoiCalculator />

      {faqs.length > 0 && (
        <div style={{ maxWidth: '760px', margin: '0 auto 5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem', color: 'var(--color-text-main)' }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((f, idx) => (
              <div key={f.id} className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)', fontWeight: 700, fontSize: '1rem', textAlign: 'left' }}
                >
                  {f.question}
                  <ChevronDown size={18} style={{ transform: openFaq === idx ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }} />
                </button>
                {openFaq === idx && <p style={{ marginTop: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>Start your free trial today</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HeroLeadForm />
        </div>
      </div>

      {modalOpen && <LeadForm variant="modal" defaultSource="pricing_cta" onClose={() => setModalOpen(false)} />}
    </div>
  );
}
