const EARTH_RADIUS_M = 6371000

/** Convert degrees to radians */
function toRad(deg) {
  return (deg * Math.PI) / 180
}

/**
 * Haversine distance between two lat/lon points, in metres.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(a))
}

/**
 * Build an Overpass API bounding-box string "south,west,north,east"
 * centred on (lat, lon) with the given radius in kilometres.
 */
export function buildBbox(lat, lon, radiusKm = 5) {
  const deltaLat = radiusKm / 111.32
  const deltaLon = radiusKm / (111.32 * Math.cos(toRad(lat)))
  const south = (lat - deltaLat).toFixed(6)
  const north = (lat + deltaLat).toFixed(6)
  const west = (lon - deltaLon).toFixed(6)
  const east = (lon + deltaLon).toFixed(6)
  return `${south},${west},${north},${east}`
}

/**
 * Return a copy of facilities sorted by ascending distance to (userLat, userLon).
 * Facilities without valid lat/lon are pushed to the end.
 */
export function sortByDistance(facilities, userLat, userLon) {
  return [...facilities].sort((a, b) => {
    const da = haversineDistance(userLat, userLon, a.lat, a.lon)
    const db = haversineDistance(userLat, userLon, b.lat, b.lon)
    return da - db
  })
}
