import { useDispatch, useSelector } from 'react-redux'
import { selectLocationStatus, applyKielFallback } from '../../store/locationSlice'
import './LocationPermission.css'

export default function LocationPermission() {
  const dispatch = useDispatch()
  const status = useSelector(selectLocationStatus)

  if (status === 'granted' || status === 'idle') return null

  const handleUseFallback = () => dispatch(applyKielFallback())

  if (status === 'requesting') {
    return (
      <div className="location-overlay" role="status" aria-live="polite">
        <div className="location-spinner" />
        <h2 className="location-title">Finding your location…</h2>
        <p className="location-message">Please allow location access when prompted.</p>
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <div className="location-overlay" role="alert">
        <div className="location-icon">📍</div>
        <h2 className="location-title">Location access denied</h2>
        <p className="location-message">
          To find spots near you, allow location in your browser settings. Or browse the demo spots
          in Kiel.
        </p>
        <button className="location-btn" onClick={handleUseFallback}>
          Continue with Kiel
        </button>
      </div>
    )
  }

  // status === 'error'
  return (
    <div className="location-overlay" role="alert">
      <div className="location-icon">⚠️</div>
      <h2 className="location-title">Could not get location</h2>
      <p className="location-message">
        Something went wrong while fetching your position. You can still browse the demo spots in
        Kiel.
      </p>
      <button className="location-btn" onClick={handleUseFallback}>
        Continue with Kiel
      </button>
    </div>
  )
}
