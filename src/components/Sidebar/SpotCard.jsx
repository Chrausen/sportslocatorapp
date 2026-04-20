import Badge from '../UI/Badge'
import { BLUE, BLUE_LIGHT, SPORT_META } from '../../tokens'

export default function SpotCard({ spot, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '13px 16px',
        borderRadius: 12,
        background: selected ? BLUE_LIGHT : 'white',
        border: `1.5px solid ${selected ? BLUE : '#EEEBE4'}`,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        boxShadow: selected ? `0 0 0 3px ${BLUE}18` : '0 1px 3px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.background = '#FAF9F6'
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.background = 'white'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            flexShrink: 0,
            background: spot.free ? 'oklch(0.92 0.07 145)' : 'oklch(0.94 0.07 35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          {SPORT_META[spot.type].icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#1a1a1a',
              lineHeight: 1.3,
              marginBottom: 5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {spot.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Badge free={spot.free} small />
            <span style={{ fontSize: 11, color: '#999', fontFamily: 'DM Mono, monospace' }}>
              {spot.distance}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
