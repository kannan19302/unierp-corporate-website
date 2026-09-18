<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP Repository Agent Entrypoint: Marketing Site (`marketing-site`)

This repository is one delivery unit in the UniERP polyrepo. Before analysis, planning, review, or mutation, every
AI agent from every provider MUST read and follow:

1. the workspace entrypoint at [`../AGENTS.md`](../AGENTS.md);
2. the canonical standard at
   [`../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md);
3. the owning platform documents selected through
   [`../platform/docs/PLATFORM_CATALOG.md`](../platform/docs/PLATFORM_CATALOG.md).

If the workspace entrypoint or canonical standard is unavailable, the protocol bundle is incomplete. The agent
MUST stop before mutation and report the missing dependency. This bootstrap adds no weaker or conflicting rules.
Repository-specific additions may be appended below only when they narrow implementation behavior without
redefining platform ownership, security, contracts, or cross-platform standards.

---

## 1. Repository Identity & Mission

- **Repository**: `marketing-site`
- **Platform Owner**: `PLT-MAR` (Marketing & Public Gateway Platform)
- **Architectural Layer**: **Layer 4 (Public Presentation)**
- **Runtime Port**: `4000`
- **Mission**: Host the unified **Master Landing Page & Platform Gateway** — serving public product marketing, self-service tenant onboarding/signup, solution guides, and routing to application suites.

---

## 2. Security & Public Surface Hygiene

1. **Strict Input Sanitization**:
   - Lead capture, contact forms, and tenant self-service onboarding flows must validate inputs using Zod.
   - Zero unsanitized HTML rendering (XSS prevention).
2. **Public / Tenant Boundary Isolation**:
   - The public site must never expose internal cluster topology, internal service endpoints, or sensitive environment variables to client browsers.
3. **Workspace Hygiene**:
   - Strict anti-vibe-coding: Zero AI assistant scratch folders (`.cursor`, `.claude`, `.antigravity`, etc.) committed in version control.

---

## 3. Industrial Software Engineering Standards

1. **Next.js App Router Architecture**:
   - Modular layout (`app/(marketing)/*`), clean server components for fast SEO performance, minimal client-side JS bundles.
2. **Strata Editorial Floorplan**:
   - Premium enterprise design language adhering to Strata DL 2.0 design tokens.
   - High-performance Core Web Vitals (LCP < 1.2s, CLS < 0.05).
   - Responsive design across desktop, tablet, and mobile breakpoints.
3. **Truth in Marketing**:
   - Claims regarding platform compliance, architecture, and capabilities must reflect verified codebase facts.

---

## 4. Verification Gates & Mandatory Toolchain

Before declaring any cycle `DONE`, run and verify:

```powershell
pnpm typecheck              # Strict TypeScript verification
pnpm lint                   # ESLint standards check
node scripts/check-layer.mjs # Canonical Layer Gate enforcement
```
