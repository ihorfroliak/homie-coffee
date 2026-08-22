#!/usr/bin/env node
/**
 * Homie Coffee — Gate 0 unit-economics model.
 *
 * ANALYSIS, not application code. Zero dependencies, no framework, no build step.
 * It exists so the numbers in `05-business-model-and-unit-economics.md` can be re-computed and
 * challenged rather than taken on trust.
 *
 *   node docs/homie-coffee/model/unit-economics.mjs          # base scenario
 *   node docs/homie-coffee/model/unit-economics.mjs --all    # every scenario
 *
 * Inputs live in `params.json` and `scenarios.json`. Every input carries a `src`: a sources.md
 * key, an assumption ID, or ASSUMPTION(...). Any unresolved input halts the model rather than
 * being silently defaulted to a flattering number.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const read = (f) => JSON.parse(readFileSync(join(HERE, f), 'utf8'))

const PLN = (n) => (n === null || n === undefined || Number.isNaN(n) ? '—' : n.toFixed(2))
const PCT = (n) => (n === null || n === undefined || Number.isNaN(n) ? '—' : `${(n * 100).toFixed(1)}%`)

/** Pull a value out of a `{value, src}` node. Returns null when unresolved. */
export function v(node) {
  if (node === null || node === undefined) return null
  if (typeof node === 'number' || typeof node === 'boolean') return node
  if (typeof node === 'object' && 'value' in node) return node.value
  return null
}

/** Collect every parameter still unresolved, with its path — the model's honesty check. */
function findHoles(obj, path = [], out = []) {
  if (obj && typeof obj === 'object') {
    if ('value' in obj && 'src' in obj) {
      if (obj.value === null || obj.src === 'TODO-RESEARCH') out.push({ path: path.join('.'), src: obj.src })
      return out
    }
    for (const [k, val] of Object.entries(obj)) {
      if (k.startsWith('_')) continue
      findHoles(val, [...path, k], out)
    }
  }
  return out
}

/** Deep-merge a scenario's `overrides` onto the base params without mutating them. */
export function merge(base, over) {
  if (over === null || over === undefined) return base
  if (typeof base !== 'object' || base === null || Array.isArray(base)) return over
  const out = { ...base }
  for (const [k, val] of Object.entries(over)) out[k] = k in base ? merge(base[k], val) : val
  return out
}

/**
 * One B2C order.
 *
 * Contribution = what the order keeps after everything that scales with it, BEFORE acquisition
 * cost. Acquisition is then compared against that. The comparison is the whole point of the gate.
 */
export function b2cOrder({ p, s, shape }) {
  const grossRevenue = shape.price
  const discount = grossRevenue * (v(p.allowances.averageDiscountRate) ?? 0)
  const netRevenue = grossRevenue - discount

  const shippingCharged = netRevenue >= (v(p.shipping.freeShippingThreshold) ?? Infinity)
    ? 0
    : (v(p.shipping.b2cParcelPriceCharged) ?? 0)

  // Non-VAT payer: no output VAT is charged, so the shelf price IS net revenue.
  const revenue = netRevenue + shippingCharged

  // Non-VAT payer: input VAT is not reclaimable, so every cost below is the GROSS price paid.
  const kg = shape.grams / 1000
  const coffeeCost = kg * (v(p.supplyModels[s.supplyModel].costPerKgRoastedGross) ?? NaN)

  const bags = shape.bags ?? 1
  // When the roaster supplies packaging and applies our label, pouch and label are already inside
  // the per-kg price and must not be charged twice.
  const packIncluded = v(p.supplyModels[s.supplyModel].packagingIncluded) === true
  const perBagGrams = shape.grams / bags
  const pouchCost = packIncluded
    ? 0
    : bags * (perBagGrams >= 1000 ? (v(p.packagingPerBag.pouch1kg) ?? NaN) : (v(p.packagingPerBag.pouch250g) ?? NaN))
  const labelCost = packIncluded ? 0 : bags * (v(p.packagingPerBag.label) ?? NaN)
  const outerCost = v(p.fulfilment.outerBoxOrMailer) ?? NaN

  const shippingCost = (v(p.shipping.b2cParcelCost) ?? NaN)
    + (v(p.shipping.codSurcharge) ?? 0) * (v(p.shipping.codShareOfOrders) ?? 0)

  const blikShare = v(p.payments.blikShareOfOrders) ?? 0
  const paymentCost =
    revenue * ((v(p.payments.cardFeeRate) ?? NaN) * (1 - blikShare) + (v(p.payments.blikFeeRate) ?? NaN) * blikShare)
    + (v(p.payments.cardFeeFixed) ?? 0)

  const refundCost = revenue * (v(p.allowances.refundAndDamageRate) ?? 0)

  const minutes = (v(p.fulfilment.packMinutesPerOrder) ?? 0) + (v(p.allowances.supportMinutesPerOrder) ?? 0)
  const labourCost = (minutes / 60) * (v(p.fulfilment.founderHourlyOpportunityCost) ?? 0)

  const cogs = coffeeCost + pouchCost + labelCost + outerCost
  const grossMargin = revenue - cogs
  const variableCosts = shippingCost + paymentCost + refundCost + labourCost
  const contribution = grossMargin - variableCosts

  return {
    shape: shape.label, grams: shape.grams,
    grossRevenue, discount, shippingCharged, revenue,
    coffeeCost, packagingCost: pouchCost + labelCost + outerCost, cogs,
    shippingCost, paymentCost, refundCost, labourCost, variableCosts,
    grossMargin, grossMarginRate: grossMargin / revenue,
    contribution, contributionRate: contribution / revenue,
    breakEvenCac: contribution,
    breakEvenRoas: contribution > 0 ? revenue / contribution : null,
  }
}

/** Lifetime view: does order 1 plus expected repeats pay back an acquisition cost? */
export function cohort({ p, order, cac }) {
  const r2 = v(p.acquisition.repeatRateOrder2) ?? 0
  const r3 = v(p.acquisition.repeatRateOrder3) ?? 0
  const c = order.contribution
  const ltvContribution = c * (1 + r2 + r2 * r3)
  return {
    cac,
    afterFirst: c - cac,
    afterSecond: c * (1 + r2) - cac,
    afterThird: ltvContribution - cac,
    ltvContribution,
    paybackOrder: c - cac >= 0 ? 1 : c * (1 + r2) - cac >= 0 ? 2 : ltvContribution - cac >= 0 ? 3 : null,
    ltvToCac: cac > 0 ? ltvContribution / cac : null,
  }
}

/** One B2B account, costed honestly — a warm lead is not a free lead (A3 correction). */
export function b2bAccount({ p, monthlyKg }) {
  const taxModelStatus = v(p.b2b.taxModelStatus)
  const priceBasis = v(p.b2b.priceBasis)
  if (taxModelStatus !== 'verified_v1' || !['net', 'gross', 'buyer_effective_cost'].includes(priceBasis)) {
    return {
      resolved: false,
      reason: 'B2B publication is disabled pending compatible quote bases and accountant-reviewed tax treatment.',
      monthlyKg,
    }
  }

  // Hold the business buyer's effective cost constant. For a VAT-registered seller, output VAT is
  // collected on top of net revenue and deducted by the buyer, so it is not revenue. Registration
  // changes the cost side: VAT-bearing inputs become deductible. A gross market quote is first
  // normalised to its buyer-effective/net basis; a net or buyer-effective quote is already there.
  const vatRate = v(p.vatRate) ?? NaN
  const quotedPricePerKg = v(p.b2b.pricePerKg) ?? NaN
  const buyerEffectivePricePerKg = priceBasis === 'gross'
    ? quotedPricePerKg / (1 + vatRate)
    : quotedPricePerKg
  const revenue = monthlyKg * buyerEffectivePricePerKg

  const inputVatDeductible = v(p.b2b.vatRegistered) === true
  const grossCoffeeCost = monthlyKg * (v(p.supplyModels.contractRoastPrivateLabel.costPerKgRoastedGross) ?? NaN)
  const grossDelivery = v(p.shipping.b2bDeliveryCostPerDrop) ?? NaN
  const costDivisor = inputVatDeductible ? 1 + vatRate : 1
  const coffeeCost = grossCoffeeCost / costDivisor
  const delivery = grossDelivery / costDivisor
  const reclaimedInputVat = (grossCoffeeCost + grossDelivery) - (coffeeCost + delivery)
  const rate = v(p.fulfilment.founderHourlyOpportunityCost) ?? 0

  const acquisitionCost = (v(p.b2b.salesHoursPerWonAccount) ?? 0) * rate
    + (v(p.b2b.sampleCostPerProspect) ?? 0) * (v(p.b2b.prospectsPerWonAccount) ?? 0)

  const monthlyServiceCost = (v(p.b2b.accountManagementHoursPerMonth) ?? 0) * rate
  const monthlyContribution = revenue - coffeeCost - delivery - monthlyServiceCost

  const churn = v(p.b2b.monthlyChurnRate) ?? 0
  const expectedMonths = churn > 0 ? 1 / churn : null

  return {
    resolved: true, inputVatDeductible, buyerEffectivePricePerKg, reclaimedInputVat,
    monthlyKg, revenue, coffeeCost, delivery, monthlyServiceCost, monthlyContribution, acquisitionCost,
    paybackMonths: monthlyContribution > 0 ? acquisitionCost / monthlyContribution : null,
    expectedMonths,
    lifetimeContribution: expectedMonths ? monthlyContribution * expectedMonths - acquisitionCost : null,
  }
}

// ---------------------------------------------------------------------------

const ORDER_SHAPES = [
  { label: '1 x 250 g', grams: 250, bags: 1, priceKey: 'price250' },
  { label: '2 x 250 g bundle', grams: 500, bags: 2, priceKey: 'price250x2' },
  { label: '3 x 250 g bundle', grams: 750, bags: 3, priceKey: 'price250x3' },
  { label: '1 x 500 g', grams: 500, bags: 1, priceKey: 'price500' },
  { label: '1 x 1 kg', grams: 1000, bags: 1, priceKey: 'price1kg' },
  { label: 'discovery 3 x 100 g', grams: 300, bags: 3, priceKey: 'priceDiscovery' },
]

const B2B_SIZES = [5, 10, 20]

function run() {
  const baseParams = read('params.json')
  const scenarios = read('scenarios.json')

  const holes = findHoles(baseParams)
  if (holes.length) {
    console.log(`## ${holes.length} unresolved input(s) — the model cannot produce trustworthy output yet`)
    console.log('')
    for (const h of holes) console.log(`- \`${h.path}\` — ${h.src}`)
    process.exitCode = 1
    return
  }

  const names = process.argv.includes('--all')
    ? Object.keys(scenarios).filter((k) => !k.startsWith('_'))
    : ['base']

  console.log('')
  console.log(`Homie Coffee — Gate 0 unit economics · params as of ${baseParams._asOf} · PLN`)

  for (const name of names) {
    const s = scenarios[name]
    const p = merge(baseParams, s.overrides)
    const cpaPmax = v(p.acquisition.medianPmaxCpa)
    const cpaSearch = v(p.acquisition.medianSearchCpa)
    const costKg = v(p.supplyModels[s.supplyModel].costPerKgRoastedGross)
    const labour = v(p.fulfilment.founderHourlyOpportunityCost)

    console.log('')
    console.log(`### ${name} — ${s.supplyModel} @ ${costKg.toFixed(2)} PLN/kg, founder labour ${labour ? labour + ' PLN/h' : 'not charged'}`)
    console.log('')
    console.log('| Order | Revenue | COGS | Gross % | Variable | Contribution | Contr. % | Break-even CAC | Break-even ROAS |')
    console.log('|---|--:|--:|--:|--:|--:|--:|--:|--:|')

    const orders = []
    for (const shape of ORDER_SHAPES) {
      const price = s.prices[shape.priceKey]
      if (price === undefined || price === null) continue
      const o = b2cOrder({ p, s, shape: { ...shape, price } })
      orders.push(o)
      console.log(`| ${o.shape} | ${PLN(o.revenue)} | ${PLN(o.cogs)} | ${PCT(o.grossMarginRate)} | ${PLN(o.variableCosts)} | **${PLN(o.contribution)}** | ${PCT(o.contributionRate)} | ${PLN(o.breakEvenCac)} | ${o.breakEvenRoas ? o.breakEvenRoas.toFixed(2) + 'x' : 'never'} |`)
    }

    console.log('')
    console.log(`Against Polish all-category median cost per conversion (BM-18): PMax ${cpaPmax}, Search ${cpaSearch}`)
    console.log('')
    console.log('| Order | Contribution | After PMax CPA | After Search CPA | Payback order | LTV/CAC @ PMax |')
    console.log('|---|--:|--:|--:|--:|--:|')
    for (const o of orders) {
      const ch = cohort({ p, order: o, cac: cpaPmax })
      console.log(`| ${o.shape} | ${PLN(o.contribution)} | ${PLN(o.contribution - cpaPmax)} | ${PLN(o.contribution - cpaSearch)} | ${ch.paybackOrder ?? 'never'} | ${ch.ltvToCac ? ch.ltvToCac.toFixed(2) : '—'} |`)
    }

    const best = orders.reduce((a, b) => (b.contribution > a.contribution ? b : a))
    console.log('')
    console.log(`> Best shape: ${best.shape}, contribution ${PLN(best.contribution)} PLN. A median PMax cost per conversion of ${cpaPmax} PLN is ${best.contribution >= cpaPmax ? 'COVERED' : 'NOT covered'} by the first order.`)

    console.log('')
    console.log('| B2B account | Monthly rev. | Monthly contr. | Acquisition cost | Payback (months) | Lifetime contr. |')
    console.log('|---|--:|--:|--:|--:|--:|')
    for (const kg of B2B_SIZES) {
      const a = b2bAccount({ p, monthlyKg: kg })
      if (!a.resolved) {
        console.log(`| ${kg} kg/month | unresolved | unresolved | unresolved | unresolved | unresolved |`)
      } else {
        console.log(`| ${kg} kg/month | ${PLN(a.revenue)} | ${PLN(a.monthlyContribution)} | ${PLN(a.acquisitionCost)} | ${a.paybackMonths ? a.paybackMonths.toFixed(1) : 'never'} | ${PLN(a.lifetimeContribution)} |`)
      }
    }
    console.log('')
    console.log('_B2B output is intentionally unresolved until quote bases are compatible and the tax treatment is accountant-reviewed._')
  }

  // Solve: at what cost per kg does the best single order cover a median CPA?
  console.log('')
  const cpaPmax = v(baseParams.acquisition.medianPmaxCpa)
  console.log(`### Break-even solve — cost/kg needed for ONE 1 kg order to cover a ${cpaPmax} PLN cost per conversion`)
  console.log('')
  console.log('| Cost PLN/kg | 1 kg order contribution | Covers CPA? |')
  console.log('|--:|--:|---|')
  const sc = scenarios.base
  const kgShape = ORDER_SHAPES.find((x) => x.priceKey === 'price1kg')
  for (const c of [124, 115, 110, 100, 90, 80, 70, 60, 50]) {
    const p = merge(merge(baseParams, sc.overrides), {
      supplyModels: { contractRoastPrivateLabel: { costPerKgRoastedGross: { value: c, src: 'solve' } } },
    })
    const o = b2cOrder({ p, s: sc, shape: { ...kgShape, price: sc.prices.price1kg } })
    console.log(`| ${c} | ${PLN(o.contribution)} | ${o.contribution >= cpaPmax ? 'yes' : 'no'} |`)
  }
  console.log('')
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isDirectRun) run()
