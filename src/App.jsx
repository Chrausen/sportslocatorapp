import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelected,
  setFilter,
  reportOccupied,
  clearOccupied,
} from './store/spotsSlice'
import { BLUE } from './tokens'
import Sidebar from './components/Sidebar/Sidebar'
import MapSVG from './components/Map/MapSVG'
import MapControls from './components/Map/MapControls'
import SubmitModal from './components/Sidebar/SubmitModal'

const SIDEBAR_WIDTH = 340

export default function App() {
  const dispatch = useDispatch()
  const spots = useSelector((state) => state.spots.spots)
  const selectedSpotId = useSelector((state) => state.spots.selectedSpotId)
  const filter = useSelector((state) => state.spots.filter)

  const [showSubmit, setShowSubmit] = useState(false)

  const selectedSpot = spots.find((s) => s.id === selectedSpotId) ?? null

  const handleSpotClick = (spot) => {
    dispatch(setSelected(spot ? spot.id : null))
  }

  const handleReport = (spot) => {
    dispatch(reportOccupied(spot.id))
    // Auto-clear after 1 hour
    setTimeout(() => dispatch(clearOccupied(spot.id)), 60 * 60 * 1000)
  }

  const handleFindNext = () => {
    const freeSpots = spots.filter(
      (s) => s.free && (filter === 'all' || s.type === filter)
    )
    if (freeSpots.length > 0) {
      dispatch(setSelected(freeSpots[0].id))
    }
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        background: '#EAE7DE',
      }}
    >
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

      {/* Map area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <MapSVG
          spots={spots}
          selectedId={selectedSpotId}
          filter={filter}
          onPinClick={handleSpotClick}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 14,
            fontSize: 10,
            color: 'rgba(0,0,0,0.3)',
            fontFamily: 'DM Mono, monospace',
          }}
        >
          © SportsLocator Community Map
        </div>

        <MapControls onFindFree={handleFindNext} />
      </div>

      {/* Submit Modal */}
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
