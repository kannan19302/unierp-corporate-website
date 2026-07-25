import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

const schema = z.object({
  subject: z.string().trim().min(1).max(300),
  body: z.string().trim().min(1).max(20000),
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
    const { subject, body } = parsed.data;

    const subscribers = await prisma.subscriber.findMany({ where: { tenantId, active: true } });

    const results = await Promise.allSettled(
      subscribers.map((s) => sendEmail({ tenantId, to: s.email, subject, html: body }))
    );

    const sentCount = results.filter((r) => r.status === 'fulfilled' && r.value.ok).length;

    await logAudit(auth.session, 'broadcast', 'email', undefined, `"${subject}" to ${subscribers.length} subscribers`);

    return NextResponse.json({ success: true, recipients: subscribers.length, sent: sentCount });
  } catch (error) {
    console.error('Broadcast error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
