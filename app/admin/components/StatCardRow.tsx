import { useAdminData } from '@/app/admin/AdminDataContext';

export function StatCardRow() {
  const { stats } = useAdminData();

  const cards = [
    { label: 'Total Site Pageviews', value: stats.totalPageviews.toLocaleString(), color: 'var(--color-primary)' },
    { label: 'Active Sales Leads', value: `${stats.activeLeads} (${stats.highScoreLeads} High Score)`, color: 'var(--color-emerald)' },
    { label: 'Open Support Incidents', value: stats.openTickets, color: 'var(--color-amber)' },
    { label: 'Newsletter Subscribers', value: stats.totalSubscribers.toLocaleString(), color: 'var(--color-purple)' },
    { label: 'Outbound Emails Sent', value: stats.emailsSent.toLocaleString(), color: '#db2777' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
      {cards.map((c) => (
        <div key={c.label} className="admin-card" style={{ padding: 'var(--space-5)' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>{c.label}</div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, color: c.color, marginTop: '0.25rem' }}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}
