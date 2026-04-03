/**
 * Checks whether a string looks like a valid email address.
 * Not RFC 5322 complete — intentionally simplified for teaching.
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (email === null || email === undefined) {
    return false
  }

  if (typeof email !== 'string') {
    return false
  }

  const trimmed = email.trim()

  if (trimmed !== email) {
    return false  // leading/trailing whitespace → invalid
  }

  if (trimmed.includes(' ')) {
    return false
  }

  const parts = trimmed.split('@')

  if (parts.length !== 2) {
    return false  // must have exactly one @
  }

  const [local, domain] = parts

  if (local.length === 0 || domain.length === 0) {
    return false
  }

  if (domain.indexOf('.') === -1) {
    return false  // domain must have at least one dot
  }

  if (domain.startsWith('.') || domain.endsWith('.')) {
    return false
  }

  if (local.startsWith('.') || local.endsWith('.')) {
    return false
  }

  if (local.includes('..') || domain.includes('..')) {
    return false
  }

  return true
}

export { isValidEmail }
