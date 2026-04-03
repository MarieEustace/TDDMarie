/**
 * Converts a string into a URL-friendly slug.
 * Example: "Hello World!" → "hello-world"
 *
 * @param {string} title - The string to slugify
 * @returns {string}
 */
function slugify(title) {
  if (title === null || title === undefined) {
    return ''
  }

  if (typeof title !== 'string') {
    return ''
  }

  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')      // remove non-alphanumeric except spaces and hyphens
    .trim()
    .replace(/[\s-]+/g, '-')           // collapse whitespace and hyphens into single hyphen
}

export { slugify }
