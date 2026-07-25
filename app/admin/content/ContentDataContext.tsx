'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

interface ContentData {
  siteSettings: any;
  navigation: any[];
  pages: any[];
  features: any[];
  testimonials: any[];
  pricing: any[];
  faqs: any[];
  industries: any[];
  'case-studies': any[];
  resources: any[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const empty = {
  siteSettings: null,
  navigation: [],
  pages: [],
  features: [],
  testimonials: [],
  pricing: [],
  faqs: [],
  industries: [],
  'case-studies': [],
  resources: [],
};

const ContentDataCtx = createContext<ContentData>({ ...empty, loading: true, refresh: async () => {} });

export function ContentDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(empty);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (e) {
      console.error('Failed to load content data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <ContentDataCtx.Provider value={{ ...data, loading, refresh }}>{children}</ContentDataCtx.Provider>;
}

export function useContentData() {
  return useContext(ContentDataCtx);
}
