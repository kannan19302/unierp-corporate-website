import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { getPrismaDelegate } from '@/lib/cms/collections';

const schema = z.object({ ids: z.array(z.string()).min(1).max(200) });

export async function POST(req: Request, { params }: { params: Promise<{ collection: string }> }) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const { collection } = await params;
  const found = getPrismaDelegate(collection);
  if (!found) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const owned = await found.delegate.findMany({ where: { tenantId, id: { in: parsed.data.ids } }, select: { id: true } });
  const ownedIds = new Set(owned.map((r: { id: string }) => r.id));
  const idsToReorder = parsed.data.ids.filter((id) => ownedIds.has(id));

  await prisma.$transaction(
    idsToReorder.map((id, index) => found.delegate.update({ where: { id }, data: { sortOrder: index } }))
  );

  return NextResponse.json({ success: true });
}
