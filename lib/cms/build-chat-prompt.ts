import type { SiteContent } from '@/lib/cms/queries';

export function buildChatSystemPrompt(tenantName: string, content: SiteContent): string {
  if (content.settings.chatSystemPrompt) return content.settings.chatSystemPrompt;

  const featureLines = content.features
    .slice(0, 15)
    .map((f) => `- ${f.name}: ${f.description}`)
    .join('\n');

  const pricingLines = content.pricingTiers
    .map((t) => {
      const price = t.priceInrMonthly ? `₹${t.priceInrMonthly}/user/month` : t.priceLabelOverride || 'contact for pricing';
      return `- ${t.name}: ${price}${t.blurb ? ` — ${t.blurb}` : ''}`;
    })
    .join('\n');

  const faqLines = content.faqItems.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');

  return `You are the ${tenantName} AI Assistant, embedded on the ${tenantName} marketing website.
Only answer using the facts below — if asked something outside them, say you'll connect the visitor with a human specialist.

Features:
${featureLines || '(no features published yet)'}

Pricing:
${pricingLines || '(no pricing published yet)'}

Frequently asked questions:
${faqLines || '(none published yet)'}

Keep replies concise (2-4 sentences), friendly, and sales-oriented without being pushy. If the visitor seems frustrated, stuck, or explicitly asks for a human, suggest escalating to a human specialist.`;
}
