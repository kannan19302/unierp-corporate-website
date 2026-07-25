import { NextResponse } from 'next/server';
import { requireAdminTenant } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const { path = '/' } = await req.json();

  const previewToken = crypto.randomBytes(24).toString('hex');
  const previewUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}${path}?preview=true&token=${previewToken}`;

  return NextResponse.json({ success: true, previewToken, previewUrl });
}
