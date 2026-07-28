import type { Metadata } from 'next';
import { HelpClient } from './HelpClient';

export const metadata: Metadata = {
  title: 'Help Center — UniERP Knowledge Base & Support',
  description: 'Find answers, step-by-step guides, troubleshooting tips, and best practices for every UniERP module.',
};

export default function HelpPage() {
  return <HelpClient />;
}
