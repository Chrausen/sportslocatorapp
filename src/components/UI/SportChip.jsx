import { BLUE, SPORT_META } from '../../tokens'

export default function SportChip({ type, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 13px',
        borderRadius: 999,
        border: 'none',
        background: active ? BLUE : '#F0EEE9',
        color: active ? 'white' : '#555',
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        boxShadow: active ? `0 2px 8px ${BLUE}40` : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {type === 'all' ? '🗺️' : SPORT_META[type].icon}
      {type === 'all' ? 'Alle' : SPORT_META[type].label}
    </button>
  )
}
