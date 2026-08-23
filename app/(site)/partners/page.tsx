import type { Metadata } from 'next';
import { PartnersClient } from './PartnersClient';

export const metadata: Metadata = {
  title: 'UniERP Partner Network — Certified Implementation & Reseller Alliances',
  description: 'Join the UniERP Global Partner Network. Deliver enterprise cloud migrations, custom workflows, and build recurring revenue practices on our composable ERP platform.',
};

export default function PartnersPage() {
  return <PartnersClient />;
}
