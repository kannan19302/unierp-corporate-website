import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const q = (query || '').toLowerCase();

    // AI Intent & Response Engine
    if (q.includes('pricing') || q.includes('cost') || q.includes('rupee') || q.includes('inr')) {
      return NextResponse.json({
        reply: 'UniERP offers transparent Indian INR pricing starting at ₹1,499/user/month (Starter) and ₹3,999/user/month (Professional with GST E-Invoicing & Statutory Payroll). Billed annually, you get a 20% discount!',
        escalateOption: true,
      });
    }

    if (q.includes('trial') || q.includes('free') || q.includes('30')) {
      return NextResponse.json({
        reply: 'UniERP includes an unrestricted 30-Day Free Trial with full 28-module access and No-Code Studio. No credit card is required!',
        escalateOption: false,
      });
    }

    if (q.includes('gst') || q.includes('tax') || q.includes('eway') || q.includes('gstr')) {
      return NextResponse.json({
        reply: 'UniERP is 100% compliant with Indian Taxation. It generates IRN E-Invoices, E-Way bills, and exports pre-formatted GSTR-1 & GSTR-3B JSON files for direct portal upload.',
        escalateOption: false,
      });
    }

    if (q.includes('demo') || q.includes('explore')) {
      return NextResponse.json({
        reply: 'You can explore our live running demo website right now without registration by clicking "Launch Demo Site" in the top bar!',
        escalateOption: false,
      });
    }

    // Default AI response with auto incident ticket escalation suggestion
    return NextResponse.json({
      reply: 'I am the UniERP AI Assistant. I can assist with pricing, GST compliance, 28+ apps, and No-Code Studio. Would you like me to escalate your query to a live human enterprise specialist?',
      escalateOption: true,
    });
  } catch (error) {
    return NextResponse.json({ reply: 'An error occurred processing your request.', escalateOption: true }, { status: 500 });
  }
}
