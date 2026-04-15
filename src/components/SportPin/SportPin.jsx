import { Marker } from '@react-google-maps/api'
import { useSelector } from 'react-redux'

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

  const icon = {
    path: 'M 0,0 C -2,-2 -2,-6 0,-6 C 2,-6 2,-2 0,0 Z',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#fff',
    strokeWeight: 2,
    scale: 3
  }

  return (
    <Marker
      position={{ lat: spot.lat, lng: spot.lng }}
      icon={icon}
      onClick={onClick}
      title={spot.name}
    />
  )
}
