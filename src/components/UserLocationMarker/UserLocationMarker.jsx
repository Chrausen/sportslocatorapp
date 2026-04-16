import { Marker, Tooltip } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { userLocationIcon } from '../../utils/markerIcons'

export default function UserLocationMarker() {
  const { lat, lon, status } = useSelector((state) => state.location)

  if (status !== 'granted' || lat == null || lon == null) return null

  return (
    <Marker position={[lat, lon]} icon={userLocationIcon}>
      <Tooltip permanent={false} direction="top">
        Du bist hier
      </Tooltip>
    </Marker>
  )
}
