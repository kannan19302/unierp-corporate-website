'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  User,
  Tag,
  Check,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

interface BlogPostData {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: { name: string; role: string; avatar: string };
  content: { heading: string; body: string; codeSnippet?: string }[];
  relatedPosts: { title: string; slug: string; category: string; date: string }[];
}

export function BlogPostClient({ post }: { post: BlogPostData }) {
  useAnalytics(`/blog/${post.slug}`);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ── Reading Progress Bar ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3.5px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #2563eb, #4f46e5)',
          zIndex: 1200,
          transition: 'width 0.1s ease',
        }}
      />

      {/* ═══ 1. ARTICLE HEADER ═══ */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#2563eb',
            textDecoration: 'none',
            marginBottom: '1.5rem',
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to All Articles</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '0.25rem 0.8rem',
              borderRadius: '9999px',
              background: 'rgba(37, 99, 235, 0.1)',
              color: '#2563eb',
            }}
          >
            {post.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} /> {post.date}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> {post.readTime}
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            lineHeight: 1.2,
            letterSpacing: '-0.035em',
            margin: '0 0 1.25rem',
            color: 'var(--color-text-main)',
          }}
        >
          {post.title}
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 2rem' }}>
          {post.excerpt}
        </p>

        {/* Author Card & Social Share Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 0',
            borderTop: '1px solid var(--color-card-border)',
            borderBottom: '1px solid var(--color-card-border)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {post.author.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>{post.author.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{post.author.role} · UniERP Research</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShare}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--color-card-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-main)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {copied ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
            <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>
      </section>

      {/* ═══ 2. ARTICLE BODY ═══ */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <article style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {post.content.map((sec, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--color-text-main)', letterSpacing: '-0.02em', margin: 0 }}>
                {sec.heading}
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
                {sec.body}
              </p>

              {sec.codeSnippet && (
                <div
                  style={{
                    background: '#040711',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: '#93c5fd',
                    overflowX: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  <pre style={{ margin: 0 }}>{sec.codeSnippet}</pre>
                </div>
              )}
            </div>
          ))}
        </article>

        {/* Article End Takeaway Banner */}
        <div
          style={{
            marginTop: '4rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-card-border)',
            borderRadius: '18px',
            padding: '2rem',
            boxShadow: 'var(--glass-shadow)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.35rem' }}>
              Want to see this in your business?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Start your 30-day free trial or book a 1-on-1 demo with our engineering team.
            </p>
          </div>
          <Link href="/register" className="btn-ref-primary">
            <span>Start 30-Day Free Trial</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ═══ 3. RELATED POSTS ═══ */}
      {post.relatedPosts.length > 0 && (
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
            Related Articles &amp; Case Studies
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {post.relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-card-border)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textDecoration: 'none',
                  boxShadow: 'var(--glass-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {rel.category}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0.5rem 0' }}>
                    {rel.title}
                  </h4>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '1rem' }}>
                  {rel.date}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
