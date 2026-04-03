/**
 * Truncates a string to a maximum length, appending "..." if truncated.
 *
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length of the returned string (including "...")
 * @returns {string}
 */
function truncate(text, maxLength) {
  if (text === null || text === undefined) {
    return ''
  }

  if (typeof text !== 'string') {
    return ''
  }

  if (maxLength < 0) {
    return ''
  }

  if (text.length <= maxLength) {
    return text
  }

  if (maxLength <= 3) {
    return '.'.repeat(maxLength)
  }

  return text.slice(0, maxLength - 3) + '...'
}

export { truncate }
