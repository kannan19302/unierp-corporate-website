import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';
import { getDisallowedFields } from '@/lib/rbac';

const schema = z.object({
  brandName: z.string().trim().min(1).max(100),
  brandNameAccent: z.string().trim().max(100).optional(),
  logoText: z.string().trim().max(10).optional(),
  logoImageUrl: z.string().trim().max(500).optional(),
  brandTagline: z.string().trim().max(300).optional(),

  themePrimary: z.string().trim().max(30).optional(),
  themeAccent: z.string().trim().max(30).optional(),
  themeEmerald: z.string().trim().max(30).optional(),
  themePurple: z.string().trim().max(30).optional(),

  announcementEnabled: z.boolean().optional(),
  announcementIconName: z.string().trim().max(50).optional(),
  announcementText: z.string().trim().max(300).optional(),
  announcementCtaLabel: z.string().trim().max(100).optional(),
  announcementCtaHref: z.string().trim().max(300).optional(),

  headerDemoLabel: z.string().trim().max(50).optional(),
  headerLoginLabel: z.string().trim().max(50).optional(),
  headerCtaLabel: z.string().trim().max(50).optional(),
  headerCtaHref: z.string().trim().max(300).optional(),

  erpAppUrl: z.string().trim().max(300).optional(),
  erpLoginPath: z.string().trim().max(100).optional(),
  erpRegisterPath: z.string().trim().max(100).optional(),
  siteUrl: z.string().trim().max(300).optional(),

  trustStats: z.array(z.object({ label: z.string(), value: z.string() })).max(8).optional(),
  logoWallHeading: z.string().trim().max(300).optional(),
  logoWallNames: z.array(z.string().max(100)).max(20).optional(),

  footerBrandName: z.string().trim().max(100).optional(),
  footerBlurb: z.string().trim().max(500).optional(),
  newsletterPlaceholder: z.string().trim().max(200).optional(),
  newsletterCtaLabel: z.string().trim().max(100).optional(),
  copyrightText: z.string().trim().max(300).optional(),

  chatEnabled: z.boolean().optional(),
  chatTitle: z.string().trim().max(100).optional(),
  chatLauncherLabel: z.string().trim().max(100).optional(),
  chatGreeting: z.string().trim().max(500).optional(),
  chatSystemPrompt: z.string().trim().max(4000).optional(),
  chatFallbackMessage: z.string().trim().max(500).optional(),

  defaultOgImage: z.string().trim().max(500).optional(),
  titleTemplate: z.string().trim().max(100).optional(),
});

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const settings = await prisma.siteSettings.findUnique({ where: { tenantId: auth.session.tenantId } });
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  // Form state round-trips Prisma's `null` for untouched optional fields,
  // but zod's `.optional()` only accepts `undefined` — normalize null to
  // undefined (i.e. "field not provided") before validating.
  const rawBody = await req.json();
  const body = Object.fromEntries(Object.entries(rawBody).filter(([, v]) => v !== null));

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  // H04: FIELD_PERMISSIONS (lib/rbac.ts) was only ever enforced by a UI
  // lock icon — a direct POST here bypassed it entirely. Reject any field
  // the caller's role is not permitted to write instead of trusting the
  // client to have hidden it.
  const disallowed = getDisallowedFields(auth.session.role, Object.keys(parsed.data));
  if (disallowed.length > 0) {
    return NextResponse.json(
      { error: `Not permitted to change: ${disallowed.join(', ')}` },
      { status: 403 }
    );
  }

  const settings = await prisma.siteSettings.upsert({
    where: { tenantId },
    update: parsed.data,
    create: { tenantId, ...parsed.data },
  });

  await logAudit(auth.session, 'update', 'site-settings', settings.id, settings.brandName);

  return NextResponse.json({ success: true, settings });
}
