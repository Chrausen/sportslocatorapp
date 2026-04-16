import { useCallback } from 'react'
import { Marker } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import { selectSpot, selectSelectedSpotId } from '../../store/uiSlice'
import { selectIsBlocked } from '../../store/spotsSlice'

function makeIcon(sportType, blocked, selected) {
  const classes = [
    'spot-pin',
    `spot-pin--${sportType}`,
    blocked ? 'spot-pin--blocked' : '',
    selected ? 'spot-pin--selected' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const size = selected ? 38 : 32
  const anchor = selected ? 19 : 16

  return L.divIcon({
    className: '',
    html: `<div class="${classes}"></div>`,
    iconSize: [size, size],
    iconAnchor: [anchor, size],
    popupAnchor: [0, -size],
  })
}

export default function SpotMarker({ spot }) {
  const dispatch = useDispatch()
  const selectedSpotId = useSelector(selectSelectedSpotId)
  const blocked = useSelector(selectIsBlocked(spot.id))
  const selected = selectedSpotId === spot.id

  const icon = makeIcon(spot.sportType, blocked, selected)

  const handleClick = useCallback(() => {
    dispatch(selectSpot(spot.id))
  }, [dispatch, spot.id])

  return (
    <Marker
      position={[spot.lat, spot.lng]}
      icon={icon}
      eventHandlers={{ click: handleClick }}
      zIndexOffset={selected ? 1000 : 0}
    />
  )
}
