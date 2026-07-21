### Mateus Melo
Self-taught full-stack developer. I build systems that solve real business problems — not tutorial projects.

**Highlight:** I built and maintain in production a **multi-tenant SaaS ERP** (Next.js + TypeScript + Supabase/PostgreSQL) used daily by a real business, with financial management, scheduling, commercial CRM, and AI-powered insights. 880+ commits, automated tests, and CI configured.

---

**Stack:** Next.js · TypeScript · React · Supabase / PostgreSQL · Tailwind · Node.js · Railway

**How I work:** I prioritize doing it right over doing it fast — reading the real data before designing a solution, validating against production instead of assumptions, and documenting technical decisions alongside the code.

---

### What I've built

**SaaS ERP (multi-tenant)** — production system for a real business, covering financial management (revenue, expenses, reconciliation, invoicing), scheduling, a commercial CRM funnel, and AI-generated insights across every module. Next.js + TypeScript + Supabase/PostgreSQL, tenant-guarded routes, automated tests (Vitest), CI pipeline. 880+ commits over several months of real usage. Private — happy to walk through it live.

**MCP server for a business ERP** — a remote Model Context Protocol server exposing 36 tools (financial reports, scheduling, patient records, sales/commercial data, invoicing) so an AI assistant can query and operate a real production system through conversation instead of a UI. Implements OAuth 2.1 (PKCE + Dynamic Client Registration), stateless Streamable HTTP, write actions gated behind explicit preview-and-confirm plus rate limiting, and data-minimization for personal records. TypeScript, Model Context Protocol SDK, Express, deployed on Railway.

**Autonomous WhatsApp agent** — an always-on operational agent (Node 20 + TypeScript) that reads a business's CRM and ERP, reconciles payment receipts against open invoices via OCR and matching, and delivers a daily operational report — all inside a hard-scoped, single-user whitelist with human-in-the-loop approval for anything irreversible. Running 24/7 in production on Railway. Private — production system with real operational data.

**Multi-tenant CRM** — a newer project (Next.js 16, Prisma + PostgreSQL, next-auth with role-based access across 6 roles) built with production practices from day one: tenant isolation, rate limiting, and CI configured before the first feature shipped.

---

**What ties it together:** real integrations (CRM, ERP, payments, messaging), multi-tenant auth and authorization designed in from the start, and — increasingly — using AI agents and the MCP protocol as first-class infrastructure, not just a chat feature bolted on top.

---

📫 mateuzinho30090@gmail.com
