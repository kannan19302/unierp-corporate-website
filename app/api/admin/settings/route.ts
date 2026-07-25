import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdminTenant } from '@/lib/auth';
import { getMaskedSettings, setSetting, clearSetting, SETTING_KEYS, type SettingKey } from '@/lib/settings';
import { logAudit } from '@/lib/audit';

const postSchema = z.object({
  key: z.enum(SETTING_KEYS as [string, ...string[]]),
  value: z.string().max(1000),
});

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  if (auth.session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only super admins can view integration settings' }, { status: 403 });
  }

  const settings = await getMaskedSettings(auth.session.tenantId);
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { session } = auth;

  if (session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only super admins can change integration settings' }, { status: 403 });
  }

  const parsed = postSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const { key, value } = parsed.data;

  if (value.trim() === '') {
    await clearSetting(session.tenantId, key as SettingKey);
    await logAudit(session, 'clear', 'setting', key, `Reverted ${key} to environment default`);
  } else {
    await setSetting(session.tenantId, key as SettingKey, value, session.sub);
    await logAudit(session, 'update', 'setting', key, `Updated ${key}`);
  }

  const settings = await getMaskedSettings(session.tenantId);
  return NextResponse.json({ success: true, settings });
}
