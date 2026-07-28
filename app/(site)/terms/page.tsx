'use client';

export default function TermsPage() {
  return (
    <div className="page-container" style={{ padding: '6rem 1.5rem', maxWidth: '800px' }}>
      <h1 className="section-title">Terms of Service</h1>
      <p style={{ color: 'var(--color-text-subtle)', marginBottom: '3rem' }}>Last updated: July 2026</p>

      <div className="docs-content" style={{ color: 'var(--color-text-muted)' }}>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

        <h2>2. Use of Services</h2>
        <p>You may use our services only as permitted by law. We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</p>

        <h2>3. Your Account</h2>
        <p>You may need an account to use some of our services. You are responsible for safeguarding your account and for all activities that occur under your account.</p>

        <h2>4. Subscription and Billing</h2>
        <p>Fees are billed in advance on a recurring schedule. All payments are non-refundable unless otherwise specified in your specific enterprise agreement.</p>

        <h2>5. Termination</h2>
        <p>We may terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      </div>
    </div>
  );
}
