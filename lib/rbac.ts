/**
 * RBAC — Field-level permission map for the admin console.
 *
 * Each key is a "field identifier" (matching field names in admin forms).
 * The value is the array of roles allowed to EDIT that field.
 * If a user's role is NOT in the list, the field renders as read-only (with a lock icon).
 * SUPER_ADMIN always has full access to everything.
 */

export type AdminRole = 'ADMIN' | 'SUPER_ADMIN';

/** Fields that require SUPER_ADMIN to edit */
export const FIELD_PERMISSIONS: Record<string, AdminRole[]> = {
  // Branding — sensitive platform config
  erpAppUrl: ['SUPER_ADMIN'],
  erpLoginPath: ['SUPER_ADMIN'],
  erpRegisterPath: ['SUPER_ADMIN'],
  siteUrl: ['SUPER_ADMIN'],
  demoBookingUrl: ['SUPER_ADMIN'],

  // Theme — visual identity, ADMIN can change
  themePrimary: ['SUPER_ADMIN', 'ADMIN'],
  themeAccent: ['SUPER_ADMIN', 'ADMIN'],
  themeEmerald: ['SUPER_ADMIN', 'ADMIN'],
  themePurple: ['SUPER_ADMIN', 'ADMIN'],

  // AI chat system prompt — can change product perception
  chatSystemPrompt: ['SUPER_ADMIN'],
  chatFallbackMessage: ['SUPER_ADMIN', 'ADMIN'],

  // Integration secrets (handled separately in Settings page)
  RESEND_API_KEY: ['SUPER_ADMIN'],
  RESEND_FROM_EMAIL: ['SUPER_ADMIN'],
  ADMIN_NOTIFICATION_EMAIL: ['SUPER_ADMIN'],
  OLLAMA_BASE_URL: ['SUPER_ADMIN'],
  OLLAMA_MODEL: ['SUPER_ADMIN'],

  // User management — only SUPER_ADMIN can modify other admins
  userRole: ['SUPER_ADMIN'],
  userActive: ['SUPER_ADMIN'],

  // All other fields default to: any authenticated admin can edit
};

/** Check if a given role can edit a specific field */
export function canEdit(role: AdminRole | null, fieldId: string): boolean {
  if (!role) return false;
  if (role === 'SUPER_ADMIN') return true;
  const allowed = FIELD_PERMISSIONS[fieldId];
  if (!allowed) return true; // unlisted fields = anyone can edit
  return allowed.includes(role);
}

/** Check if a given role can READ a specific field */
export function canRead(role: AdminRole | null, fieldId: string): boolean {
  if (!role) return false;
  return true; // all authenticated admins can read all fields
}

/**
 * H04: server-side enforcement of FIELD_PERMISSIONS.
 *
 * canEdit() previously only gated RbacField.tsx's lock icon — a client-side
 * rendering decision, not an authorization check. No admin API route called
 * it, so an ADMIN (non-SUPER_ADMIN) could bypass the UI entirely and POST
 * directly to e.g. /api/admin/content/site-settings to change erpAppUrl or
 * chatSystemPrompt, both declared SUPER_ADMIN-only here. Returns the subset
 * of `fieldIds` the given role is NOT permitted to write, so a route can
 * reject the request outright rather than silently trusting the client to
 * have hidden the field.
 */
export function getDisallowedFields(
  role: AdminRole | null,
  fieldIds: string[]
): string[] {
  return fieldIds.filter((id) => !canEdit(role, id));
}
