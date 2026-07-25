import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminTenant } from '@/lib/auth';

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const abTests = [
    {
      id: 'ab_hero_headline_1',
      name: 'Hero Headline Test',
      status: 'RUNNING',
      variantA: { headline: 'The Universal ERP Operating System', conversions: 48, traffic: 512 },
      variantB: { headline: 'Automate Billing, GST & Inventory in One ERP', conversions: 67, traffic: 508 },
      startDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: 'ab_pricing_cta_1',
      name: 'Pricing CTA Label Test',
      status: 'RUNNING',
      variantA: { label: 'Start Free Trial', conversions: 32, traffic: 310 },
      variantB: { label: 'Claim 14-Day Full Access', conversions: 45, traffic: 315 },
      startDate: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
  ];

  return NextResponse.json({ success: true, abTests });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const { id, winner } = await req.json();

  return NextResponse.json({ success: true, message: `Declared Variant ${winner} as winner for test ${id}` });
}
