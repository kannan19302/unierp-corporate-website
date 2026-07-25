import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { provisionTenant, provisionTenantSchema } from '@/lib/platform/provision-tenant';

function isAuthorized(req: Request): boolean {
  const configuredToken = process.env.PLATFORM_ADMIN_TOKEN;
  if (!configuredToken) return false;

  const providedToken = req.headers.get('x-platform-token') || '';
  const configured = Buffer.from(configuredToken);
  const provided = Buffer.from(providedToken);

  if (configured.length !== provided.length) return false;
  return crypto.timingSafeEqual(configured, provided);
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const tenants = await prisma.tenant.findMany({
    include: { domains: true, _count: { select: { users: true, leads: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, tenants });
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const parsed = provisionTenantSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await provisionTenant(prisma, parsed.data);
    return NextResponse.json({ success: true, tenant: result.tenant, admin: result.admin });
  } catch (error) {
    console.error('Tenant provisioning error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
