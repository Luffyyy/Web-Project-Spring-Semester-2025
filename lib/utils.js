/**
 * Capitalizes text
 * 
 * @param {str} text The text to capitalize
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Escapes dangerous characters when doing mongodb search
 * 
 * @param {string} text The text to escape
 */
export function escapeRegex(text) {
    return text.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}