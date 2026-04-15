import { useSelector, useDispatch } from 'react-redux'
import { clearSelection, showToast } from '../../store/slices/uiSlice'
import { blockSpot, unblockSpot } from '../../store/slices/occupancySlice'
import { distanceBetween } from '../../utils/distance'
import { buildNavigationUrl } from '../../utils/navigation'
import { NavigateButton } from '../NavigateButton/NavigateButton'
import styles from './LocationDetailPanel.module.css'

export function LocationDetailPanel() {
  const dispatch = useDispatch()
  const selectedSpotId = useSelector(state => state.ui.selectedSpotId)
  const spots = useSelector(state => state.spots.items)
  const userLocation = useSelector(state => state.ui.userLocation)
  const occupancy = useSelector(state => state.occupancy)
  const filter = useSelector(state => state.ui.filter)

  if (!selectedSpotId) return null

  const spot = spots.find(s => s.id === selectedSpotId)
  if (!spot) return null

  const isBlocked = occupancy[spot.id]
  const distance = userLocation
    ? Math.round(distanceBetween(userLocation, { lat: spot.lat, lng: spot.lng }))
    : null

  const sportLabels = {
    'table-tennis': 'Table Tennis',
    'basketball': 'Basketball',
    'boule': 'Boule'
  }

  const handleToggleOccupancy = () => {
    if (isBlocked) {
      dispatch(unblockSpot(spot.id))
    } else {
      dispatch(blockSpot(spot.id))
    }
  }

  const handleReroute = () => {
    // Find nearest other free spot
    const otherFreeSpots = spots.filter(s => {
      if (s.id === spot.id) return false
      if (filter !== 'all' && s.sport !== filter) return false
      if (occupancy[s.id]) return false
      return true
    })

    if (otherFreeSpots.length === 0) {
      dispatch(showToast({ message: 'No other free spots available right now' }))
      return
    }

    let nearest = otherFreeSpots[0]
    let minDistance = distanceBetween(userLocation, {
      lat: nearest.lat,
      lng: nearest.lng
    })

    for (let i = 1; i < otherFreeSpots.length; i++) {
      const s = otherFreeSpots[i]
      const distance = distanceBetween(userLocation, {
        lat: s.lat,
        lng: s.lng
      })
      if (distance < minDistance) {
        minDistance = distance
        nearest = s
      }
    }

    const url = buildNavigationUrl({ lat: nearest.lat, lng: nearest.lng })
    window.open(url, '_blank')
  }

  return (
    <div className={styles.panel}>
      <button
        className={styles.closeButton}
        onClick={() => dispatch(clearSelection())}
      >
        ✕
      </button>

      <h2>{spot.name}</h2>

      <div className={styles.info}>
        <p>
          <strong>Sport:</strong> {sportLabels[spot.sport]}
        </p>
        {spot.description && (
          <p>
            <strong>Description:</strong> {spot.description}
          </p>
        )}
        {distance && (
          <p>
            <strong>Distance:</strong> {distance}m
          </p>
        )}
        <p>
          <strong>Status:</strong>{' '}
          <span className={isBlocked ? styles.blocked : styles.free}>
            {isBlocked ? 'Blocked' : 'Free'}
          </span>
        </p>
      </div>

      <div className={styles.actions}>
        <NavigateButton spot={spot} />
        <button
          className={isBlocked ? styles.unblockButton : styles.blockButton}
          onClick={handleToggleOccupancy}
        >
          {isBlocked ? 'Mark as Free' : 'Mark as Blocked'}
        </button>
        {isBlocked && userLocation && (
          <button className={styles.rerouteButton} onClick={handleReroute}>
            🔄 Find Next Free Spot
          </button>
        )}
      </div>
    </div>
  )
}
