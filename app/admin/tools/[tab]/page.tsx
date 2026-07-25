'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Sliders, KeyRound, ShieldCheck, Zap, FileSpreadsheet, Activity, Send, Globe, History } from 'lucide-react';
import { AdminTabBar, type TabItem } from '@/app/admin/components/AdminTabBar';

import ConsoleSettingsPage from '../../console-settings/page';
import AdminSettingsPage from '../../settings/page';
import AdminUsersPage from '../../users/page';
import AutomationPage from '../../automation/page';
import DataCenterPage from '../../data-center/page';
import SystemHealthPage from '../../system-health/page';
import BroadcastPage from '../../broadcast/page';
import SeoPage from '../../seo/page';
import AuditLogPage from '../../audit-log/page';

const TOOL_TABS: TabItem[] = [
  { id: 'preferences',  label: 'Console Preferences',    icon: Sliders,         href: '/admin/tools/preferences' },
  { id: 'integrations', label: 'Integrations & Secrets', icon: KeyRound,        href: '/admin/tools/integrations' },
  { id: 'users',        label: 'Admin Users & 2FA',      icon: ShieldCheck,      href: '/admin/tools/users' },
  { id: 'automation',   label: 'Workflow Automation',    icon: Zap,              href: '/admin/tools/automation' },
  { id: 'datacenter',   label: 'Data Import Center',     icon: FileSpreadsheet,  href: '/admin/tools/datacenter' },
  { id: 'health',       label: 'System Health',          icon: Activity,         href: '/admin/tools/health' },
  { id: 'broadcast',    label: 'Release Broadcasts',     icon: Send,             href: '/admin/tools/broadcast' },
  { id: 'seo',          label: 'SEO & Site Settings',    icon: Globe,            href: '/admin/tools/seo' },
  { id: 'auditlog',     label: 'Audit Log',              icon: History,          href: '/admin/tools/auditlog', superAdminOnly: true },
];

export default function AdminToolsTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = use(params);
  const activeTabMeta = TOOL_TABS.find((t) => t.id === tab);

  if (!activeTabMeta) notFound();

  return (
    <div>
      <AdminTabBar tabs={TOOL_TABS} activeTabId={tab} />

      {/* Render Active Tool Module */}
      {tab === 'preferences'  && <ConsoleSettingsPage />}
      {tab === 'integrations' && <AdminSettingsPage />}
      {tab === 'users'        && <AdminUsersPage />}
      {tab === 'automation'   && <AutomationPage />}
      {tab === 'datacenter'   && <DataCenterPage />}
      {tab === 'health'       && <SystemHealthPage />}
      {tab === 'broadcast'    && <BroadcastPage />}
      {tab === 'seo'          && <SeoPage />}
      {tab === 'auditlog'     && <AuditLogPage />}
    </div>
  );
}
