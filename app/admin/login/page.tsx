'use client';

import { useEffect } from 'react';
import { Shield, Loader2, ArrowRight } from 'lucide-react';

/**
 * Marketing site admin login — OIDC redirect.
 *
 * This page previously contained a form that collected an email and password
 * directly (with hardcoded default credentials in state — SuperAdmin@2026!)
 * and posted them to `/api/admin/login`, completely bypassing the centralized
 * IDP. That is now replaced with a clean redirect to the OIDC hosted login.
 *
 * Admin access is gated by role: only users with a CMS-admin-capable role in
 * the IDP are allowed past the middleware after authenticating.
 */
export default function AdminLoginPage() {
  const idpOrigin = process.env.NEXT_PUBLIC_IDP_ORIGIN || 'http://localhost:3005';
  const returnTo = typeof window !== 'undefined'
    ? `${window.location.origin}/admin`
    : '/admin';
  const oidcUrl = `${idpOrigin}/oidc/login?return_to=${encodeURIComponent(returnTo)}`;

  useEffect(() => {
    window.location.assign(oidcUrl);
  }, [oidcUrl]);

  return (
    <div
      style={{
        minHeight: '100svh',
        background: '#030712',
        color: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        fontFamily: "var(--font-sans, 'Inter', system-ui, sans-serif)",
      }}
    >
      <div
        style={{
          maxWidth: 'min(100%, 28rem)',
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '0.875rem',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.2)',
            color: '#818cf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <Shield size={28} />
        </div>

        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            margin: '0 0 0.5rem',
          }}
        >
          Redirecting to Secure Sign In…
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.875rem',
            margin: '0 0 1.75rem',
            lineHeight: 1.5,
          }}
        >
          Transferring you to the UniERP Centralized Identity &amp; SSO Gateway.
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#818cf8',
            fontSize: '0.875rem',
            fontWeight: 700,
          }}
        >
          <Loader2 size={16} className="animate-spin" /> Authenticating Session
        </div>

        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            width: '100%',
          }}
        >
          <a
            href={oidcUrl}
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.35)',
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
