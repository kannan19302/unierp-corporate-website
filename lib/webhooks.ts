import { getSetting } from '@/lib/settings';

interface WebhookPayload {
  event: 'lead.high_score' | 'ticket.escalated';
  title: string;
  details: string;
  data: Record<string, any>;
  timestamp: string;
}

export async function sendWebhookAlert(payload: WebhookPayload, tenantId = 'unierp'): Promise<void> {
  try {
    const webhookUrl = process.env.LEAD_WEBHOOK_URL || (await getSetting(tenantId, 'ADMIN_NOTIFICATION_EMAIL' as any));
    if (!webhookUrl || !webhookUrl.startsWith('http')) return;

    // Dispatch Slack / Teams formatted markdown card
    const body = {
      text: `🚨 *[${payload.event.toUpperCase()}] ${payload.title}*\n${payload.details}\n\`\`\`${JSON.stringify(payload.data, null, 2)}\`\`\``,
      blocks: [
        {
          type: 'header',
          text: { type: 'plain_text', text: `🚨 ${payload.title}` },
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: payload.details },
        },
        {
          type: 'section',
          fields: Object.entries(payload.data).slice(0, 8).map(([k, v]) => ({
            type: 'mrkdwn',
            text: `*${k}:*\n${String(v)}`,
          })),
        },
      ],
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Failed to send webhook alert:', error);
  }
}
