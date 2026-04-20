import { useState } from 'react'
import { BLUE, BLUE_LIGHT, SPORT_META } from '../../tokens'

export default function SubmitModal({ onClose }) {
  const [sportType, setSportType] = useState('table-tennis')
  const [desc, setDesc] = useState('')
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          gap: 16,
          textAlign: 'center',
          flex: 1,
        }}
      >
        <div style={{ fontSize: 48 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>Spot eingereicht!</div>
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, maxWidth: 280 }}>
          Vielen Dank! Dein Beitrag wird geprüft und erscheint bald auf der Karte.
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '12px 28px',
            borderRadius: 12,
            border: 'none',
            background: BLUE,
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Zurück zur Karte
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        flex: 1,
        overflowY: 'auto',
      }}
    >
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 4 }}>
          Neuen Spot einreichen
        </div>
        <p style={{ fontSize: 13, color: '#888' }}>
          Hilf der Community – trage einen öffentlichen Sportplatz ein.
        </p>
      </div>

      {/* Map pin placeholder */}
      <div
        style={{
          height: 180,
          borderRadius: 14,
          overflow: 'hidden',
          background: '#EAE7DE',
          border: '2px dashed #CCC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 8,
          cursor: 'crosshair',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 28 }}>📍</div>
        <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>
          Klicke auf die Karte, um einen Pin zu setzen
        </div>
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 10,
            color: '#AAA',
            background: 'white',
            padding: '3px 8px',
            borderRadius: 6,
          }}
        >
          Schritt 1
        </div>
      </div>

      {/* Sport type */}
      <div>
        <label
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            display: 'block',
            marginBottom: 10,
          }}
        >
          Sportart
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['table-tennis', 'basketball', 'boule'].map((val) => (
            <button
              key={val}
              onClick={() => setSportType(val)}
              style={{
                flex: 1,
                padding: '12px 8px',
                borderRadius: 12,
                border: `2px solid ${sportType === val ? BLUE : '#E8E5DC'}`,
                background: sportType === val ? BLUE_LIGHT : 'white',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 5 }}>{SPORT_META[val].icon}</div>
              <div
                style={{ fontSize: 11, fontWeight: 600, color: sportType === val ? BLUE : '#666' }}
              >
                {SPORT_META[val].label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            display: 'block',
            marginBottom: 10,
          }}
        >
          Beschreibung
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="z.B. 2 Tische, überdacht, guter Zustand, Schläger vorhanden…"
          style={{
            width: '100%',
            height: 90,
            padding: '12px 14px',
            borderRadius: 10,
            border: '1.5px solid #E8E5DC',
            background: 'white',
            fontSize: 13,
            color: '#333',
            resize: 'none',
            outline: 'none',
            lineHeight: 1.5,
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = '#E8E5DC')}
        />
      </div>

      <button
        onClick={() => setDone(true)}
        style={{
          height: 48,
          borderRadius: 12,
          border: 'none',
          background: BLUE,
          color: 'white',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: `0 3px 10px ${BLUE}40`,
        }}
      >
        Spot einreichen
      </button>
    </div>
  )
}
