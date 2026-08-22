# Homie Coffee — Admin MVP proposal

**Статус:** пропозиція Codex для затвердження Ігорем; не production specification.
**Фаза:** specification only; технологію, базу даних та framework ще не обрано.
**Блокери реалізації:** D-003–D-008, виправлення Gate 0 та підтвердження B2B/VAT-моделі.
**Мета:** визначити мінімальну операційну адмін-систему, яка дозволить безпечно провести
перший B2B/B2C pilot без Excel як джерела правди та без передчасної автоматизації.

## 1. Результат Admin MVP

Один уповноважений оператор повинен мати змогу:

1. створити B2B lead або клієнта;
2. призначити клієнту погоджений прайс без зміни глобальної ціни;
3. створити ручне замовлення або переглянути замовлення із storefront;
4. зафіксувати оплату як окрему подію, не підміняючи нею статус замовлення;
5. зарезервувати товар із конкретної партії;
6. провести замовлення через пакування, відправлення й доставку;
7. побачити фактичну виручку, cash cost і contribution без непідтверджених VAT-припущень;
8. відновити, хто і коли змінив ціну, оплату, залишок або статус.

## 2. Принципи

- **Money is immutable history.** Замовлення зберігає snapshot назви, ваги, ціни, знижки,
  податкового режиму та валюти на момент підтвердження.
- **Order, payment, fulfilment та invoice — різні state machines.** Один статус не може
  приховувати чотири різні процеси.
- **No inferred VAT.** Адмінка показує лише підтверджений режим і basis; невідоме значення
  блокує фінальний розрахунок, а не перетворюється на `0`.
- **No silent edits.** Фінансові та складські виправлення виконуються коригувальними записами.
- **Least privilege.** Кожна дія перевіряється на сервері; прихована кнопка не є авторизацією.
- **Pilot first.** Ручний процес прийнятний, якщо він прозорий, контрольований і вимірюваний.

## 3. Ролі MVP

| Роль | Доступ |
|---|---|
| `owner` | Усі модулі, користувачі, ціни, фінанси, audit log, системні налаштування |
| `operator` | Leads, клієнти, замовлення, склад, доставки; без керування користувачами та системними налаштуваннями |
| `viewer` | Read-only dashboard, товари, клієнти й замовлення; персональні дані маскуються там, де вони не потрібні |

На початку достатньо одного `owner`. Ролі не треба прибирати з моделі даних, але створення
додаткових адмін-користувачів може залишатися вимкненим до появи другого оператора.

## 4. Навігація та екрани

### P0 — обов'язково для pilot

1. **Dashboard**
   - замовлення, що потребують дії;
   - неоплачені замовлення;
   - низький або прострочений stock;
   - активні B2B leads;
   - виручка й contribution лише для reconciled orders;
   - явне попередження, якщо tax/cost basis не підтверджений.

2. **B2B leads і компанії**
   - legal name, display name, NIP, контакт, адреси;
   - статус lead: `new → contacted → sample_planned → sample_sent → negotiating → won/lost`;
   - source, owner, next action, дата наступного контакту;
   - очікувані kg/month як estimate, не як факт;
   - примітки та історія змін;
   - конвертація lead у customer без дублювання компанії.

3. **Products і SKU**
   - продукт, variant/SKU, вага, формат, roast profile;
   - статус: `draft / active / paused / archived`;
   - retail price, B2B price tier, currency;
   - valid-from/valid-to замість перезапису історичної ціни;
   - supplier cost з окремими `net`, `VAT rate`, `gross`, `basis`, `verified-at`;
   - заборона активації SKU без ваги, ціни, алерген/label data та підтвердженої cost basis.

4. **Orders**
   - пошук, фільтри, B2B/B2C channel;
   - ручне створення B2B order;
   - line-item snapshots;
   - price adjustment тільки з reason і audit event;
   - order status: `draft → submitted → confirmed → cancelled`;
   - окремі блоки payment, fulfilment, invoice;
   - totals: merchandise, discount, delivery, tax, grand total, contribution status.

5. **Payments**
   - `pending / authorised / paid / partially_refunded / refunded / failed / cancelled`;
   - provider і зовнішній reference без збереження card data;
   - ручна prepayment confirmation потребує reference, дати й автора;
   - webhook event idempotency має бути acceptance criterion реалізації;
   - зміна `paid` назад вручну заборонена — лише refund/correction flow.

6. **Inventory і batches**
   - batch/lot, SKU, roast/received date, best-before, quantity;
   - рухи: `receive / reserve / release / ship / adjust / write_off / return`;
   - available = on-hand − reserved, обчислюється з ledger;
   - negative available stock заборонений;
   - adjustment потребує reason; видалення руху заборонене.

7. **Fulfilment і delivery**
   - `unallocated → reserved → packing → shipped → delivered / returned / cancelled`;
   - carrier, tracking number, parcel cost basis;
   - одна доставка може містити кілька order lines;
   - shipment не може перейти в `shipped` без резерву stock;
   - cancellation після shipment переходить у return/refund flow.

8. **Audit log**
   - actor, timestamp, entity, action, before/after або structured delta, reason, request id;
   - фільтри за користувачем, сутністю й датою;
   - записи immutable для UI;
   - обов'язкові події: price, cost, role, payment, refund, order status, stock adjustment,
     customer export/anonymisation.

### P1 — після перших операцій

- Sample management як окремий тип fulfilment/expense;
- Fakturownia/KSeF integration після юридичного й технологічного рішення;
- Stripe reconciliation після вибору payment flow;
- returns/refunds workspace;
- customer service timeline;
- CSV export з permission і audit event;
- low-stock notifications;
- contribution report за SKU, channel і B2B account.

### Не входить у MVP

- subscription engine;
- loyalty programme;
- складний procurement/ERP;
- multi-warehouse;
- автоматичне dynamic pricing;
- AI-рекомендації;
- мобільна адмінка як окремий застосунок;
- machine leasing/service management;
- повний бухгалтерський облік усередині продукту.

## 5. Мінімальна логічна модель даних

```text
AdminUser ──< AdminRole
Company ──< CompanyContact
Company ──< Address
Company ──< LeadActivity
Company ──< CustomerPriceAgreement >── SKU

Product ──< SKU ──< PriceVersion
SKU ──< SupplierCostVersion
SKU ──< InventoryBatch ──< InventoryMovement

Company/Customer ──< Order ──< OrderLineSnapshot
Order ──< Payment
Order ──< Fulfilment ──< FulfilmentLine
Order ──< InvoiceReference

AdminUser ──< AuditEvent
```

Це логічна модель, не вибір SQL/NoSQL і не готова schema. Фізичну модель можна затверджувати
лише разом із D-006.

## 6. Критичні state-machine правила

### Order

```text
draft → submitted → confirmed
  └──────────────→ cancelled
submitted ───────→ cancelled
confirmed ───────→ cancelled (лише якщо fulfilment ще не shipped)
```

### Payment

```text
pending → authorised → paid → partially_refunded → refunded
   └──────────────→ failed
   └──────────────→ cancelled
```

### Fulfilment

```text
unallocated → reserved → packing → shipped → delivered
                   └────→ cancelled
                                  └────→ returned
```

Кожен перехід має окрему серверну команду, permission check, idempotency strategy й audit event.

## 7. Dashboard definitions

| Метрика | Визначення MVP |
|---|---|
| Gross sales | Сума confirmed orders до refunds; не дорівнює cash received |
| Net collected cash | Captured/confirmed payments мінус refunds |
| Contribution | Revenue без VAT (коли applicable) мінус verified product, packaging, payment і delivery cash costs |
| Active B2B leads | Leads, що не `won/lost`, із next action або простроченим next action |
| Stock available | Ledger on-hand мінус active reservations |
| Orders needing action | Submitted, paid-unreserved, packing-overdue, shipped-without-tracking та exception states |

Contribution відображається як `unresolved`, якщо хоча б одна load-bearing cost/tax input не
підтверджена. Dashboard не повинен створювати точність, якої немає у вхідних даних.

## 8. Безпека й privacy acceptance criteria

- MFA для `owner` перед production pilot;
- secure server-side session, rotation після login/privilege change;
- CSRF protection для cookie-based auth;
- rate limiting login і sensitive commands;
- server-side RBAC на кожній команді та export;
- secrets тільки через runtime secret store;
- жодних payment card details у базі чи логах;
- NIP, email, phone, address не потрапляють в analytics payload;
- data retention і deletion/anonymisation flow документуються до pilot;
- production audit log не редагується через UI;
- backup/restore перевіряється до прийняття реального замовлення.

## 9. UX напрям

- desktop-first, але придатна для планшета;
- світла нейтральна основа, бренд використовується для hierarchy, а не декору;
- таблиці з saved filters, keyboard navigation і bulk actions лише там, де дія reversible;
- кожен production dialog trap-ить фокус, закривається через Escape і повертає фокус на trigger;
  popover/menu реалізує повний keyboard contract, а не лише ARIA role;
- production UI від першого компонента має translation seam: польська primary, англійська secondary;
- money, stock та destructive actions мають confirmation із показом наслідків;
- статус не передається лише кольором;
- усі loading/empty/error/permission-denied стани проєктуються разом із happy path;
- dashboard відповідає на «що потребує моєї дії зараз?», а не демонструє декоративні графіки.

## 10. Історична пропозиція vertical slice — заблокована й замінена

> **Не реалізовувати.** Після Claude review і рішення D-024 жоден production vertical slice не
> стартує до ≥3 roaster quotes із чіткою net/gross basis, accountant-reviewed VAT position та
> затвердження D-003–D-005 і D-008. Наведений нижче первинний варіант збережено як історію
> пропозиції; через price/VAT scope він не є поточним кандидатом.

**Slice A — Product → stock → manual B2B order**

1. owner login;
2. створення draft SKU;
3. додавання versioned price і verified cost basis;
4. приймання inventory batch через ledger movement;
5. створення company і ручного order;
6. snapshot line item;
7. підтвердження order;
8. reservation stock;
9. audit trail кожної критичної дії.

Цей slice не включає Stripe, storefront, email, shipping API або invoicing integration. Він
перевіряє найризикованіше ядро: гроші, ціни, клієнта, партії та залишки.

## 11. Рішення, потрібні від Ігоря

| ID proposal | Рішення | Рекомендація Codex |
|---|---|---|
| ADM-01 | Чи є B2B pilot першим операційним сценарієм? | Так, але лише після виправленого Gate 0 |
| ADM-02 | Чи потрібне ручне створення B2B order? | Так |
| ADM-03 | Хто користувач Admin MVP? | Один owner; модель підтримує майбутніх operator/viewer |
| ADM-04 | Чи дозволяти customer-specific price? | Так, versioned agreement із validity dates |
| ADM-05 | Чи вести batch/expiry з першого дня? | Так — це харчовий товар і база traceability |
| ADM-06 | Чи включати CRM leads у MVP? | Так, мінімальний pipeline без окремої CRM-системи |
| ADM-07 | Чи інтегрувати Stripe/Fakturownia у Slice A? | Ні; спершу доменне ядро та ручні references |
| ADM-08 | Який технологічний стек? | Окреме D-006 comparison; не вирішувати через цю пропозицію |

## 12. Definition of ready for coding

Admin implementation може початися, коли:

1. Claude виправив Gate 0 після аудиту Codex;
2. Ігор затвердив D-003–D-008 або явно замінив їх новими рішеннями;
3. ADM-01–ADM-08 записані як approved/rejected;
4. Claude переніс затверджений scope у canonical specification;
5. technology comparison для D-006 затверджено;
6. Slice A має API/data contract, event list і testable acceptance criteria;
7. Codex створює implementation branch лише для Slice A.
