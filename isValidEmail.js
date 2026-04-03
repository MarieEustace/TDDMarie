/**
 * Checks whether a string looks like a valid email address.
 * Not RFC 5322 complete — intentionally simplified for teaching.
 *
 * @param {string} email
 * @returns {{ valid: boolean, reason: string | null }}
 */
function isValidEmail(email) {
  if (email === null || email === undefined) {
    return { valid: false, reason: 'Email is required' }
  }

  if (typeof email !== 'string') {
    return { valid: false, reason: 'Email must be a string' }
  }

  const trimmed = email.trim()

  if (trimmed !== email) {
    return { valid: false, reason: 'Email cannot contain leading or trailing whitespace' }
  }

  if (trimmed.includes(' ')) {
    return { valid: false, reason: 'Email cannot contain spaces' }
  }

  const parts = trimmed.split('@')

  if (parts.length !== 2) {
    return { valid: false, reason: 'Email must contain exactly one @ symbol' }
  }

  const [local, domain] = parts

  if (local.length === 0) {
    return { valid: false, reason: 'Local part (before @) cannot be empty' }
  }

  if (domain.length === 0) {
    return { valid: false, reason: 'Domain part (after @) cannot be empty' }
  }

  if (domain.indexOf('.') === -1) {
    return { valid: false, reason: 'Domain must contain at least one dot' }
  }

  if (domain.startsWith('.') || domain.endsWith('.')) {
    return { valid: false, reason: 'Domain cannot start or end with a dot' }
  }

  if (local.startsWith('.') || local.endsWith('.')) {
    return { valid: false, reason: 'Local part cannot start or end with a dot' }
  }

  if (local.includes('..') || domain.includes('..')) {
    return { valid: false, reason: 'Domain cannot contain consecutive dots' }
  }

  return { valid: true, reason: null }
}

export { isValidEmail }
