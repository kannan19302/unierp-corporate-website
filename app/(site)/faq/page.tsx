import type { Metadata } from 'next';
import { FaqClient } from './FaqClient';

export const metadata: Metadata = {
  title: 'UniERP FAQs — Repeated Questions, Licensing, Architecture & Migration',
  description: 'Find answers to frequently asked questions regarding UniERP modules, PostgreSQL RLS security, 30-day free trial, pricing, and legacy ERP data migration.',
};

export default function FaqPage() {
  return <FaqClient />;
}
