import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

import SpotMarker from './SpotMarker'
import AddSpotPin from './AddSpotPin'
import {
  selectActiveFilter,
  selectAddSpotMode,
  selectPendingPin,
  selectMapCenter,
  selectMapZoom,
  setPendingPin,
  setMapCenter,
  setMapZoom,
} from '../../store/uiSlice'
import { selectAllSpots } from '../../store/spotsSlice'

// Syncs Redux mapCenter → Leaflet view
function MapController() {
  const dispatch = useDispatch()
  const mapCenter = useSelector(selectMapCenter)
  const mapZoom = useSelector(selectMapZoom)
  const addSpotMode = useSelector(selectAddSpotMode)
  const map = useMap()

  useEffect(() => {
    map.setView([mapCenter.lat, mapCenter.lng], mapZoom, { animate: true })
  }, [map, mapCenter, mapZoom])

  useMapEvents({
    click(e) {
      if (addSpotMode) {
        dispatch(setPendingPin({ lat: e.latlng.lat, lng: e.latlng.lng }))
      }
    },
    moveend() {
      const c = map.getCenter()
      dispatch(setMapCenter({ lat: c.lat, lng: c.lng }))
    },
    zoomend() {
      dispatch(setMapZoom(map.getZoom()))
    },
  })

  return null
}

export default function MapView() {
  const allSpots = useSelector(selectAllSpots)
  const activeFilter = useSelector(selectActiveFilter)
  const addSpotMode = useSelector(selectAddSpotMode)
  const pendingPin = useSelector(selectPendingPin)
  const mapCenter = useSelector(selectMapCenter)
  const mapZoom = useSelector(selectMapZoom)

  const visibleSpots =
    activeFilter === 'all' ? allSpots : allSpots.filter((s) => s.sportType === activeFilter)

  return (
    <div className={`map-container${addSpotMode ? ' map-add-mode' : ''}`}>
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={mapZoom}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController />
        {visibleSpots.map((spot) => (
          <SpotMarker key={spot.id} spot={spot} />
        ))}
        {addSpotMode && pendingPin && <AddSpotPin lat={pendingPin.lat} lng={pendingPin.lng} />}
      </MapContainer>

      {addSpotMode && <div className="add-mode-banner">Tap the map to place a new spot</div>}
    </div>
  )
}
