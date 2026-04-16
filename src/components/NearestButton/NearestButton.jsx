import { useDispatch, useSelector } from 'react-redux'
import { sortByDistance } from '../../utils/geo'
import { flyToFacility } from '../../store/uiSlice'

export default function NearestButton() {
  const dispatch = useDispatch()
  const facilities = useSelector((state) => state.facilities.facilities)
  const { lat, lon, status: locStatus } = useSelector((state) => state.location)
  const selectedId = useSelector((state) => state.ui.selectedFacilityId)

  const hasLocation = locStatus === 'granted' && lat != null && lon != null
  const disabled = !hasLocation || facilities.length === 0

  function handleClick() {
    if (disabled) return

    // Exclude the currently selected facility so the user can skip it
    const candidates = selectedId
      ? facilities.filter((f) => f.id !== selectedId)
      : facilities

    const sorted = sortByDistance(candidates.length ? candidates : facilities, lat, lon)
    const nearest = sorted[0]
    if (!nearest) return

    dispatch(flyToFacility({ lat: nearest.lat, lon: nearest.lon, id: nearest.id }))
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      title={
        !hasLocation
          ? 'Standort wird benötigt'
          : facilities.length === 0
            ? 'Keine Plätze geladen'
            : 'Nächsten freien Platz finden'
      }
      style={{
        padding: '12px 20px',
        background: disabled ? '#ccc' : '#FF8C00',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        fontSize: '15px',
        fontWeight: '700',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.25)',
        transition: 'background 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      📍 Nächsten freien Platz
    </button>
  )
}
