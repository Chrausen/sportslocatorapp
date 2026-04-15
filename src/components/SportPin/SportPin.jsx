import { Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import L from 'leaflet'
import styles from './SportPin.module.css'

const sportColors = {
  'table-tennis': '#2196F3',
  'basketball': '#FF9800',
  'boule': '#4CAF50'
}

const blockedColor = '#90A4AE'

export function SportPin({ spot, isSelected, onClick }) {
  const occupancy = useSelector(state => state.occupancy)
  const isBlocked = occupancy[spot.id]

  const color = isBlocked ? blockedColor : sportColors[spot.sport]

  // Create custom div icon for sport pin
  const icon = L.divIcon({
    className: styles.sportPin,
    html: `<div class="${styles.pinMarker}" style="background-color: ${color};"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })

  const sportLabels = {
    'table-tennis': '🏓 Table Tennis',
    'basketball': '🏀 Basketball',
    'boule': '🎱 Boule'
  }

  return (
    <Marker
      position={[spot.lat, spot.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick
      }}
      title={spot.name}
    >
      <Popup maxWidth={250}>
        <div className={styles.popup}>
          <h3 className={styles.popupTitle}>{spot.name}</h3>
          <p className={styles.popupSport}>{sportLabels[spot.sport]}</p>
          {spot.description && (
            <p className={styles.popupDescription}>{spot.description}</p>
          )}
          <p className={`${styles.popupStatus} ${isBlocked ? styles.blocked : styles.free}`}>
            {isBlocked ? '🔴 Blocked' : '🟢 Free'}
          </p>
        </div>
      </Popup>
    </Marker>
  )
}
