# D-006 proposal — технологічна архітектура Admin MVP

**Статус:** **APPROVED Ігорем 2026-08-21**; перенесено Codex у canonical decision register,
потребує review/reconciliation від Claude Code.
**Дата перевірки джерел:** 2026-08-21.
**Scope:** Admin MVP і перший B2B pilot; не storefront, не мобільний застосунок, не ERP.
**Залежності:** виправлений Gate 0, затверджені D-003–D-005 і D-008, рішення ADM-01–ADM-08.

## 1. Рекомендоване рішення

Прийняти **модульний моноліт**:

| Шар | Вибір |
|---|---|
| Runtime | Node.js 24 LTS, точна patch-версія зафіксована у `.nvmrc`, `package.json` engines і Docker image |
| Frontend | Next.js App Router + React + TypeScript strict |
| UI | Tailwind CSS + Radix UI primitives; власні Homie Coffee tokens; без купленого admin template |
| Backend | Next.js Node runtime, Route Handlers як HTTP adapters, application/domain modules як ядро |
| API | Versioned JSON commands/queries під `/api/admin/v1`; Zod validation на boundary |
| Database | PostgreSQL 18, одна primary database для pilot |
| ORM | Prisma ORM + Prisma Migrate; reviewed raw SQL для constraints, triggers і спеціальних queries |
| Authentication | Better Auth core: invitation-only email/password, database sessions, TOTP 2FA; власний server-side RBAC |
| Hosting | Один Docker web service + paid managed PostgreSQL на Render, обидва у Frankfurt і private network |
| Audit | Append-only `audit_event` у PostgreSQL, у тій самій транзакції, плюс DB trigger coverage критичних таблиць |
| Unit tests | Vitest |
| DB integration | Vitest + Testcontainers PostgreSQL; жодного SQLite substitute |
| Browser E2E | Playwright; Chromium на кожен PR, Firefox/WebKit smoke перед release |
| Package manager | npm, lockfile committed, `npm ci` у CI |
| CI target | GitHub Actions після окремого approval; Node 24 LTS + real PostgreSQL service/Testcontainers |

Це **не мікросервіс** і не «весь код в `page.tsx`». Модулі ізольовані в одному deployable:

```text
src/
  app/                    # routes, layouts, Route Handlers; thin adapters
  modules/
    auth/
    crm/
    catalog/
    pricing/
    inventory/
    orders/
    payments/
    fulfilment/
    audit/
  shared/                 # money, ids, clocks, errors; no business dumping ground
  db/                     # Prisma client, transaction helpers, DB-specific adapters
prisma/
  schema.prisma
  migrations/
tests/
  unit/
  integration/
  e2e/
```

Модулі спілкуються через application services і typed domain events. Прямі cross-module writes
з UI заборонені. Мережевий message broker для pilot не потрібен.

## 2. Три порівняні архітектури

### A — Next.js modular monolith + managed PostgreSQL — **RECOMMENDED**

**Склад:** Next.js/Node, Prisma, Better Auth, PostgreSQL, Render Frankfurt.

**Переваги:**

- одна транзакція може атомарно створити order snapshot, stock reservation, idempotency record
  і audit event;
- один repository, build, deploy, permission model і observability surface;
- Next.js офіційно підтримує Node server і Docker self-hosting;
- Prisma вже використовується в `homie-english`, тому зменшує кількість стеків Homie;
- storefront можна додати як другий Next.js surface або винести API, не змінюючи domain modules;
- Render має Frankfurt region, private networking і PITR для paid PostgreSQL.

**Ризики:**

- дисципліна modular boundaries не забезпечується framework автоматично;
- Next.js caching/server-client boundaries потребують явних правил;
- Better Auth треба зафіксувати точною версією та security-review перед production;
- одна service/database region — прийнятно для pilot, але не high availability design.

**Контроль ризиків:** architecture tests на заборонені imports; Node runtime для DB-команд;
ніякого кешування admin reads, від яких залежать гроші/stock; Docker image promotion; PITR restore drill.

### B — Next.js + Supabase platform — **FASTEST, NOT SELECTED**

**Склад:** Next.js на Vercel, Supabase Postgres/Auth/Storage/RLS, database functions.

**Переваги:**

- найшвидше provisioning;
- auth, Postgres, backups, storage й API в одному platform account;
- конкретний Frankfurt region можна вибрати;
- Pro коштує від USD 25/month; Vercel Pro — USD 20/month до usage overages станом на дату перевірки.

**Недоліки для цього продукту:**

- бізнес-авторизація розподіляється між Next.js, RLS policies і database functions;
- помилка RLS може бути або витоком даних, або production outage;
- order/stock/audit commands важче тримати одним очевидним application transaction boundary;
- hosted PITR у Supabase є окремим дорогим add-on, тоді як Pro включає daily backups, не PITR;
- зростає coupling до Supabase Auth/API conventions ще до того, як storefront вимоги відомі.

**Коли переглянути:** якщо головним обмеженням стане не integrity, а запуск read-heavy prototype
за кілька днів без inventory/payment writes.

### C — Next.js frontend + NestJS API + PostgreSQL — **SCALABLE, TOO EARLY**

**Склад:** окремий Next.js frontend, NestJS backend, Prisma/PostgreSQL, окремий auth provider
або Keycloak, два deployables.

**Переваги:**

- чітка network boundary;
- API одразу готовий для кількох клієнтів;
- backend може масштабуватися незалежно;
- NestJS дає явні controllers/providers/modules.

**Недоліки зараз:**

- два builds, deploys, health models, logs, error contracts і local dev processes;
- дублювання boundary types або потреба в окремому shared package;
- auth/session/CORS/CSRF конфігурація складніша;
- не дає бізнесової користі одному owner/operator на pilot;
- підвищує час до першого перевіреного vertical slice.

**Коли переглянути:** коли одночасно існують storefront, external partner API та mobile client,
і незалежний API release cadence уже підтверджено фактичним навантаженням або командами.

## 3. Decision matrix

Оцінка `1` — слабко, `5` — найкраще для **поточного pilot**, не для абстрактної великої компанії.

| Критерій | Вага | A: monolith | B: Supabase | C: split API |
|---|---:|---:|---:|---:|
| Money/stock transactional integrity | 30% | 5 | 4 | 5 |
| Швидкість першого vertical slice | 20% | 5 | 5 | 2 |
| Низька operational complexity | 15% | 5 | 4 | 2 |
| Security reviewability | 15% | 4 | 3 | 4 |
| Homie ecosystem reuse | 10% | 5 | 3 | 3 |
| Future extraction path | 10% | 4 | 3 | 5 |
| **Зважений результат** | **100%** | **4.75** | **3.85** | **3.60** |

Число є decision aid, не виміряним фактом. Ваги випливають із review priorities в `AGENTS.md`:
спочатку correctness, money/data integrity і security.

## 4. Frontend рішення

### Обрано

- Next.js App Router, але всі admin pages dynamic/no-store за замовчуванням;
- React Server Components для початкових read models;
- Client Components лише для таблиць, форм, optimistic interaction і browser APIs;
- Route Handlers для mutation commands; Server Actions не є primary public contract;
- TypeScript `strict`, no unchecked `any` у domain/application modules;
- Zod schemas на HTTP/form/webhook boundaries;
- Tailwind для layout/tokens і Radix primitives для accessible interaction;
- власні компоненти `Button`, `Field`, `Money`, `Status`, `DataTable`, `Dialog`, `Toast`;
- desktop-first, keyboard-first, WCAG AA target.

### Не обрано

- окрема SPA на Vite: додає API/auth boundary без користі для одного admin surface;
- готовий commercial dashboard theme: пришвидшує screenshots, але цементує чужі tokens і UX;
- Redux як global default: server data не повинна дублюватися у client store; локальний state достатній,
  а складний client cache додається лише за доведеної потреби.

## 5. Backend рішення

Backend — це application layer усередині Node deployable, а не callbacks у React-компонентах.

Кожна mutation має форму:

```text
HTTP adapter
  → authenticate session
  → authorise command
  → validate input
  → idempotency check
  → database transaction
       → domain invariant checks
       → business writes
       → outbox row (коли потрібна зовнішня інтеграція)
       → audit event
  → typed result/error
```

Правила:

- money зберігається integer minor units (`grosz`) + ISO currency, ніколи float;
- вага зберігається integer grams;
- confirmed order lines — immutable snapshots;
- price/cost — versioned rows із validity interval;
- stock — ledger movements, не довільне редагування `quantity`;
- payment provider events — idempotent за provider event id;
- optimistic concurrency/version field для редагованих aggregates;
- `SERIALIZABLE` або row locking для stock reservation і фінансових read-modify-write команд;
- network/email/payment calls не виконуються всередині довгої DB transaction; для них outbox.

## 6. PostgreSQL та Prisma

### Чому PostgreSQL

Адмінка має реляційні constraints, versioned pricing, order snapshots, stock ledger, search/filter,
transactions і audit. Document database не спрощує жоден load-bearing сценарій.

### Чому Prisma, а не Drizzle

Обидва підтримують transactions і migrations. Prisma обрано тому що:

- уже є в `homie-english`;
- має generated type-safe client і explicit interactive transactions;
- підтримує PostgreSQL isolation levels включно із `Serializable`;
- Prisma Migrate дає reviewable SQL migrations;
- raw/TypedSQL залишається доступним для ledger reports, triggers і constraints.

Drizzle ближчий до SQL і є сильним другим вибором, але не дає достатньої додаткової користі,
щоб виправдати ще один ORM у Homie ecosystem на pilot.

### Migration rules

- migrations append-only після merge;
- production використовує migration command, ніколи `db push`;
- destructive migration має expand/migrate/contract plan;
- schema migration перевіряється на порожній і populated test database;
- DB constraints дублюють load-bearing application validation;
- rollback означає forward corrective migration або PITR, не редагування applied migration.

## 7. Authentication та authorisation

### Обрано: Better Auth core, без beta Admin plugin

- public sign-up disabled;
- owner створюється одноразовою audited CLI-командою, пароль/secret не комітиться;
- email/password із secure library defaults та HIBP compromised-password check;
- TOTP 2FA обов'язковий для `owner` до production pilot;
- recovery codes показуються один раз і зберігаються захищено;
- database-backed sessions, secure/httpOnly/sameSite cookies;
- session rotation/revocation після password reset і privilege change;
- login rate limiting і CAPTCHA після risk threshold;
- власний RBAC (`owner/operator/viewer`) перевіряється в application command, не UI;
- sensitive actions потребують fresh session/re-auth;
- auth audit і business audit — окремі, але корелюються request id.

Beta Admin plugin Better Auth не є основою authorization. User/role management у MVP — власні
мінімальні commands із нашими audit/invariant requirements.

### Exit plan

Domain entities посилаються на внутрішній `admin_user.id`, а auth provider mapping ізольований.
Це дозволяє перейти на managed OIDC/SSO без переписування order/audit ownership.

## 8. Hosting

### Обрано: Render Frankfurt для pilot

- Dockerized Next.js web service у Frankfurt;
- paid Render PostgreSQL у Frankfurt;
- internal/private database URL;
- health/readiness endpoint;
- production secrets тільки в platform environment;
- paid DB із PITR; окремий restore drill до першого реального order;
- logical backup/export для незалежної recovery copy після затвердження retention/storage;
- один app instance на pilot; scale-out вимагає повторної перевірки Next.js cache coordination.

Render офіційно не дозволяє просто змінити region існуючого service/database; тому Frankfurt
обирається під час provisioning. Точну місячну суму потрібно отримати з актуального calculator
безпосередньо перед створенням ресурсів; жодного бюджету ця ADR не авторизує.

### Чому не Vercel + external DB у першому deploy

Vercel є сильним вибором для storefront і preview deployments. Для admin pilot один persistent
Node service поруч із database дає простіше connection, transaction та network troubleshooting.
Storefront може пізніше жити на Vercel і читати окремий public API/read model.

## 9. Audit storage

### Data shape

```text
audit_event
  id
  occurred_at_utc
  actor_admin_user_id nullable
  actor_type
  action
  entity_type
  entity_id
  request_id
  reason nullable
  before_json nullable
  after_json nullable
  metadata_json
  prev_hash nullable        # optional tamper-evidence phase
  event_hash nullable
```

### Integrity model

1. Application writes audit event in the same transaction as business change.
2. Sensitive tables also have database trigger coverage as defense-in-depth.
3. Runtime DB role receives `INSERT/SELECT` on audit table, never `UPDATE/DELETE`.
4. UI exposes no edit/delete audit command.
5. Audit payload redacts secrets, session tokens, payment data and unnecessary personal data.
6. Correlation `request_id` connects HTTP command, audit event and structured application log.
7. Retention duration remains a legal/privacy decision; no invented «keep forever» rule.

PostgreSQL is the canonical audit store for pilot. External WORM archive/hash chaining is P1
after threat model and retention approval; it must not delay the first slice.

## 10. Test strategy

### Test pyramid for every slice

1. **Domain unit — Vitest**
   - state transitions, money, price selection, permissions;
   - no framework/database;
   - table-driven edge cases.

2. **PostgreSQL integration — Vitest + Testcontainers**
   - real migrations against real PostgreSQL;
   - constraints, transaction rollback, serializable retry, idempotency;
   - concurrent stock reservations;
   - business row + audit row atomicity;
   - no SQLite because its types/concurrency differ from production.

3. **HTTP/application contract**
   - authn/authz, Zod validation, error codes;
   - commands cannot bypass audit;
   - snapshot and money serialization.

4. **Browser E2E — Playwright**
   - isolated browser context and isolated test records;
   - login + TOTP test mode, role restrictions;
   - critical owner flow `SKU → batch → company → order → reservation`;
   - traces/screenshots only on failure; auth state never committed.

5. **Accessibility**
   - semantic roles/labels in component tests;
   - automated axe scan for critical screens;
   - keyboard/manual review before release.

### Mandatory CI commands after implementation approval

```text
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run build
npm run test:e2e
```

`npm run check` becomes the single local/CI entry point. Exact scripts appear only with the
application scaffold; this proposal does not create CI or dependencies.

## 11. Architecture fitness rules

CI має перевіряти:

- UI не імпортує Prisma client;
- один module не пише в repository іншого module напряму;
- Route Handler не містить business calculation;
- жодна confirmed order mutation не обходить application command;
- money fields не є floating-point;
- migration history не змінено заднім числом;
- audit table не має runtime update/delete path;
- tests не використовують production credentials або copied customer data.

## 12. Evolution triggers

Не виділяти окремий backend/microservice «про всяк випадок». Переглянути архітектуру, якщо
спрацює хоча б один вимірюваний trigger:

- другий незалежний client потребує стабільного public API release cycle;
- storefront deploy має відбуватися незалежно від admin/backend;
- background jobs перевищують web process limits;
- команда backend працює незалежно від frontend;
- measured load потребує independent scaling;
- security boundary вимагає ізолювати public ingress від admin data plane.

Тоді domain/application modules переносяться у standalone API без переписування правил.

## 13. Відхилені рішення

- microservices/Kubernetes на pilot;
- MongoDB/Firebase як system of record;
- SQLite у production або integration tests;
- direct browser access до database;
- business logic у RLS-only policies;
- public admin sign-up;
- authentication власними password/session primitives;
- editable audit log;
- Vercel Hobby або free database для production pilot;
- автоматичний deploy без required checks і human approval.

## 14. Decision requested

Запропонований запис для canonical decision register:

> **D-006 — APPROVED:** Homie Coffee Admin MVP uses a Docker-deployed Next.js TypeScript modular
> monolith on Node.js 24 LTS, PostgreSQL 18 with Prisma Migrate, Better Auth core with invitation-only
> accounts and mandatory owner TOTP, append-only transactional PostgreSQL audit, and Render Frankfurt
> paid web/database services. Tests use Vitest, real PostgreSQL via Testcontainers and Playwright.
> No separate API service, Supabase platform or microservices for the pilot. Extraction is triggered
> only by documented multi-client, scaling, team or security evidence.

Approval цього запису **не** авторизує cloud spend, external account provisioning, production
deployment або implementation до закриття інших gate decisions.

## 15. Sources and evidence boundary

External claims are recorded as `TECH-01`–`TECH-12` in `sources.md`. Load-bearing primary sources:

- Next.js self-hosting: Node server and Docker are supported.
- Node.js 24 is LTS as of the access date; Node recommends production use of LTS lines.
- Prisma and Drizzle both document transaction support; Prisma documents PostgreSQL Serializable.
- Better Auth documents database sessions, disabled sign-up, TOTP and security controls.
- Render documents Frankfurt, private same-region networking and paid Postgres PITR.
- Supabase documents Frankfurt availability, Pro pricing/backups and separate PITR pricing.
- Playwright documents isolated browser contexts; Testcontainers documents real PostgreSQL tests.

Scores, recommendations and architecture trade-offs are Codex inferences, not vendor claims.
