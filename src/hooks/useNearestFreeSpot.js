import { useSelector } from 'react-redux'
import { distanceBetween } from '../utils/distance'

/**
 * Returns the nearest unblocked spot that matches the active filter,
 * optionally excluding a specific spot id (e.g. the currently selected one).
 * Returns null when no qualifying spot exists.
 */
export function useNearestFreeSpot({ excludeId = null } = {}) {
  const spots = useSelector((state) => state.spots.items)
  const occupancy = useSelector((state) => state.occupancy)
  const filter = useSelector((state) => state.ui.filter)
  const userLocation = useSelector((state) => state.ui.userLocation)

  const now = Date.now()

  const candidates = spots.filter((s) => {
    if (s.id === excludeId) return false
    if (filter !== 'all' && s.sport !== filter) return false
    const blockedUntil = occupancy[s.id]
    if (blockedUntil && Date.parse(blockedUntil) > now) return false
    return true
  })

  if (candidates.length === 0) return null

  if (!userLocation) return candidates[0]

  return candidates.reduce((nearest, spot) => {
    const d = distanceBetween(userLocation, { lat: spot.lat, lng: spot.lng })
    const dNearest = distanceBetween(userLocation, { lat: nearest.lat, lng: nearest.lng })
    return d < dNearest ? spot : nearest
  })
}
