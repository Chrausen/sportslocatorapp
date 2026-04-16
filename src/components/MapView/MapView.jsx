import { MapContainer, TileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux'
import './MapView.css'
import MapController from './MapController'
import FacilityMarker from '../FacilityMarker/FacilityMarker'
import UserLocationMarker from '../UserLocationMarker/UserLocationMarker'

export default function MapView() {
  const facilities = useSelector((state) => state.facilities.facilities)
  const { mapCenter, mapZoom } = useSelector((state) => state.ui)

  return (
    <MapContainer
      className="map-container"
      center={[mapCenter.lat, mapCenter.lon]}
      zoom={mapZoom}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController />
      <UserLocationMarker />
      {facilities.map((facility) => (
        <FacilityMarker key={facility.id} facility={facility} />
      ))}
    </MapContainer>
  )
}
