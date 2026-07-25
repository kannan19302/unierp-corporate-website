import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { encryptSecret, decryptSecret, maskHint } from '@/lib/crypto';

export type SettingKey =
  | 'RESEND_API_KEY'
  | 'RESEND_FROM_EMAIL'
  | 'ADMIN_NOTIFICATION_EMAIL'
  | 'OLLAMA_BASE_URL'
  | 'OLLAMA_MODEL';

interface SettingDef {
  label: string;
  group: 'Email' | 'AI';
  isSecret: boolean;
  envFallback?: string;
  placeholder?: string;
  help?: string;
}

export const SETTING_DEFS: Record<SettingKey, SettingDef> = {
  RESEND_API_KEY: {
    label: 'Resend API Key',
    group: 'Email',
    isSecret: true,
    envFallback: 'RESEND_API_KEY',
    placeholder: 're_...',
    help: 'Used to send lead confirmations, ticket replies, and broadcasts.',
  },
  RESEND_FROM_EMAIL: {
    label: 'From Address',
    group: 'Email',
    isSecret: false,
    envFallback: 'RESEND_FROM_EMAIL',
    placeholder: 'Your Business <notifications@yourdomain.com>',
  },
  ADMIN_NOTIFICATION_EMAIL: {
    label: 'Admin Notification Email',
    group: 'Email',
    isSecret: false,
    envFallback: 'ADMIN_NOTIFICATION_EMAIL',
    placeholder: 'sales@yourdomain.com',
    help: 'Where new-lead and escalation notifications are sent.',
  },
  OLLAMA_BASE_URL: {
    label: 'Ollama Base URL',
    group: 'AI',
    isSecret: false,
    envFallback: 'OLLAMA_BASE_URL',
    placeholder: 'http://localhost:11434',
  },
  OLLAMA_MODEL: {
    label: 'Ollama Model',
    group: 'AI',
    isSecret: false,
    envFallback: 'OLLAMA_MODEL',
    placeholder: 'llama3.2:3b',
  },
};

export const SETTING_KEYS = Object.keys(SETTING_DEFS) as SettingKey[];

export const getSettings = cache(async (tenantId: string): Promise<Record<SettingKey, string | undefined>> => {
  const rows = await prisma.setting.findMany({ where: { tenantId, key: { in: SETTING_KEYS } } });
  const byKey = new Map(rows.map((r) => [r.key as SettingKey, r]));

  const result = {} as Record<SettingKey, string | undefined>;
  for (const key of SETTING_KEYS) {
    const def = SETTING_DEFS[key];
    const row = byKey.get(key);
    if (row && row.value) {
      result[key] = def.isSecret ? decryptSecret(row.value) : row.value;
    } else {
      result[key] = def.envFallback ? process.env[def.envFallback] : undefined;
    }
  }
  return result;
});

export async function getSetting(tenantId: string, key: SettingKey): Promise<string | undefined> {
  const all = await getSettings(tenantId);
  return all[key];
}

export interface MaskedSetting {
  key: SettingKey;
  label: string;
  group: string;
  isSecret: boolean;
  placeholder?: string;
  help?: string;
  source: 'db' | 'env' | 'unset';
  hint: string | null;
  value: string | null;
}

export async function getMaskedSettings(tenantId: string): Promise<MaskedSetting[]> {
  const rows = await prisma.setting.findMany({ where: { tenantId, key: { in: SETTING_KEYS } } });
  const byKey = new Map(rows.map((r) => [r.key as SettingKey, r]));

  return SETTING_KEYS.map((key) => {
    const def = SETTING_DEFS[key];
    const row = byKey.get(key);

    if (row && row.value) {
      return {
        key,
        label: def.label,
        group: def.group,
        isSecret: def.isSecret,
        placeholder: def.placeholder,
        help: def.help,
        source: 'db',
        hint: def.isSecret ? row.hint : null,
        value: def.isSecret ? null : row.value,
      };
    }

    const envValue = def.envFallback ? process.env[def.envFallback] : undefined;
    if (envValue) {
      return {
        key,
        label: def.label,
        group: def.group,
        isSecret: def.isSecret,
        placeholder: def.placeholder,
        help: def.help,
        source: 'env',
        hint: def.isSecret ? maskHint(envValue) : null,
        value: def.isSecret ? null : envValue,
      };
    }

    return {
      key,
      label: def.label,
      group: def.group,
      isSecret: def.isSecret,
      placeholder: def.placeholder,
      help: def.help,
      source: 'unset',
      hint: null,
      value: null,
    };
  });
}

export async function setSetting(tenantId: string, key: SettingKey, rawValue: string, userId?: string): Promise<void> {
  const def = SETTING_DEFS[key];
  if (!def) throw new Error(`Unknown setting key: ${key}`);

  const value = def.isSecret ? encryptSecret(rawValue) : rawValue;
  const hint = def.isSecret ? maskHint(rawValue) : null;

  await prisma.setting.upsert({
    where: { tenantId_key: { tenantId, key } },
    update: { value, isSecret: def.isSecret, hint, updatedByUserId: userId },
    create: { tenantId, key, value, isSecret: def.isSecret, hint, updatedByUserId: userId },
  });
}

export async function clearSetting(tenantId: string, key: SettingKey): Promise<void> {
  await prisma.setting.deleteMany({ where: { tenantId, key } });
}
