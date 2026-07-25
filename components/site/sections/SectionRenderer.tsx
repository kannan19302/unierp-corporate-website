'use client';

import Link from 'next/link';
import type { Section } from '@/lib/cms/section-schema';
import { useSiteContent } from '../SiteContentProvider';
import { DynamicIcon } from '../DynamicIcon';
import { StatBar, LogoWall, TestimonialGrid } from '../SocialProof';
import { useIntersectionObserver, getStaggerStyle } from '@/lib/useIntersectionObserver';
import { CheckCircle2, Play } from 'lucide-react';

const ACCENT_COLORS: Record<string, string> = {
  primary: 'var(--color-primary)',
  emerald: 'var(--color-emerald)',
  purple: 'var(--color-purple)',
  amber: 'var(--color-amber)',
};

/** Wrapper that triggers scroll-reveal on section entry */
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.06 });
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, idx) => (
        <RevealSection key={section.id} delay={idx * 40}>
          <SectionBlock section={section} />
        </RevealSection>
      ))}
    </>
  );
}

function SectionBlock({ section }: { section: Section }) {
  const { features, settings, testimonials } = useSiteContent();

  switch (section.type) {
    case 'stat-bar':
      return <StatBar />;

    case 'logo-wall':
      return <LogoWall />;

    case 'testimonials':
      return (
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          {section.heading && (
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{section.heading}</h2>
            </div>
          )}
          <TestimonialGrid />
        </section>
      );

    case 'feature-grid': {
      const items = section.source === 'highlighted' ? features.filter((f) => f.highlighted) : features;
      const limited = section.limit ? items.slice(0, section.limit) : items;
      return (
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          {(section.heading || section.subheading) && (
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              {section.heading && <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>{section.heading}</h2>}
              {section.subheading && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>{section.subheading}</p>}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: section.ctaLabel ? '2.5rem' : 0 }}>
            {limited.map((f, i) => (
              <div
                key={f.id}
                className="glass-panel hover-lift"
                style={{ padding: '2rem', ...getStaggerStyle(i) }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <DynamicIcon name={f.iconName} size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{f.name}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
          {section.ctaLabel && section.ctaHref && (
            <div style={{ textAlign: 'center' }}>
              <Link href={section.ctaHref} className="btn-secondary">{section.ctaLabel}</Link>
            </div>
          )}
        </section>
      );
    }

    case 'feature-cards':
      return (
        <section style={{ background: section.background === 'surface' ? 'var(--color-surface)' : undefined, padding: '4rem 1.5rem', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              {section.eyebrow && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-emerald)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  {section.eyebrowIconName && <DynamicIcon name={section.eyebrowIconName} size={18} />}
                  <span>{section.eyebrow}</span>
                </div>
              )}
              {section.heading && <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{section.heading}</h2>}
              {section.subheading && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginTop: '0.75rem' }}>{section.subheading}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="glass-panel hover-lift"
                  style={{ padding: '2rem', ...getStaggerStyle(i) }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-glow)', color: ACCENT_COLORS[item.accent || 'primary'], display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <DynamicIcon name={item.iconName} size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem', textAlign: 'center' }}>
          <div className="glass-panel cta-glow" style={{ padding: '3rem 2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>{section.heading}</h2>
            {section.body && <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>{section.body}</p>}
            <Link href={section.ctaHref} className="btn-primary btn-ripple">{section.ctaLabel}</Link>
          </div>
        </section>
      );

    case 'rich-text':
      return (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {section.heading && <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>{section.heading}</h2>}
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{section.body}</p>
        </section>
      );

    case 'process-steps':
      return (
        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          {(section.heading || section.subheading) && (
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              {section.heading && <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>{section.heading}</h2>}
              {section.subheading && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>{section.subheading}</p>}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {section.steps.map((step, i) => (
              <div
                key={step.number}
                className="glass-panel hover-lift"
                style={{ padding: '1.75rem 2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', ...getStaggerStyle(i) }}
              >
                <div className="process-step-number">{step.number}</div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case 'comparison-table':
      return (
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem', overflowX: 'auto' }}>
          {(section.heading || section.subheading) && (
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              {section.heading && <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>{section.heading}</h2>}
              {section.subheading && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>{section.subheading}</p>}
            </div>
          )}
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--color-card)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--glass-shadow)' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Feature</th>
                {section.competitors.map((name, i) => (
                  <th
                    key={name}
                    className={i === section.ourColumnIndex ? 'our-col' : ''}
                    style={{ fontWeight: 800, color: i === section.ourColumnIndex ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                  >
                    {i === section.ourColumnIndex ? '⭐ ' : ''}{name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{row.feature}</td>
                  {row.values.map((val, vi) => (
                    <td
                      key={vi}
                      className={vi === section.ourColumnIndex ? 'our-col' : ''}
                    >
                      {typeof val === 'boolean' ? (
                        val
                          ? <CheckCircle2 size={20} color="var(--color-emerald)" style={{ margin: '0 auto', display: 'block' }} />
                          : <span style={{ color: 'var(--color-text-subtle)' }}>—</span>
                      ) : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );

    case 'video-embed':
      return (
        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          {(section.heading || section.subheading) && (
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {section.heading && <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>{section.heading}</h2>}
              {section.subheading && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>{section.subheading}</p>}
            </div>
          )}
          <div style={{ position: 'relative', paddingBottom: `${(1 / eval(section.aspectRatio)) * 100}%`, borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--glass-shadow)' }}>
            {section.videoUrl ? (
              <iframe
                src={section.videoUrl}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                <Play size={48} />
              </div>
            )}
          </div>
        </section>
      );

    case 'hero-split': {
      const imageLeft = section.imagePosition === 'left';
      return (
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', flexDirection: imageLeft ? 'row-reverse' : undefined as any }}>
            {imageLeft && section.imageUrl && (
              <div className="reveal reveal-left visible">
                <img src={section.imageUrl} alt={section.imageAlt || ''} style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--glass-shadow)' }} />
              </div>
            )}
            <div className="reveal reveal-right visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.15, color: 'var(--color-text-main)' }}>{section.heading}</h2>
              {section.body && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{section.body}</p>}
              {section.ctaLabel && section.ctaHref && (
                <div>
                  <Link href={section.ctaHref} className="btn-primary btn-ripple">{section.ctaLabel}</Link>
                </div>
              )}
            </div>
            {!imageLeft && section.imageUrl && (
              <div className="reveal reveal-right visible">
                <img src={section.imageUrl} alt={section.imageAlt || ''} style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--glass-shadow)' }} />
              </div>
            )}
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}
