import { useEffect, useRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { getIcon } from '../../utils/markerIcons'
import { selectFacility } from '../../store/uiSlice'
import FacilityPopup from '../FacilityPopup/FacilityPopup'

export default function FacilityMarker({ facility }) {
  const dispatch = useDispatch()
  const selectedId = useSelector((state) => state.ui.selectedFacilityId)
  const markerRef = useRef(null)
  const isSelected = selectedId === facility.id

  // When this facility gets selected via Redux (e.g. NearestButton), open its popup
  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup()
    }
  }, [isSelected])

  return (
    <Marker
      ref={markerRef}
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
