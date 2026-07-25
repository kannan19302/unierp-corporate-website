'use client';

import { usePathname } from 'next/navigation';
import { CONTENT_COLLECTIONS } from './collections';
import { AdminTabBar, type TabItem } from '../components/AdminTabBar';
import { ContentDataProvider } from './ContentDataContext';

export default function ContentStudioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Extract active collection id from URL path /admin/content/[collection]
  const currentCollectionId = pathname.split('/admin/content/')[1] || 'branding';

  const contentTabs: TabItem[] = CONTENT_COLLECTIONS.map((c) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    href: `/admin/content/${c.id}`,
  }));

  return (
    <ContentDataProvider>
      <div>
        <AdminTabBar tabs={contentTabs} activeTabId={currentCollectionId} />
        {children}
      </div>
    </ContentDataProvider>
  );
}

