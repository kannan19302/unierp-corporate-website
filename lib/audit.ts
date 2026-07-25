import { prisma } from '@/lib/prisma';
import type { AdminSession } from '@/lib/auth';

export async function logAudit(
  session: AdminSession,
  action: string,
  entityType: string,
  entityId?: string | null,
  summary?: string | null
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId: session.tenantId,
        userId: session.sub,
        userEmail: session.email,
        action,
        entityType,
        entityId: entityId ?? null,
        summary: summary ?? null,
      },
    });
  } catch (error) {
    // Auditing must never break the underlying admin action.
    console.error('Failed to write audit log entry:', error);
  }
}
