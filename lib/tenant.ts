import { cache } from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const DEV_TENANT_HEADER = 'x-tenant-domain';

export interface ResolvedTenant {
  id: string;
  slug: string;
  name: string;
  primaryDomain: string;
}

export function normalizeHostname(raw?: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return null;
  const withoutPort = trimmed.split(':')[0];
  return withoutPort.replace(/\.$/, '') || null;
}

export const resolveTenantByHostname = cache(async (hostname: string): Promise<ResolvedTenant | null> => {
  const tenant = await prisma.tenant.findFirst({
    where: { active: true, domains: { some: { hostname } } },
    select: { id: true, slug: true, name: true, primaryDomain: true },
  });
  return tenant;
});

function resolveDevFallbackHost(explicitHeader?: string | null): string | null {
  if (process.env.NODE_ENV === 'production') return null;
  return normalizeHostname(explicitHeader || process.env.DEV_TENANT_DOMAIN);
}

async function resolveFromHost(devOverride: string | null, forwardedHost: string | null, host: string | null): Promise<ResolvedTenant | null> {
  const candidates = [devOverride, forwardedHost, host].map(normalizeHostname).filter((h): h is string => !!h);

  for (const candidate of candidates) {
    const tenant = await resolveTenantByHostname(candidate);
    if (tenant) return tenant;
  }

  const fallbackHost = resolveDevFallbackHost(null);
  if (fallbackHost && !candidates.includes(fallbackHost)) {
    const tenant = await resolveTenantByHostname(fallbackHost);
    if (tenant) return tenant;
  }

  return null;
}

/** Server Component / layout usage — reads Next's headers() API, cached per request. */
export const getTenant = cache(async (): Promise<ResolvedTenant | null> => {
  const h = await headers();
  const devOverride = process.env.NODE_ENV !== 'production' ? h.get(DEV_TENANT_HEADER) : null;
  return resolveFromHost(devOverride, h.get('x-forwarded-host'), h.get('host'));
});

export async function requireTenant(): Promise<ResolvedTenant> {
  const tenant = await getTenant();
  if (!tenant) notFound();
  return tenant;
}

/** Route Handler usage — reads from a Request object instead of headers(). */
export async function getTenantFromRequest(req: Request): Promise<ResolvedTenant | null> {
  const devOverride = process.env.NODE_ENV !== 'production' ? req.headers.get(DEV_TENANT_HEADER) : null;
  return resolveFromHost(devOverride, req.headers.get('x-forwarded-host'), req.headers.get('host'));
}

/**
 * The normalized hostname a request actually resolved its tenant against —
 * same precedence as getTenantFromRequest (dev override > forwarded host >
 * Host header). Use this (never `new URL(req.url).host`, which reflects the
 * server's local socket address, not the client-supplied Host header) for
 * anything that must match what getTenantFromRequest/getTenant used, e.g. the
 * `tenantHost` JWT claim set at login time.
 */
export function getRequestHostname(req: Request): string | null {
  const devOverride = process.env.NODE_ENV !== 'production' ? req.headers.get(DEV_TENANT_HEADER) : null;
  return (
    normalizeHostname(devOverride) ||
    normalizeHostname(req.headers.get('x-forwarded-host')) ||
    normalizeHostname(req.headers.get('host'))
  );
}
