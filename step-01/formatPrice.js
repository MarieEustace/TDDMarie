/**
 * Formats a price in cents to a display string.
 * Example: 1499 → "$14.99"
 *
 * @param {number} cents - The price in cents
 * @returns {string}
 */
function formatPrice(cents) {
  if (cents === null || cents === undefined) {
    return '$0.00'
  }

  if (typeof cents !== 'number' || Number.isNaN(cents)) {
    return '$0.00'
  }

  const rounded = Math.round(cents)
  const negative = rounded < 0
  const abs = Math.abs(rounded)
  const dollars = Math.floor(abs / 100)
  const remainder = abs % 100
  const paddedCents = String(remainder).padStart(2, '0')

  return negative
    ? `-$${dollars}.${paddedCents}`
    : `$${dollars}.${paddedCents}`
}

export { formatPrice }
