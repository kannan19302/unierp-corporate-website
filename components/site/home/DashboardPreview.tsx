'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Activity,
  Settings,
  Bell,
  Search,
} from 'lucide-react';

export function DashboardPreview() {
  const [activeNav, setActiveNav] = useState('Home');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(4);
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);

  const navItems = [
    { label: 'Home', icon: Layers },
    { label: 'CRM', icon: Users },
    { label: 'Sales', icon: ShoppingCart },
    { label: 'Finance', icon: DollarSign },
    { label: 'Purchasing', icon: Package },
    { label: 'Inventory', icon: Package },
    { label: 'HR & Payroll', icon: Briefcase },
    { label: 'Projects', icon: Activity },
    { label: 'Settings', icon: Settings },
  ];

  const kpis = [
    { label: 'Total Revenue', value: '₹12.45 Cr', change: '+12.8%', vs: 'vs last month', isPos: true },
    { label: 'Total Orders', value: '1,245', change: '+8.2%', vs: 'vs last month', isPos: true },
    { label: 'Customers', value: '2,266', change: '+15.1%', vs: 'vs last month', isPos: true },
    { label: 'Net Profit', value: '₹2.34 Cr', change: '+10.3%', vs: 'vs last month', isPos: true },
  ];

  const recentActivities = [
    { text: 'Sales Order #SO-1256 created', time: '2m ago', status: 'Done', color: '#10b981' },
    { text: 'Payment received from Acme Corp', time: '15m ago', status: 'Received', color: '#3b82f6' },
    { text: 'Purchase Order #PO-0450 approved', time: '1h ago', status: 'Approved', color: '#10b981' },
    { text: 'New lead from Webform', time: '3h ago', status: 'New', color: '#f59e0b' },
    { text: 'Inventory updated for SKU-89', time: '5h ago', status: 'Synced', color: '#6366f1' },
  ];

  const topProducts = [
    { name: 'Product A', pct: 32, color: '#2563eb' },
    { name: 'Product B', pct: 24, color: '#3b82f6' },
    { name: 'Product C', pct: 18, color: '#60a5fa' },
    { name: 'Product D', pct: 10, color: '#93c5fd' },
    { name: 'Others', pct: 16, color: '#cbd5e1' },
  ];

  return (
    <div
      style={{
        width: '100%',
        background: 'var(--color-surface, #ffffff)',
        border: '1px solid var(--color-card-border, #e2e8f0)',
        borderRadius: '20px',
        boxShadow: 'var(--hero-shadow, 0 25px 60px -15px rgba(15, 23, 42, 0.12))',
        display: 'flex',
        overflow: 'hidden',
        minHeight: '520px',
        textAlign: 'left',
      }}
    >
      {/* ── Left Sidebar (Dark Navy Enterprise Rail) ── */}
      <div
        style={{
          width: '145px',
          background: '#090d16',
          padding: '1.25rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          flexShrink: 0,
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0 0.5rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '0.75rem',
            }}
          >
            U
          </div>
          <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '-0.01em' }}>UniERP</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveNav(item.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : '#94a3b8',
                background: isActive ? '#2563eb' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main ERP Dashboard Canvas ── */}
      <div
        style={{
          flex: 1,
          padding: '1.25rem',
          background: 'var(--color-surface, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          overflow: 'hidden',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--color-card-border, #e2e8f0)',
          }}
        >
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-main, #0f172a)' }}>
              Good morning, Admin 👋
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted, #475569)' }}>
              Here&apos;s what&apos;s happening with your business today.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                background: 'var(--color-bg, #f8fafc)',
                border: '1px solid var(--color-card-border, #e2e8f0)',
                fontSize: '0.72rem',
                color: 'var(--color-text-muted, #475569)',
              }}
            >
              <Search size={12} />
              <span>Search...</span>
            </div>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--color-bg, #f8fafc)',
                border: '1px solid var(--color-card-border, #e2e8f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted, #475569)',
              }}
            >
              <Bell size={13} />
            </div>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              A
            </div>
          </div>
        </div>

        {/* 4 KPI Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem' }}>
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              style={{
                background: 'var(--color-bg, #f8fafc)',
                border: '1px solid var(--color-card-border, #e2e8f0)',
                borderRadius: '10px',
                padding: '0.65rem 0.8rem',
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-subtle, #94a3b8)', fontWeight: 600 }}>
                {kpi.label}
              </div>
              <div
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--color-text-main, #0f172a)',
                  margin: '0.2rem 0',
                  letterSpacing: '-0.02em',
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: kpi.isPos ? '#10b981' : '#ef4444',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <TrendingUp size={10} />
                <span>{kpi.change}</span>
                <span style={{ color: 'var(--color-text-subtle, #94a3b8)', fontWeight: 400 }}>{kpi.vs}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Row: Revenue Overview Area Chart + Top Products Donut */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.75rem' }}>
          {/* Revenue Overview Chart */}
          <div
            style={{
              background: 'var(--color-bg, #f8fafc)',
              border: '1px solid var(--color-card-border, #e2e8f0)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-text-main, #0f172a)' }}>
                Revenue Overview
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: 'var(--color-text-subtle, #94a3b8)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }} /> This Year
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }} /> Last Year
                </span>
              </div>
            </div>

            {/* SVG Interactive Area / Line Chart */}
            <div style={{ width: '100%', height: '110px', position: 'relative' }}>
              <svg viewBox="0 0 320 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="20" x2="320" y2="20" stroke="var(--color-card-border, #e2e8f0)" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="var(--color-card-border, #e2e8f0)" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="320" y2="80" stroke="var(--color-card-border, #e2e8f0)" strokeDasharray="3 3" />

                {/* Last year reference line */}
                <path
                  d="M 10 75 Q 60 65 110 70 T 210 50 T 310 40"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Area fill */}
                <path
                  d="M 10 70 Q 60 45 110 55 T 210 25 T 310 15 L 310 95 L 10 95 Z"
                  fill="url(#areaGradient)"
                />

                {/* This year primary line */}
                <path
                  d="M 10 70 Q 60 45 110 55 T 210 25 T 310 15"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                />

                {/* Data Points & Interactive Tooltips */}
                {[
                  { x: 10, y: 70, m: 'Jan', val: '₹8.4 Cr' },
                  { x: 70, y: 48, m: 'Feb', val: '₹9.2 Cr' },
                  { x: 130, y: 55, m: 'Mar', val: '₹9.8 Cr' },
                  { x: 190, y: 32, m: 'Apr', val: '₹10.6 Cr' },
                  { x: 250, y: 22, m: 'May', val: '₹11.4 Cr' },
                  { x: 310, y: 15, m: 'Jun', val: '₹12.45 Cr' },
                ].map((pt, idx) => {
                  const isHovered = hoveredPoint === idx;
                  return (
                    <g key={pt.m}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 5.5 : 3.5}
                        fill={isHovered ? '#2563eb' : '#ffffff'}
                        stroke="#2563eb"
                        strokeWidth="2"
                        style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={() => setHoveredPoint(idx)}
                      />
                      {isHovered && (
                        <g>
                          <rect
                            x={Math.max(4, Math.min(pt.x - 32, 252))}
                            y={Math.max(2, pt.y - 20)}
                            width="64"
                            height="16"
                            rx="4"
                            fill="#0f172a"
                          />
                          <text
                            x={Math.max(4, Math.min(pt.x - 32, 252)) + 32}
                            y={Math.max(2, pt.y - 20) + 11}
                            fontSize="7.5"
                            fontWeight="700"
                            fill="#ffffff"
                            textAnchor="middle"
                          >
                            {pt.m}: {pt.val}
                          </text>
                        </g>
                      )}
                      <text
                        x={pt.x}
                        y="98"
                        fontSize="7.5"
                        fontWeight={isHovered ? '700' : '400'}
                        fill={isHovered ? '#2563eb' : 'var(--color-text-subtle, #94a3b8)'}
                        textAnchor="middle"
                      >
                        {pt.m}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Top Products Donut */}
          <div
            style={{
              background: 'var(--color-bg, #f8fafc)',
              border: '1px solid var(--color-card-border, #e2e8f0)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-text-main, #0f172a)', marginBottom: '0.35rem' }}>
              Top Products
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Donut Chart SVG */}
              <div style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4.5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#2563eb" strokeWidth="4.5" strokeDasharray="32 68" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="24 76" strokeDashoffset="-32" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" strokeWidth="4.5" strokeDasharray="18 82" strokeDashoffset="-56" />
                </svg>
              </div>

              {/* Legend List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                {topProducts.slice(0, 4).map((tp) => (
                  <div key={tp.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted, #475569)' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: tp.color }} />
                      {tp.name}
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--color-text-main, #0f172a)' }}>{tp.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Recent Activities + Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.75rem' }}>
          {/* Recent Activities */}
          <div
            style={{
              background: 'var(--color-bg, #f8fafc)',
              border: '1px solid var(--color-card-border, #e2e8f0)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-text-main, #0f172a)' }}>
                Recent Activities
              </span>
              <span style={{ fontSize: '0.65rem', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}>View all</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {recentActivities.slice(0, 3).map((act, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.68rem',
                    padding: '0.2rem 0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-text-main, #0f172a)' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: act.color }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
                      {act.text}
                    </span>
                  </div>
                  <span style={{ color: 'var(--color-text-subtle, #94a3b8)', fontSize: '0.62rem' }}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              background: 'var(--color-bg, #f8fafc)',
              border: '1px solid var(--color-card-border, #e2e8f0)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-text-main, #0f172a)', marginBottom: '0.5rem' }}>
              Quick Actions
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
              {[
                { label: 'Create Invoice', icon: FileText },
                { label: 'Add Customer', icon: Users },
                { label: 'New PO', icon: Package },
                { label: 'View Reports', icon: Activity },
              ].map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.label}
                    type="button"
                    onClick={() => setSelectedQuickAction(qa.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.4rem 0.5rem',
                      borderRadius: '6px',
                      background: 'var(--color-surface, #ffffff)',
                      border: '1px solid var(--color-card-border, #e2e8f0)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main, #0f172a)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Icon size={11} color="#2563eb" />
                    <span>{qa.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
