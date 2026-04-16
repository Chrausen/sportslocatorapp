/**
 * Returns a geo: URI for the given coordinates.
 * Opens in the device's native map app via window.open().
 */
export function buildNavigationUrl({ lat, lng }) {
  return `geo:${lat},${lng}`
}
