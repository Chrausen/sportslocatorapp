import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FREE_COLOR, OCC_COLOR, BLUE, SPORT_META } from '../../tokens'
import { USER_LOCATION } from '../../store/spotsSlice'

// Custom teardrop pin icon matching the design
function createPinIcon(color, emoji, isSelected) {
  const w = isSelected ? 32 : 28
  const h = isSelected ? 50 : 44
  const glow = isSelected
    ? `<defs>
        <filter id="g" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`
    : ''
  const ring = isSelected
    ? `<path d="M0,-24 C-11,-24 -11,-10 -11,2 C-11,13 0,24 0,24 C0,24 11,13 11,2 C11,-10 11,-24 0,-24 Z"
              fill="none" stroke="white" stroke-width="2.5" opacity="0.7"/>`
    : ''
  const html = `<svg width="${w}" height="${h}" viewBox="-14 -28 28 52" xmlns="http://www.w3.org/2000/svg">
    ${glow}
    <ellipse cx="0" cy="20" rx="7" ry="3" fill="rgba(0,0,0,0.2)"/>
    <path d="M0,-24 C-11,-24 -11,-10 -11,2 C-11,13 0,24 0,24 C0,24 11,13 11,2 C11,-10 11,-24 0,-24 Z"
          fill="${color}" ${isSelected ? 'filter="url(#g)"' : ''}/>
    <circle cx="0" cy="-6" r="8" fill="rgba(255,255,255,0.25)"/>
    <text x="0" y="-2" text-anchor="middle" dominant-baseline="middle"
          font-size="10" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${emoji}</text>
    ${ring}
  </svg>`
  return L.divIcon({
    html,
    className: '',
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
  })
}

// Blue pulsing dot for user location
const userIcon = L.divIcon({
  html: `<div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center">
    <div style="position:absolute;inset:0;border-radius:50%;background:${BLUE};opacity:0.12"></div>
    <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:${BLUE};opacity:0.25;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
    <div style="width:14px;height:14px;border-radius:50%;background:${BLUE};border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);position:relative;z-index:1"></div>
  </div>`,
  className: '',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
})

// Flies map to selected spot; exposes map instance via mapRef
function MapController({ spotId, spots, mapRef }) {
  const map = useMap()

  useEffect(() => {
    if (mapRef) mapRef.current = map
  }, [map, mapRef])

  useEffect(() => {
    if (spotId == null) return
    const spot = spots.find((s) => s.id === spotId)
    if (spot) map.flyTo([spot.lat, spot.lng], Math.max(map.getZoom(), 16), { duration: 0.5 })
  }, [spotId, spots, map])

  return null
}

export default function LeafletMap({ spots, selectedId, filter, onPinClick, mapRef }) {
  const visible = filter === 'all' ? spots : spots.filter((s) => s.type === filter)

  return (
    <MapContainer
      center={USER_LOCATION}
      zoom={15}
      zoomControl={false}
      attributionControl={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      <MapController spotId={selectedId} spots={spots} mapRef={mapRef} />

      {/* User location dot */}
      <Marker position={USER_LOCATION} icon={userIcon} />

      {/* Sport spot pins */}
      {visible.map((spot) => {
        const isSel = spot.id === selectedId
        const icon = createPinIcon(
          spot.free ? FREE_COLOR : OCC_COLOR,
          SPORT_META[spot.type].icon,
          isSel,
        )
        return (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={icon}
            eventHandlers={{ click: () => onPinClick(spot) }}
          />
        )
      })}
    </MapContainer>
  )
}
