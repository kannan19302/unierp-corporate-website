import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

const schema = z.object({
  leadId: z.string(),
  status: z.enum(['NEW', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST']).optional().default('QUALIFIED'),
});

export async function POST(req: Request) {
  try {
    const auth = await requireAdminTenant(req);
    if ('error' in auth) return auth.error;
    const { tenantId } = auth.session;

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const existing = await prisma.lead.findFirst({ where: { id: parsed.data.leadId, tenantId } });
    if (!existing) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const lead = await prisma.lead.update({
      where: { id: existing.id },
      data: { status: parsed.data.status },
    });

    await logAudit(auth.session, 'stage-change', 'lead', lead.id, `${lead.name || lead.email} → ${parsed.data.status}`);

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Qualify lead error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
