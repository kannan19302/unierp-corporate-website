'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  ShieldCheck,
  Building2,
  TrendingUp,
  Sparkles,
  Check,
} from 'lucide-react';

export function WorkflowEngine() {
  const [activeWorkflow, setActiveWorkflow] = useState<'lead-to-cash' | 'procure-to-pay' | 'record-to-report'>('lead-to-cash');
  const [invoiceCreated, setInvoiceCreated] = useState(false);

  const workflows = {
    'lead-to-cash': {
      id: 'lead-to-cash',
      title: 'Lead to Cash',
      desc: 'From lead capture to invoice collection — end to end.',
      nodes: [
        { name: 'New Lead', status: 'done' },
        { name: 'Qualification', status: 'done' },
        { name: 'Quotation', status: 'done' },
        { name: 'Sales Order', status: 'active' },
        { name: 'Delivery', status: 'pending' },
        { name: 'Invoice', status: 'pending' },
        { name: 'Payment', status: 'pending' },
      ],
      slipTitle: 'Sales Order #SO-1258',
      slipStatus: 'Confirmed',
      customer: 'Acme Corp',
      date: '21 Jul 2026',
      total: '₹1,25,000',
      items: [
        { name: 'Enterprise Laptop', qty: 2, rate: '₹45,000', amount: '₹90,000' },
        { name: 'Wireless Mouse', qty: 5, rate: '₹300', amount: '₹1,500' },
        { name: 'Mechanical Keyboard', qty: 3, rate: '₹1,166', amount: '₹3,500' },
      ],
    },
    'procure-to-pay': {
      id: 'procure-to-pay',
      title: 'Procure to Pay',
      desc: 'Streamline purchase to payment lifecycle.',
      nodes: [
        { name: 'Requisition', status: 'done' },
        { name: 'RFQ Sent', status: 'done' },
        { name: 'Vendor Bid', status: 'done' },
        { name: 'Purchase Order', status: 'active' },
        { name: 'GRN Receipt', status: 'pending' },
        { name: '3-Way Match', status: 'pending' },
        { name: 'Payment Run', status: 'pending' },
      ],
      slipTitle: 'Purchase Order #PO-0842',
      slipStatus: 'Approved',
      customer: 'Global Silicon Tech',
      date: '22 Jul 2026',
      total: '₹4,80,000',
      items: [
        { name: 'Microcontroller Units', qty: 1000, rate: '₹350', amount: '₹3,50,000' },
        { name: 'Power Supply Modules', qty: 100, rate: '₹1,300', amount: '₹1,30,000' },
      ],
    },
    'record-to-report': {
      id: 'record-to-report',
      title: 'Record to Report',
      desc: 'Close faster and report with confidence.',
      nodes: [
        { name: 'Journal Entry', status: 'done' },
        { name: 'Bank Sync', status: 'done' },
        { name: 'Reconciliation', status: 'done' },
        { name: 'Trial Balance', status: 'active' },
        { name: 'IFRS Audit', status: 'pending' },
        { name: 'P&L Statement', status: 'pending' },
        { name: 'Board Pack', status: 'pending' },
      ],
      slipTitle: 'Trial Balance Audit #TB-Q2',
      slipStatus: 'Reconciled',
      customer: 'Multi-Entity Consolidated',
      date: 'Q2 Close 2026',
      total: '₹24,84,19,200',
      items: [
        { name: 'Operating Assets', qty: 1, rate: '₹14.2 Cr', amount: '₹14,20,00,000' },
        { name: 'Accounts Receivable', qty: 1, rate: '₹6.8 Cr', amount: '₹6,80,00,000' },
        { name: 'Retained Earnings', qty: 1, rate: '₹3.84 Cr', amount: '₹3,84,19,200' },
      ],
    },
  };

  const currentWf = workflows[activeWorkflow];

  return (
    <div className="ref-workflow-wrapper">
      {/* Top Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
            margin: '0 0 0.5rem',
            color: '#ffffff',
          }}
        >
          See UniERP in action
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>Real workflows. Real results.</p>
      </div>

      {/* Main Workflow 2-Column Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 300px) 1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Left Workflow Selectors */}
        <div className="ref-workflow-tabs">
          {Object.values(workflows).map((wf) => {
            const isActive = activeWorkflow === wf.id;
            return (
              <button
                key={wf.id}
                type="button"
                className={`ref-workflow-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveWorkflow(wf.id as any);
                  setInvoiceCreated(false);
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: isActive ? '#ffffff' : '#f8fafc', marginBottom: '0.25rem' }}>
                  {wf.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: isActive ? 'rgba(255, 255, 255, 0.85)' : '#94a3b8', lineHeight: 1.4 }}>
                  {wf.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Center / Right Content: DAG Stream + Mobile Order Slip */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Top Label & Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
              {currentWf.title} Workflow
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#6ee7b7',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <CheckCircle2 size={13} />
              <span>Workflow Verified &amp; Connected</span>
            </div>
          </div>

          {/* DAG Nodes Flow */}
          <div className="ref-dag-stream">
            {currentWf.nodes.map((node, i) => {
              const isLast = i === currentWf.nodes.length - 1;
              const isDone = node.status === 'done';
              const isActive = node.status === 'active';

              return (
                <React.Fragment key={node.name}>
                  <div
                    className={`ref-dag-node ${isDone ? 'node-done' : isActive ? 'node-active' : ''}`}
                    style={{ flexShrink: 0 }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: isDone
                          ? 'rgba(16, 185, 129, 0.3)'
                          : isActive
                          ? 'rgba(37, 99, 235, 0.4)'
                          : 'rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                      }}
                    >
                      {isDone ? <Check size={12} /> : i + 1}
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{node.name}</span>
                  </div>

                  {!isLast && (
                    <ArrowRight
                      size={14}
                      style={{
                        color: isDone ? '#10b981' : 'rgba(255, 255, 255, 0.25)',
                        flexShrink: 0,
                        margin: '0 2px',
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Transaction Slip Card (Balanced 2-Column Enterprise Layout) */}
          <div
            style={{
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '16px',
              padding: '1.75rem',
              width: '100%',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem' }}>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{currentWf.slipTitle}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                  Account: <strong>{currentWf.customer}</strong> · Transaction Date: <strong>{currentWf.date}</strong>
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                {currentWf.slipStatus}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', alignItems: 'center' }}>
              {/* Left Column: Itemized Line Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontWeight: 700, borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.72rem' }}>
                  <span>Item Description</span>
                  <span>Qty</span>
                  <span>Rate</span>
                  <span>Amount</span>
                </div>
                {currentWf.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#334155', padding: '0.2rem 0' }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: '#64748b' }}>{item.qty}</span>
                    <span style={{ color: '#64748b' }}>{item.rate}</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{item.amount}</span>
                  </div>
                ))}
              </div>

              {/* Right Column: Totals & Instant Action */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b' }}>
                  <span>Subtotal:</span>
                  <span>{currentWf.total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b' }}>
                  <span>Tax &amp; Compliance Audit:</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>✓ Verified (0 Errors)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid #e2e8f0', fontWeight: 900, fontSize: '1.1rem', color: '#0f172a' }}>
                  <span>Total Amount:</span>
                  <span style={{ color: '#2563eb' }}>{currentWf.total}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setInvoiceCreated(true)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: invoiceCreated ? '#10b981' : '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    marginTop: '0.5rem',
                    boxShadow: invoiceCreated ? '0 4px 15px rgba(16, 185, 129, 0.3)' : '0 4px 15px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  {invoiceCreated ? (
                    <>
                      <Check size={16} /> Invoice Generated &amp; Dispatched
                    </>
                  ) : (
                    'Create & Dispatch Invoice'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navy Stats Bar */}
      <div className="ref-stats-bar-navy">
        <div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
            2,500+
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>Businesses Trust UniERP</div>
        </div>
        <div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
            25+
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>Industries Served</div>
        </div>
        <div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
            98.6%
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>Customer Retention</div>
        </div>
        <div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
            4.8/5
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>Average Rating</div>
        </div>
      </div>
    </div>
  );
}
