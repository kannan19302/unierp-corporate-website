'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Moon, Sun, Menu, X, ChevronDown,
  CreditCard, Users, Package, Hammer, BarChart3,
  ShoppingCart, ShoppingBag, Truck, Briefcase,
  Heart, GraduationCap, Building2, Wrench, Store,
  Cpu, FileText, Globe, Activity, Zap, Shield,
  LogIn, UserPlus, Compass, BookOpen, HelpCircle,
  Star, ArrowRight, Phone, MessageSquare, Layers,
  PieChart, Settings2, Code2, Sparkles, Handshake,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@/lib/useTheme';
import { useSiteContent } from './SiteContentProvider';
import { Magnetic } from './anim/Magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;

function UniErpMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 5.5 16 1l12 4.5v9.7c0 7.2-4.8 12.5-12 15.8C8.8 27.7 4 22.4 4 15.2V5.5Z" fill="var(--color-primary, #4f46e5)" />
      <path d="M10 9v7.2c0 4 2.2 6.1 6 6.1s6-2.1 6-6.1V9h-3.7v7c0 2.1-.7 3.1-2.3 3.1s-2.3-1-2.3-3.1V9H10Z" fill="var(--color-surface, white)" />
    </svg>
  );
}

// ─── Mega menu data ─────────────────────────────────────────────────────────

const PRODUCTS_MENU = {
  core: [
    { icon: CreditCard as LucideIcon, label: 'Finance & Accounting', href: '/products/finance', desc: 'GL, AR, AP, multi-currency, budgeting' },
    { icon: Users as LucideIcon, label: 'Human Resources', href: '/products/hr', desc: 'Payroll, leave, performance, attendance' },
    { icon: BarChart3 as LucideIcon, label: 'CRM & Sales', href: '/products/crm', desc: 'Pipelines, CPQ, forecasting, territories' },
    { icon: Package as LucideIcon, label: 'Inventory & Warehouse', href: '/products/inventory', desc: 'Multi-location, barcode, serial/batch' },
    { icon: ShoppingCart as LucideIcon, label: 'Procurement', href: '/products/procurement', desc: 'RFQ, PO, vendor mgmt, 3-way matching' },
    { icon: Truck as LucideIcon, label: 'Supply Chain', href: '/products/supply-chain', desc: 'Logistics, DRP, container tracking' },
  ],
  advanced: [
    { icon: Hammer as LucideIcon, label: 'Manufacturing (MRP)', href: '/products/manufacturing', desc: 'BOM, work orders, quality, scrap' },
    { icon: Briefcase as LucideIcon, label: 'Project Management', href: '/products/projects', desc: 'Gantt, Agile, EVM, CAPEX, PMO' },
    { icon: Activity as LucideIcon, label: 'Analytics & BI', href: '/products/analytics', desc: 'Dashboards, KPIs, predictive AI, ETL' },
    { icon: ShoppingBag as LucideIcon, label: 'E-Commerce', href: '/products/ecommerce', desc: 'Storefront, cart, Stripe, coupons' },
    { icon: Store as LucideIcon, label: 'Point of Sale', href: '/products/pos', desc: 'Offline-first POS, receipts, cash' },
    { icon: FileText as LucideIcon, label: 'Documents & Drive', href: '/products/documents', desc: 'Templates, approvals, OCR, version' },
  ],
  industry: [
    { icon: Heart as LucideIcon, label: 'Healthcare', href: '/products/healthcare', desc: 'Early access — clinical & scheduling' },
    { icon: GraduationCap as LucideIcon, label: 'Education', href: '/products/education', desc: 'Early access — student & campus' },
    { icon: Building2 as LucideIcon, label: 'Real Estate', href: '/products/real-estate', desc: 'Early access — property & leases' },
    { icon: Wrench as LucideIcon, label: 'Field Service', href: '/products/field-service', desc: 'Early access — dispatch & crews' },
    { icon: Globe as LucideIcon, label: 'Marketplace', href: '/marketplace', desc: 'Browse third-party apps & integrations' },
    { icon: Cpu as LucideIcon, label: 'API Platform', href: '/products/api-platform', desc: 'Early access — REST & webhooks' },
  ],
};

const SOLUTIONS_MENU = [
  { icon: Heart as LucideIcon, label: 'Healthcare', href: '/industries/healthcare', desc: 'Clinical & scheduling blueprints' },
  { icon: GraduationCap as LucideIcon, label: 'Education', href: '/industries/education', desc: 'Student & campus automation' },
  { icon: Building2 as LucideIcon, label: 'Real Estate', href: '/industries/real-estate', desc: 'Property & commercial leases' },
  { icon: Wrench as LucideIcon, label: 'Field Service', href: '/industries/field-service', desc: 'Dispatch & technician workflows' },
];

const RESOURCES_MENU = [
  { icon: BookOpen as LucideIcon, label: 'Documentation', href: '/docs', desc: 'End-user, admin & developer guides' },
  { icon: HelpCircle as LucideIcon, label: 'FAQ Hub', href: '/faq', desc: 'Repeated questions & knowledge base' },
  { icon: Sparkles as LucideIcon, label: 'Events & Keynotes', href: '/events', desc: 'Live webinars, workshops & replays' },
  { icon: Code2 as LucideIcon, label: 'Developer Platform', href: '/developers', desc: 'REST APIs, webhooks, live explorer' },
  { icon: PieChart as LucideIcon, label: 'ROI Calculator', href: '/calculator', desc: 'Estimate 3-year cost & labor savings' },
  { icon: Star as LucideIcon, label: 'Customer Stories', href: '/customers', desc: 'Verified ROI case studies' },
  { icon: FileText as LucideIcon, label: 'Blog & Updates', href: '/blog', desc: 'Engineering insights & releases' },
  { icon: Shield as LucideIcon, label: 'Security & Trust', href: '/security', desc: 'GDPR, SOC2, PostgreSQL RLS' },
];

const COMPANY_MENU = [
  { icon: Globe as LucideIcon, label: 'About Us', href: '/about', desc: 'Our mission, team & values' },
  { icon: Briefcase as LucideIcon, label: 'Careers', href: '/careers', desc: 'Join our team — open roles' },
  { icon: Handshake as LucideIcon, label: 'Partner Program', href: '/partners', desc: 'Certified implementation & resellers' },
  { icon: MessageSquare as LucideIcon, label: 'Contact', href: '/contact', desc: 'Talk to sales or support' },
  { icon: Activity as LucideIcon, label: 'System Status', href: '/status', desc: '99.99% uptime & latency telemetry' },
];

// ─── Mega menu content ───────────────────────────────────────────────────────

function MegaItem({ icon: Icon, label, href, desc }: {
  icon: LucideIcon; label: string; href: string; desc: string;
}) {
  return (
    <Link href={href} className="mega-item">
      <div className="mega-item-icon">
        <Icon size={17} />
      </div>
      <div>
        <div className="mega-item-label">{label}</div>
        <div className="mega-item-desc">{desc}</div>
      </div>
    </Link>
  );
}

function MegaMenuProducts() {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
        <div className="mega-col">
          <div className="mega-col-title">Core ERP</div>
          {PRODUCTS_MENU.core.map((item) => (
            <MegaItem key={item.href} {...item} />
          ))}
        </div>
        <div className="mega-col">
          <div className="mega-col-title">Advanced Modules</div>
          {PRODUCTS_MENU.advanced.map((item) => (
            <MegaItem key={item.href} {...item} />
          ))}
        </div>
        <div className="mega-col">
          <div className="mega-col-title">Industry Apps</div>
          {PRODUCTS_MENU.industry.map((item) => (
            <MegaItem key={item.href} {...item} />
          ))}
        </div>
      </div>
      <div className="mega-footer">
        <Link href="/products" className="mega-footer-link">
          <Layers size={15} /> View all modules <ArrowRight size={14} />
        </Link>
        <Link href="/marketplace" className="mega-footer-link">
          <Store size={15} /> Browse Marketplace <ArrowRight size={14} />
        </Link>
        <Link href="/pricing" className="mega-footer-link mega-footer-cta">
          <Zap size={15} /> View pricing <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}

function MegaMenuSimple({ items }: { items: typeof SOLUTIONS_MENU }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
      {items.map((item) => (
        <MegaItem key={item.href} {...item} />
      ))}
    </div>
  );
}

// ─── NavItem with animated mega dropdown ─────────────────────────────────────

function NavDropdown({
  label,
  children,
  active,
  width = 'medium',
}: {
  label: string;
  children: React.ReactNode;
  active: boolean;
  width?: 'wide' | 'medium';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="nav-dropdown-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`nav-link-btn ${active || open ? 'nav-link-active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
        <ChevronDown size={14} className={`nav-chevron ${open ? 'nav-chevron-open' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`mega-menu mega-menu--framer ${width === 'wide' ? 'mega-menu-wide' : 'mega-menu-medium'}`}
            initial={{ opacity: 0, y: -10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{ visibility: 'visible', pointerEvents: 'auto' }}
            role="menu"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile overlay ──────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
  erpAppUrl,
  loginPath,
  registerPath,
}: {
  open: boolean;
  onClose: () => void;
  erpAppUrl: string;
  loginPath: string;
  registerPath: string;
}) {
  const sections = [
    { label: 'Platform', href: '/products' },
    { label: 'Solutions', href: '/industries' },
    { label: 'Industries', href: '/industries' },
    { label: 'Resources', href: '/resources' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Company', href: '/about' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-overlay"
          role="dialog"
          aria-label="Navigation menu"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <div className="mobile-overlay-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UniErpMark size={30} />
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-main)' }}>UniERP</span>
            </div>
            <button onClick={onClose} className="mobile-close-btn" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="mobile-nav">
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="mobile-nav-link" onClick={onClose}>
                {s.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-cta-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Link href="/register" className="btn-start-free" style={{ textAlign: 'center', padding: '0.85rem' }} onClick={onClose}>
              Start Free (30 Days)
            </Link>
            <Link href="/contact" className="btn-talk-sales" style={{ textAlign: 'center', padding: '0.85rem' }} onClick={onClose}>
              Talk to Sales
            </Link>
            <a href={loginPath.startsWith('http') ? loginPath : '/login'} className="header-signin-btn" style={{ justifyContent: 'center', padding: '0.65rem' }} onClick={onClose}>
              Sign In
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { settings } = useSiteContent();
  const erpAppUrl = settings.erpAppUrl;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isProducts = pathname.startsWith('/products') || pathname.startsWith('/marketplace') || pathname.startsWith('/modules');
  const isSolutions = pathname.startsWith('/industries');
  const isResources = ['/docs', '/help', '/blog', '/resources', '/customers', '/security', '/pricing'].some(p => pathname.startsWith(p));
  const isCompany = ['/about', '/careers', '/contact', '/status'].some(p => pathname.startsWith(p));

  return (
    <>
      {/* Announcement banner */}
      {settings.announcementEnabled && settings.announcementText && (
        <div className="announcement-bar">
          <span>{settings.announcementText}</span>
          {settings.announcementCtaLabel && (
            <a href={settings.announcementCtaHref || '#'} target="_blank" rel="noopener noreferrer" className="announcement-cta">
              {settings.announcementCtaLabel} <ArrowRight size={13} />
            </a>
          )}
        </div>
      )}

      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="header-logo" aria-label={`${settings.brandName} home`}>
            {settings.logoImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logoImageUrl} alt={settings.brandName} className="header-logo-img" />
            ) : (
              <UniErpMark size={34} />
            )}
            <span className="header-logo-name">
              {settings.brandName}
              {settings.brandNameAccent && <span className="text-gradient">{settings.brandNameAccent}</span>}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="header-nav" role="navigation" aria-label="Main navigation">
            <NavDropdown label="Platform" active={isProducts} width="wide">
              <MegaMenuProducts />
            </NavDropdown>
            <NavDropdown label="Solutions" active={isSolutions}>
              <MegaMenuSimple items={SOLUTIONS_MENU} />
            </NavDropdown>
            <Link href="/industries" className={`nav-link ${pathname.startsWith('/industries') ? 'nav-link-active' : ''}`}>
              Industries
            </Link>
            <NavDropdown label="Resources" active={isResources}>
              <MegaMenuSimple items={RESOURCES_MENU} />
            </NavDropdown>
            <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'nav-link-active' : ''}`}>
              Pricing
            </Link>
            <NavDropdown label="Company" active={isCompany}>
              <MegaMenuSimple items={COMPANY_MENU} />
            </NavDropdown>
          </nav>

          {/* CTA group */}
          <div className="header-actions">
            <button
              onClick={toggleTheme}
              className="header-theme-btn"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <a
              href={settings.erpLoginPath?.startsWith('http') ? settings.erpLoginPath : '/login'}
              className="header-signin-btn"
            >
              Sign In
            </a>

            <Link href="/register" className="btn-start-free">
              Start Free
            </Link>

            <Link href="/contact" className="btn-talk-sales">
              Talk to Sales
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="header-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        erpAppUrl={erpAppUrl}
        loginPath={settings.erpLoginPath || '/login'}
        registerPath={settings.erpRegisterPath || '/register'}
      />
    </>
  );
}
