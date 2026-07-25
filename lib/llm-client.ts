export interface ChatTurn {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface LlmReply {
  content: string;
  escalateOption: boolean;
}

interface GenerateReplyOptions {
  baseUrl: string;
  model: string;
  systemPrompt: string;
}

function shouldOfferEscalation(reply: string, userMessage: string): boolean {
  const text = `${userMessage} ${reply}`.toLowerCase();
  return (
    text.includes('human') ||
    text.includes('specialist') ||
    text.includes('sales') ||
    text.includes('speak to') ||
    text.includes('not sure') ||
    text.includes("don't know")
  );
}

/**
 * Provider-agnostic reply generator — no env/DB reads here. Callers resolve
 * baseUrl/model/systemPrompt (per-tenant, DB-overridable) and pass them in.
 */
export async function generateReply(history: ChatTurn[], opts: GenerateReplyOptions): Promise<LlmReply> {
  const lastUserMessage = [...history].reverse().find((m) => m.role === 'user')?.content || '';

  try {
    const res = await fetch(`${opts.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: opts.model,
        messages: [{ role: 'system', content: opts.systemPrompt }, ...history],
        stream: false,
      }),
      // Ollama can take ~60s to cold-load the model into memory on first
      // request after being idle; subsequent requests are fast (~2-5s).
      signal: AbortSignal.timeout(75000),
    });

    if (!res.ok) {
      throw new Error(`Ollama returned ${res.status}`);
    }

    const data = await res.json();
    const content: string = data?.message?.content?.trim() || '';

    if (!content) {
      throw new Error('Empty reply from Ollama');
    }

    return { content, escalateOption: shouldOfferEscalation(content, lastUserMessage) };
  } catch (error) {
    console.error('LLM generation failed, falling back:', error);
    return {
      content:
        "I'm having trouble reaching my knowledge base right now. Would you like me to connect you with a human specialist instead?",
      escalateOption: true,
    };
  }
}
