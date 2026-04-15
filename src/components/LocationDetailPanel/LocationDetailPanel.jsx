import { useSelector, useDispatch } from 'react-redux'
import { clearSelection } from '../../store/slices/uiSlice'
import { distanceBetween } from '../../utils/distance'
import styles from './LocationDetailPanel.module.css'

export function LocationDetailPanel() {
  const dispatch = useDispatch()
  const selectedSpotId = useSelector(state => state.ui.selectedSpotId)
  const spots = useSelector(state => state.spots.items)
  const userLocation = useSelector(state => state.ui.userLocation)
  const occupancy = useSelector(state => state.occupancy)

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
    </div>
  )
}
