'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Mail, Lock, KeyRound, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('superadmin@unierp.com');
  const [password, setPassword] = useState('SuperAdmin@2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fillDemoCreds = () => {
    setEmail('superadmin@unierp.com');
    setPassword('SuperAdmin@2026!');
    setError('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: '#030712',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "var(--font-sans, 'Inter', system-ui, sans-serif)",
      }}
    >
      {/* Background Mesh Orbs */}
      <div className="mesh-orb mesh-orb-1" style={{ opacity: 0.8 }} />
      <div className="mesh-orb mesh-orb-2" style={{ opacity: 0.8 }} />
      <div className="mesh-orb mesh-orb-3" style={{ opacity: 0.6 }} />

      {/* Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Centered Glassmorphic Login Card */}
      <div
        className="hero-enter"
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(11, 19, 41, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '2.75rem 2.25rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.15)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #38bdf8, #818cf8, transparent)',
            borderRadius: '9999px',
          }}
        />

        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
              marginBottom: '1.25rem',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
              color: '#ffffff',
            }}
          >
            <ShieldCheck size={28} />
          </div>

          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#f8fafc',
              letterSpacing: '-0.02em',
              margin: '0 0 0.4rem 0',
            }}
          >
            Admin Command Tower
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Secure operations for UniERP marketing platform
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#cbd5e1',
                marginBottom: '0.45rem',
              }}
            >
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '1rem',
                  color: '#64748b',
                  display: 'flex',
                }}
              >
                <Mail size={18} />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@unierp.com"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.92rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#cbd5e1',
                marginBottom: '0.45rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '1rem',
                  color: '#64748b',
                  display: 'flex',
                }}
              >
                <Lock size={18} />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.92rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          {/* Credential Helper Box */}
          <div
            onClick={fillDemoCreds}
            style={{
              background: 'rgba(56, 189, 248, 0.06)',
              border: '1px dashed rgba(56, 189, 248, 0.25)',
              borderRadius: '10px',
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontSize: '0.78rem',
              color: '#94a3b8',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)';
              e.currentTarget.style.borderColor = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
            }}
            title="Click to fill default admin credentials"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <KeyRound size={14} color="#38bdf8" />
              <span>Default Super Admin credentials</span>
            </div>
            <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.75rem' }}>Auto-fill</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-ripple"
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.75 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
              marginTop: '0.25rem',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
              }
            }}
          >
            {loading ? 'Authenticating…' : 'Sign in to Command Tower'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Card Footer Link */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem' }}>
          <Link
            href="/"
            style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 500,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            &larr; Return to Corporate Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
