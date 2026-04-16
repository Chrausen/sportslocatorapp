import { Marker, Popup } from 'react-leaflet'
import { useDispatch } from 'react-redux'
import { getIcon } from '../../utils/markerIcons'
import { selectFacility } from '../../store/uiSlice'
import FacilityPopup from '../FacilityPopup/FacilityPopup'

export default function FacilityMarker({ facility }) {
  const dispatch = useDispatch()

  return (
    <Marker
      position={[facility.lat, facility.lon]}
      icon={getIcon(facility.sport)}
      eventHandlers={{
        click: () => dispatch(selectFacility(facility.id)),
      }}
    >
      <Popup>
        <FacilityPopup facility={facility} />
      </Popup>
    </Marker>
  )
}
