import { GoogleMap, Marker } from '@react-google-maps/api'
import { useSelector, useDispatch } from 'react-redux'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useOccupancyExpiry } from '../../hooks/useOccupancyExpiry'
import { selectSpot, setPendingPin } from '../../store/slices/uiSlice'
import { SportPin } from '../SportPin/SportPin'

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
}

const kielCenter = { lat: 54.32, lng: 10.14 }

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

  const mapCenter = userLocation || kielCenter

  const filteredSpots = spots.filter(spot => {
    if (filter === 'all') return true
    return spot.sport === filter
  })

  const handleMapClick = (e) => {
    if (isAddingSpot) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      dispatch(setPendingPin({ lat, lng }))
    }
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={13}
      onClick={handleMapClick}
    >
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#2196F3',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2
          }}
          title="Your location"
        />
      )}

      {/* Pending pin during add mode */}
      {pendingPin && (
        <Marker
          position={pendingPin}
          icon={{
            path: 'M 0,0 C -2,-2 -2,-6 0,-6 C 2,-6 2,-2 0,0 Z',
            fillColor: '#9C27B0',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
            scale: 3
          }}
          title="New spot location"
        />
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

      {/* Empty state message */}
      {filteredSpots.length === 0 && spots.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
            No spots found
          </p>
          <p style={{ margin: '0', color: '#666', fontSize: '0.95rem' }}>
            Try changing your sport filter or add a new spot
          </p>
        </div>
      )}

      {/* Geolocation denied banner */}
      {geolocationDenied && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#FFC107',
          color: '#333',
          padding: '1rem',
          textAlign: 'center',
          zIndex: 30,
          fontSize: '0.95rem'
        }}>
          ℹ️ Location access is disabled. The map will be centered on Kiel instead of your location.
        </div>
      )}
    </GoogleMap>
  )
}
