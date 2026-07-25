import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const provisionTenantSchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'slug must be lowercase letters, numbers, and hyphens only'),
  domains: z.array(z.string().trim().min(1).max(300)).min(1),
  adminEmail: z.string().trim().email(),
  adminPassword: z.string().min(8).max(200),
});

export type ProvisionTenantInput = z.infer<typeof provisionTenantSchema>;

export async function provisionTenant(prisma: PrismaClient, input: ProvisionTenantInput) {
  const primaryDomain = input.domains[0];

  const tenant = await prisma.tenant.upsert({
    where: { slug: input.slug },
    update: { name: input.name, primaryDomain },
    create: { slug: input.slug, name: input.name, primaryDomain },
  });

  for (const hostname of input.domains) {
    await prisma.tenantDomain.upsert({
      where: { hostname },
      update: { tenantId: tenant.id },
      create: { tenantId: tenant.id, hostname, isPrimary: hostname === primaryDomain },
    });
  }

  await prisma.siteSettings.upsert({
    where: { tenantId: tenant.id },
    update: {},
    create: { tenantId: tenant.id, brandName: input.name },
  });

  const passwordHash = await bcrypt.hash(input.adminPassword, 12);
  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: input.adminEmail } },
    update: { passwordHash, role: 'SUPER_ADMIN', active: true },
    create: { tenantId: tenant.id, email: input.adminEmail, passwordHash, role: 'SUPER_ADMIN' },
  });

  const starterPages = ['/', '/product', '/pricing', '/industries', '/customers', '/resources', '/contact'];
  for (const path of starterPages) {
    await prisma.pageContent.upsert({
      where: { tenantId_path: { tenantId: tenant.id, path } },
      update: {},
      create: { tenantId: tenant.id, path },
    });
  }

  return { tenant, admin: { id: admin.id, email: admin.email } };
}
