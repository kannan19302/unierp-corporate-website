import type { Metadata } from 'next';
import { RoiCalculatorClient } from './RoiCalculatorClient';

export const metadata: Metadata = {
  title: 'UniERP ROI Calculator — Calculate Enterprise Cost Savings & Payback Period',
  description: 'Calculate your projected annual cost savings, labor reduction, and payback timeline when migrating from SAP, NetSuite, Odoo, or legacy spreadsheets to UniERP.',
};

export default function CalculatorPage() {
  return <RoiCalculatorClient />;
}
