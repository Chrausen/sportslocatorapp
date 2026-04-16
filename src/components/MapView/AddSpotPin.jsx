import { useCallback } from 'react'
import { Marker } from 'react-leaflet'
import { useDispatch } from 'react-redux'
import L from 'leaflet'
import { setPendingPin } from '../../store/uiSlice'

const pendingIcon = L.divIcon({
  className: '',
  html: '<div class="pending-pin"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
})

export default function AddSpotPin({ lat, lng }) {
  const dispatch = useDispatch()

  const handleDragEnd = useCallback(
    (e) => {
      const { lat: newLat, lng: newLng } = e.target.getLatLng()
      dispatch(setPendingPin({ lat: newLat, lng: newLng }))
    },
    [dispatch]
  )

  return (
    <Marker
      position={[lat, lng]}
      icon={pendingIcon}
      draggable
      eventHandlers={{ dragend: handleDragEnd }}
    />
  )
}
