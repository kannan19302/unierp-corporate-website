import type { Metadata } from 'next';
import { CareersClient } from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers at UniERP',
  description: 'Join the team building the future of composable enterprise software. Open roles in Engineering, Design, Sales, and Support.',
};

export default function CareersPage() {
  return <CareersClient />;
}
