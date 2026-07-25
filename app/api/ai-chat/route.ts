import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateReply, type ChatTurn } from '@/lib/llm-client';
import { getSettings } from '@/lib/settings';
import { getTenantFromRequest } from '@/lib/tenant';
import { getSiteContent } from '@/lib/cms/queries';
import { buildChatSystemPrompt } from '@/lib/cms/build-chat-prompt';

const schema = z.object({
  sessionId: z.string().trim().min(1).max(200),
  query: z.string().trim().min(1).max(2000),
});

export async function POST(req: Request) {
  try {
    const tenant = await getTenantFromRequest(req);
    if (!tenant) {
      return NextResponse.json({ reply: 'This site is not configured.' }, { status: 404 });
    }
    const tenantId = tenant.id;

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ reply: 'Please enter a message.' }, { status: 400 });
    }
    const { sessionId, query } = parsed.data;

    const conversation = await prisma.chatConversation.upsert({
      where: { tenantId_sessionId: { tenantId, sessionId } },
      update: {},
      create: { tenantId, sessionId },
      include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
    });

    await prisma.chatMessage.create({
      data: { conversationId: conversation.id, role: 'USER', content: query },
    });

    const history: ChatTurn[] = [
      ...conversation.messages.map((m) => ({
        role: m.role === 'USER' ? ('user' as const) : ('assistant' as const),
        content: m.content,
      })),
      { role: 'user', content: query },
    ];

    const [settings, siteContent] = await Promise.all([getSettings(tenantId), getSiteContent(tenantId)]);

    const { content, escalateOption } = await generateReply(history, {
      baseUrl: settings.OLLAMA_BASE_URL || 'http://localhost:11434',
      model: settings.OLLAMA_MODEL || 'llama3.2:3b',
      systemPrompt: buildChatSystemPrompt(tenant.name, siteContent),
    });

    await prisma.chatMessage.create({
      data: { conversationId: conversation.id, role: 'ASSISTANT', content },
    });

    return NextResponse.json({ reply: content, escalateOption, conversationId: conversation.id });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { reply: 'An error occurred processing your request.', escalateOption: true },
      { status: 500 }
    );
  }
}
