import { BarChart3, Users, Ticket, Mail, LayoutTemplate, Bell, Wrench } from 'lucide-react';
import type { ComponentType } from 'react';

export interface AdminNavItem {
  id: string;
  href: string;
  label: string;
  category: 'OVERVIEW' | 'CONTENT & CMS' | 'SALES & CRM' | 'SUPPORT & LOGS' | 'ADMIN TOOLS';
  icon: ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  roles: Array<'ADMIN' | 'SUPER_ADMIN'>;
}

export const ADMIN_NAV: AdminNavItem[] = [
  { id: 'analytics',   href: '/admin',                       label: 'Network Analytics',         category: 'OVERVIEW',        icon: BarChart3,      roles: ['ADMIN', 'SUPER_ADMIN'] },
  { id: 'content',     href: '/admin/content/branding',      label: 'Site Content Studio',       category: 'CONTENT & CMS',  icon: LayoutTemplate, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { id: 'leads',       href: '/admin/leads',                 label: 'Lead Management',           category: 'SALES & CRM',    icon: Users,          roles: ['ADMIN', 'SUPER_ADMIN'] },
  { id: 'subscribers', href: '/admin/subscribers',           label: 'Subscriber Management',     category: 'SALES & CRM',    icon: Bell,           roles: ['ADMIN', 'SUPER_ADMIN'] },
  { id: 'tickets',     href: '/admin/tickets',               label: 'Support Tickets',           category: 'SUPPORT & LOGS', icon: Ticket,         roles: ['ADMIN', 'SUPER_ADMIN'] },
  { id: 'emails',      href: '/admin/emails',                label: 'Email Logs',                category: 'SUPPORT & LOGS', icon: Mail,           roles: ['ADMIN', 'SUPER_ADMIN'] },
  // Admin Tools Hub → all sub-tools (preferences, integrations, users, automation, data, health, broadcast, seo, audit-log) live inside /admin/tools/[tab]
  { id: 'tools',       href: '/admin/tools/preferences',     label: 'Admin Tools Hub',           category: 'ADMIN TOOLS',    icon: Wrench,         roles: ['ADMIN', 'SUPER_ADMIN'] },
];
