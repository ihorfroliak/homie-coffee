// Independent re-derivation of the B2B VAT mechanism. NOT a restoration of any conclusion —
// a check of whether the withdrawn model's MECHANISM was right.
const kg = 10, delivery = 15, labourHrs = 0.5, rate = 50, VAT = 0.23
const costGross = 124, Cbuyer = 150   // buyer-effective price per kg

console.log("=== What the WITHDRAWN model computed ===")
const oldNonVat = kg*Cbuyer*(1-0.187) - kg*costGross - delivery - labourHrs*rate
const oldVat    = kg*Cbuyer           - kg*costGross - delivery - labourHrs*rate
console.log(` non-VAT : ${oldNonVat.toFixed(2)}   VAT-reg : ${oldVat.toFixed(2)}`)

console.log("\n=== Correct mechanism: hold BUYER-EFFECTIVE price constant ===")
// Non-VAT: we invoice Cbuyer with no VAT; buyer deducts nothing -> bears Cbuyer. We keep Cbuyer.
//          Our input VAT is NOT reclaimable -> costs stay gross.
const newNonVat = kg*Cbuyer - kg*costGross - delivery - labourHrs*rate
// VAT-reg: we invoice net N + VAT; buyer deducts the VAT -> bears N. Indifference => N = Cbuyer.
//          Our input VAT IS reclaimable -> costs drop to net.
const newVat    = kg*Cbuyer - kg*(costGross/(1+VAT)) - delivery/(1+VAT) - labourHrs*rate
console.log(` non-VAT : ${newNonVat.toFixed(2)}   VAT-reg : ${newVat.toFixed(2)}`)
console.log(` delta   : ${(newVat-newNonVat).toFixed(2)}  == reclaimable input VAT on coffee+delivery`)
console.log(` check   : ${(kg*costGross*VAT/(1+VAT) + delivery*VAT/(1+VAT)).toFixed(2)}`)

console.log("\n=== Sensitivity: is the 124 cost NET or GROSS? (unverified — the real blocker) ===")
for (const [basis, g] of [["124 is GROSS", 124], ["124 is NET -> gross", 124*1.23]]) {
  const nv = kg*Cbuyer - kg*g - delivery - labourHrs*rate
  const vr = kg*Cbuyer - kg*(g/1.23) - delivery/1.23 - labourHrs*rate
  console.log(` ${basis.padEnd(22)} gross=${g.toFixed(2)}/kg  non-VAT=${nv.toFixed(2)}  VAT-reg=${vr.toFixed(2)}`)
}
