'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Award, ChevronRight, CheckCircle2, Compass, ExternalLink, Globe2,
  Apple, Smartphone, ArrowRight, Sparkles, Shield, Zap, Activity,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { HeroLeadForm } from '@/components/site/HeroLeadForm';
import { useSiteContent } from '@/components/site/SiteContentProvider';
import { SectionRenderer } from '@/components/site/sections/SectionRenderer';
import { HeroSceneCanvas } from '@/components/site/hero/HeroSceneCanvas';
import { CosmicStory, type StoryStep } from '@/components/site/home/CosmicStory';
import { OrbitModules } from '@/components/site/home/OrbitModules';
import { FramerReveal, StaggerGroup, StaggerItem } from '@/components/site/anim/FramerReveal';
import { SectionHeading } from '@/components/site/anim/SectionHeading';
import { TiltCard } from '@/components/site/anim/TiltCard';
import { Magnetic } from '@/components/site/anim/Magnetic';
import { AnimatedCounter } from '@/components/site/anim/AnimatedCounter';
import type { Section } from '@/lib/cms/section-schema';

const PLATFORM_CARDS = [
  { icon: Globe2, label: 'Web', desc: 'Full-featured, responsive web app — works in any modern browser.', accent: '#38bdf8' },
  { icon: Apple, label: 'iOS', desc: 'Native mobile app built with Flutter, for phones and tablets.', accent: '#a78bfa' },
  { icon: Smartphone, label: 'Android', desc: 'Native mobile app built with Flutter, for phones and tablets.', accent: '#34d399' },
];

const TELEMETRY = [
  { value: 120, suffix: '+', label: 'Countries' },
  { value: 99.99, suffix: '%', decimals: 2, label: 'Uptime SLA' },
  { value: 4.2, suffix: 'B+', prefix: '$', decimals: 1, label: 'Processed yearly' },
];

/* ── Mini dashboard visual for the "Connect" story chapter ────────────── */
function FinanceConsole() {
  const rows = [
    { label: 'Revenue — Q3', pct: 86, color: '#34d399' },
    { label: 'Payables cleared', pct: 72, color: '#38bdf8' },
    { label: 'Cash on hand', pct: 61, color: '#a78bfa' },
  ];
  return (
    <div className="hologram hologram-sheen" style={{ width: 'min(100%, 460px)', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-subtle)' }}>Finance & Accounting</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Live consolidated view</div>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 700, color: '#10b981' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,0.25)' }} /> SYNCED
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
              <span>{r.label}</span>
              <span style={{ fontWeight: 700, color: r.color }}>{r.pct}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 9999, background: 'var(--color-surface-hover)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${r.pct}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', borderRadius: 9999, background: `linear-gradient(90deg, ${r.color}88, ${r.color})`, boxShadow: `0 0 12px ${r.color}66` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── "Scale" story visual — global telemetry ─────────────────────────── */
function ScaleConsole() {
  return (
    <div className="hologram" style={{ width: 'min(100%, 460px)', padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {TELEMETRY.map((t) => (
          <div key={t.label} style={{ textAlign: 'center', padding: '1.25rem 0.75rem', borderRadius: 18, background: 'var(--color-surface)', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text-main)' }}>
              <AnimatedCounter value={t.value} prefix={t.prefix || ''} suffix={t.suffix} decimals={t.decimals || 0} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{t.label}</div>
          </div>
        ))}
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', paddingTop: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>One OS. Every market. <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
        </div>
      </div>
    </div>
  );
}

interface PageContentShape {
  badgeText?: string | null;
  heroHeadline?: string | null;
  heroHeadlineAccent?: string | null;
  heroSubheadline?: string | null;
  heroBullets?: string[];
  sections?: unknown;
  jsonLd?: unknown;
}

const DEFAULT_BULLETS = ['30 Days Full Access', 'No Credit Card Required', 'Ready to go'];

export default function HomeClient({ page }: { page: PageContentShape | null }) {
  useAnalytics('/');
  const { settings } = useSiteContent();
  const erpAppUrl = settings.erpAppUrl;
  const heroRef = useRef<HTMLDivElement>(null);

  const sections = (page?.sections as Section[] | undefined) || [];
  const bullets = page?.heroBullets && page.heroBullets.length > 0 ? page.heroBullets : DEFAULT_BULLETS;

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const canvasY = useTransform(scrollYProgress, [0, 1], ['6%', '44%']);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%']);

  const storySteps: StoryStep[] = [
    {
      eyebrow: '01 · Connect',
      title: 'One source of truth',
      accent: 'for every department',
      body: 'Finance, HR, CRM, inventory and operations stop living in silos. Every team reads from the same live ledger — reconciled, audited and always in sync.',
      visual: <FinanceConsole />,
    },
    {
      eyebrow: '02 · Orchestrate',
      title: 'Modules in orbit,',
      accent: 'working as one system',
      body: 'Install only what you need and watch your modules interlock — an order in sales flows straight into procurement, manufacturing, and finance without a single manual re-entry.',
      visual: <OrbitModules />,
    },
    {
      eyebrow: '03 · Scale',
      title: 'Global by design,',
      accent: 'local by default',
      body: 'Multi-entity, multi-currency, multi-language, and a platform that stays fast at millions of rows. Grow from one office to every time zone on the same operating system.',
      visual: <ScaleConsole />,
    },
  ];

  return (
    <div>
      {page?.jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.jsonLd) }} />
      ) : null}

      {/* ═══ HERO — animated 3D earth of modules ═══ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100svh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '7.5rem 1.5rem 4rem',
        }}
      >
        <div className="cosmic-aurora" aria-hidden />

        {/* WebGL earth + orbiting modules */}
        <motion.div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, y: canvasY, scale: canvasScale, pointerEvents: 'none' }}>
          <HeroSceneCanvas />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1040,
            margin: '0 auto',
            textAlign: 'center',
            opacity: textOpacity,
            y: textY,
          }}
        >
          <FramerReveal as="div" delay={0}>
            <span
              className="hologram"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.45rem 1.25rem', borderRadius: 9999, fontSize: '0.85rem', fontWeight: 700,
                color: 'var(--color-primary)', marginBottom: '2rem',
              }}
            >
              <Sparkles size={15} />
              {page?.badgeText || 'Get Started Today'}
              <ChevronRight size={14} />
            </span>
          </FramerReveal>

          <FramerReveal as="div" delay={0.08}>
            <h1
              style={{
                fontSize: 'clamp(3rem, 7.5vw, 5.6rem)',
                fontWeight: 900,
                lineHeight: 1.03,
                letterSpacing: '-0.035em',
                margin: '0 0 1.5rem',
                color: 'var(--color-text-main)',
                textWrap: 'balance',
              }}
            >
              {page?.heroHeadline || `Welcome to ${settings.brandName}`}
              {page?.heroHeadlineAccent && <> <span className="cosmic-text">{page.heroHeadlineAccent}</span></>}
            </h1>
          </FramerReveal>

          {page?.heroSubheadline && (
            <FramerReveal as="div" delay={0.16}>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                  color: 'var(--color-text-muted)',
                  maxWidth: 780,
                  margin: '0 auto 2.75rem',
                  lineHeight: 1.65,
                  textWrap: 'balance',
                }}
              >
                {page.heroSubheadline}
              </p>
            </FramerReveal>
          )}

          <FramerReveal as="div" delay={0.24}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <Magnetic strength={0.3}>
                <HeroLeadForm />
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href={`${erpAppUrl}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-cosmic"
                  style={{ borderRadius: '16px' }}
                >
                  <Compass size={18} />
                  <span>Explore Instant Demo</span>
                  <ExternalLink size={15} />
                </a>
              </Magnetic>
            </div>
          </FramerReveal>

          <FramerReveal as="div" delay={0.32}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: 'var(--color-text-subtle)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
              {bullets.map((b) => (
                <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} color="var(--color-emerald)" /> {b}
                </span>
              ))}
            </div>
          </FramerReveal>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          style={{ position: 'absolute', bottom: '1.75rem', left: '50%', zIndex: 2, transform: 'translateX(-50%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{ width: 22, height: 36, borderRadius: 9999, border: '2px solid var(--color-text-subtle)', display: 'flex', justifyContent: 'center', paddingTop: 6 }}
          >
            <span style={{ width: 3, height: 8, borderRadius: 9999, background: 'var(--color-primary)' }} />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 160, background: 'linear-gradient(to bottom, transparent, var(--color-bg))', zIndex: 1 }} />
      </section>

      {/* ═══ PLATFORM AVAILABILITY — holographic panels ═══ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <SectionHeading
          eyebrow={<><Zap size={13} /> One OS · Every device</>}
          title="One platform,"
          accent="everywhere your team works"
          sub="Available on Web and native Mobile apps — the same live operating system in your pocket, on the desk, or in the warehouse."
        />
        <StaggerGroup className="grid md:grid-cols-3 gap-6" stagger={0.12} style={{ marginTop: '3rem' }}>
          {PLATFORM_CARDS.map((p) => (
            <StaggerItem key={p.label}>
              <TiltCard className="hologram hologram-sheen" style={{ padding: '2rem', height: '100%' }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 16, marginBottom: '1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(135deg, ${p.accent}26, ${p.accent}0d)`,
                    border: `1px solid ${p.accent}33`,
                    color: p.accent,
                  }}
                >
                  <p.icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{p.label}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* ═══ CINEMATIC SCROLL STORY — the operating system ═══ */}
      <section aria-label="How UniERP works">
        <CosmicStory steps={storySteps} />
      </section>

      {/* ═══ CMS SECTIONS (feature grids, testimonials, CTA, …) ═══ */}
      <SectionRenderer sections={sections} />

      {sections.length === 0 && (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 6rem', textAlign: 'center' }}>
          <div className="hologram hologram-sheen" style={{ padding: '3.5rem 2rem' }}>
            <SectionHeading
              eyebrow={<><Sparkles size={13} /> Your business, in orbit</>}
              title="Ready to get started?"
              accent="30 days free."
              sub="Spin up your operating system in minutes. No credit card, no friction — just your data, unified."
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Magnetic strength={0.3}>
                <Link href="/contact" className="btn-cosmic">
                  Talk to Sales <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/pricing" className="btn-ghost-cosmic">
                  <Shield size={16} /> View pricing
                </Link>
              </Magnetic>
            </div>
          </div>
        </section>
      )}

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem', textAlign: 'center' }}>
        <FramerReveal as="div">
          <div className="hologram hologram-sheen" style={{ padding: '4rem 2rem' }}>
            <div className="cosmic-aurora cosmic-aurora--conic" aria-hidden />
            <Activity size={34} style={{ color: 'var(--color-primary)', margin: '0 auto 1.25rem', display: 'block' }} />
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text-main)', margin: '0 0 1rem' }}>
              Power your business with <span className="cosmic-text">one operating system</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
              Join the businesses running their entire world on UniERP — finance to field service, in every time zone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Magnetic strength={0.3}>
                <a
                  href={`${erpAppUrl}${settings.erpRegisterPath || '/register'}`}
                  className="btn-cosmic"
                >
                  Start 30-Day Free Trial <ArrowRight size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/contact?type=demo" className="btn-ghost-cosmic">
                  Book a Live Demo
                </Link>
              </Magnetic>
            </div>
          </div>
        </FramerReveal>
      </section>
    </div>
  );
}
