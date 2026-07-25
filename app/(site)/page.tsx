import { requireTenant } from '@/lib/tenant';
import { getPageContent } from '@/lib/cms/queries';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const tenant = await requireTenant();
  const page = await getPageContent(tenant.id, '/');
  return <HomeClient page={page} />;
}
