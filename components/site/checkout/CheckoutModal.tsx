'use client';

import React, { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  CreditCard,
  Lock,
  ArrowRight,
  ChevronRight,
  Users,
  Percent,
} from 'lucide-react';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: 'standard' | 'pro' | 'enterprise';
  initialBilling?: 'annual' | 'monthly';
  initialCurrency?: 'INR' | 'USD' | 'EUR' | 'GBP';
}

const TIER_RATES = {
  standard: {
    name: 'Standard Tier',
    minUsers: 1,
    defaultUsers: 5,
    maxUsers: 25,
    pricing: {
      USD: { monthly: 49, annual: 39, symbol: '$' },
      INR: { monthly: 1249, annual: 999, symbol: '₹' },
      EUR: { monthly: 45, annual: 35, symbol: '€' },
      GBP: { monthly: 39, annual: 29, symbol: '£' },
    },
    features: ['Double-Entry General Ledger (GL, AR, AP)', 'CRM & Lead Management', 'Inventory Tracking & Warehousing', 'Standard Email Support'],
  },
  pro: {
    name: 'Professional Tier',
    minUsers: 5,
    defaultUsers: 15,
    maxUsers: 100,
    pricing: {
      USD: { monthly: 109, annual: 89, symbol: '$' },
      INR: { monthly: 2499, annual: 1999, symbol: '₹' },
      EUR: { monthly: 99, annual: 82, symbol: '€' },
      GBP: { monthly: 85, annual: 69, symbol: '£' },
    },
    features: ['Everything in Standard', 'Manufacturing & MRP II Work Orders', 'Visual Workflow Automation DAGs', 'Sub-50ms Matrix CPQ', 'Priority 4h Support SLA'],
  },
  enterprise: {
    name: 'Enterprise Tier',
    minUsers: 25,
    defaultUsers: 50,
    maxUsers: 500,
    pricing: {
      USD: { monthly: 249, annual: 199, symbol: '$' },
      INR: { monthly: 5999, annual: 4999, symbol: '₹' },
      EUR: { monthly: 229, annual: 185, symbol: '€' },
      GBP: { monthly: 199, annual: 159, symbol: '£' },
    },
    features: ['Everything in Pro', 'Unlimited Users & Organizations', 'Dedicated Single-Tenant VPC / Helm', 'Enterprise SSO / SAML 2.0 / SCIM', '99.999% Guaranteed SLA & 24/7 Phone Support'],
  },
};

export function CheckoutModal({
  isOpen,
  onClose,
  initialPlan = 'pro',
  initialBilling = 'annual',
  initialCurrency = 'USD',
}: CheckoutModalProps) {
  const router = useRouter();
  const titleId = useId();
  const descId = useId();

  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro' | 'enterprise'>(initialPlan);
  const [billing, setBilling] = useState<'annual' | 'monthly'>(initialBilling);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>(initialCurrency);
  const [userCount, setUserCount] = useState<number>(TIER_RATES[initialPlan].defaultUsers);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponDiscountPct, setCouponDiscountPct] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentTier = TIER_RATES[selectedPlan];
  const rateInfo = currentTier.pricing[currency];
  const unitPrice = billing === 'annual' ? rateInfo.annual : rateInfo.monthly;
  const rawSubtotal = unitPrice * userCount * (billing === 'annual' ? 12 : 1);
  const discountAmount = couponApplied ? Math.round((rawSubtotal * couponDiscountPct) / 100) : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (code === 'GROWTH20' || code === 'UNIERP20' || code === 'OVERTAKE') {
      setCouponApplied(true);
      setCouponDiscountPct(20);
      setCouponError('');
    } else if (code === 'STARTUP50') {
      setCouponApplied(true);
      setCouponDiscountPct(50);
      setCouponError('');
    } else {
      setCouponError('Invalid promotion code. Try GROWTH20');
      setCouponApplied(false);
      setCouponDiscountPct(0);
    }
  };

  const handleStartTrial = () => {
    const params = new URLSearchParams({
      plan: selectedPlan,
      billing,
      seats: userCount.toString(),
      currency,
      source: 'checkout_modal_trial',
    });
    if (couponApplied) params.set('coupon', couponCode.trim().toUpperCase());
    onClose();
    router.push(`/register?${params.toString()}`);
  };

  const handleInstantSubscribe = async () => {
    setIsProcessing(true);
    const params = new URLSearchParams({
      plan: selectedPlan,
      billing,
      seats: userCount.toString(),
      currency,
      checkout: 'true',
      source: 'checkout_modal_direct',
    });
    if (couponApplied) params.set('coupon', couponCode.trim().toUpperCase());
    
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      router.push(`/register?${params.toString()}`);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-card-border)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.75rem 2rem 1.25rem',
            borderBottom: '1px solid var(--color-card-border)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#2563eb',
                background: 'rgba(37, 99, 235, 0.1)',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                marginBottom: '0.5rem',
              }}
            >
              <Zap size={12} />
              <span>Instant Workspace Provisioning</span>
            </div>
            <h2 id={titleId} style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
              Configure Your UniERP Subscription
            </h2>
            <p id={descId} style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Select your tier, team seats, and payment schedule. Cancel or upgrade anytime.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '9999px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Configuration Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Tier Selector Tabs */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                1. Select Platform Tier
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {(['standard', 'pro', 'enterprise'] as const).map((tierKey) => {
                  const active = selectedPlan === tierKey;
                  return (
                    <button
                      key={tierKey}
                      type="button"
                      onClick={() => {
                        setSelectedPlan(tierKey);
                        setUserCount(Math.max(TIER_RATES[tierKey].minUsers, userCount));
                      }}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '12px',
                        border: active ? '2px solid #2563eb' : '1px solid var(--color-card-border)',
                        background: active ? 'rgba(37, 99, 235, 0.08)' : 'var(--color-bg)',
                        color: active ? '#2563eb' : 'var(--color-text-main)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      {tierKey === 'pro' && (
                        <div style={{ fontSize: '0.65rem', color: '#2563eb', textTransform: 'uppercase', fontWeight: 900 }}>Popular</div>
                      )}
                      <div>{TIER_RATES[tierKey].name.split(' ')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Billing Schedule & Currency */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '160px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Billing Schedule
                </label>
                <div style={{ display: 'flex', background: 'var(--color-bg)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--color-card-border)' }}>
                  <button
                    type="button"
                    onClick={() => setBilling('annual')}
                    style={{
                      flex: 1,
                      padding: '0.45rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: billing === 'annual' ? '#2563eb' : 'transparent',
                      color: billing === 'annual' ? '#fff' : 'var(--color-text-muted)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Annual (-20%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling('monthly')}
                    style={{
                      flex: 1,
                      padding: '0.45rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: billing === 'monthly' ? '#2563eb' : 'transparent',
                      color: billing === 'monthly' ? '#fff' : 'var(--color-text-muted)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div style={{ width: '110px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid var(--color-card-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    outline: 'none',
                  }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            {/* Seat Count Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  3. Team Seats
                </label>
                <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#2563eb' }}>
                  {userCount} Active Users
                </span>
              </div>
              <input
                type="range"
                min={currentTier.minUsers}
                max={currentTier.maxUsers}
                value={userCount}
                onChange={(e) => setUserCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-subtle)', marginTop: '0.25rem' }}>
                <span>Min: {currentTier.minUsers} users</span>
                <span>Max: {currentTier.maxUsers} users</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Promotional / Partner Code
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g. GROWTH20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                  style={{
                    flex: 1,
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--color-card-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponApplied || !couponCode.trim()}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: couponApplied ? '#059669' : '#2563eb',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: couponApplied ? 'default' : 'pointer',
                  }}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {couponApplied && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#059669', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.35rem' }}>
                  <Check size={13} /> {couponDiscountPct}% Discount Applied Successfully
                </div>
              )}
              {couponError && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.35rem' }}>
                  {couponError}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Instant Checkout */}
          <div
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-card-border)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Subscription Summary
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                  {currentTier.name}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                  {rateInfo.symbol}{unitPrice} <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/user/mo</span>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                {billing === 'annual' ? 'Billed annually (12 months)' : 'Billed monthly'} · {userCount} seats
              </div>

              {/* Line Items Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--color-card-border)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                  <span>Base Subscription ({userCount} users)</span>
                  <span>{rateInfo.symbol}{rawSubtotal.toLocaleString()}</span>
                </div>

                {couponApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>
                    <span>Promotion Discount ({couponDiscountPct}%)</span>
                    <span>-{rateInfo.symbol}{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <span>30-Day Free Trial Protection</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>$0.00 Today</span>
                </div>
              </div>

              {/* Total Due */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-card-border)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-subtle)', textTransform: 'uppercase' }}>
                    Total Plan Value
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                    {rateInfo.symbol}{finalTotal.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {billing === 'annual' ? 'per year' : 'per month'}
                  <div style={{ color: '#059669', fontWeight: 800 }}>First 14 days $0</div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                {currentTier.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--color-text-main)' }}>
                    <Check size={14} color="#2563eb" style={{ flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={handleStartTrial}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                  transition: 'all 0.15s',
                }}
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleInstantSubscribe}
                disabled={isProcessing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-main)',
                  border: '1px solid var(--color-card-border)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: isProcessing ? 'wait' : 'pointer',
                }}
              >
                <CreditCard size={15} />
                <span>{isProcessing ? 'Connecting Gateway…' : 'Instant Paid Activation'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--color-text-subtle)', marginTop: '0.25rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Lock size={11} /> 256-bit Encrypted
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={11} /> SOC 2 Type II
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
