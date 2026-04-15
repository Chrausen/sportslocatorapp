import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useOccupancyExpiry } from '../../hooks/useOccupancyExpiry'
import { selectSpot, setPendingPin } from '../../store/slices/uiSlice'
import { SportPin } from '../SportPin/SportPin'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './MapView.module.css'

const kielCenter = [54.32, 10.14]

// Custom icon for user location
const userLocationIcon = L.divIcon({
  className: styles.userLocationIcon,
  html: '<div class="' + styles.userLocationDot + '"></div>',
  iconSize: [24, 24]
})

export function MapView() {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.items)
  const filter = useSelector(state => state.ui.filter)
  const userLocation = useSelector(state => state.ui.userLocation)
  const selectedSpotId = useSelector(state => state.ui.selectedSpotId)
  const isAddingSpot = useSelector(state => state.ui.isAddingSpot)
  const pendingPin = useSelector(state => state.ui.pendingPin)
  const geolocationDenied = useSelector(state => state.ui.geolocationDenied)

  useUserLocation()
  useOccupancyExpiry()

  const mapCenter = userLocation ? [userLocation.lat, userLocation.lng] : kielCenter

  const filteredSpots = spots.filter(spot => {
    if (filter === 'all') return true
    return spot.sport === filter
  })

  const handleMapClick = (e) => {
    if (isAddingSpot) {
      const { lat, lng } = e.latlng
      dispatch(setPendingPin({ lat, lng }))
    }
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Pending pin during add mode */}
        {pendingPin && (
          <Marker position={[pendingPin.lat, pendingPin.lng]}>
            <Popup>New Spot Location</Popup>
          </Marker>
        )}

        {/* Sport pins */}
        {filteredSpots.map(spot => (
          <SportPin
            key={spot.id}
            spot={spot}
            isSelected={selectedSpotId === spot.id}
            onClick={() => dispatch(selectSpot(spot.id))}
          />
        ))}
      </MapContainer>

      {/* Empty state message */}
      {filteredSpots.length === 0 && spots.length > 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>No spots found</p>
          <p className={styles.emptyStateText}>
            Try changing your sport filter or add a new spot
          </p>
        </div>
      )}

      {/* Geolocation denied banner */}
      {geolocationDenied && (
        <div className={styles.geolocationBanner}>
          ℹ️ Location access is disabled. The map will be centered on Kiel instead of your location.
        </div>
      )}
    </div>
  )
}
