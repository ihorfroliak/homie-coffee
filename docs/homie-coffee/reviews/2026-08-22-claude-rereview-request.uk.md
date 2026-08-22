# Запит до Claude Code: повторний review після виправлення 2 P0 / 4 P1 / 14 P2 / 4 P3

Працюй у репозиторії `ihorfroliak/homie-coffee`, гілка
`codex/admin-dashboard-design-system`. Це **review-only** завдання: не merge, не deploy, не починай
production vertical slice і не контактуй із постачальниками, бухгалтером чи третіми сторонами.

## Спочатку прочитай

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/homie-coffee/HANDOFF.md`
4. `docs/homie-coffee/reviews/2026-08-21-claude-admin-review-response.md`
5. `docs/homie-coffee/reviews/2026-08-22-codex-claude-review-fixes-response.md`
6. diff `28a0f81..HEAD`

## Що перевірити незалежно

1. Повторно виведи VAT/B2B формулу. Перевір, що buyer-effective revenue однаковий для двох VAT
   states, а різниця contribution дорівнює лише deductible input VAT на VAT-bearing costs.
2. Перевір `gross`, `net` і `buyer_effective_cost` basis. Не відновлюй жодного числового B2B
   verdict: `taxModelStatus`/`priceBasis` gate мусить лишатися закритим до реальних quotes і
   accountant review.
3. Знайди в усіх live decision surfaces старі `−60.50`, `+220`, `18.7%`, `free, reversible`,
   `B2B viable at verified worst-case` або еквівалент. Історичні записи у review/HANDOFF не є
   дефектом, якщо вони чітко описують відкликане твердження.
4. Перевір D-024: production заборонений до ≥3 quotes із net/gross, accountant-reviewed VAT та
   approval D-003–D-005/D-008.
5. Переконайся, що прототип не має deploy path, hosting descriptor, worker adapter, external
   datastore binding або bind на `0.0.0.0`.
6. Перевір accessibility fixes: modal focus trap, Escape, focus restoration, accessible table icon
   labels; відсутність фальшивих `menu/menuitem` roles; toast timer cleanup.
7. Перевір demo boundary: жодних реальних клієнтів/замовлень, усі identifiers `DEMO-*`, Foundation
   KPI відсутній, Vite/React позначено throwaway.
8. Перевір, що root npm workspace відтворює залежності зі свіжого checkout і що одна команда
   запускає повний доступний suite.

## Команди

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run check
git diff --check 28a0f81..HEAD
```

Додаткові read-only команди й власні тести дозволені. Не змінюй product/spec/model файли під час
review. Результат запиши в новий файл `docs/homie-coffee/reviews/` і append-only додай короткий
запис у `docs/homie-coffee/HANDOFF.md`.

## Формат відповіді

- verdict: `approve` або `request changes`;
- confirmed fixes;
- залишкові findings із P0–P3, точними file:line і наслідком;
- стан `npm run check`;
- окремо: що блокує evidence, а що блокує production;
- без merge/deploy/контактів.
