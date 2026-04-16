import { useDispatch } from 'react-redux'
import { setFilter } from '../../store/uiSlice'

const SPORT_LABELS = {
  'table-tennis': 'table tennis',
  basketball: 'basketball',
  boule: 'boule',
}

export default function EmptyState({ filter }) {
  const dispatch = useDispatch()
  const label = SPORT_LABELS[filter] || filter

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 'var(--z-controls)',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 12,
        padding: '12px 20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        textAlign: 'center',
        maxWidth: 260,
      }}
    >
      <p style={{ margin: '0 0 8px', fontSize: '0.88rem', color: '#555' }}>
        No {label} spots found in this area.
      </p>
      <button
        onClick={() => dispatch(setFilter('all'))}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-accent)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        Show all sports
      </button>
    </div>
  )
}
