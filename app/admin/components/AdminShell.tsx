'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Sun, Moon, Eye, UserX, Command } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { AdminDataProvider } from '@/app/admin/AdminDataContext';
import { ToastProvider } from './ToastContext';
import { ImpersonationProvider, useImpersonation } from './ImpersonationContext';
import { ConsoleThemeProvider } from './ConsoleThemeContext';
import { CommandPaletteModal } from './CommandPaletteModal';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { ADMIN_NAV } from '@/app/admin/nav';
import { useTheme } from '@/lib/useTheme';

import { AdminBreadcrumb } from './AdminBreadcrumb';

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [role, setRole] = useState<'ADMIN' | 'SUPER_ADMIN' | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    const checkAuth = () => {
      fetch('/api/admin/me')
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setRole(data.user.role);
            setEmail(data.user.email);
            setAuthChecked(true);
          } else {
            router.push('/admin/login');
          }
        })
        .catch(() => router.push('/admin/login'));
    };

    checkAuth();

    const handlePageShow = (event: PageTransitionEvent) => {
      // Re-verify authentication whenever page is shown (especially from BFCache / Back navigation)
      checkAuth();
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        Loading admin console…
      </div>
    );
  }

  return (
    <AdminDataProvider>
      <ConsoleThemeProvider>
        <ToastProvider>
          <ImpersonationProvider>
            <AdminShellInner
              theme={theme}
              toggleTheme={toggleTheme}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              role={role}
            email={email}
            handleLogout={handleLogout}
            pathname={pathname}
          >
            {children}
          </AdminShellInner>
        </ImpersonationProvider>
      </ToastProvider>
    </ConsoleThemeProvider>
  </AdminDataProvider>
  );
}

function AdminShellInner({
  children,
  theme,
  toggleTheme,
  collapsed,
  setCollapsed,
  role,
  email,
  handleLogout,
  pathname,
}: any) {
  const { impersonatedUser, stopImpersonation } = useImpersonation();
  const currentNavItem = ADMIN_NAV.find((n) => n.href === pathname);

  const activeRole = impersonatedUser ? impersonatedUser.role : role;
  const activeEmail = impersonatedUser ? impersonatedUser.email : email;

  return (
    <div data-theme={theme} className="admin-root" style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text-main)', fontFamily: 'var(--font-sans)' }}>
      <AppSidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c: boolean) => !c)} role={activeRole} email={activeEmail} onLogout={handleLogout} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Impersonation Amber Banner */}
        {impersonatedUser && (
          <div
            style={{
              background: 'linear-gradient(90deg, #d97706, #f59e0b)',
              color: '#ffffff',
              padding: '0.4rem 1.25rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(217,119,6,0.25)',
              zIndex: 100,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Eye size={15} />
              <span>
                <strong>IMPERSONATION MODE ACTIVE:</strong> Viewing admin console as <strong>{impersonatedUser.email}</strong> ({impersonatedUser.role})
              </span>
            </div>
            <button
              onClick={stopImpersonation}
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: 'none',
                color: '#fff',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <UserX size={13} /> Exit Impersonation
            </button>
          </div>
        )}

        <header
          style={{
            height: 'var(--header-height)',
            background: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid var(--color-card-border)',
            padding: '0 var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <WorkspaceSwitcher />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-card-border)',
                color: 'var(--color-text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Global Search & Command Palette (Ctrl+K)"
            >
              <Command size={13} />
              <span>Search...</span>
              <kbd style={{ fontSize: '0.68rem', background: 'var(--color-bg)', padding: '0.1rem 0.35rem', borderRadius: '3px', border: '1px solid var(--color-card-border)', fontFamily: 'monospace' }}>Ctrl K</kbd>
            </button>

            <button
              onClick={toggleTheme}
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {theme === 'dark' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} />}
              <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
            </button>

            <button
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                window.location.href = '/';
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-surface)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)', cursor: 'pointer' }}
            >
              <ArrowLeft size={15} />
              <span>Back to Public Site</span>
            </button>
          </div>
        </header>

        <AdminBreadcrumb pathname={pathname} />

        <main style={{ flex: 1, padding: '1.25rem 1.5rem', width: '100%', minWidth: 0 }}>{children}</main>
        <CommandPaletteModal />
      </div>
    </div>
  );
}
