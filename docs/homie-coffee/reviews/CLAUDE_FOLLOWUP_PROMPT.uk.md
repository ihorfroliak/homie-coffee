# Запит до Claude Code: виправлення Gate 0 після незалежного аудиту Codex

Працюй у репозиторії `ihorfroliak/homie-coffee`. Перед змінами прочитай:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/homie-coffee/HANDOFF.md`
- `docs/homie-coffee/reviews/2026-08-21-codex-gate0-audit.md`
- diff гілки `codex/gate0-model-audit`

## Що встановив Codex

1. Висновок про B2B та VAT зараз не доведений. Модель порівнювала 121,95 PLN/kg для non-VAT із 150 PLN/kg для VAT, але залишала закупівельну вартість кави 124 PLN/kg незмінною. Це змішує net/gross/buyer-effective basis і не враховує симетрично output VAT та input VAT.
2. Джерело B2B-14 не позначає, чи ціни 120–150 PLN/kg є netto чи brutto. Тому твердження `−60,50 → +220 PLN/month`, «VAT alone flips B2B», «B2B viable at worst-case cost» і «free, reversible» слід відкликати до підтвердження.
3. Для non-VAT платника доставка мала рахуватися як 15,41 PLN brutto, а не 11,09 PLN netto. Після виправлення base contribution становить 10,25 PLN для 1 kg і 15,99 PLN для 3×250 g; optimistic 3×250 g — 39,10 PLN, LTV/CAC — 0,93. Це посилює NO-GO для paid-acquisition B2C.
4. CLI моделі вже називав B2B inputs placeholder, але документи та PR подавали B2B-висновок як вирішальний — це внутрішня суперечність.
5. Заява про механічно згенеровані 213 claims не відтворюється з цієї гілки: немає raw claim records або генератора.

## Що потрібно зробити

1. Не повертай числові B2B/VAT висновки, доки не буде:
   - підтверджено, чи supplier quote і customer price є netto чи brutto;
   - окремо змодельовано output VAT, deductible input VAT та non-deductible gross costs;
   - письмового підтвердження бухгалтера щодо режиму Omnomnom sp. z o.o.;
   - враховано поточні витрати compliance/accounting та обмеження повернення до VAT exemption.
2. Онови `00`, `01`, `05`, `14`, `18`, `PULL_REQUEST.md` і відповідні записи у `sources.md` (`COST-33`, `REG-10` та залежні claims).
3. Тимчасовий чесний verdict сформулюй так: **paid-acquisition B2C — NO-GO за наявними припущеннями; B2B — UNRESOLVED до quotes + VAT/accountant validation; Gate 0 ще не закритий.**
4. Збережи виправлені B2C shipping numbers і не перебільшуй точність all-category CPA benchmark.
5. Або додай raw evidence records + generator для `sources.md`, або прибери твердження, що реєстр відтворювано згенерований механічно.
6. Не контактуй із постачальниками, не витрачай гроші, не merge і не починай product implementation без рішення користувача.
7. Після змін запусти модель і тести, додай новий append-only запис у `HANDOFF.md`, а потім передай гілку Codex на повторний незалежний review.

Не переписуй і не видаляй висновки Codex. Якщо не погоджуєшся — додай контраргумент із формулою та первинним джерелом.
