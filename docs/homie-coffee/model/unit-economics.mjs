#!/usr/bin/env node
/**
 * Homie Coffee — Gate 0 unit-economics model.
 *
 * This is ANALYSIS, not application code. Zero dependencies, no framework, no build step.
 * It exists so the numbers in `05-business-model-and-unit-economics.md` can be re-computed and
 * challenged rather than taken on trust.
 *
 *   node docs/homie-coffee/model/unit-economics.mjs            # base scenario
 *   node docs/homie-coffee/model/unit-economics.mjs --all      # all three scenarios
 *   node docs/homie-coffee/model/unit-economics.mjs --markdown # markdown tables for doc 05
 *
 * Inputs live in `params.json` and `scenarios.json`. Every input carries a `src`: an assumption
 * ID, a sources.md key, or TODO-RESEARCH. Anything still TODO-RESEARCH is reported as a hole,
 * never silently defaulted to a flattering number.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const read = (f) => JSON.parse(readFileSync(join(HERE, f), 'utf8'))

const PLN = (n) => (n === null || Number.isNaN(n) ? '—' : `${n.toFixed(2)}`)
const PCT = (n) => (n === null || Number.isNaN(n) ? '—' : `${(n * 100).toFixed(1)}%`)

/** Pull a value out of a `{value, src}` node. Returns null when unresolved. */
function v(node) {
  if (node === null || node === undefined) return null
  if (typeof node === 'number') return node
  if (typeof node === 'object' && 'value' in node) return node.value
  return null
}

/** Collect every parameter still unresolved, with its path — the model's honesty check. */
function findHoles(obj, path = [], out = []) {
  if (obj && typeof obj === 'object') {
    if ('value' in obj && 'src' in obj) {
      if (obj.value === null || obj.src === 'TODO-RESEARCH') {
        out.push({ path: path.join('.'), src: obj.src })
      }
      return out
    }
    for (const [k, val] of Object.entries(obj)) {
      if (k.startsWith('_')) continue
      findHoles(val, [...path, k], out)
    }
  }
  return out
}

/**
 * One B2C order.
 *
 * Contribution margin = revenue kept after everything that scales with the order, BEFORE
 * acquisition cost. Acquisition is then compared against it — that comparison is the whole point.
 */
export function b2cOrder({ p, s, shape }) {
  const grossRevenue = shape.price
  const discount = grossRevenue * (v(p.allowances.averageDiscountRate) ?? 0)
  const netRevenue = grossRevenue - discount

  const shippingCharged = netRevenue >= (v(p.shipping.freeShippingThreshold) ?? Infinity)
    ? 0
    : (v(p.shipping.b2cParcelPriceCharged) ?? 0)

  const revenue = netRevenue + shippingCharged

  // Cost of the coffee itself. A non-VAT payer cannot reclaim input VAT, so the gross cost is
  // the real cost — this is modelled, not glossed over.
  const kg = shape.grams / 1000
  const coffeeCost = kg * (v(p.supplyModels[s.supplyModel].costPerKgRoastedGross) ?? NaN)

  const bags = shape.bags ?? 1
  const pouchCost = bags * (shape.grams / bags >= 1000
    ? (v(p.packagingPerBag.pouch1kg) ?? NaN)
    : (v(p.packagingPerBag.pouch250g) ?? NaN))
  const labelCost = bags * (v(p.packagingPerBag.label) ?? NaN)
  const outerCost = v(p.fulfilment.outerBoxOrMailer) ?? NaN

  const shippingCost = (v(p.shipping.b2cParcelCost) ?? NaN)
    + (v(p.shipping.codSurcharge) ?? 0) * (v(p.shipping.codShareOfOrders) ?? 0)

  const blikShare = v(p.payments.blikShareOfOrders) ?? 0
  const paymentCost =
    revenue * ((v(p.payments.cardFeeRate) ?? NaN) * (1 - blikShare) + (v(p.payments.blikFeeRate) ?? NaN) * blikShare)
    + (v(p.payments.cardFeeFixed) ?? 0) * (1 - blikShare)

  const refundCost = revenue * (v(p.allowances.refundAndDamageRate) ?? 0)

  const minutes = (v(p.fulfilment.packMinutesPerOrder) ?? 0) + (v(p.allowances.supportMinutesPerOrder) ?? 0)
  const labourCost = (minutes / 60) * (v(p.fulfilment.founderHourlyOpportunityCost) ?? 0)

  const cogs = coffeeCost + pouchCost + labelCost + outerCost
  const grossMargin = revenue - cogs
  const variableCosts = shippingCost + paymentCost + refundCost + labourCost
  const contribution = grossMargin - variableCosts

  return {
    shape: shape.label,
    grossRevenue, discount, shippingCharged, revenue,
    coffeeCost, packagingCost: pouchCost + labelCost + outerCost, cogs,
    shippingCost, paymentCost, refundCost, labourCost, variableCosts,
    grossMargin, grossMarginRate: grossMargin / revenue,
    contribution, contributionRate: contribution / revenue,
    // The two numbers that actually govern advertising decisions:
    breakEvenCac: contribution,
    breakEvenRoas: revenue / contribution,
  }
}

/** Lifetime view: does order 1 + expected repeats pay back an acquisition cost? */
export function cohort({ p, order, cac }) {
  const r2 = v(p.acquisition.repeatRateOrder2) ?? 0
  const r3 = v(p.acquisition.repeatRateOrder3) ?? 0
  const c = order.contribution
  const afterFirst = c - cac
  const afterSecond = c * (1 + r2) - cac
  const afterThird = c * (1 + r2 + r2 * r3) - cac
  const ltvContribution = c * (1 + r2 + r2 * r3)
  return {
    cac, afterFirst, afterSecond, afterThird, ltvContribution,
    paybackOrder: afterFirst >= 0 ? 1 : afterSecond >= 0 ? 2 : afterThird >= 0 ? 3 : null,
    ltvToCac: cac > 0 ? ltvContribution / cac : null,
  }
}

/** One B2B account, costed honestly — a warm lead is not a free lead (A3 correction). */
export function b2bAccount({ p, monthlyKg }) {
  const pricePerKg = v(p.b2b.pricePerKg) ?? NaN
  const revenue = monthlyKg * pricePerKg
  const coffeeCost = monthlyKg * (v(p.supplyModels.contractRoastPrivateLabel.costPerKgRoastedGross) ?? NaN)
  const delivery = v(p.shipping.b2bDeliveryCostPerDrop) ?? NaN
  const rate = v(p.fulfilment.founderHourlyOpportunityCost) ?? 0

  const acquisitionCost =
    (v(p.b2b.salesHoursPerWonAccount) ?? 0) * rate
    + (v(p.b2b.sampleCostPerProspect) ?? 0) * (v(p.b2b.prospectsPerWonAccount) ?? 0)

  const monthlyServiceCost = (v(p.b2b.accountManagementHoursPerMonth) ?? 0) * rate
  const monthlyContribution = revenue - coffeeCost - delivery - monthlyServiceCost

  const churn = v(p.b2b.monthlyChurnRate) ?? 0
  const expectedMonths = churn > 0 ? 1 / churn : null

  return {
    monthlyKg, revenue, coffeeCost, delivery, monthlyServiceCost, monthlyContribution,
    acquisitionCost,
    paybackMonths: monthlyContribution > 0 ? acquisitionCost / monthlyContribution : null,
    expectedMonths,
    lifetimeContribution: expectedMonths ? monthlyContribution * expectedMonths - acquisitionCost : null,
  }
}

// ---------------------------------------------------------------------------

const ORDER_SHAPES = [
  { label: '1 × 250 g', grams: 250, bags: 1, priceKey: 'price250' },
  { label: '2 × 250 g bundle', grams: 500, bags: 2, priceKey: 'price250x2' },
  { label: '3 × 250 g bundle', grams: 750, bags: 3, priceKey: 'price250x3' },
  { label: '1 × 500 g', grams: 500, bags: 1, priceKey: 'price500' },
  { label: '1 × 1 kg', grams: 1000, bags: 1, priceKey: 'price1kg' },
  { label: 'discovery set 3 × 100 g', grams: 300, bags: 3, priceKey: 'priceDiscovery' },
]

const B2B_SIZES = [5, 10, 20]

function run() {
  const p = read('params.json')
  let scenarios
  try {
    scenarios = read('scenarios.json')
  } catch {
    scenarios = null
  }

  const holes = findHoles(p)
  const md = process.argv.includes('--markdown')

  if (!md) {
    console.log('\nHomie Coffee — Gate 0 unit economics')
    console.log(`params as of ${p._asOf}, currency ${p._currency}\n`)
  }

  if (holes.length) {
    console.log(`## ${holes.length} unresolved input(s) — the model cannot produce trustworthy output yet\n`)
    for (const h of holes) console.log(`- \`${h.path}\` — ${h.src}`)
    console.log('\nFill these in `params.json` from `sources.md`, then re-run.')
    if (!scenarios) {
      console.log('\n`scenarios.json` not present yet — conservative/base/optimistic overrides are defined there.')
    }
    process.exitCode = 1
    return
  }

  const which = process.argv.includes('--all')
    ? ['conservative', 'base', 'optimistic']
    : ['base']

  for (const name of which) {
    const s = scenarios[name]
    console.log(`\n### Scenario: ${name}\n`)
    console.log('| Order | Revenue | COGS | Gross | Gross % | Variable | Contribution | Contr. % | Break-even CAC | Break-even ROAS |')
    console.log('|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|')
    for (const shape of ORDER_SHAPES) {
      const price = s.prices[shape.priceKey]
      if (price === undefined) continue
      const o = b2cOrder({ p, s, shape: { ...shape, price } })
      console.log(
        `| ${o.shape} | ${PLN(o.revenue)} | ${PLN(o.cogs)} | ${PLN(o.grossMargin)} | ${PCT(o.grossMarginRate)} | ` +
        `${PLN(o.variableCosts)} | **${PLN(o.contribution)}** | ${PCT(o.contributionRate)} | ${PLN(o.breakEvenCac)} | ${o.breakEvenRoas.toFixed(2)}x |`
      )
    }

    console.log('\n| B2B account | Monthly rev. | Monthly contr. | Acquisition cost | Payback (months) | Lifetime contr. |')
    console.log('|---|--:|--:|--:|--:|--:|')
    for (const kg of B2B_SIZES) {
      const a = b2bAccount({ p, monthlyKg: kg })
      console.log(
        `| ${kg} kg/month | ${PLN(a.revenue)} | ${PLN(a.monthlyContribution)} | ${PLN(a.acquisitionCost)} | ` +
        `${a.paybackMonths ? a.paybackMonths.toFixed(1) : 'never'} | ${PLN(a.lifetimeContribution)} |`
      )
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('unit-economics.mjs')) {
  run()
}
