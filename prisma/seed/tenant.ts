import { PrismaClient } from '@prisma/client';

export interface UpsertTenantInput {
  slug: string;
  name: string;
  primaryDomain: string;
  hostnames: string[];
}

export async function upsertTenant(prisma: PrismaClient, input: UpsertTenantInput) {
  const tenant = await prisma.tenant.upsert({
    where: { slug: input.slug },
    update: { name: input.name, primaryDomain: input.primaryDomain, active: true },
    create: { slug: input.slug, name: input.name, primaryDomain: input.primaryDomain },
  });

  for (const hostname of input.hostnames) {
    await prisma.tenantDomain.upsert({
      where: { hostname },
      update: { tenantId: tenant.id },
      create: { tenantId: tenant.id, hostname, isPrimary: hostname === input.primaryDomain },
    });
  }

  return tenant;
}
