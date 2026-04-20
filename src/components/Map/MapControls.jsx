import { FREE_COLOR, BLUE } from '../../tokens'

export default function MapControls({ onFindFree }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 28,
        right: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 10,
      }}
    >
      {/* Zoom group */}
      <div
        style={{
          background: 'white',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {['+', '−'].map((sym, i) => (
          <button
            key={sym}
            style={{
              width: 38,
              height: 38,
              border: 'none',
              background: 'white',
              cursor: 'pointer',
              fontSize: 16,
              color: '#555',
              fontWeight: 300,
              borderBottom: i === 0 ? '1px solid #F0EDE4' : 'none',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF9F6')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Find nearest free FAB */}
      <button
        onClick={onFindFree}
        style={{
          height: 48,
          padding: '0 16px',
          borderRadius: 12,
          border: 'none',
          background: FREE_COLOR,
          color: 'white',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: `0 4px 14px ${FREE_COLOR}50`,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          whiteSpace: 'nowrap',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="2" fill="white" />
          <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Nächsten freien finden
      </button>

      {/* My location */}
      <button
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          border: 'none',
          background: 'white',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF9F6')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3" fill={BLUE} />
          <circle cx="8" cy="8" r="6" stroke={BLUE} strokeWidth="1.5" fill="none" />
          <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
