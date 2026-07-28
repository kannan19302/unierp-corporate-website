import { MetadataRoute } from 'next';
import { getTenant } from '@/lib/tenant';
import { getSiteContent } from '@/lib/cms/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tenant = await getTenant();
  const baseUrl = tenant ? (await getSiteContent(tenant.id)).settings.siteUrl : 'http://localhost:3002';
  const now = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/features', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/marketplace', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/industries', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/customers', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/resources', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
    { path: '/docs', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/help', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/security', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/status', priority: 0.5, changeFrequency: 'hourly' },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
