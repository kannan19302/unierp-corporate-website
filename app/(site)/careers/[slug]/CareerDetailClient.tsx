'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Send,
  X,
  Upload,
  Check,
  Building2,
  Heart,
  Globe,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

interface JobData {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export function CareerDetailClient({ job }: { job: JobData }) {
  useAnalytics(`/careers/${job.slug}`);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setApplyModalOpen(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setLinkedin('');
      setResumeName('');
    }, 2500);
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. JOB HEADER ═══ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <Link
          href="/careers"
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
          <span>Back to All Open Roles</span>
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
            {job.department}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} /> {job.location}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {job.type}
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            lineHeight: 1.15,
            letterSpacing: '-0.035em',
            margin: '0 0 1.25rem',
            color: 'var(--color-text-main)',
          }}
        >
          {job.title}
        </h1>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
            💰 {job.salary}
          </div>
          <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
            🎯 {job.experience} experience
          </div>
        </div>

        <button
          type="button"
          onClick={() => setApplyModalOpen(true)}
          style={{
            padding: '0.85rem 2rem',
            borderRadius: '10px',
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
            transition: 'all 0.2s',
          }}
        >
          <span>Apply for this Role</span>
          <ArrowRight size={16} />
        </button>
      </section>

      {/* ═══ 2. JOB DETAILS ═══ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left Column: Responsibilities & Requirements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
                Role Overview
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                {job.overview}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                What You Will Do
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {job.responsibilities.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                What We Are Looking For
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {job.requirements.map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Benefits Card */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: 'var(--glass-shadow)',
              position: 'sticky',
              top: '90px',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
              Why Join UniERP?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {job.benefits.map((b, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                  <Sparkles size={15} color="#2563eb" style={{ flexShrink: 0 }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setApplyModalOpen(true)}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '8px',
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.92rem',
                fontWeight: 800,
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* ═══ APPLICATION MODAL ═══ */}
      {applyModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '540px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              type="button"
              onClick={() => setApplyModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb', marginBottom: '0.5rem' }}>
              Application Form
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.5rem' }}>
              Apply for {job.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 1.5rem' }}>
              {job.department} · {job.location}
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#059669',
                }}
              >
                <CheckCircle2 size={36} style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#065f46' }}>
                  Application Submitted!
                </div>
                <p style={{ fontSize: '0.88rem', color: '#047857', margin: '0.35rem 0 0' }}>
                  Thank you, {fullName}. Our engineering recruiting team will review your application and respond within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-card-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--color-card-border)',
                        background: 'var(--color-bg)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--color-card-border)',
                        background: 'var(--color-bg)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    LinkedIn or Portfolio URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/janedoe"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-card-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Attach Resume (PDF / DOCX)
                  </label>
                  <div
                    style={{
                      border: '1.5px dashed var(--color-card-border)',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      textAlign: 'center',
                      background: 'var(--color-bg)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setResumeName('Jane_Doe_Resume_2026.pdf');
                    }}
                  >
                    <Upload size={20} color="#2563eb" style={{ margin: '0 auto 0.35rem' }} />
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                      {resumeName ? `✓ ${resumeName}` : 'Click to select or drag & drop resume file'}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
