import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useOccupancyExpiry } from '../../hooks/useOccupancyExpiry'
import SportPin from '../SportPin/SportPin'
import styles from './MapView.module.css'

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

  const spots = useSelector((state) => state.spots.items)
  const occupancy = useSelector((state) => state.occupancy)
  const filter = useSelector((state) => state.ui.filter)
  const userLocation = useSelector((state) => state.ui.userLocation)

  const visibleSpots = filter === 'all' ? spots : spots.filter((s) => s.sport === filter)

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
        />
        {userLocation && <MapCenterer userLocation={userLocation} />}
        <UserLocationMarker userLocation={userLocation} />
        {visibleSpots.map((spot) => (
          <SportPin key={spot.id} spot={spot} isBlocked={Boolean(occupancy[spot.id])} />
        ))}
      </MapContainer>
    </div>
  )
}
