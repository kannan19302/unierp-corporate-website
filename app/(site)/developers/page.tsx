import type { Metadata } from 'next';
import { DevelopersClient } from './DevelopersClient';

export const metadata: Metadata = {
  title: 'UniERP Developer Platform — REST APIs, Webhooks, SDKs & Interactive Explorer',
  description: 'Connect, customize, and automate enterprise workflows with UniERP sub-millisecond REST APIs, real-time webhooks, and TypeScript/Python SDKs.',
};

export default function DevelopersPage() {
  return <DevelopersClient />;
}
