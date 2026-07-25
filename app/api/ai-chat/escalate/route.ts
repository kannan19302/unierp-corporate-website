import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { getSetting } from '@/lib/settings';
import { getTenantFromRequest } from '@/lib/tenant';

const schema = z.object({
  conversationId: z.string(),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
});

export async function POST(req: Request) {
  try {
    const tenant = await getTenantFromRequest(req);
    if (!tenant) {
      return NextResponse.json({ error: 'Unrecognized site domain' }, { status: 404 });
    }
    const tenantId = tenant.id;

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'A valid name and email are required to escalate.' }, { status: 400 });
    }
    const { conversationId, name, email } = parsed.data;

    const conversation = await prisma.chatConversation.findFirst({
      where: { id: conversationId, tenantId },
      include: { messages: { orderBy: { createdAt: 'asc' } }, ticket: true },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    if (conversation.ticket) {
      return NextResponse.json({ success: true, ticketId: conversation.ticket.id, alreadyEscalated: true });
    }

    const transcript = conversation.messages
      .map((m) => `${m.role === 'USER' ? 'Visitor' : 'AI'}: ${m.content}`)
      .join('\n');
    const firstUserMessage = conversation.messages.find((m) => m.role === 'USER')?.content || 'General inquiry';

    const ticket = await prisma.ticket.create({
      data: {
        tenantId,
        name,
        email,
        subject: `AI Chat Escalation: ${firstUserMessage.slice(0, 80)}`,
        message: transcript,
        priority: 'MEDIUM',
        aiEscalated: true,
        conversationId,
      },
    });

    const adminEmail = await getSetting(tenantId, 'ADMIN_NOTIFICATION_EMAIL');
    if (adminEmail) {
      await sendEmail({
        tenantId,
        to: adminEmail,
        subject: `AI Chat Escalated to Support: ${ticket.id}`,
        html: `<p>Visitor ${name} (${email}) escalated an AI chat conversation.</p><pre>${transcript.replace(/</g, '&lt;')}</pre>`,
      });
    }

    return NextResponse.json({ success: true, ticketId: ticket.id });
  } catch (error) {
    console.error('Escalation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
