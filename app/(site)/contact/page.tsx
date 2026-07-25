'use client';

import { CheckCircle2, Calendar } from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { LeadForm } from '@/components/site/LeadForm';

export default function ContactPage() {
  useAnalytics('/contact');
  const { settings } = useSiteContent();
  const demoUrl = settings.demoBookingUrl;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        <div>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>Talk to a {settings.brandName} specialist</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Tell us about your business and we&apos;ll tailor a demo around what matters most to you.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {['Response within one business day', 'Free trial, no credit card required', 'Dedicated onboarding for Enterprise plans'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="var(--color-emerald)" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <LeadForm variant="inline" defaultSource="contact_page" />
      </div>

      {/* Book a Demo Calendar Integration Teaser */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(79,70,229,0.06))',
          border: '1px solid var(--color-primary-glow)',
          borderRadius: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>
          <Calendar size={20} /> Instant Booking
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
          Prefer to book directly on our calendar?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Skip the queue and select a time for a 15-minute introductory video call with a UniERP solution architect.
        </p>
        <a
          href={demoUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-ripple"
          onClick={(e) => {
            if (!demoUrl) {
              e.preventDefault();
              alert("A calendar demo booking link hasn't been configured by the admin yet. Please submit the form above, and our specialist will reach out to schedule!");
            }
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          Book 15-Min Intro Call
        </a>
      </div>
    </div>
  );
}
