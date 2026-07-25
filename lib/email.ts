import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { getSetting } from '@/lib/settings';

export async function sendEmail({
  tenantId,
  to,
  subject,
  html,
}: {
  tenantId: string;
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  const [apiKey, from] = await Promise.all([
    getSetting(tenantId, 'RESEND_API_KEY'),
    getSetting(tenantId, 'RESEND_FROM_EMAIL'),
  ]);

  if (!apiKey) {
    await prisma.emailLog.create({
      data: { tenantId, to, subject, status: 'FAILED', provider: 'RESEND', error: 'RESEND_API_KEY not configured' },
    });
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: from || 'Notifications <notifications@example.com>',
      to,
      subject,
      html,
    });

    if (error) {
      await prisma.emailLog.create({
        data: { tenantId, to, subject, status: 'FAILED', provider: 'RESEND', error: error.message },
      });
      return { ok: false, error: error.message };
    }

    await prisma.emailLog.create({
      data: { tenantId, to, subject, status: 'SENT', provider: 'RESEND', providerId: data?.id },
    });
    return { ok: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown email error';
    await prisma.emailLog.create({
      data: { tenantId, to, subject, status: 'FAILED', provider: 'RESEND', error: message },
    });
    return { ok: false, error: message };
  }
}
