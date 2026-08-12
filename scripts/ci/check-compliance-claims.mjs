#!/usr/bin/env node
/**
 * Compliance-claim truth gate — K03 exit criterion (G-3): "Out-of-scope
 * frameworks are stated so a prospect is never misled."
 *
 * D118: the public site claimed "SOC 2 Type II compliance, audited
 * annually by independent third parties," "bi-annual third-party
 * penetration tests," and displayed "SOC 2 Type II" / "ISO 27001" as
 * achieved certification badges — none of which exist. This platform
 * holds no third-party audit or certification of any kind today.
 *
 * This gate fails the build if any of a fixed list of absolute
 * certification/audit claims appears anywhere under app/(site)/ — the
 * public marketing surface. It is deliberately a denylist, not an
 * allowlist keyed to a capability manifest (that is H03's job, still
 * OPEN) — this gate exists specifically for regulatory/compliance
 * certification language, which needs an actual auditor's letter behind
 * it, not just a shipped feature.
 *
 * Usage: node scripts/ci/check-compliance-claims.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SCAN_ROOT = path.join(ROOT, "app", "(site)");

// Each pattern names an unearned certification/audit claim. Case-insensitive.
const PROHIBITED = [
  /SOC\s*2\s*Type\s*II\s*(compliance|certified)/i,
  /audited\s+annually\s+by\s+independent\s+third\s+part(y|ies)/i,
  /(bi-annual|annual)\s+third-party\s+penetration\s+test/i,
  /ISO\s*27001\s*(certified|certification)?/i,
  /HIPAA\s*(compliant|certified)/i,
  /FERPA\s*(compliant|certified)/i,
  /GDPR\s*Compliant\b/i,
  /Full\s+compliance\s+with\s+global\s+privacy\s+frameworks/i,
];

function files(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const p = path.join(dir, entry);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      files(p, out);
    } else if (/\.tsx?$/.test(entry)) {
      out.push(p);
    }
  }
  return out;
}

if (!existsSync(SCAN_ROOT)) {
  console.log("Compliance-claim gate: app/(site)/ not found, nothing to scan.");
  process.exit(0);
}

const hits = [];
for (const file of files(SCAN_ROOT)) {
  const src = readFileSync(file, "utf8");
  const lines = src.split(/\r?\n/);
  // A line that itself denies the claim ("we do not yet hold...", "not
  // certified") is the honest disclosure this gate exists to encourage,
  // not the violation it exists to catch.
  const NEGATION = /\b(not|n't|no |without|never|isn't|don't|aren't)\b/i;
  lines.forEach((line, i) => {
    if (NEGATION.test(line)) return;
    for (const pattern of PROHIBITED) {
      if (pattern.test(line)) {
        hits.push({
          file: path.relative(ROOT, file).replace(/\\/g, "/"),
          line: i + 1,
          text: line.trim().slice(0, 120),
        });
      }
    }
  });
}

if (hits.length > 0) {
  console.error(
    `Compliance-claim gate FAILED: ${hits.length} unearned certification/audit claim(s) found on the public site:\n` +
      hits.map((h) => `  ${h.file}:${h.line}  ${h.text}`).join("\n") +
      "\n\nThis platform holds no SOC 2, ISO 27001, HIPAA, or FERPA certification, and has not " +
      "commissioned a third-party audit or penetration test. A specific certification/audit claim " +
      "on the public site is a claim to a prospect - see K03/D118. State the real compliance " +
      "posture (a roadmap, in-progress controls, or 'not yet') instead of an unearned certification.",
  );
  process.exit(1);
}

console.log("Compliance-claim gate: 0 unearned certification/audit claims on the public site.");
