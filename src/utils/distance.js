const R = 6371000 // Earth radius in metres

function toRad(deg) {
  return (deg * Math.PI) / 180
}

export function haversineDistance(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(metres) {
  if (metres < 1000) return `${Math.round(metres)} m`
  return `${(metres / 1000).toFixed(1)} km`
}

export function findNearestFreeSpot(userLat, userLng, spots, occupancy, excludeId = null) {
  const available = spots.filter((s) => {
    if (s.id === excludeId) return false
    const occ = occupancy[s.id]
    return !occ || !occ.blockedUntil || occ.blockedUntil <= Date.now()
  })

  if (!available.length) return null

  return available.reduce((nearest, spot) => {
    const d = haversineDistance(userLat, userLng, spot.lat, spot.lng)
    const nd = haversineDistance(userLat, userLng, nearest.lat, nearest.lng)
    return d < nd ? spot : nearest
  })
}
