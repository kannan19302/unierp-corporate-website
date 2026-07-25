'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteContent } from '@/lib/cms/queries';

const SiteContentCtx = createContext<SiteContent | null>(null);

export function SiteContentProvider({ value, children }: { value: SiteContent; children: ReactNode }) {
  return <SiteContentCtx.Provider value={value}>{children}</SiteContentCtx.Provider>;
}

export function useSiteContent(): SiteContent {
  const ctx = useContext(SiteContentCtx);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
}
