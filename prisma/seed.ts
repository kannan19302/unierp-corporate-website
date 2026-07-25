import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { upsertTenant } from './seed/tenant';
import { seedUnierpContent } from './seed/content/unierp';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const tenantSlug = process.env.SEED_ADMIN_TENANT_SLUG || 'unierp';

  if (!email || !password) {
    throw new Error(
      'SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env before seeding.'
    );
  }

  const tenant = await upsertTenant(prisma, {
    slug: tenantSlug,
    name: 'UniERP',
    primaryDomain: 'localhost',
    hostnames: ['localhost', '127.0.0.1'],
  });

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email } },
    update: { passwordHash, role: 'SUPER_ADMIN', active: true },
    create: { tenantId: tenant.id, email, passwordHash, role: 'SUPER_ADMIN' },
  });

  await seedUnierpContent(prisma, tenant.id);

  console.log(`Seeded tenant "${tenant.name}" (${tenant.slug}) with super-admin: ${user.email} and full CMS content`);

  if (process.env.SEED_DEMO_TENANT === 'true') {
    const demoTenant = await upsertTenant(prisma, {
      slug: 'acme',
      name: 'Acme Business Suite',
      primaryDomain: 'acme.localtest.me',
      hostnames: ['acme.localtest.me'],
    });

    const demoPasswordHash = await bcrypt.hash('AcmeDemo@2026!', 12);
    const demoUser = await prisma.user.upsert({
      where: { tenantId_email: { tenantId: demoTenant.id, email: 'admin@acme-demo.com' } },
      update: { passwordHash: demoPasswordHash, role: 'SUPER_ADMIN', active: true },
      create: { tenantId: demoTenant.id, email: 'admin@acme-demo.com', passwordHash: demoPasswordHash, role: 'SUPER_ADMIN' },
    });

    console.log(`Seeded demo tenant "${demoTenant.name}" (${demoTenant.slug}) with super-admin: ${demoUser.email}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
