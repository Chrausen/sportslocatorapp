import { GoogleMap, Marker } from '@react-google-maps/api'
import { useSelector, useDispatch } from 'react-redux'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useOccupancyExpiry } from '../../hooks/useOccupancyExpiry'
import { selectSpot } from '../../store/slices/uiSlice'
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

  useUserLocation()
  useOccupancyExpiry()

  const mapCenter = userLocation || kielCenter

  const filteredSpots = spots.filter(spot => {
    if (filter === 'all') return true
    return spot.sport === filter
  })

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={13}>
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

      {/* Sport pins */}
      {filteredSpots.map(spot => (
        <SportPin
          key={spot.id}
          spot={spot}
          isSelected={selectedSpotId === spot.id}
          onClick={() => dispatch(selectSpot(spot.id))}
        />
      ))}
    </GoogleMap>
  )
}
