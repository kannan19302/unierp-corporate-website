'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ShieldCheck, Eye, Lock, UserPlus, Laptop, KeyRound } from 'lucide-react';
import { useImpersonation } from '../components/ImpersonationContext';
import { useToast } from '../components/ToastContext';
import { SessionManagerModal } from './SessionManagerModal';
import { PermissionMatrixModal } from './PermissionMatrixModal';
import { TwoFactorSetupModal } from '../components/TwoFactorSetupModal';

interface AdminUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  active: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState<'ADMIN' | 'SUPER_ADMIN' | null>(null);
  const [form, setForm] = useState({ email: '', password: '', role: 'ADMIN' as 'ADMIN' | 'SUPER_ADMIN' });
  const [error, setError] = useState('');
  const [sessionUser, setSessionUser] = useState<AdminUser | null>(null);
  const [permUser, setPermUser] = useState<AdminUser | null>(null);
  const [show2FA, setShow2FA] = useState(false);

  const { startImpersonation } = useImpersonation();
  const { success, error: toastError } = useToast();

  const load = () => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.users || []))
      .finally(() => setLoading(false));

    fetch('/api/admin/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setCurrentRole(data.user.role);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const isSuperAdmin = currentRole === 'SUPER_ADMIN';

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      toastError('Only Super Admins can create new admin accounts.', 'Permission Denied');
      return;
    }
    setError('');
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || 'Failed to create user');
      toastError(json.error || 'Failed to create user', 'Error');
      return;
    }
    setForm({ email: '', password: '', role: 'ADMIN' });
    load();
    success(`Successfully created ${form.role} account for ${form.email}!`, 'User Created');
  };

  const toggleActive = async (user: AdminUser) => {
    if (!isSuperAdmin) {
      toastError('Only Super Admins can activate/deactivate accounts.', 'Permission Denied');
      return;
    }
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !user.active }),
    });
    if (res.ok) {
      load();
      success(`Updated status for ${user.email}`, 'Status Updated');
    }
  };

  const handleImpersonate = (user: AdminUser) => {
    startImpersonation({ id: user.id, email: user.email, role: user.role });
    success(`Switched to impersonating ${user.email}`, 'Impersonating');
  };

  return (
    <div style={{ width: '100%' }}>
      <PageHeader
        title="Admin Users & Role Governance"
        description="Manage admin console access, fine-grained permission matrices, active sessions, and 2FA security. User creation is strictly restricted to Super Admins."
        actions={
          <button onClick={() => setShow2FA(true)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
            <KeyRound size={13} /> Enable 2FA Security
          </button>
        }
      />

      {/* RBAC Notice Banner for regular Admins */}
      {!isSuperAdmin && currentRole && (
        <div
          style={{
            background: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            color: '#d97706',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Lock size={16} />
          <span>You are logged in with the <strong>ADMIN</strong> role. Creating new accounts or altering user access requires <strong>SUPER_ADMIN</strong> permissions.</span>
        </div>
      )}

      {/* Create Account Form — Super Admin Only */}
      {isSuperAdmin && (
        <div className="admin-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <UserPlus size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Create Admin Account (Super Admin)</h3>
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '0.65rem' }}>{error}</p>}
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ flex: '1 1 160px' }}>
              <label style={labelStyle}>Password</label>
              <input required type="password" minLength={8} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ flex: '0 1 140px' }}>
              <label style={labelStyle}>Role</label>
              <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as 'ADMIN' | 'SUPER_ADMIN' }))} style={inputStyle}>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}>Create User</button>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="admin-card" style={{ padding: '1.25rem', overflowX: 'auto' }}>
        {loading ? (
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>Loading users…</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '0.65rem 0.75rem' }}>User Email</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Role</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Status</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Last Login</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                  <td style={{ padding: '0.65rem 0.75rem', color: 'var(--color-text-main)', fontWeight: 600 }}>{u.email}</td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px', background: u.role === 'SUPER_ADMIN' ? 'rgba(37,99,235,0.12)' : 'var(--color-surface)', color: u.role === 'SUPER_ADMIN' ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: u.active ? '#059669' : '#ef4444' }}>{u.active ? 'Active' : 'Deactivated'}</span>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}</td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {isSuperAdmin && (
                        <button
                          onClick={() => handleImpersonate(u)}
                          className="btn-secondary"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', gap: '0.2rem' }}
                          title={`Impersonate ${u.email}`}
                        >
                          <Eye size={11} /> Impersonate
                        </button>
                      )}
                      <button
                        onClick={() => setPermUser(u)}
                        className="btn-secondary"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', gap: '0.2rem' }}
                        title="Granular RBAC Permissions"
                      >
                        <ShieldCheck size={11} /> Permissions
                      </button>
                      <button
                        onClick={() => setSessionUser(u)}
                        className="btn-secondary"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', gap: '0.2rem' }}
                        title="Active Sessions"
                      >
                        <Laptop size={11} /> Sessions
                      </button>
                      {isSuperAdmin && (
                        <button onClick={() => toggleActive(u)} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: u.active ? 'rgba(239, 68, 68, 0.1)' : 'rgba(5, 150, 105, 0.1)', color: u.active ? '#ef4444' : '#059669', border: '1px solid currentColor', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                          {u.active ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {sessionUser && (
        <SessionManagerModal userEmail={sessionUser.email} onClose={() => setSessionUser(null)} />
      )}
      {permUser && (
        <PermissionMatrixModal userEmail={permUser.email} role={permUser.role} onClose={() => setPermUser(null)} />
      )}
      {show2FA && (
        <TwoFactorSetupModal userEmail="superadmin@unierp.com" onClose={() => setShow2FA(false)} />
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.25rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem' };
