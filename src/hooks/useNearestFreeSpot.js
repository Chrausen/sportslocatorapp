import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { distanceBetween } from '../utils/distance'

export function useNearestFreeSpot() {
  const spots = useSelector(state => state.spots.items)
  const filter = useSelector(state => state.ui.filter)
  const userLocation = useSelector(state => state.ui.userLocation)
  const occupancy = useSelector(state => state.occupancy)

  return useMemo(() => {
    if (!userLocation) return null

    const filteredSpots = spots.filter(spot => {
      if (filter !== 'all' && spot.sport !== filter) return false
      if (occupancy[spot.id]) return false
      return true
    })

    if (filteredSpots.length === 0) return null

    let nearest = filteredSpots[0]
    let minDistance = distanceBetween(userLocation, {
      lat: nearest.lat,
      lng: nearest.lng
    })

    for (let i = 1; i < filteredSpots.length; i++) {
      const spot = filteredSpots[i]
      const distance = distanceBetween(userLocation, {
        lat: spot.lat,
        lng: spot.lng
      })
      if (distance < minDistance) {
        minDistance = distance
        nearest = spot
      }
    }

    return nearest
  }, [spots, filter, userLocation, occupancy])
}
