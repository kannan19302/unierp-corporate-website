import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';
import { sectionsArraySchema } from '@/lib/cms/section-schema';

const schema = z.object({
  path: z.string().trim().min(1).max(200),
  title: z.string().trim().max(200).optional(),
  badgeIconName: z.string().trim().max(50).optional(),
  badgeText: z.string().trim().max(200).optional(),
  heroHeadline: z.string().trim().max(300).optional(),
  heroHeadlineAccent: z.string().trim().max(200).optional(),
  heroSubheadline: z.string().trim().max(600).optional(),
  heroPrimaryCtaLabel: z.string().trim().max(100).optional(),
  heroPrimaryCtaHref: z.string().trim().max(300).optional(),
  heroSecondaryCtaLabel: z.string().trim().max(100).optional(),
  heroSecondaryCtaHref: z.string().trim().max(300).optional(),
  heroBullets: z.array(z.string().max(200)).max(10).optional(),
  sections: sectionsArraySchema.optional(),
  visible: z.boolean().optional(),
});

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const pages = await prisma.pageContent.findMany({ where: { tenantId: auth.session.tenantId }, orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ success: true, pages });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const rawBody = await req.json();
  const body = Object.fromEntries(Object.entries(rawBody).filter(([, v]) => v !== null));

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const { path, ...rest } = parsed.data;
  const page = await prisma.pageContent.upsert({
    where: { tenantId_path: { tenantId, path } },
    update: rest,
    create: { tenantId, path, ...rest },
  });

  await logAudit(auth.session, 'update', 'page-content', page.id, path);

  return NextResponse.json({ success: true, page });
}
