// Build a navigation URL for Google Maps directions
export function buildNavigationUrl({ lat, lng }) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`
}
