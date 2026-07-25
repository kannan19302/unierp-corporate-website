import { PrismaClient } from '@prisma/client';
import { provisionTenant, provisionTenantSchema } from '../lib/platform/provision-tenant';

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      args[key] = value;
      i++;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const domains = Array.isArray(args.domain) ? args.domain : [args.domain].filter(Boolean);

  const parsed = provisionTenantSchema.safeParse({
    name: args.name,
    slug: args.slug,
    domains,
    adminEmail: args['admin-email'],
    adminPassword: args['admin-password'],
  });

  if (!parsed.success) {
    console.error('Invalid arguments:');
    console.error(parsed.error.flatten());
    console.error(
      '\nUsage: pnpm tenant:create --name "Acme Inc" --slug acme --domain acme.example.com --admin-email admin@acme.example.com --admin-password "SecurePass123!"'
    );
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    const result = await provisionTenant(prisma, parsed.data);
    console.log(`Provisioned tenant "${result.tenant.name}" (${result.tenant.slug}) with admin ${result.admin.email}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
