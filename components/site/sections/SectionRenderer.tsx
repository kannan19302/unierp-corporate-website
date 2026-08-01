'use client';

import Link from 'next/link';
import type { Section } from '@/lib/cms/section-schema';
import { useSiteContent } from '../SiteContentProvider';
import { DynamicIcon } from '../DynamicIcon';
import { StatBar, LogoWall, TestimonialGrid } from '../SocialProof';
import { FramerReveal, StaggerGroup, StaggerItem, EASE_OUT_EXPO } from '../anim/FramerReveal';
import { TiltCard } from '../anim/TiltCard';
import { Magnetic } from '../anim/Magnetic';
import { SectionHeading } from '../anim/SectionHeading';
import { CheckCircle2, Play, ArrowRight, Sparkles } from 'lucide-react';

const ACCENT_COLORS: Record<string, string> = {
  primary: 'var(--color-primary)',
  emerald: 'var(--color-emerald)',
  purple: 'var(--color-purple)',
  amber: 'var(--color-amber)',
};

const ACCENT_HEX: Record<string, string> = {
  primary: '#38bdf8',
  emerald: '#34d399',
  purple: '#a78bfa',
  amber: '#fbbf24',
};

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => (
        <SectionBlock key={section.id} section={section} />
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
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem' }}>
          {section.heading && (
            <SectionHeading
              eyebrow={<><Sparkles size={13} /> Loved worldwide</>}
              title={section.heading}
              accent="in their words"
              sub="Real operators, real businesses — running their entire world on UniERP."
            />
          )}
          <div style={{ marginTop: '3rem' }}>
            <TestimonialGrid />
          </div>
        </section>
      );

    case 'feature-grid': {
      const items = section.source === 'highlighted' ? features.filter((f) => f.highlighted) : features;
      const limited = section.limit ? items.slice(0, section.limit) : items;
      return (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem' }}>
          {(section.heading || section.subheading) && (
            <SectionHeading
              eyebrow="Modules"
              title={section.heading || 'One system, every module'}
              accent="in perfect sync"
              sub={section.subheading}
            />
          )}
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginTop: '3rem' }}>
            {limited.map((f) => (
              <StaggerItem key={f.id}>
                <TiltCard className="hologram hologram-sheen" style={{ padding: '1.75rem', height: '100%' }}>
                  <div
                    style={{
                      width: 50, height: 50, borderRadius: 14, marginBottom: '1.1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--color-primary-glow)', color: 'var(--color-primary)',
                    }}
                  >
                    <DynamicIcon name={f.iconName} size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{f.name}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{f.description}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
          {section.ctaLabel && section.ctaHref && (
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Magnetic strength={0.3}>
                <Link href={section.ctaHref} className="btn-ghost-cosmic">
                  {section.ctaLabel} <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </div>
          )}
        </section>
      );
    }

    case 'feature-cards':
      return (
        <section
          style={{
            background: section.background === 'surface' ? 'var(--color-surface)' : undefined,
            padding: '5rem 1.5rem',
            borderTop: '1px solid var(--glass-border)',
            borderBottom: '1px solid var(--glass-border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.heading || 'Capabilities'}
              accent="built to interlock"
              sub={section.subheading}
            />
            <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginTop: '3rem' }}>
              {section.items.map((item) => (
                <StaggerItem key={item.title}>
                  <TiltCard className="hologram hologram-sheen" style={{ padding: '1.75rem', height: '100%' }}>
                    <div
                      style={{
                        width: 50, height: 50, borderRadius: 14, marginBottom: '1.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${ACCENT_HEX[item.accent || 'primary']}1f`,
                        border: `1px solid ${ACCENT_HEX[item.accent || 'primary']}33`,
                        color: ACCENT_COLORS[item.accent || 'primary'],
                      }}
                    >
                      <DynamicIcon name={item.iconName} size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 5rem', textAlign: 'center' }}>
          <FramerReveal as="div">
            <div className="hologram hologram-sheen" style={{ padding: '3.5rem 2rem', position: 'relative' }}>
              <div className="cosmic-aurora cosmic-aurora--conic" aria-hidden />
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text-main)', margin: '0 0 1rem' }}>
                {section.heading}
              </h2>
              {section.body && <p style={{ color: 'var(--color-text-muted)', margin: '0 0 2rem', fontSize: '1.05rem' }}>{section.body}</p>}
              <Magnetic strength={0.3}>
                <Link href={section.ctaHref} className="btn-cosmic">
                  {section.ctaLabel} <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </div>
          </FramerReveal>
        </section>
      );

    case 'rich-text':
      return (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem' }}>
          <FramerReveal as="div">
            {section.heading && <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>{section.heading}</h2>}
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{section.body}</p>
          </FramerReveal>
        </section>
      );

    case 'process-steps':
      return (
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '5rem 1.5rem' }}>
          <SectionHeading
            eyebrow="How it works"
            title={section.heading || 'From zero to operating system'}
            accent="in four steps"
            sub={section.subheading}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '3rem' }}>
            {section.steps.map((step, i) => (
              <FramerReveal key={step.number} delay={i * 0.08}>
                <div className="hologram" style={{ padding: '1.75rem 2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div className="process-step-number">{step.number}</div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>{step.body}</p>
                  </div>
                </div>
              </FramerReveal>
            ))}
          </div>
        </section>
      );

    case 'comparison-table':
      return (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 1.5rem', overflowX: 'auto' }}>
          <SectionHeading title={section.heading || 'Why UniERP'} accent="wins" sub={section.subheading} />
          <FramerReveal as="div" delay={0.1} style={{ marginTop: '2.5rem' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--glass-bg)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--glass-shadow)', backdropFilter: 'blur(14px)' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Feature</th>
                  {section.competitors.map((name, i) => (
                    <th
                      key={name}
                      className={i === section.ourColumnIndex ? 'our-col' : ''}
                      style={{ fontWeight: 800, color: i === section.ourColumnIndex ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                    >
                      {i === section.ourColumnIndex ? '★ ' : ''}{name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{row.feature}</td>
                    {row.values.map((val, vi) => (
                      <td key={vi} className={vi === section.ourColumnIndex ? 'our-col' : ''}>
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
          </FramerReveal>
        </section>
      );

    case 'video-embed':
      return (
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '5rem 1.5rem' }}>
          <SectionHeading title={section.heading || 'See it in motion'} accent="on screen" sub={section.subheading} />
          <FramerReveal as="div" delay={0.1} style={{ marginTop: '2.5rem' }}>
            <div
              className="hologram"
              style={{
                position: 'relative',
                paddingBottom: `${(1 / eval(section.aspectRatio)) * 100}%`,
                borderRadius: 24,
                overflow: 'hidden',
                padding: 0,
              }}
            >
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
          </FramerReveal>
        </section>
      );

    case 'hero-split': {
      const imageLeft = section.imagePosition === 'left';
      return (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {imageLeft && section.imageUrl && (
              <FramerReveal as="div" direction="left">
                <img src={section.imageUrl} alt={section.imageAlt || ''} className="hologram" style={{ width: '100%', padding: 0 }} />
              </FramerReveal>
            )}
            <FramerReveal as="div" direction={imageLeft ? 'right' : 'left'} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.15, color: 'var(--color-text-main)', letterSpacing: '-0.02em' }}>{section.heading}</h2>
              {section.body && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>{section.body}</p>}
              {section.ctaLabel && section.ctaHref && (
                <div>
                  <Magnetic strength={0.3}>
                    <Link href={section.ctaHref} className="btn-cosmic">
                      {section.ctaLabel} <ArrowRight size={16} />
                    </Link>
                  </Magnetic>
                </div>
              )}
            </FramerReveal>
            {!imageLeft && section.imageUrl && (
              <FramerReveal as="div" direction="right">
                <img src={section.imageUrl} alt={section.imageAlt || ''} className="hologram" style={{ width: '100%', padding: 0 }} />
              </FramerReveal>
            )}
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}
