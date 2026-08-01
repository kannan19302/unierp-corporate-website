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
  PieChart, Settings2, Code2, Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@/lib/useTheme';
import { useSiteContent } from './SiteContentProvider';
import { Magnetic } from './anim/Magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;

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
  { icon: Heart as LucideIcon, label: 'Healthcare', href: '/industries/healthcare', desc: 'Early access — clinical & scheduling' },
  { icon: GraduationCap as LucideIcon, label: 'Education', href: '/industries/education', desc: 'Early access — student & campus' },
  { icon: Building2 as LucideIcon, label: 'Real Estate', href: '/industries/real-estate', desc: 'Early access — property & leases' },
  { icon: Wrench as LucideIcon, label: 'Field Service', href: '/industries/field-service', desc: 'Early access — dispatch & work orders' },
];

const RESOURCES_MENU = [
  { icon: BookOpen as LucideIcon, label: 'Documentation', href: '/docs', desc: 'End-user, admin & developer guides' },
  { icon: HelpCircle as LucideIcon, label: 'Help Center', href: '/help', desc: 'Searchable knowledge base & FAQs' },
  { icon: Code2 as LucideIcon, label: 'API Reference', href: '/docs/api', desc: 'REST endpoints, auth, webhooks' },
  { icon: FileText as LucideIcon, label: 'Blog', href: '/blog', desc: 'Product updates, best practices' },
  { icon: Layers as LucideIcon, label: 'Resources Library', href: '/resources', desc: 'Whitepapers, webinars, templates' },
  { icon: Star as LucideIcon, label: 'Customer Stories', href: '/customers', desc: 'How businesses use UniERP' },
  { icon: PieChart as LucideIcon, label: 'Pricing', href: '/pricing', desc: 'Plans for every team size' },
  { icon: Shield as LucideIcon, label: 'Security', href: '/security', desc: 'GDPR, SOC2, encryption details' },
];

const COMPANY_MENU = [
  { icon: Globe as LucideIcon, label: 'About', href: '/about', desc: 'Our mission, team & values' },
  { icon: Briefcase as LucideIcon, label: 'Careers', href: '/careers', desc: 'Open roles — join us' },
  { icon: MessageSquare as LucideIcon, label: 'Contact', href: '/contact', desc: 'Talk to sales or support' },
  { icon: Activity as LucideIcon, label: 'Status', href: '/status', desc: 'Platform uptime & incidents' },
  { icon: Settings2 as LucideIcon, label: 'Partners', href: '/contact?type=partnership', desc: 'Become a reseller or integrator' },
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
    { label: 'Products', href: '/products' },
    { label: 'Solutions', href: '/industries' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
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
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-main)' }}>UniERP</span>
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
          <div className="mobile-cta-group">
            <a href={`${erpAppUrl}${loginPath}`} className="mobile-cta-secondary" onClick={onClose}>
              <LogIn size={16} /> Sign In
            </a>
            <a href={`${erpAppUrl}${registerPath}`} className="mobile-cta-primary btn-cosmic" onClick={onClose}>
              <UserPlus size={16} /> Get Started Free
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
              <div className="header-logo-mark">
                {settings.logoText || 'U'}
              </div>
            )}
            <span className="header-logo-name">
              {settings.brandName}
              {settings.brandNameAccent && <span className="text-gradient">{settings.brandNameAccent}</span>}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="header-nav" role="navigation" aria-label="Main navigation">
            <NavDropdown label="Products" active={isProducts} width="wide">
              <MegaMenuProducts />
            </NavDropdown>
            <NavDropdown label="Solutions" active={isSolutions}>
              <MegaMenuSimple items={SOLUTIONS_MENU} />
            </NavDropdown>
            <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'nav-link-active' : ''}`}>
              Pricing
            </Link>
            <NavDropdown label="Resources" active={isResources}>
              <MegaMenuSimple items={RESOURCES_MENU} />
            </NavDropdown>
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
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <a href={`${erpAppUrl}${settings.erpLoginPath || '/login'}`} className="header-signin-btn">
              <LogIn size={15} />
              <span>Sign In</span>
            </a>

            <Magnetic strength={0.35}>
              <Link href={settings.headerCtaHref || '/contact'} className="btn-cosmic header-cta-btn">
                <Zap size={15} />
                <span>{settings.headerCtaLabel || 'Start Free Trial'}</span>
              </Link>
            </Magnetic>
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
