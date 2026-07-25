import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getTenantFromRequest } from '@/lib/tenant';

const schema = z.object({
  path: z.string().trim().min(1).max(300),
  referrer: z.string().trim().max(500).optional(),
  sessionId: z.string().trim().max(200),
  eventType: z.string().trim().max(50).optional().default('pageview'),
  utmSource: z.string().trim().max(200).optional(),
  utmMedium: z.string().trim().max(200).optional(),
  utmCampaign: z.string().trim().max(200).optional(),
});

export async function POST(req: Request) {
  try {
    const tenant = await getTenantFromRequest(req);
    if (!tenant) {
      // Analytics must never break the page — silently no-op for an unknown host.
      return NextResponse.json({ success: false });
    }

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    await prisma.analyticsEvent.create({ data: { ...parsed.data, tenantId: tenant.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics event error:', error);
    return NextResponse.json({ success: false, error: 'Failed to record analytics event' }, { status: 400 });
  }
}
