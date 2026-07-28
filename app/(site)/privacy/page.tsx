'use client';

export default function PrivacyPage() {
  return (
    <div className="page-container" style={{ padding: '6rem 1.5rem', maxWidth: '800px' }}>
      <h1 className="section-title">Privacy Policy</h1>
      <p style={{ color: 'var(--color-text-subtle)', marginBottom: '3rem' }}>Last updated: July 2026</p>

      <div className="docs-content" style={{ color: 'var(--color-text-muted)' }}>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you create an account, subscribe to our newsletter, request support, or otherwise communicate with us. This includes your name, email address, phone number, and company details.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices, and respond to customer service requests.</p>

        <h2>3. Data Sharing and Disclosure</h2>
        <p>We do not share your personal information with third parties except as described in this privacy policy (e.g., with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf).</p>

        <h2>4. Data Security</h2>
        <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit.</p>

        <h2>5. Your Data Rights</h2>
        <p>Depending on your location, you may have rights under GDPR, CCPA, or other frameworks to access, correct, delete, or port your personal data. You can exercise these rights through your account settings or by contacting our privacy team.</p>
      </div>
    </div>
  );
}
