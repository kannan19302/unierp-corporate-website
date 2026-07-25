-- DropIndex
DROP INDEX "analytics_events_createdAt_idx";
DROP INDEX "analytics_events_path_idx";
DROP INDEX "chat_conversations_sessionId_key";
DROP INDEX "leads_email_idx";
DROP INDEX "leads_status_idx";
DROP INDEX "seo_settings_path_key";
DROP INDEX "subscribers_email_key";
DROP INDEX "tickets_status_idx";
DROP INDEX "users_email_key";

-- AlterTable (nullable first — existing rows get backfilled below)
ALTER TABLE "analytics_events" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "chat_conversations" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "email_logs" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "leads" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "seo_settings" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "subscribers" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "tickets" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "users" ADD COLUMN "tenantId" TEXT;

-- Backfill: create one default tenant and assign every existing (dev/test)
-- row to it, so no data is destroyed while tenantId becomes required.
INSERT INTO "tenants" ("id", "slug", "name", "primaryDomain", "active", "createdAt", "updatedAt")
VALUES ('tenant_default_unierp', 'unierp', 'UniERP', 'localhost', true, now(), now());

INSERT INTO "tenant_domains" ("id", "tenantId", "hostname", "isPrimary", "createdAt")
VALUES ('tenantdomain_default_localhost', 'tenant_default_unierp', 'localhost', true, now());

UPDATE "analytics_events" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;
UPDATE "chat_conversations" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;
UPDATE "email_logs" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;
UPDATE "leads" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;
UPDATE "seo_settings" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;
UPDATE "subscribers" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;
UPDATE "tickets" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;
UPDATE "users" SET "tenantId" = 'tenant_default_unierp' WHERE "tenantId" IS NULL;

-- Now enforce NOT NULL
ALTER TABLE "analytics_events" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "chat_conversations" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "email_logs" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "leads" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "seo_settings" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "subscribers" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "tickets" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "tenantId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "analytics_events_tenantId_path_idx" ON "analytics_events"("tenantId", "path");
CREATE INDEX "analytics_events_tenantId_createdAt_idx" ON "analytics_events"("tenantId", "createdAt");
CREATE UNIQUE INDEX "chat_conversations_tenantId_sessionId_key" ON "chat_conversations"("tenantId", "sessionId");
CREATE INDEX "email_logs_tenantId_sentAt_idx" ON "email_logs"("tenantId", "sentAt");
CREATE INDEX "leads_tenantId_status_idx" ON "leads"("tenantId", "status");
CREATE INDEX "leads_tenantId_email_idx" ON "leads"("tenantId", "email");
CREATE INDEX "leads_tenantId_createdAt_idx" ON "leads"("tenantId", "createdAt");
CREATE UNIQUE INDEX "seo_settings_tenantId_path_key" ON "seo_settings"("tenantId", "path");
CREATE UNIQUE INDEX "subscribers_tenantId_email_key" ON "subscribers"("tenantId", "email");
CREATE INDEX "tickets_tenantId_status_idx" ON "tickets"("tenantId", "status");
CREATE INDEX "users_tenantId_idx" ON "users"("tenantId");
CREATE UNIQUE INDEX "users_tenantId_email_key" ON "users"("tenantId", "email");

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "leads" ADD CONSTRAINT "leads_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "email_logs" ADD CONSTRAINT "email_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "chat_conversations" ADD CONSTRAINT "chat_conversations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
