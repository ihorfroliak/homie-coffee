import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { b2bAccount, b2cOrder, merge } from '../docs/homie-coffee/model/unit-economics.mjs'

const readJson = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const params = readJson('../docs/homie-coffee/model/params.json')
const scenarios = readJson('../docs/homie-coffee/model/scenarios.json')

test('VAT-exempt B2C uses the displayed gross parcel cost', () => {
  assert.equal(params.shipping.b2cParcelCost.value, 15.41)

  const scenario = scenarios.base
  const p = merge(params, scenario.overrides)
  const order = b2cOrder({
    p,
    s: scenario,
    shape: { label: '1 x 1 kg', grams: 1000, bags: 1, price: scenario.prices.price1kg },
  })

  assert.equal(Number(order.shippingCost.toFixed(2)), 15.66)
  assert.equal(Number(order.contribution.toFixed(2)), 10.25)
})

test('B2B model refuses to compare VAT states while the price basis is unknown', () => {
  const scenario = scenarios.conservativeVatRegistered
  const p = merge(params, scenario.overrides)
  const account = b2bAccount({ p, monthlyKg: 10 })

  assert.equal(account.resolved, false)
  assert.match(account.reason, /disabled pending/i)
})

test('changing only price basis cannot unlock the unverified VAT formula', () => {
  const scenario = scenarios.conservativeVatRegistered
  const p = merge(merge(params, scenario.overrides), {
    b2b: { priceBasis: { value: 'net', src: 'test' } },
  })
  const account = b2bAccount({ p, monthlyKg: 10 })

  assert.equal(account.resolved, false)
})

test('verified B2B mechanism changes contribution only by deductible input VAT', () => {
  const verified = {
    b2b: {
      taxModelStatus: { value: 'verified_v1', src: 'test fixture' },
      priceBasis: { value: 'buyer_effective_cost', src: 'test fixture' },
    },
  }
  const scenario = scenarios.conservative
  const common = merge(merge(params, scenario.overrides), verified)
  const nonVat = b2bAccount({
    p: merge(common, { b2b: { vatRegistered: { value: false, src: 'test fixture' } } }),
    monthlyKg: 10,
  })
  const vatRegistered = b2bAccount({
    p: merge(common, { b2b: { vatRegistered: { value: true, src: 'test fixture' } } }),
    monthlyKg: 10,
  })

  const vatRate = params.vatRate.value
  const grossVatBearingInputs = 10 * 124 + params.shipping.b2bDeliveryCostPerDrop.value
  const expectedReclaimableInputVat = grossVatBearingInputs * vatRate / (1 + vatRate)

  assert.equal(nonVat.resolved, true)
  assert.equal(vatRegistered.resolved, true)
  assert.equal(nonVat.revenue, vatRegistered.revenue)
  assert.equal(Number((vatRegistered.monthlyContribution - nonVat.monthlyContribution).toFixed(2)), Number(expectedReclaimableInputVat.toFixed(2)))
  assert.equal(Number(vatRegistered.reclaimedInputVat.toFixed(2)), Number(expectedReclaimableInputVat.toFixed(2)))
})

test('gross B2B benchmark is normalized to buyer-effective revenue before comparing tax states', () => {
  const p = merge(params, {
    b2b: {
      taxModelStatus: { value: 'verified_v1', src: 'test fixture' },
      priceBasis: { value: 'gross', src: 'test fixture' },
      pricePerKg: { value: 123, src: 'test fixture' },
      vatRegistered: { value: false, src: 'test fixture' },
    },
  })
  const account = b2bAccount({ p, monthlyKg: 10 })

  assert.equal(account.resolved, true)
  assert.equal(account.buyerEffectivePricePerKg, 100)
  assert.equal(account.revenue, 1000)
})
