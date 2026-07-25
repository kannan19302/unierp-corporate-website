import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { scoreLead } from '@/lib/lead-score';
import { sendEmail } from '@/lib/email';
import { getSetting } from '@/lib/settings';
import { getTenantFromRequest } from '@/lib/tenant';

const leadSchema = z.object({
  name: z.string().trim().min(1).max(200).optional().default(''),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(200).optional(),
  size: z.string().trim().max(50).optional(),
  budget: z.string().trim().max(50).optional(),
  modules: z.array(z.string().max(100)).max(30).optional().default([]),
  message: z.string().trim().max(2000).optional(),
  source: z.string().trim().max(100).optional().default('website'),
  utmSource: z.string().trim().max(200).optional(),
  utmMedium: z.string().trim().max(200).optional(),
  utmCampaign: z.string().trim().max(200).optional(),
  isDraft: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    const tenant = await getTenantFromRequest(req);
    if (!tenant) {
      return NextResponse.json({ error: 'Unrecognized site domain' }, { status: 404 });
    }
    const tenantId = tenant.id;

    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const input = parsed.data;
    const score = scoreLead(input);

    // Partial-capture: if a draft already exists for this email, update it in place
    // instead of creating duplicate rows (mobile-first form-abandonment recovery).
    const existingDraft = await prisma.lead.findFirst({
      where: { tenantId, email: input.email, isDraft: true },
      orderBy: { createdAt: 'desc' },
    });

    const lead = existingDraft
      ? await prisma.lead.update({
          where: { id: existingDraft.id },
          data: { ...input, score, isDraft: input.isDraft },
        })
      : await prisma.lead.create({ data: { ...input, tenantId, score } });

    if (!input.isDraft) {
      const adminEmail = await getSetting(tenantId, 'ADMIN_NOTIFICATION_EMAIL');
      const emailTasks: Promise<unknown>[] = [
        sendEmail({
          tenantId,
          to: input.email,
          subject: `Welcome to ${tenant.name} — Your 30-Day Free Trial`,
          html: `<p>Hi ${input.name || 'there'},</p><p>Thanks for your interest in ${tenant.name}. Our team will reach out shortly to help you get started with your 30-day free trial.</p><p>— The ${tenant.name} Team</p>`,
        }),
      ];

      if (adminEmail) {
        emailTasks.push(
          sendEmail({
            tenantId,
            to: adminEmail,
            subject: `New Lead: ${input.company || input.name || input.email} (score ${score})`,
            html: `<p>New lead captured.</p><ul><li>Name: ${input.name}</li><li>Email: ${input.email}</li><li>Company: ${input.company || '-'}</li><li>Phone: ${input.phone || '-'}</li><li>Score: ${score}</li><li>Modules: ${(input.modules || []).join(', ') || '-'}</li><li>Message: ${input.message || '-'}</li></ul>`,
          })
        );
      }

      await Promise.allSettled(emailTasks);
    }

    return NextResponse.json({ success: true, leadId: lead.id, score });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
