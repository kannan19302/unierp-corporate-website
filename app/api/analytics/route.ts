import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[Network Analytics Event Logged]:', body);
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to record analytics event' }, { status: 400 });
  }
}
