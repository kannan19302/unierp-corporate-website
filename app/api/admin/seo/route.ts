import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

const schema = z.object({
  path: z.string().trim().min(1).max(200),
  metaTitle: z.string().trim().min(1).max(300),
  metaDescription: z.string().trim().max(500).optional(),
  schemaType: z.string().trim().max(100).optional(),
  canonicalUrl: z.string().trim().max(300).optional(),
  ogImage: z.string().trim().max(300).optional(),
});

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const settings = await prisma.seoSetting.findMany({ where: { tenantId: auth.session.tenantId }, orderBy: { path: 'asc' } });
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: Request) {
  try {
    const auth = await requireAdminTenant(req);
    if ('error' in auth) return auth.error;
    const { tenantId } = auth.session;

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const { path, ...rest } = parsed.data;
    const setting = await prisma.seoSetting.upsert({
      where: { tenantId_path: { tenantId, path } },
      update: rest,
      create: { tenantId, path, ...rest },
    });

    await logAudit(auth.session, 'update', 'seo-setting', setting.id, path);

    return NextResponse.json({ success: true, setting });
  } catch (error) {
    console.error('SEO update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
