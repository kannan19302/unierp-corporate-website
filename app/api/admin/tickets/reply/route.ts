import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

const schema = z.object({
  ticketId: z.string(),
  replyText: z.string().trim().min(1).max(5000),
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
    const { ticketId, replyText } = parsed.data;

    const ticket = await prisma.ticket.findFirst({ where: { id: ticketId, tenantId } });
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const [, updatedTicket] = await Promise.all([
      prisma.ticketReply.create({ data: { ticketId, body: replyText } }),
      prisma.ticket.update({ where: { id: ticketId }, data: { status: 'RESOLVED' } }),
    ]);

    const emailResult = await sendEmail({
      tenantId,
      to: ticket.email,
      subject: `Re: ${ticket.subject}`,
      html: `<p>Hi ${ticket.name},</p><p>${replyText.replace(/\n/g, '<br/>')}</p><p>— Support</p>`,
    });

    await logAudit(auth.session, 'reply', 'ticket', ticketId, `Replied to ${ticket.subject}`);

    return NextResponse.json({ success: true, ticket: updatedTicket, emailSent: emailResult.ok });
  } catch (error) {
    console.error('Ticket reply error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
