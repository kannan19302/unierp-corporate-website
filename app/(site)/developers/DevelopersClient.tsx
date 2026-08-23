'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code,
  Terminal,
  Webhook,
  Copy,
  Check,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  Sparkles,
  Play,
} from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';

type Lang = 'curl' | 'typescript' | 'python' | 'go';

const CODE_EXAMPLES: Record<Lang, { createInvoice: string; webhookVerify: string }> = {
  curl: {
    createInvoice: `curl -X POST https://api.unierp.io/v1/invoices \\
  -H "Authorization: Bearer unierp_live_sec_99a8b7" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerId": "cust_88201",
    "currency": "INR",
    "lineItems": [
      { "productId": "prod_mrp_sensor", "quantity": 10, "unitPrice": 25000 }
    ],
    "autoPostGL": true
  }'`,
    webhookVerify: `curl -X POST https://api.unierp.io/v1/webhooks/test-trigger \\
  -H "X-UniERP-Signature: t=1755864000,v1=99a0b1c2..." \\
  -d '{"event": "inventory.low_stock", "sku": "SKU-990", "remaining": 4}'`,
  },
  typescript: {
    createInvoice: `import { UniERP } from '@unierp/sdk';

const client = new UniERP({ apiKey: process.env.UNIERP_API_KEY });

const invoice = await client.invoices.create({
  customerId: 'cust_88201',
  currency: 'INR',
  lineItems: [
    { productId: 'prod_mrp_sensor', quantity: 10, unitPrice: 25000 }
  ],
  autoPostGL: true
});

console.log('Created & Posted Invoice:', invoice.id);`,
    webhookVerify: `import { verifyWebhookSignature } from '@unierp/sdk/webhooks';

app.post('/api/unierp-webhook', (req, res) => {
  const isValid = verifyWebhookSignature({
    payload: req.body,
    signatureHeader: req.headers['x-unierp-signature'],
    secret: process.env.UNIERP_WEBHOOK_SECRET
  });
  if (!isValid) return res.status(401).send('Invalid signature');
  // Handle event
  res.status(200).json({ received: true });
});`,
  },
  python: {
    createInvoice: `from unierp import UniERP

client = UniERP(api_key="unierp_live_sec_99a8b7")

invoice = client.invoices.create(
    customer_id="cust_88201",
    currency="INR",
    line_items=[
        {"product_id": "prod_mrp_sensor", "quantity": 10, "unit_price": 25000}
    ],
    auto_post_gl=True
)

print(f"Generated Invoice: {invoice.id}")`,
    webhookVerify: `from unierp.webhooks import verify_signature

def handle_webhook(request):
    is_valid = verify_signature(
        payload=request.body,
        signature=request.headers.get("X-UniERP-Signature"),
        secret="whsec_99a8b..."
    )
    if not is_valid:
        return "Unauthorized", 401
    return {"status": "ok"}, 200`,
  },
  go: {
    createInvoice: `package main

import (
  "context"
  "fmt"
  "github.com/unierp/unierp-go"
)

func main() {
  client := unierp.NewClient("unierp_live_sec_99a8b7")
  inv, err := client.Invoices.Create(context.Background(), &unierp.InvoiceParams{
    CustomerID: "cust_88201",
    Currency:   "INR",
    AutoPostGL: true,
  })
  if err != nil { panic(err) }
  fmt.Printf("Invoice Created: %s\\n", inv.ID)
}`,
    webhookVerify: `// Go Webhook Receiver with HMAC-SHA256 Verification
valid := unierp.VerifyWebhook(payload, signatureHeader, webhookSecret)`,
  },
};

export function DevelopersClient() {
  useAnalytics('/developers');
  const [activeLang, setActiveLang] = useState<Lang>('typescript');
  const [copied, setCopied] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSimulatedResponse(
        JSON.stringify(
          {
            id: 'inv_882091',
            status: 'posted',
            number: 'INV-2026-9012',
            customerId: 'cust_88201',
            subtotal: 250000,
            tax: 45000,
            total: 295000,
            currency: 'INR',
            generalLedger: {
              journalEntryId: 'je_77192',
              balanced: true,
              postedAt: '2026-08-22T12:00:00Z',
            },
          },
          null,
          2
        )
      );
    }, 500);
  };

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      {/* ═══ 1. HERO ═══ */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '4.5rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(37, 99, 235, 0.08)',
            color: '#2563eb',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          <Code size={13} />
          <span>Developer Platform &amp; API Explorer</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.85rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.035em',
            margin: '0 0 1rem',
            color: 'var(--color-text-main)',
          }}
        >
          Built for Developers, <span style={{ color: '#2563eb' }}>Architected for Scale</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Integrate your entire stack with sub-millisecond REST APIs, OpenAPI definitions, native SDKs, and concurrent webhooks.
        </p>

        {/* Language Tabs */}
        <div style={{ display: 'inline-flex', background: 'var(--color-surface)', border: '1.5px solid var(--color-card-border)', borderRadius: '9999px', padding: '0.25rem' }}>
          {(['typescript', 'curl', 'python', 'go'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                border: 'none',
                background: activeLang === lang ? '#0f172a' : 'transparent',
                color: activeLang === lang ? '#ffffff' : 'var(--color-text-muted)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s',
              }}
            >
              {lang === 'typescript' ? 'TypeScript / Node' : lang === 'curl' ? 'cURL' : lang}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ 2. CODE PLAYGROUND ═══ */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'stretch' }}>
          {/* Left: Code Snippet Card */}
          <div
            style={{
              background: '#040711',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '1.75rem',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                    POST /v1/invoices
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleCopy(CODE_EXAMPLES[activeLang].createInvoice)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: '#cbd5e1',
                      borderRadius: '6px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExecute}
                    disabled={loading}
                    style={{
                      background: '#2563eb',
                      border: 'none',
                      color: '#ffffff',
                      borderRadius: '6px',
                      padding: '0.35rem 0.85rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Play size={11} fill="currentColor" />
                    <span>{loading ? 'Running…' : 'Run Query'}</span>
                  </button>
                </div>
              </div>

              <pre
                style={{
                  margin: 0,
                  color: '#93c5fd',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                }}
              >
                {CODE_EXAMPLES[activeLang].createInvoice}
              </pre>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b' }}>
              <span>Authentication: <code>Bearer API_KEY</code></span>
              <span>Rate Limit: <strong>10,000 req/min</strong></span>
            </div>
          </div>

          {/* Right: Live API Response Terminal */}
          <div
            style={{
              background: '#0a0f1d',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '1.75rem',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                  RESPONSE: 201 CREATED (38ms)
                </span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)' }}>
                  ✓ Ledger Balanced
                </span>
              </div>

              <pre
                style={{
                  margin: 0,
                  color: '#86efac',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                }}
              >
                {simulatedResponse ||
                  JSON.stringify(
                    {
                      id: 'inv_882091',
                      status: 'posted',
                      number: 'INV-2026-9012',
                      customerId: 'cust_88201',
                      subtotal: 250000,
                      tax: 45000,
                      total: 295000,
                      currency: 'INR',
                      generalLedger: {
                        journalEntryId: 'je_77192',
                        balanced: true,
                        postedAt: '2026-08-22T12:00:00Z',
                      },
                    },
                    null,
                    2
                  )}
              </pre>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Link
                href="/docs/api"
                style={{
                  color: '#60a5fa',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>Explore Full REST &amp; OpenAPI Spec</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
