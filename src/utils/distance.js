// Haversine formula to calculate distance in metres between two points
export function distanceBetween(a, b) {
  const R = 6371000 // Earth's radius in metres
  const lat1Rad = (a.lat * Math.PI) / 180
  const lat2Rad = (b.lat * Math.PI) / 180
  const deltaLatRad = ((b.lat - a.lat) * Math.PI) / 180
  const deltaLngRad = ((b.lng - a.lng) * Math.PI) / 180

  const sinLatDelta = Math.sin(deltaLatRad / 2)
  const sinLngDelta = Math.sin(deltaLngRad / 2)

  const a_val =
    sinLatDelta * sinLatDelta +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      sinLngDelta *
      sinLngDelta

  const c = 2 * Math.atan2(Math.sqrt(a_val), Math.sqrt(1 - a_val))
  return R * c
}
