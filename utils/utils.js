export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Escapes dangerous characters when doing mongodb search
export function escapeRegex(text) {
  return text.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}