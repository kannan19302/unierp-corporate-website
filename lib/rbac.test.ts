/**
 * H04 exit criterion: "The site's admin passes the same security checklist
 * as plane 1 ... RBAC ..."
 *
 * FIELD_PERMISSIONS declares erpAppUrl, chatSystemPrompt, and other fields
 * SUPER_ADMIN-only, but before this fix nothing on the server enforced it —
 * canEdit() was only ever called from RbacField.tsx, a UI lock icon. An
 * ADMIN could bypass the UI and POST the restricted fields directly.
 *
 * Run: npx tsx --test lib/rbac.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { getDisallowedFields } from "./rbac";

test("an ADMIN cannot write SUPER_ADMIN-only fields", () => {
  const disallowed = getDisallowedFields("ADMIN", [
    "erpAppUrl",
    "chatSystemPrompt",
    "brandName",
  ]);
  assert.deepEqual(disallowed.sort(), ["chatSystemPrompt", "erpAppUrl"]);
});

test("a SUPER_ADMIN can write every field, including SUPER_ADMIN-only ones", () => {
  const disallowed = getDisallowedFields("SUPER_ADMIN", [
    "erpAppUrl",
    "chatSystemPrompt",
    "brandName",
  ]);
  assert.deepEqual(disallowed, []);
});

test("an unauthenticated (null) role cannot write anything", () => {
  const disallowed = getDisallowedFields(null, ["brandName"]);
  assert.deepEqual(disallowed, ["brandName"]);
});

test("an ADMIN can write fields with no declared restriction", () => {
  const disallowed = getDisallowedFields("ADMIN", ["brandName", "footerBlurb"]);
  assert.deepEqual(disallowed, []);
});
