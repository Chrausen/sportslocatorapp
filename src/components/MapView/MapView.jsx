import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, useMap, useMapEvents } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useOccupancyExpiry } from '../../hooks/useOccupancyExpiry'
import { setIsAddingSpot, setPendingPin } from '../../store/slices/uiSlice'
import SportPin from '../SportPin/SportPin'
import PinDropOverlay from '../PinDropOverlay/PinDropOverlay'
import styles from './MapView.module.css'

// Shows a loading indicator while the first tile batch loads
function TileLoadingTracker({ onLoaded }) {
  const map = useMapEvents({
    load() {
      onLoaded()
    },
    tileloadstart() {},
  })
  useEffect(() => {
    function handleLoad() {
      onLoaded()
    }
    map.once('load', handleLoad)
    // Leaflet fires 'load' when all tiles in the current view have loaded
    return () => map.off('load', handleLoad)
  }, [map, onLoaded])
  return null
}

const KIEL_CENTER = [54.3213, 10.1348]

// Recenter the map once when user location first becomes available
function MapCenterer({ userLocation }) {
  const map = useMap()
  const centeredRef = useRef(false)

  useEffect(() => {
    if (userLocation && !centeredRef.current) {
      centeredRef.current = true
      map.setView([userLocation.lat, userLocation.lng], map.getZoom(), { animate: true })
    }
  }, [userLocation, map])

  return null
}

function UserLocationMarker({ userLocation }) {
  if (!userLocation) return null
  return (
    <CircleMarker
      center={[userLocation.lat, userLocation.lng]}
      radius={8}
      pathOptions={{ color: '#1565C0', fillColor: '#42A5F5', fillOpacity: 0.9, weight: 2 }}
    />
  )
}

export default function MapView() {
  useUserLocation()
  useOccupancyExpiry()

  const dispatch = useDispatch()
  const spots = useSelector((state) => state.spots.items)
  const occupancy = useSelector((state) => state.occupancy)
  const filter = useSelector((state) => state.ui.filter)
  const userLocation = useSelector((state) => state.ui.userLocation)
  const isAddingSpot = useSelector((state) => state.ui.isAddingSpot)
  const geolocationDenied = useSelector((state) => state.ui.geolocationDenied)

  const [tilesLoaded, setTilesLoaded] = useState(false)

  const visibleSpots = filter === 'all' ? spots : spots.filter((s) => s.sport === filter)

  function handleCancelAdd() {
    dispatch(setIsAddingSpot(false))
    dispatch(setPendingPin(null))
  }

  return (
    <div className={styles.container}>
      <MapContainer
        center={KIEL_CENTER}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          eventHandlers={{ load: () => setTilesLoaded(true) }}
        />
        <TileLoadingTracker onLoaded={() => setTilesLoaded(true)} />
        {userLocation && <MapCenterer userLocation={userLocation} />}
        <UserLocationMarker userLocation={userLocation} />
        {visibleSpots.map((spot) => (
          <SportPin key={spot.id} spot={spot} isBlocked={Boolean(occupancy[spot.id])} />
        ))}
        {isAddingSpot && <PinDropOverlay />}
      </MapContainer>

      {!tilesLoaded && (
        <div className={styles.loadingOverlay} role="status" aria-label="Loading map">
          <div className={styles.spinner} />
          <span>Loading map…</span>
        </div>
      )}

      {geolocationDenied && (
        <div className={styles.geoBanner} role="alert">
          Location access denied — showing Kiel city centre as fallback.
        </div>
      )}

      {isAddingSpot && (
        <div className={styles.pinDropBanner}>
          <span>Tap on the map to place your spot</span>
          <button
            className={styles.cancelAddBtn}
            onClick={handleCancelAdd}
            aria-label="Cancel adding spot"
          >
            Cancel
          </button>
        </div>
      )}

      {!isAddingSpot && visibleSpots.length === 0 && (
        <div className={styles.emptyState} role="status">
          No spots match this filter
        </div>
      )}
    </div>
  )
}
