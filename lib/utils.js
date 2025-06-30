/**
 * Capitalizes text
 * 
 * @param {str} text The text to capitalize
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Converts a string into a URL-friendly "slug" format.
 * For example: "Dumbbell Raise" → "dumbbell-raise"
 * @param {string} str - The original string.
 * @returns {string} - The slugified version of the string.
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       
    .replace(/[^\w\-]+/g, '')  
    .replace(/\-\-+/g, '-') 
}