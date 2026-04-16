import { useSelector } from 'react-redux'
import { buildNavigationUrl } from '../../utils/navigationUrl'

const SPORT_LABELS = {
  basketball: '🏀 Basketball',
  table_tennis: '🏓 Tischtennis',
  boules: '🎯 Boule / Pétanque',
}

export default function FacilityPopup({ facility }) {
  const { lat: userLat, lon: userLon } = useSelector((state) => state.location)

  const navUrl = buildNavigationUrl(userLat, userLon, facility.lat, facility.lon)

  return (
    <div style={{ minWidth: '160px' }}>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '14px',
          marginBottom: '4px',
          lineHeight: '1.3',
        }}
      >
        {facility.name}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#555',
          marginBottom: '10px',
        }}
      >
        {SPORT_LABELS[facility.sport] ?? facility.sport}
      </div>
      <a
        href={navUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '6px 12px',
          background: '#2979FF',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: '600',
        }}
      >
        Navigieren →
      </a>
    </div>
  )
}
