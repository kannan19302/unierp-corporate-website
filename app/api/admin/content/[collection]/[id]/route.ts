import { NextResponse } from 'next/server';
import { requireAdminTenant } from '@/lib/auth';
import { getPrismaDelegate } from '@/lib/cms/collections';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const { collection, id } = await params;
  const found = getPrismaDelegate(collection);
  if (!found) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  const existing = await found.delegate.findFirst({ where: { id, tenantId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const partialSchema = found.def.schema.partial();
  const body = await req.json();
  const parsed = partialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  // sortOrder is managed separately via the reorder endpoint, but allow it
  // through here too for direct up/down nudges from the list UI.
  const data = { ...parsed.data } as Record<string, unknown>;
  if (typeof body.sortOrder === 'number') data.sortOrder = body.sortOrder;

  try {
    const item = await found.delegate.update({ where: { id }, data });
    const label = (item as any).name || (item as any).label || (item as any).title || (item as any).question || (item as any).slug;
    await logAudit(auth.session, 'update', collection, id, label);
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'An item with that slug already exists' }, { status: 409 });
    }
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const { collection, id } = await params;
  const found = getPrismaDelegate(collection);
  if (!found) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  const existing = await found.delegate.findFirst({ where: { id, tenantId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await found.delegate.delete({ where: { id } });
  const label = (existing as any).name || (existing as any).label || (existing as any).title || (existing as any).question || (existing as any).slug;
  await logAudit(auth.session, 'delete', collection, id, label);
  return NextResponse.json({ success: true });
}
