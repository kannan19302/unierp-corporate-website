'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Sparkles, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterRedirectInner />
    </Suspense>
  );
}

function RegisterRedirectInner() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || searchParams.get('return_to') || 'http://localhost:4000';
  const targetOidcUrl = `http://localhost:3005/oidc/register?return_to=${encodeURIComponent(returnTo)}`;

  useEffect(() => {
    // Immediate clean browser redirect to centralized OIDC Identity Provider hosted registration
    window.location.assign(targetOidcUrl);
  }, [targetOidcUrl]);

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'var(--color-bg)',
        color: 'var(--color-text-main)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6, 1.5rem)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 'min(100%, 28rem)',
          width: '100%',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 'var(--radius-xl, 1.5rem)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--glass-shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-lg, 0.875rem)',
            background: 'var(--color-primary-glow)',
            border: '1px solid var(--color-card-border)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <Sparkles size={28} />
        </div>

        <h1
          style={{
            fontSize: 'var(--text-xl, 1.5rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            margin: '0 0 0.5rem',
          }}
        >
          Starting Organization Setup…
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm, 0.875rem)', margin: '0 0 1.75rem', lineHeight: 1.5 }}>
          Transferring you to the UniERP Centralized Identity & Organization Registration Portal.
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
          <Loader2 size={16} className="animate-spin" /> Preparing Workspace
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-card-border)', width: '100%' }}>
          <a
            href={targetOidcUrl}
            style={{
              fontSize: 'var(--text-xs, 0.8rem)',
              color: 'var(--color-text-subtle)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Click here if you are not automatically redirected <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
