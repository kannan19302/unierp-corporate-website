#!/usr/bin/env node
/**
 * Claim-verification gate — H03 exit criterion: "Adding a feature claim
 * with no corresponding capability entry fails CI. This is the mechanism
 * that prevents the site becoming another @ts-nocheck-shaped lie."
 *
 * Feature claims are declared as data (MODULES, app/(site)/features/
 * FeaturesClient.tsx), not free prose — this gate checks that data
 * against a committed capability manifest (capability-manifest.json),
 * which in turn names the real backend module directories in unierp-api
 * that back each claim. Two ways to fail:
 *
 *   1. A module group in MODULES has no entry in capability-manifest.json
 *      at all — a claim was added with nothing behind it, ever, not even
 *      a mapping.
 *   2. A module group's manifest entry names a backend directory that
 *      does not exist in unierp-api/src/modules — the claim points at a
 *      capability that isn't actually shipped (or was removed and the
 *      manifest wasn't updated).
 *
 * Scoped deliberately to module-GROUP claims (the ~4 top-level entries in
 * MODULES), not every one of the ~40 individual feature line items inside
 * them — mapping every line item to a specific endpoint is a much larger
 * effort, filed as the honest remaining scope (H03 evidence).
 *
 * Usage:
 *   UNIERP_API_PATH=<path to unierp-api checkout> node scripts/ci/check-feature-claims.mjs
 *   (defaults to ../unierp-api, matching this polyrepo's sibling-checkout
 *   layout used locally and in the reusable CI workflow)
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const MANIFEST_PATH = path.join(ROOT, "capability-manifest.json");
const FEATURES_SRC = path.join(ROOT, "app", "(site)", "features", "FeaturesClient.tsx");
const API_PATH = process.env.UNIERP_API_PATH
  ? path.resolve(process.env.UNIERP_API_PATH)
  : path.resolve(ROOT, "..", "unierp-api");
const API_MODULES_DIR = path.join(API_PATH, "src", "modules");

function currentModuleGroups() {
  const src = readFileSync(FEATURES_SRC, "utf8");
  // Each top-level MODULES entry has a `name: '...'` line near its
  // opening brace — within a small lookahead window so a comment or
  // blank line between them (which a careless edit could easily
  // introduce) does not silently defeat this extraction.
  const names = [];
  const lines = src.split(/\r?\n/);
  const LOOKAHEAD = 4;
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*\{\s*$/.test(lines[i])) continue;
    for (let j = i + 1; j < Math.min(i + 1 + LOOKAHEAD, lines.length); j++) {
      const m = lines[j].match(/^\s*name:\s*'([^']+)'/);
      if (m) {
        names.push(m[1]);
        break;
      }
      // A non-comment, non-blank line that isn't `name:` means this
      // brace isn't a MODULES entry (e.g. a nested `features:` array
      // item) — stop looking within this window.
      if (lines[j].trim() && !lines[j].trim().startsWith("//") && !lines[j].trim().startsWith("*")) break;
    }
  }
  return names;
}

if (!existsSync(MANIFEST_PATH)) {
  console.error(
    `Claim-verification gate FAILED: no capability-manifest.json exists at ${path.relative(ROOT, MANIFEST_PATH)}.`,
  );
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const groups = currentModuleGroups();

if (groups.length === 0) {
  console.error(
    "Claim-verification gate CANNOT RUN: found 0 module groups in FeaturesClient.tsx's MODULES array. " +
      "The extraction regex may no longer match the file's shape.",
  );
  process.exit(1);
}

const apiModulesAvailable = existsSync(API_MODULES_DIR);
const realModuleDirs = apiModulesAvailable
  ? new Set(readdirSync(API_MODULES_DIR))
  : null;

if (!apiModulesAvailable) {
  console.error(
    `Claim-verification gate CANNOT RUN: unierp-api's module directory was not found at ` +
      `${API_MODULES_DIR}.\nSet UNIERP_API_PATH to a checkout of unierp-api, or check it out ` +
      `alongside this repo (the reusable CI workflow does this the same way policy-gate.yml ` +
      `checks out sibling repos for its own schema-aware gates).`,
  );
  process.exit(1);
}

const failures = [];

for (const group of groups) {
  const entry = manifest[group];
  if (!entry) {
    failures.push(`"${group}" is claimed in MODULES but has no entry in capability-manifest.json at all.`);
    continue;
  }
  const missingDirs = entry.filter((dir) => !realModuleDirs.has(dir));
  if (missingDirs.length > 0) {
    failures.push(
      `"${group}" maps to backend module dir(s) that do not exist in unierp-api/src/modules: ${missingDirs.join(", ")}.`,
    );
  }
}

if (failures.length > 0) {
  console.error(
    `Claim-verification gate FAILED: ${failures.length} feature claim(s) do not map to a shipped capability:\n` +
      failures.map((f) => `  - ${f}`).join("\n") +
      "\n\nEvery module-group claim on the public features page must map to real backend module " +
      "directories in unierp-api/src/modules, declared in capability-manifest.json. Update the " +
      "manifest when a real capability ships, or remove the claim if it does not.",
  );
  process.exit(1);
}

console.log(
  `Claim-verification gate: ${groups.length} module-group claim(s), all mapped to real, shipped backend modules.`,
);
