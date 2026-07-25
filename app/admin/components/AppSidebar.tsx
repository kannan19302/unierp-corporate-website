'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Menu, LogOut } from 'lucide-react';
import { ADMIN_NAV } from '@/app/admin/nav';

const CATEGORIES = ['OVERVIEW', 'CONTENT & CMS', 'SALES & CRM', 'SUPPORT & LOGS', 'ADMIN TOOLS'] as const;

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  role: 'ADMIN' | 'SUPER_ADMIN' | null;
  email: string | null;
  onLogout: () => void;
}

export function AppSidebar({ collapsed, onToggleCollapsed, role, email, onLogout }: AppSidebarProps) {
  const pathname = usePathname();
  const availableNav = ADMIN_NAV.filter((item) => item.roles.includes(role || 'SUPER_ADMIN'));

  return (
    <aside
      style={{
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        background: 'var(--color-sidebar-bg)',
        borderRight: '1px solid var(--color-sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--duration-normal) var(--ease-default)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          height: 'var(--header-height)',
          padding: collapsed ? '0 0.35rem' : '0 0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid var(--color-sidebar-border)',
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 900, fontSize: '0.92rem' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 900,
                fontSize: '0.8rem',
              }}
            >
              U
            </div>
            <span style={{ color: 'var(--color-sidebar-text-active)', letterSpacing: '-0.02em' }}>
              UniERP <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 800 }}>Admin</span>
            </span>
          </div>
        )}
        <button onClick={onToggleCollapsed} style={iconButtonStyle} title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Scrollable Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: collapsed ? '0.6rem 0.3rem' : '0.6rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        {CATEGORIES.map((cat) => {
          const items = availableNav.filter((item) => item.category === cat);
          if (items.length === 0) return null;

          return (
            <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', marginBottom: '0.4rem' }}>
              {!collapsed && (
                <div
                  style={{
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'var(--color-text-subtle)',
                    letterSpacing: '0.07em',
                    padding: '0.35rem 0.55rem 0.15rem',
                  }}
                >
                  {cat}
                </div>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.id === 'content' && pathname.startsWith('/admin/content')) ||
                  (item.id === 'tools' && pathname.startsWith('/admin/tools'));
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="admin-nav-item"
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: collapsed ? '0.45rem' : '0.4rem 0.55rem',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      borderRadius: 'var(--radius-md)',
                      /* ERPSys style: active = white card on gray sidebar, not filled primary */
                      background: isActive ? 'var(--color-sidebar-active)' : 'transparent',
                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                      color: isActive ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      width: '100%',
                      transition: 'all 0.1s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'var(--color-sidebar-hover)';
                        e.currentTarget.style.color = 'var(--color-sidebar-text-active)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--color-sidebar-text)';
                      }
                    }}
                  >
                    <Icon
                      size={15}
                      style={{
                        /* Active icon uses primary indigo accent */
                        color: isActive ? 'var(--color-primary)' : 'var(--color-sidebar-text)',
                        flexShrink: 0,
                      }}
                    />
                    {!collapsed && (
                      <span
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          lineHeight: 1.2,
                        }}
                      >
                        {item.label}
                      </span>
                    )}
                    {/* Active left-bar indicator (ERPSys style) */}
                    {isActive && !collapsed && (
                      <span
                        style={{
                          marginLeft: 'auto',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'var(--color-primary)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Profile Box */}
      <div
        style={{
          padding: collapsed ? '0.5rem 0.3rem' : '0.5rem 0.65rem',
          borderTop: '1px solid var(--color-sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          flexShrink: 0,
          background: 'var(--color-sidebar-bg)',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', flex: 1, marginRight: '0.25rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                /* ERPSys avatar style: primary-light bg with primary text */
                background: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.7rem',
                color: 'var(--color-primary)',
                flexShrink: 0,
              }}
            >
              {role === 'SUPER_ADMIN' ? 'SA' : 'AD'}
            </div>
            <div style={{ overflow: 'hidden', minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--color-sidebar-text-active)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={email || 'Admin User'}
              >
                {email || 'Admin User'}
              </div>
              <span
                style={{
                  fontSize: '9px',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  background: 'var(--color-primary-light)',
                  padding: '0.05rem 0.3rem',
                  borderRadius: '3px',
                  display: 'inline-block',
                }}
              >
                {role || 'LOADING'}
              </span>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          title="Logout"
          style={{
            ...iconButtonStyle,
            color: '#ef4444',
            padding: '0.3rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}

const iconButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'var(--color-sidebar-text)',
  cursor: 'pointer',
  padding: '0.25rem',
  borderRadius: 'var(--radius-sm)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s',
};
