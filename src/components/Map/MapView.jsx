import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { selectVenue, deselectVenue } from '../../store/venuesSlice'
import { setLocation, setLocationError, setLocationLoading } from '../../store/locationSlice'
import './MapView.css'

const SPORT_CONFIG = {
  tabletennis: { color: '#1565C0', label: 'TT' },
  basketball: { color: '#E64A19', label: 'BB' },
  boule: { color: '#2E7D32', label: 'BL' },
}

const DEFAULT_CENTER = [52.52, 13.405] // Berlin Mitte

function createVenueIcon(sport, isOccupied, isSelected) {
  const { color, label } = SPORT_CONFIG[sport]
  const bg = isOccupied ? '#757575' : color
  const size = isSelected ? 46 : 36
  const border = isSelected ? '3px solid #ffffff' : '2px solid rgba(255,255,255,0.6)'
  const shadow = isSelected
    ? '0 3px 12px rgba(0,0,0,0.5)'
    : '0 2px 6px rgba(0,0,0,0.35)'

  const html = `
    <div style="
      width:${size}px;height:${size}px;
      background:${bg};
      border-radius:50%;
      border:${border};
      box-shadow:${shadow};
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
      font-family:system-ui,sans-serif;
      font-size:${Math.round(size * 0.3)}px;
      font-weight:700;
      color:#fff;
      letter-spacing:0.5px;
      transition:transform 0.15s ease;
    ">${label}</div>`

  return L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function createUserIcon() {
  const html = `
    <div style="
      width:18px;height:18px;
      background:#2979FF;
      border-radius:50%;
      border:3px solid #fff;
      box-shadow:0 0 0 4px rgba(41,121,255,0.3);
    "></div>`
  return L.divIcon({ className: '', html, iconSize: [18, 18], iconAnchor: [9, 9] })
}

// Flies to selected venue whenever selectedId changes
function MapFlyer({ venues, selectedId }) {
  const map = useMap()
  const prevId = useRef(null)

  useEffect(() => {
    if (selectedId && selectedId !== prevId.current) {
      const venue = venues.find((v) => v.id === selectedId)
      if (venue) {
        map.flyTo([venue.lat, venue.lng], Math.max(map.getZoom(), 15), { duration: 0.8 })
      }
    }
    prevId.current = selectedId
  }, [selectedId, venues, map])

  return null
}

// Deselects venue when user clicks on the map background
function MapClickHandler() {
  const dispatch = useDispatch()
  useMapEvents({ click: () => dispatch(deselectVenue()) })
  return null
}

// Locates user once on mount
function LocationWatcher() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(setLocationError('Geolocation wird nicht unterstützt.'))
      return
    }
    dispatch(setLocationLoading())
    const id = navigator.geolocation.watchPosition(
      (pos) => dispatch(setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })),
      () => dispatch(setLocationError('Standortzugriff verweigert.')),
      { enableHighAccuracy: true }
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [dispatch])

  return null
}

export default function MapView() {
  const dispatch = useDispatch()
  const { items: allVenues, selectedId, filter } = useSelector((s) => s.venues)
  const { lat: userLat, lng: userLng } = useSelector((s) => s.location)

  const visibleVenues =
    filter === 'all' ? allVenues : allVenues.filter((v) => v.sport === filter)

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={13}
      className="map-container"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationWatcher />
      <MapClickHandler />
      <MapFlyer venues={allVenues} selectedId={selectedId} />

      {/* User location dot */}
      {userLat !== null && (
        <Marker position={[userLat, userLng]} icon={createUserIcon()} />
      )}

      {/* Venue markers */}
      {visibleVenues.map((venue) => (
        <Marker
          key={venue.id}
          position={[venue.lat, venue.lng]}
          icon={createVenueIcon(venue.sport, venue.occupied, venue.id === selectedId)}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation()
              dispatch(selectVenue(venue.id))
            },
          }}
        />
      ))}
    </MapContainer>
  )
}
