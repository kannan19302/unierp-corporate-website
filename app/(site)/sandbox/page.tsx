import type { Metadata } from 'next';
import { SandboxClient } from './SandboxClient';

export const metadata: Metadata = {
  title: 'UniERP Product Sandbox — Test Drive Interactive Workflows in Your Browser',
  description: 'Experience how UniERP connects Sales, Multi-Bin Inventory, Manufacturing BOMs, and Double-Entry General Ledger in real time. Zero signup required.',
};

export default function SandboxPage() {
  return <SandboxClient />;
}
