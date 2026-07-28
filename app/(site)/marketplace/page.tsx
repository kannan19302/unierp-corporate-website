import type { Metadata } from 'next';
import { MarketplaceClient } from './MarketplaceClient';

export const metadata: Metadata = {
  title: 'Apps Marketplace — Extend UniERP',
  description: 'Discover hundreds of third-party integrations, extensions, and community apps to extend your UniERP platform.',
};

export default function MarketplacePage() {
  return <MarketplaceClient />;
}
