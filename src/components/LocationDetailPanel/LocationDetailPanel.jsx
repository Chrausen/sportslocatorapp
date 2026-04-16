import { useDispatch, useSelector } from 'react-redux'
import { clearSelection } from '../../store/slices/uiSlice'
import { distanceBetween } from '../../utils/distance'
import NavigateButton from '../NavigateButton/NavigateButton'
import OccupancyToggle from '../OccupancyToggle/OccupancyToggle'
import RerouteButton from '../RerouteButton/RerouteButton'
import styles from './LocationDetailPanel.module.css'

const SPORT_LABELS = {
  'table-tennis': 'Table Tennis',
  basketball: 'Basketball',
  boule: 'Boule',
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDistance(metres) {
  if (metres < 1000) return `${Math.round(metres)} m`
  return `${(metres / 1000).toFixed(1)} km`
}

export default function LocationDetailPanel() {
  const dispatch = useDispatch()
  const selectedSpotId = useSelector((state) => state.ui.selectedSpotId)
  const spot = useSelector((state) => state.spots.items.find((s) => s.id === selectedSpotId))
  const blockedUntil = useSelector((state) => state.occupancy[selectedSpotId])
  const userLocation = useSelector((state) => state.ui.userLocation)

  if (!spot) return null

  const isBlocked = Boolean(blockedUntil) && Date.parse(blockedUntil) > Date.now()
  const distance =
    userLocation ? distanceBetween(userLocation, { lat: spot.lat, lng: spot.lng }) : null

  return (
    <div className={styles.panel} role="dialog" aria-label={`Details for ${spot.name}`}>
      <button
        className={styles.closeBtn}
        onClick={() => dispatch(clearSelection())}
        aria-label="Close detail panel"
      >
        ✕
      </button>

      <h2 className={styles.name}>{spot.name}</h2>
      <p className={styles.sport}>{SPORT_LABELS[spot.sport] ?? spot.sport}</p>

      {spot.description && <p className={styles.description}>{spot.description}</p>}

      {distance !== null && (
        <p className={styles.distance}>{formatDistance(distance)} away</p>
      )}

      <p className={isBlocked ? styles.blocked : styles.free}>
        {isBlocked ? `Blocked until ${formatTime(blockedUntil)}` : 'Free'}
      </p>

      <div className={styles.actions}>
        <NavigateButton lat={spot.lat} lng={spot.lng} />
        <OccupancyToggle spotId={spot.id} isBlocked={isBlocked} />
        {isBlocked && <RerouteButton currentSpotId={spot.id} />}
      </div>
    </div>
  )
}
