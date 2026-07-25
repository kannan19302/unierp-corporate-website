import { NextResponse } from 'next/server';
import { requireAdminTenant } from '@/lib/auth';

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'LEAD_CREATED' | 'HIGH_SCORE_LEAD' | 'TICKET_ESCALATED';
  condition: string;
  actions: string[];
  active: boolean;
}

const RULES: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'High-Score Lead Auto-Assignment & Slack Alert',
    trigger: 'HIGH_SCORE_LEAD',
    condition: 'Lead Score >= 80',
    actions: ['Send Slack Webhook Alert', 'Assign to Enterprise Sales Rep', 'Send Executive Welcome Email'],
    active: true,
  },
  {
    id: 'rule-2',
    name: 'Urgent AI Ticket Escalation',
    trigger: 'TICKET_ESCALATED',
    condition: 'Priority == URGENT',
    actions: ['Post Teams Webhook Notification', 'SMS Alert to Duty Engineer'],
    active: true,
  },
];

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  return NextResponse.json({ success: true, rules: RULES });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const body = await req.json();
  return NextResponse.json({ success: true, rule: { id: `rule-${Date.now()}`, ...body } });
}
