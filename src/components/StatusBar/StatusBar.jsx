import { useSelector } from 'react-redux'

export default function StatusBar() {
  const facilityStatus = useSelector((state) => state.facilities.status)
  const facilityError = useSelector((state) => state.facilities.error)
  const locationStatus = useSelector((state) => state.location.status)

  let message = null
  let bgColor = '#2979FF'

  if (locationStatus === 'requesting') {
    message = '📡 Standort wird ermittelt…'
  } else if (locationStatus === 'denied') {
    message = '📍 Standort verweigert – zeige Kiel'
    bgColor = '#FF8C00'
  } else if (locationStatus === 'unavailable') {
    message = '📍 Standort nicht verfügbar – zeige Kiel'
    bgColor = '#FF8C00'
  } else if (facilityStatus === 'loading') {
    message = '🔄 Sportplätze werden geladen…'
  } else if (facilityStatus === 'failed') {
    message = `⚠️ ${facilityError ?? 'Fehler beim Laden der Sportplätze'}`
    bgColor = '#d32f2f'
  }

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        background: bgColor,
        color: 'white',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: '500',
        flexShrink: 0,
      }}
    >
      {message}
    </div>
  )
}
