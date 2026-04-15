import { useSelector, useDispatch } from 'react-redux'
import { selectVenue, deselectVenue, toggleOccupied } from '../../store/venuesSlice'
import { haversineDistance, formatDistance, findNearestFree } from '../../utils/geo'
import './VenuePanel.css'

const SPORT_LABEL = {
  tabletennis: 'Tischtennis',
  basketball: 'Basketball',
  boule: 'Boule',
}

const SPORT_COLOR = {
  tabletennis: '#1565C0',
  basketball: '#E64A19',
  boule: '#2E7D32',
}

const SPORT_ICON = {
  tabletennis: '🏓',
  basketball: '🏀',
  boule: '⚪',
}

function googleMapsUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`
}

function osmUrl(userLat, userLng, venueLat, venueLng) {
  if (userLat !== null) {
    return `https://www.openstreetmap.org/directions?from=${userLat},${userLng}&to=${venueLat},${venueLng}&route=foot`
  }
  return `https://www.openstreetmap.org/?mlat=${venueLat}&mlon=${venueLng}#map=17/${venueLat}/${venueLng}`
}

export default function VenuePanel() {
  const dispatch = useDispatch()
  const { items: venues, selectedId } = useSelector((s) => s.venues)
  const { lat: userLat, lng: userLng } = useSelector((s) => s.location)

  const venue = venues.find((v) => v.id === selectedId)

  const distance =
    venue && userLat !== null
      ? formatDistance(haversineDistance(userLat, userLng, venue.lat, venue.lng))
      : null

  function handleFindNearest() {
    if (!venue) return
    const fromLat = userLat ?? venue.lat
    const fromLng = userLng ?? venue.lng
    const nearest = findNearestFree(venues, fromLat, fromLng, venue.sport, venue.id)
    if (nearest) {
      dispatch(selectVenue(nearest.id))
    }
  }

  const hasNearestFree =
    venue &&
    findNearestFree(
      venues,
      userLat ?? venue?.lat,
      userLng ?? venue?.lng,
      venue?.sport,
      venue?.id
    ) !== null

  return (
    <div className={`venue-panel${venue ? ' venue-panel--open' : ''}`}>
      {/* Drag handle */}
      <div className="venue-panel__handle" />

      {!venue ? (
        <p className="venue-panel__hint">Marker antippen, um Details zu sehen</p>
      ) : (
        <>
          {/* Close button */}
          <button
            className="venue-panel__close"
            onClick={() => dispatch(deselectVenue())}
            aria-label="Schließen"
          >
            ✕
          </button>

          {/* Header */}
          <div className="venue-panel__header">
            <span
              className="venue-panel__sport-badge"
              style={{ background: SPORT_COLOR[venue.sport] }}
            >
              {SPORT_ICON[venue.sport]} {SPORT_LABEL[venue.sport]}
            </span>
            <h2 className="venue-panel__name">{venue.name}</h2>
            {distance && <p className="venue-panel__distance">{distance} entfernt</p>}
            <p className="venue-panel__description">{venue.description}</p>
          </div>

          {/* Status toggle */}
          <div className="venue-panel__status-row">
            <span className={`venue-panel__status-badge${venue.occupied ? ' venue-panel__status-badge--occupied' : ''}`}>
              {venue.occupied ? '🔴 Belegt' : '🟢 Frei'}
            </span>
            <button
              className="venue-panel__toggle-btn"
              onClick={() => dispatch(toggleOccupied(venue.id))}
            >
              {venue.occupied ? 'Als frei melden' : 'Als belegt melden'}
            </button>
          </div>

          {/* Navigation */}
          <div className="venue-panel__nav-section">
            <p className="venue-panel__nav-label">Navigieren:</p>
            <div className="venue-panel__nav-buttons">
              <a
                className="venue-panel__nav-btn venue-panel__nav-btn--gmaps"
                href={googleMapsUrl(venue.lat, venue.lng)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
              <a
                className="venue-panel__nav-btn venue-panel__nav-btn--osm"
                href={osmUrl(userLat, userLng, venue.lat, venue.lng)}
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenStreetMap
              </a>
            </div>
          </div>

          {/* Find nearest free */}
          <button
            className="venue-panel__nearest-btn"
            onClick={handleFindNearest}
            disabled={!hasNearestFree}
            title={hasNearestFree ? '' : 'Kein freier Platz in der Nähe gefunden'}
          >
            {hasNearestFree
              ? '📍 Nächsten freien Platz finden'
              : 'Kein weiterer freier Platz verfügbar'}
          </button>

          <p className="venue-panel__attribution">Eingereicht von: {venue.addedBy}</p>
        </>
      )}
    </div>
  )
}
