import { useMapEvents, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { setPendingPin } from '../../store/slices/uiSlice'

const pendingIcon = divIcon({
  className: '',
  html: `<div style="
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #6A1B9A;
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

// Placed inside <MapContainer> — must use useMapEvents here
export default function PinDropOverlay() {
  const dispatch = useDispatch()
  const pendingPin = useSelector((state) => state.ui.pendingPin)

  useMapEvents({
    click(e) {
      dispatch(setPendingPin({ lat: e.latlng.lat, lng: e.latlng.lng }))
    },
  })

  if (!pendingPin) return null

  return <Marker position={[pendingPin.lat, pendingPin.lng]} icon={pendingIcon} />
}
