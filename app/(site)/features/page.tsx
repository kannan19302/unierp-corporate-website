import type { Metadata } from 'next';
import { FeaturesClient } from './FeaturesClient';

export const metadata: Metadata = {
  title: 'UniERP Features — Comprehensive Capability Matrix',
  description: 'Deep dive into the 1,500+ features included in the UniERP platform across Finance, HR, Supply Chain, and more.',
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
