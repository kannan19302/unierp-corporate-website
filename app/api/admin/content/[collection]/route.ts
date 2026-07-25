import { NextResponse } from 'next/server';
import { requireAdminTenant } from '@/lib/auth';
import { getPrismaDelegate } from '@/lib/cms/collections';
import { logAudit } from '@/lib/audit';

export async function GET(req: Request, { params }: { params: Promise<{ collection: string }> }) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const { collection } = await params;
  const found = getPrismaDelegate(collection);
  if (!found) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  const rows = await found.delegate.findMany({ where: { tenantId: auth.session.tenantId }, orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ success: true, items: rows });
}

export async function POST(req: Request, { params }: { params: Promise<{ collection: string }> }) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  const { collection } = await params;
  const found = getPrismaDelegate(collection);
  if (!found) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  const parsed = found.def.schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const maxOrder = await found.delegate.aggregate({ where: { tenantId }, _max: { sortOrder: true } });
  const sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;

  try {
    const item = await found.delegate.create({ data: { ...parsed.data, tenantId, sortOrder } });
    const label = (item as any).name || (item as any).label || (item as any).title || (item as any).question || (item as any).slug;
    await logAudit(auth.session, 'create', collection, item.id, label);
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'An item with that slug already exists' }, { status: 409 });
    }
    console.error('Content create error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
