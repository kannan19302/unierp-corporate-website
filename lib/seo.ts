import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { getTenant } from '@/lib/tenant';

export async function getSeoMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  try {
    const tenant = await getTenant();
    if (!tenant) return fallback;

    const setting = await prisma.seoSetting.findUnique({ where: { tenantId_path: { tenantId: tenant.id, path } } });
    if (!setting) return fallback;

    return {
      title: setting.metaTitle,
      description: setting.metaDescription || (fallback.description as string | undefined),
      alternates: setting.canonicalUrl ? { canonical: setting.canonicalUrl } : fallback.alternates,
      openGraph: setting.ogImage ? { images: [{ url: setting.ogImage }] } : undefined,
      icons: fallback.icons,
    };
  } catch (error) {
    console.error(`Failed to load SEO settings for ${path}:`, error);
    return fallback;
  }
}
