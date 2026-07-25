'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AdminRole } from '@/lib/rbac';

interface Stats {
  totalPageviews: number;
  activeLeads: number;
  highScoreLeads: number;
  openTickets: number;
  totalSubscribers: number;
  emailsSent: number;
  emailsFailed: number;
  emailsQueued: number;
  deliveryRate: number;
  pendingBroadcasts: number;
}

interface AdminData {
  stats: Stats;
  leads: any[];
  tickets: any[];
  emailLogs: any[];
  seo: any[];
  recentAuditLogs: any[];
  scheduledBroadcasts: any[];
  dailyTrend: { date: string; count: number }[];
  role: AdminRole | null;
  userEmail: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const defaultStats: Stats = {
  totalPageviews: 0,
  activeLeads: 0,
  highScoreLeads: 0,
  openTickets: 0,
  totalSubscribers: 0,
  emailsSent: 0,
  emailsFailed: 0,
  emailsQueued: 0,
  deliveryRate: 100,
  pendingBroadcasts: 0,
};

const AdminDataCtx = createContext<AdminData>({
  stats: defaultStats,
  leads: [],
  tickets: [],
  emailLogs: [],
  seo: [],
  recentAuditLogs: [],
  scheduledBroadcasts: [],
  dailyTrend: [],
  role: null,
  userEmail: null,
  loading: true,
  refresh: async () => {},
});

export function AdminDataProvider({
  children,
  initialRole,
  initialEmail,
}: {
  children: ReactNode;
  initialRole?: AdminRole | null;
  initialEmail?: string | null;
}) {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [leads, setLeads] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [seo, setSeo] = useState<any[]>([]);
  const [recentAuditLogs, setRecentAuditLogs] = useState<any[]>([]);
  const [scheduledBroadcasts, setScheduledBroadcasts] = useState<any[]>([]);
  const [dailyTrend, setDailyTrend] = useState<{ date: string; count: number }[]>([]);
  const [role, setRole] = useState<AdminRole | null>(initialRole ?? null);
  const [userEmail, setUserEmail] = useState<string | null>(initialEmail ?? null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      // Load role if not provided
      if (!role) {
        const meRes = await fetch('/api/admin/me');
        if (meRes.ok) {
          const meJson = await meRes.json();
          if (meJson.authenticated) {
            setRole(meJson.user.role);
            setUserEmail(meJson.user.email);
          }
        }
      }

      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const json = await res.json();
        setStats(json.data.stats);
        setLeads(json.data.leads);
        setTickets(json.data.tickets);
        setEmailLogs(json.data.emailLogs);
        setSeo(json.data.seo);
        setRecentAuditLogs(json.data.recentAuditLogs || []);
        setScheduledBroadcasts(json.data.scheduledBroadcasts || []);
        setDailyTrend(json.data.dailyTrend || []);
      }
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AdminDataCtx.Provider
      value={{ stats, leads, tickets, emailLogs, seo, recentAuditLogs, scheduledBroadcasts, dailyTrend, role, userEmail, loading, refresh }}
    >
      {children}
    </AdminDataCtx.Provider>
  );
}

export function useAdminData() {
  return useContext(AdminDataCtx);
}
