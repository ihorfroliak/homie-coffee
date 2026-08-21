# Запит Claude Code на review перед production vertical slice

**Дата:** 2026-08-21  
**Гілка для review:** `codex/admin-dashboard-design-system`  
**Base:** `claude/commercial-feasibility-gate-0`  
**Голова handoff:** `e60b564` на момент першої передачі; цей файл додається наступним комітом.  
**Режим:** review/reconciliation only; не merge, не deploy, не production implementation.

## Навіщо передано гілку

Codex перевірив арифметику Gate 0, підготував Admin MVP і D-006, зафіксував схвалення D-006
та створив локальний інтерактивний Dashboard за візуальним варіантом, який обрав Ігор.

Claude Code має звірити це зі своїми Gate 0 документами й повернути конкретні findings до того,
як Codex або розробник почне перший production vertical slice.

## Що потрібно перевірити

1. **VAT/B2B evidence boundary.** Звірити `00`, `01`, `05`, `14`, `18`, model і PR narrative.
   Не відновлювати висновок `−60.50 → +220 PLN/month`, поки немає явної net/gross бази ціни,
   коректного input/output VAT calculation і підтвердження бухгалтера.
2. **D-006.** Перевірити формулювання затвердженого stack decision і підтвердити, що воно не
   авторизує cloud spend, external accounts, production database, secrets, CI або deploy.
3. **D-023 і Admin scope.** Звірити Dashboard із Admin MVP proposal, рішеннями ADM-01–ADM-08
   та shared HeyHomie brand tokens. Відокремити prototype behavior від майбутньої domain logic.
4. **Prototype review.** Перевірити accessibility, semantics, component boundaries, state design,
   responsive rules, dependency choices і відсутність production/customer data.
5. **Blocking decisions.** Явно вказати, які з D-003–D-005 і D-008 залишаються блокерами
   production vertical slice та хто має їх закрити.
6. **Next slice.** Після reconciliation запропонувати найменший production vertical slice,
   acceptance criteria, invariants, migrations, audit events і test matrix. Не реалізовувати його
   в межах цього review без нового схвалення Ігоря.

## Формат відповіді Claude Code

- findings у порядку `P0 → P1 → P2 → P3`;
- для кожного: файл, рядок/секція, доказ, наслідок, конкретна правка;
- окремо: `confirmed`, `disputed`, `still open`, `safe next step`;
- якщо critical findings немає — прямо написати `no P0/P1 findings`;
- не змінювати source-of-truth логіку ціноутворення з Gitea без звірки з професійним
  розробником; GitHub-розробка має адаптуватися до Gitea, а не навпаки.

## Уже виконані перевірки Codex

- `npm run build` — passed;
- `npm run test:sites` — 4 passed, 0 failed;
- `git diff --check` — passed;
- create-order prototype flow — passed;
- type filter and row-action flow — passed;
- browser console — 0 errors, 0 warnings;
- combined visual QA — `final result: passed`.

## Заборонені висновки з цього handoff

- прототип не є production Admin;
- mock order не є доказом business workflow correctness;
- D-006 не закриває D-003–D-005 або D-008;
- відсутні PostgreSQL, Prisma, Better Auth, RBAC, audit storage та реальні інтеграції;
- branch push не є approval на merge або deploy.

## Ключові артефакти

- `docs/homie-coffee/01-assumptions-questions-decisions.md`
- `docs/homie-coffee/HANDOFF.md`
- `docs/homie-coffee/reviews/2026-08-21-admin-mvp-proposal.uk.md`
- `docs/homie-coffee/reviews/2026-08-21-d006-admin-technology-proposal.uk.md`
- `prototypes/admin-dashboard/AGENTS.md`
- `prototypes/admin-dashboard/src/App.jsx`
- `prototypes/admin-dashboard/src/styles.css`
- `prototypes/admin-dashboard/design-qa.md`
- `prototypes/admin-dashboard/design-qa-comparison.png`

