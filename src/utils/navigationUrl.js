/**
 * Build a navigation URL to the given destination.
 *
 * If the user's location is known, returns a Google Maps walking-directions URL.
 * Otherwise returns an OpenStreetMap link centred on the destination.
 */
export function buildNavigationUrl(fromLat, fromLon, toLat, toLon) {
  if (fromLat != null && fromLon != null) {
    return (
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${fromLat},${fromLon}` +
      `&destination=${toLat},${toLon}` +
      `&travelmode=walking`
    )
  }
  return `https://www.openstreetmap.org/?mlat=${toLat}&mlon=${toLon}&zoom=17`
}
