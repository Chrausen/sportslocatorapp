import { useState } from 'react'
import Badge from '../UI/Badge'
import { BLUE, BLUE_LIGHT, FREE_COLOR, OCC_COLOR, SPORT_META } from '../../tokens'

export default function DetailPanel({ spot, onClose, onReport, onFindNext }) {
  const [reported, setReported] = useState(false)
  const [navConfirm, setNavConfirm] = useState(false)

  const stars = Math.round(spot.rating)

  return (
    <div
      style={{
        animation: 'slideUp 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #F0EDE4' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: 13,
              color: BLUE,
              fontWeight: 600,
              padding: 0,
            }}
          >
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
              <path
                d="M6 1L1 5.5L6 10"
                stroke={BLUE}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Alle Spots
          </button>
          <span style={{ fontSize: 11, color: '#AAA', fontFamily: 'DM Mono, monospace' }}>
            {spot.distance} entfernt
          </span>
        </div>

        {/* Sport type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              fontSize: 16,
              background: spot.free ? 'oklch(0.92 0.07 145)' : 'oklch(0.94 0.07 35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {SPORT_META[spot.type].icon}
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: 0.7,
            }}
          >
            {SPORT_META[spot.type].label}
          </span>
        </div>

        <div
          style={{ fontSize: 18, fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: 10 }}
        >
          {spot.name}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Badge free={spot.free} />
          <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M6 1l1.4 2.8 3.1.5-2.2 2.2.5 3.1L6 8.2 3.2 9.6l.5-3.1L1.5 4.3l3.1-.5L6 1z"
                  fill={i <= stars ? '#F59E0B' : '#E5E3DC'}
                />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#AAA' }}>{spot.rating}</span>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0EDE4' }}>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{spot.desc}</p>
      </div>

      {/* CTA Buttons */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!navConfirm ? (
          <button
            onClick={() => {
              setNavConfirm(true)
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`,
                '_blank',
                'noopener,noreferrer',
              )
            }}
            style={{
              height: 46,
              borderRadius: 12,
              border: 'none',
              background: BLUE,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: `0 3px 10px ${BLUE}40`,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M7.5 1L14 7.5L7.5 14M1 7.5H14"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Route starten
          </button>
        ) : (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: BLUE_LIGHT,
              border: `1.5px solid ${BLUE}30`,
              fontSize: 13,
              color: BLUE,
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            ✓ Öffnet Apple Maps / Google Maps mit Routenplanung
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          {spot.free && !reported && (
            <button
              onClick={() => {
                setReported(true)
                onReport(spot)
              }}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 10,
                border: `1.5px solid ${OCC_COLOR}`,
                background: 'white',
                color: OCC_COLOR,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'oklch(0.97 0.04 35)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
            >
              Belegt melden
            </button>
          )}

          {reported && (
            <div
              style={{
                flex: 1,
                height: 40,
                borderRadius: 10,
                background: 'oklch(0.94 0.07 35)',
                color: OCC_COLOR,
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}
            >
              <span>✓</span> Gemeldet (1 Std)
            </div>
          )}

          {!spot.free && (
            <button
              onClick={onFindNext}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 10,
                border: 'none',
                background: FREE_COLOR,
                color: 'white',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${FREE_COLOR}40`,
              }}
            >
              Nächsten freien →
            </button>
          )}

          {spot.free && (
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1.5px solid #EEEBE4',
                background: 'white',
                cursor: 'pointer',
                fontSize: 16,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🔖
            </button>
          )}
        </div>
      </div>

      {/* Occupancy info */}
      <div style={{ marginTop: 'auto', padding: '0 20px 20px' }}>
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            background: '#FAF9F6',
            border: '1px solid #EEEBE4',
            fontSize: 12,
            color: '#888',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: '#555' }}>Belegungsstatus</strong> wird von der Community gemeldet
          und läuft nach 1 Stunde automatisch ab.
        </div>
      </div>
    </div>
  )
}
