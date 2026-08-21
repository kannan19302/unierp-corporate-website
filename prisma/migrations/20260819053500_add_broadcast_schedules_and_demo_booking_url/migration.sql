-- CreateEnum
CREATE TYPE "BroadcastStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'CANCELLED');

-- AlterTable
ALTER TABLE "site_settings" ADD COLUMN     "demoBookingUrl" TEXT;

-- CreateTable
CREATE TABLE "broadcast_schedules" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "htmlBody" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" "BroadcastStatus" NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),
    "recipients" INTEGER,
    "sent" INTEGER,
    "createdByEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "broadcast_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "broadcast_schedules_tenantId_status_idx" ON "broadcast_schedules"("tenantId", "status");

-- CreateIndex
CREATE INDEX "broadcast_schedules_tenantId_scheduledAt_idx" ON "broadcast_schedules"("tenantId", "scheduledAt");

-- CreateIndex
CREATE INDEX "chat_messages_conversationId_idx" ON "chat_messages"("conversationId");

-- CreateIndex
CREATE INDEX "ticket_replies_ticketId_idx" ON "ticket_replies"("ticketId");

-- AddForeignKey
ALTER TABLE "broadcast_schedules" ADD CONSTRAINT "broadcast_schedules_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

