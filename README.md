# UniERP Corporate Marketing Website

> The official corporate landing page, product pitch, SaaS pricing, and documentation gateway for the **UniERP Platform**.

---

## 🏛️ System Architecture

This repository is the dedicated standalone corporate site for **UniERP Company**. It connects seamlessly with the core **UniERP Multi-Tenant Platform**:

```
 ┌──────────────────────────────────────────────┐          ┌──────────────────────────────────────────────┐
 │   UniERP Corporate Website (This Repo)       │          │      UniERP Core Platform (ERPSys Repo)     │
 │  - SaaS product pitch & features             │ ────────►│  - '/' Tenant Website & CMS Engine           │
 │  - Industry solution showcase                │          │  - '/apps' ERP Desk (Finance, HR, POS)       │
 │  - SaaS Pricing plans & sign-up CTA          │          │  - '/apps/builder' No-Code Studio Builder    │
 └──────────────────────────────────────────────┘          └──────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_ERP_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Locally

```bash
pnpm dev
# App runs on http://localhost:3002
```

---

## 🔗 Cross-Navigation Integration

- **Log In / ERP Desk CTA**: Links directly to `${NEXT_PUBLIC_ERP_APP_URL}/login` or `${NEXT_PUBLIC_ERP_APP_URL}/apps`.
- **Tenant Website Portal**: Links directly to `${NEXT_PUBLIC_ERP_APP_URL}/` to demonstrate tenant-customizable website rendering powered by Builder Studio.
- **API Swagger Documentation**: Links to `${NEXT_PUBLIC_API_URL}/swagger`.
