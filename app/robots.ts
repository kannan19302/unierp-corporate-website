import { MetadataRoute } from 'next';
import { getTenant } from '@/lib/tenant';
import { getSiteContent } from '@/lib/cms/queries';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const tenant = await getTenant();
  const baseUrl = tenant ? (await getSiteContent(tenant.id)).settings.siteUrl : 'http://localhost:3002';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
