'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  Moon, Sun, Menu, X, ChevronDown,
  CreditCard, Users, Package, Hammer, BarChart3,
  ShoppingCart, ShoppingBag, Truck, Briefcase,
  Heart, GraduationCap, Building2, Wrench, Store,
  Cpu, FileText, Globe, Activity, Zap, Shield,
  LogIn, UserPlus, Compass, BookOpen, HelpCircle,
  Star, ArrowRight, Phone, MessageSquare, Layers,
  PieChart, Settings2, Code2, Rocket
} from 'lucide-react';
import { useTheme } from '@/lib/useTheme';
import { useSiteContent } from './SiteContentProvider';

// ─── Mega menu data ─────────────────────────────────────────────────────────

const PRODUCTS_MENU = {
  core: [
    { icon: CreditCard, label: 'Finance & Accounting', href: '/products/finance', desc: 'GL, AR, AP, multi-currency, budgeting' },
    { icon: Users, label: 'Human Resources', href: '/products/hr', desc: 'Payroll, leave, performance, attendance' },
    { icon: BarChart3, label: 'CRM & Sales', href: '/products/crm', desc: 'Pipelines, CPQ, forecasting, territories' },
    { icon: Package, label: 'Inventory & Warehouse', href: '/products/inventory', desc: 'Multi-location, barcode, serial/batch' },
    { icon: ShoppingCart, label: 'Procurement', href: '/products/procurement', desc: 'RFQ, PO, vendor mgmt, 3-way matching' },
    { icon: Truck, label: 'Supply Chain', href: '/products/supply-chain', desc: 'Logistics, DRP, container tracking' },
  ],
  advanced: [
    { icon: Hammer, label: 'Manufacturing (MRP)', href: '/products/manufacturing', desc: 'BOM, work orders, quality, scrap' },
    { icon: Briefcase, label: 'Project Management', href: '/products/projects', desc: 'Gantt, Agile, EVM, CAPEX, PMO' },
    { icon: Activity, label: 'Analytics & BI', href: '/products/analytics', desc: 'Dashboards, KPIs, predictive AI, ETL' },
    { icon: ShoppingBag, label: 'E-Commerce', href: '/products/ecommerce', desc: 'Storefront, cart, Stripe, coupons' },
    { icon: Store, label: 'Point of Sale', href: '/products/pos', desc: 'Offline-first POS, receipts, cash' },
    { icon: FileText, label: 'Documents & Drive', href: '/products/documents', desc: 'Templates, approvals, OCR, version' },
  ],
  industry: [
    { icon: Heart, label: 'Healthcare', href: '/products/healthcare', desc: 'EHR, pharmacy, insurance, scheduling' },
    { icon: GraduationCap, label: 'Education', href: '/products/education', desc: 'Students, grades, timetable, library' },
    { icon: Building2, label: 'Real Estate', href: '/products/real-estate', desc: 'Properties, leases, CRM, maintenance' },
    { icon: Wrench, label: 'Field Service', href: '/products/field-service', desc: 'Work orders, dispatch, mobile crews' },
    { icon: Globe, label: 'E-Commerce Plus', href: '/marketplace', desc: 'Explore the full apps marketplace' },
    { icon: Cpu, label: 'API Platform', href: '/products/api-platform', desc: 'REST, webhooks, developer tools' },
  ],
};

const SOLUTIONS_MENU = [
  { icon: Building2, label: 'Enterprise', href: '/industries/enterprise', desc: 'Large-scale multi-entity operations' },
  { icon: Rocket, label: 'Startups', href: '/industries/startups', desc: 'Fast setup, grow as you scale' },
  { icon: Heart, label: 'Healthcare', href: '/industries/healthcare', desc: 'HIPAA-aware patient & billing flows' },
  { icon: GraduationCap, label: 'Education', href: '/industries/education', desc: 'Campus management end-to-end' },
  { icon: Hammer, label: 'Manufacturing', href: '/industries/manufacturing', desc: 'MRP, quality, shop-floor control' },
  { icon: ShoppingBag, label: 'Retail & E-Com', href: '/industries/retail', desc: 'POS, inventory, online storefront' },
  { icon: Wrench, label: 'Field Services', href: '/industries/field-service', desc: 'Dispatch, contracts, crew tracking' },
  { icon: Building2, label: 'Real Estate', href: '/industries/real-estate', desc: 'Leases, maintenance, REIT portfolio' },
];

const RESOURCES_MENU = [
  { icon: BookOpen, label: 'Documentation', href: '/docs', desc: 'End-user, admin & developer guides' },
  { icon: HelpCircle, label: 'Help Center', href: '/help', desc: 'Searchable knowledge base & FAQs' },
  { icon: Code2, label: 'API Reference', href: '/docs/api', desc: 'REST endpoints, auth, webhooks' },
  { icon: FileText, label: 'Blog', href: '/blog', desc: 'Product updates, best practices' },
  { icon: Layers, label: 'Resources Library', href: '/resources', desc: 'Whitepapers, webinars, templates' },
  { icon: Star, label: 'Customer Stories', href: '/customers', desc: 'How businesses use UniERP' },
  { icon: PieChart, label: 'Pricing', href: '/pricing', desc: 'Plans for every team size' },
  { icon: Shield, label: 'Security', href: '/security', desc: 'GDPR, SOC2, encryption details' },
];

const COMPANY_MENU = [
  { icon: Globe, label: 'About', href: '/about', desc: 'Our mission, team & values' },
  { icon: Briefcase, label: 'Careers', href: '/careers', desc: 'Open roles — join us' },
  { icon: MessageSquare, label: 'Contact', href: '/contact', desc: 'Talk to sales or support' },
  { icon: Activity, label: 'Status', href: '/status', desc: 'Platform uptime & incidents' },
  { icon: Settings2, label: 'Partners', href: '/contact?type=partnership', desc: 'Become a reseller or integrator' },
];

// ─── MegaMenu Dropdown ───────────────────────────────────────────────────────

function MegaMenuProducts({ visible = true }: { visible?: boolean }) {
  return (
    <div className={`mega-menu mega-menu-wide ${visible ? 'mega-menu-visible' : ''}`}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
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
          <Layers size={15} /> View all 45+ modules <ArrowRight size={14} />
        </Link>
        <Link href="/marketplace" className="mega-footer-link">
          <Store size={15} /> Browse Marketplace <ArrowRight size={14} />
        </Link>
        <Link href="/pricing" className="mega-footer-link mega-footer-cta">
          <Zap size={15} /> View pricing <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function MegaMenuSimple({ items, visible = true }: { items: typeof SOLUTIONS_MENU; visible?: boolean }) {
  return (
    <div className={`mega-menu mega-menu-medium ${visible ? 'mega-menu-visible' : ''}`}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        {items.map((item) => (
          <MegaItem key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}

function MegaItem({ icon: Icon, label, href, desc }: {
  icon: React.ElementType; label: string; href: string; desc: string;
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

// ─── NavItem with mega dropdown ──────────────────────────────────────────────

function NavDropdown({
  label,
  children,
  active,
}: {
  label: string;
  children: React.ReactNode;
  active: boolean;
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
      {open && children}
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
  demoLabel,
}: {
  open: boolean;
  onClose: () => void;
  erpAppUrl: string;
  loginPath: string;
  registerPath: string;
  demoLabel: string;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    { label: 'Products', href: '/products' },
    { label: 'Solutions', href: '/industries' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className={`mobile-overlay ${open ? 'mobile-overlay-open' : ''}`} role="dialog" aria-label="Navigation menu">
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
        <a href={`${erpAppUrl}${registerPath}`} className="mobile-cta-primary btn-primary" onClick={onClose}>
          <UserPlus size={16} /> Get Started Free
        </a>
      </div>
    </div>
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
          <Link href="/" className="header-logo" aria-label="UniERP home">
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
            <NavDropdown label="Products" active={isProducts}>
              <MegaMenuProducts visible={true} />
            </NavDropdown>
            <NavDropdown label="Solutions" active={isSolutions}>
              <MegaMenuSimple items={SOLUTIONS_MENU} visible={true} />
            </NavDropdown>
            <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'nav-link-active' : ''}`}>
              Pricing
            </Link>
            <NavDropdown label="Resources" active={isResources}>
              <MegaMenuSimple items={RESOURCES_MENU} visible={true} />
            </NavDropdown>
            <NavDropdown label="Company" active={isCompany}>
              <MegaMenuSimple items={COMPANY_MENU} visible={true} />
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

            <Link href={settings.headerCtaHref || '/contact'} className="btn-primary header-cta-btn">
              <Zap size={15} />
              <span>{settings.headerCtaLabel || 'Start Free Trial'}</span>
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
        demoLabel={settings.headerDemoLabel || 'Live Demo'}
      />
    </>
  );
}
