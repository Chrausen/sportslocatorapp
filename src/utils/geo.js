const R = 6371 // Earth radius in km

function toRad(deg) {
  return (deg * Math.PI) / 180
}

// Haversine distance in km between two lat/lng points
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Format distance for display (m under 1 km, km above)
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

// Find nearest free venue of the same sport, excluding the given id
export function findNearestFree(venues, fromLat, fromLng, sport, excludeId) {
  const candidates = venues.filter(
    (v) => v.sport === sport && !v.occupied && v.id !== excludeId
  )
  if (!candidates.length) return null

  return candidates.reduce((nearest, venue) => {
    const d = haversineDistance(fromLat, fromLng, venue.lat, venue.lng)
    if (!nearest || d < nearest.distance) return { venue, distance: d }
    return nearest
  }, null)?.venue ?? null
}
