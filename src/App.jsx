import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelected,
  setFilter,
  reportOccupied,
  clearOccupied,
  setUserLocation,
  selectSpotsWithDistance,
} from './store/spotsSlice'
import Sidebar from './components/Sidebar/Sidebar'
import LeafletMap from './components/Map/LeafletMap'
import MapControls from './components/Map/MapControls'
import SubmitModal from './components/Sidebar/SubmitModal'

const SIDEBAR_WIDTH = 340

export default function App() {
  const dispatch = useDispatch()
  const spots = useSelector(selectSpotsWithDistance)
  const selectedSpotId = useSelector((state) => state.spots.selectedSpotId)
  const filter = useSelector((state) => state.spots.filter)
  const userLocation = useSelector((state) => state.spots.userLocation)

  const [showSubmit, setShowSubmit] = useState(false)
  const mapRef = useRef(null)

  // Request real user location once on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        dispatch(
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        ),
      (err) => console.warn('Standort nicht verfügbar', err),
      { enableHighAccuracy: true },
    )
  }, [dispatch])

  const selectedSpot = spots.find((s) => s.id === selectedSpotId) ?? null

  const handleSpotClick = (spot) => {
    dispatch(setSelected(spot ? spot.id : null))
  }

  const handleReport = (spot) => {
    dispatch(reportOccupied(spot.id))
    setTimeout(() => dispatch(clearOccupied(spot.id)), 60 * 60 * 1000)
  }

  // Selects the nearest free spot (spots are already sorted by distance)
  const handleFindNext = () => {
    const nearest = spots.find((s) => s.free && (filter === 'all' || s.type === filter))
    if (nearest) dispatch(setSelected(nearest.id))
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden', background: '#EAE7DE' }}>
      <Sidebar
        spots={spots}
        selectedSpot={selectedSpot}
        filter={filter}
        onFilterChange={(f) => dispatch(setFilter(f))}
        onSpotClick={handleSpotClick}
        onReport={handleReport}
        onFindNext={handleFindNext}
        onSubmitOpen={() => setShowSubmit(true)}
        width={SIDEBAR_WIDTH}
      />

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <LeafletMap
          spots={spots}
          selectedId={selectedSpotId}
          filter={filter}
          onPinClick={handleSpotClick}
          mapRef={mapRef}
          userLocation={userLocation}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 14,
            fontSize: 10,
            color: 'rgba(0,0,0,0.3)',
            fontFamily: 'DM Mono, monospace',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          © OpenStreetMap contributors © CARTO
        </div>

        <MapControls onFindFree={handleFindNext} mapRef={mapRef} userLocation={userLocation} />
      </div>

      {showSubmit && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSubmit(false)
          }}
        >
          <div
            style={{
              width: 480,
              maxHeight: '85vh',
              background: 'oklch(0.98 0.006 60)',
              borderRadius: 20,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.25s cubic-bezier(0.34,1.2,0.64,1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid #EEEBE4',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>Spot einreichen</div>
              <button
                onClick={() => setShowSubmit(false)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: 'none',
                  background: '#F0EDE4',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: '#888',
                }}
              >
                ✕
              </button>
            </div>
            <SubmitModal onClose={() => setShowSubmit(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
