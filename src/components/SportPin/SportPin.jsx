import { Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { useDispatch } from 'react-redux'
import { selectSpot } from '../../store/slices/uiSlice'

const SPORT_COLORS = {
  'table-tennis': '#2196F3',
  basketball: '#FF9800',
  boule: '#4CAF50',
}
const BLOCKED_COLOR = '#90A4AE'

function createPinIcon(color) {
  return divIcon({
    className: '',
    html: `<div style="
      width: 28px;
      height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      background: ${color};
      border: 2px solid rgba(0,0,0,0.3);
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  })
}

export default function SportPin({ spot, isBlocked }) {
  const dispatch = useDispatch()
  const color = isBlocked ? BLOCKED_COLOR : (SPORT_COLORS[spot.sport] ?? '#888')
  const icon = createPinIcon(color)

  return (
    <Marker
      position={[spot.lat, spot.lng]}
      icon={icon}
      eventHandlers={{
        click: () => dispatch(selectSpot(spot.id)),
      }}
    />
  )
}
