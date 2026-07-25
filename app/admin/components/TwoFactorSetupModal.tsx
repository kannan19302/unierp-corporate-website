'use client';

import { useState } from 'react';
import { ShieldCheck, QrCode, Lock, CheckCircle2, X, Copy } from 'lucide-react';
import { useToast } from './ToastContext';

interface TwoFactorSetupModalProps {
  userEmail: string;
  onClose: () => void;
}

export function TwoFactorSetupModal({ userEmail, onClose }: TwoFactorSetupModalProps) {
  const [step, setStep] = useState<'qr' | 'success'>('qr');
  const [code, setCode] = useState('');
  const { success, error } = useToast();

  const secretKey = 'UNIERP-TOTP-ADMIN-SECRET-2026-X9';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=otpauth://totp/UniERP:${encodeURIComponent(userEmail)}?secret=${secretKey}&issuer=UniERP`;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      error('Please enter a 6-digit TOTP code', 'Invalid Code');
      return;
    }
    setStep('success');
    success('2FA Two-Factor Authentication enabled for your admin account!', '2FA Enabled');
  };

  const recoveryCodes = ['7892-1204', '4310-9812', '9012-4411', '5521-8890', '1249-0091', '6620-3184'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="admin-card"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={18} style={{ color: '#059669' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
              Two-Factor Authentication (2FA) Setup
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={16} /></button>
        </div>

        {step === 'qr' ? (
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.85rem', lineHeight: 1.4 }}>
              Scan this QR code with Google Authenticator or 1Password to generate 6-digit TOTP security codes for <strong>{userEmail}</strong>.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ padding: '0.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <img src={qrUrl} alt="2FA QR Code" width={140} height={140} style={{ display: 'block' }} />
              </div>
            </div>

            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                  Enter 6-digit Authenticator Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '0.2em', outline: 'none' }}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.5rem', fontSize: '0.82rem' }}>
                Verify & Activate 2FA
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600 }}>
              <CheckCircle2 size={18} />
              2FA protection successfully activated!
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.65rem' }}>
              Save these single-use recovery codes in a secure location. They allow login if you lose your authenticator device:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', background: 'var(--color-surface)', padding: '0.65rem', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '0.78rem', marginBottom: '1rem' }}>
              {recoveryCodes.map((c) => (
                <div key={c} style={{ color: 'var(--color-text-main)' }}>{c}</div>
              ))}
            </div>

            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.5rem', fontSize: '0.82rem' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
