'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Star } from 'lucide-react';
import { ADMIN_NAV } from '@/app/admin/nav';

const PIN_STORAGE_KEY = 'unierp-admin-pinned-tabs';

export function TabWorkspaceBar({ role }: { role: 'ADMIN' | 'SUPER_ADMIN' | null }) {
  const pathname = usePathname();
  const [pinned, setPinned] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PIN_STORAGE_KEY) || '[]');
      if (Array.isArray(stored)) setPinned(stored);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const togglePin = (id: string) => {
    setPinned((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const availableNav = ADMIN_NAV.filter((item) => item.roles.includes(role || 'SUPER_ADMIN'));
  const ordered = [...availableNav].sort((a, b) => {
    const aPinned = pinned.includes(a.id) ? 0 : 1;
    const bPinned = pinned.includes(b.id) ? 0 : 1;
    return aPinned - bPinned;
  });

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-card-border)',
        padding: '0.5rem 1.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        overflowX: 'auto',
        position: 'sticky',
        top: 'var(--header-height)',
        zIndex: 40,
      }}
    >
      {ordered.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        const isPinned = pinned.includes(item.id);

        return (
          <Link
            key={item.id}
            href={item.href}
            className="admin-tab"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderTopLeftRadius: 'var(--radius-md)',
              borderTopRightRadius: 'var(--radius-md)',
              background: isActive ? 'var(--color-card)' : 'transparent',
              color: isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              border: isActive ? '1px solid var(--color-card-border)' : '1px solid transparent',
              borderBottom: isActive ? '1px solid var(--color-card)' : 'none',
              fontSize: 'var(--text-sm)',
              fontWeight: isActive ? 700 : 500,
              marginBottom: isActive ? '-1px' : '0',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon size={14} style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)' }} />
            <span>{item.label}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePin(item.id);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: isPinned ? '#f59e0b' : 'var(--color-text-subtle)' }}
              title={isPinned ? 'Unpin tab' : 'Pin tab'}
            >
              <Star size={12} fill={isPinned ? '#f59e0b' : 'none'} />
            </button>
          </Link>
        );
      })}
    </div>
  );
}
