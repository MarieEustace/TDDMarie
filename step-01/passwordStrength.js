/**
 * Checks the strength of a password against a set of rules.
 *
 * @param {string} password
 * @returns {{ score: number, strength: string, missing: string[] }}
 */
function checkPasswordStrength(password) {
  if (password === null || password === undefined) {
    return { score: 0, strength: 'weak', missing: ['password is required'] }
  }

  const rules = [
    { name: 'min length',    test: p => p.length >= 8 },
    { name: 'uppercase',     test: p => /[A-Z]/.test(p) },
    { name: 'lowercase',     test: p => /[a-z]/.test(p) },
    { name: 'number',        test: p => /[0-9]/.test(p) },
    { name: 'special char',  test: p => /[^A-Za-z0-9]/.test(p) },
  ]

  const missing = rules
    .filter(rule => !rule.test(password))
    .map(rule => rule.name)

  const score = rules.length - missing.length

  const strength =
    score <= 1 ? 'weak' :
    score <= 2 ? 'fair' :
    score <= 3 ? 'good' :
                 'strong'

  return { score, strength, missing }
}

export { checkPasswordStrength }
