import { useState, useEffect } from 'react'
import { BLUE, FREE_COLOR } from '../../tokens'
import Badge from '../UI/Badge'
import SportChip from '../UI/SportChip'
import SpotCard from './SpotCard'
import DetailPanel from './DetailPanel'

export default function Sidebar({
  spots,
  selectedSpot,
  filter,
  onFilterChange,
  onSpotClick,
  onReport,
  onFindNext,
  onSubmitOpen,
  width,
}) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 200)
    return () => clearTimeout(timer)
  }, [search])

  const filteredSpots = spots
    .filter((s) => filter === 'all' || s.type === filter)
    .filter((s) => s.name.toLowerCase().includes(debouncedSearch.toLowerCase()))

  const freeCount = spots.filter((s) => s.free && (filter === 'all' || s.type === filter)).length

  return (
    <div
      style={{
        width,
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'oklch(0.98 0.006 60)',
        borderRight: '1px solid #E8E5DC',
        boxShadow: '2px 0 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo / Header */}
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #F0EDE4' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{ fontSize: 18, fontWeight: 700, color: '#111', letterSpacing: -0.3 }}
            >
              Sports<span style={{ color: BLUE }}>Locator</span>
            </div>
            <div style={{ fontSize: 11, color: '#AAA', marginTop: 1 }}>
              Öffentliche Sportplätze in der Nähe
            </div>
          </div>
          <button
            onClick={onSubmitOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '7px 12px',
              borderRadius: 10,
              border: 'none',
              background: BLUE,
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: `0 2px 6px ${BLUE}40`,
            }}
          >
            <span style={{ fontSize: 14 }}>＋</span>
            Einreichen
          </button>
        </div>
      </div>

      {selectedSpot ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <DetailPanel
            spot={selectedSpot}
            onClose={() => onSpotClick(null)}
            onReport={onReport}
            onFindNext={onFindNext}
          />
        </div>
      ) : (
        <>
          {/* Search */}
          <div style={{ padding: '12px 16px 10px' }}>
            <div
              style={{
                height: 38,
                borderRadius: 10,
                background: 'white',
                border: '1.5px solid #E8E5DC',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                gap: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="6" cy="6" r="4.5" stroke="#BBB" strokeWidth="1.5" />
                <path d="M10 10l2.5 2.5" stroke="#BBB" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Spot suchen…"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 13,
                  color: '#333',
                  background: 'transparent',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#BBB',
                    fontSize: 14,
                    padding: 0,
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter chips */}
          <div style={{ padding: '0 16px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['all', 'table-tennis', 'basketball', 'boule'].map((t) => (
              <SportChip key={t} type={t} active={filter === t} onClick={() => onFilterChange(t)} />
            ))}
          </div>

          {/* Stats row */}
          <div
            style={{
              margin: '0 16px 12px',
              padding: '10px 14px',
              borderRadius: 10,
              background: 'white',
              border: '1px solid #EEEBE4',
              display: 'flex',
              gap: 20,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: FREE_COLOR }}>{freeCount}</div>
              <div
                style={{
                  fontSize: 10,
                  color: '#AAA',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Frei
              </div>
            </div>
            <div style={{ width: 1, background: '#EEEBE4' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>
                {filteredSpots.length}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: '#AAA',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Spots
              </div>
            </div>
            <div style={{ width: 1, background: '#EEEBE4' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>3</div>
              <div
                style={{
                  fontSize: 10,
                  color: '#AAA',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Sportarten
              </div>
            </div>
          </div>

          {/* Spot list */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 16px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {filteredSpots.filter((s) => s.free).length > 0 && (
              <>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: FREE_COLOR,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    padding: '4px 2px',
                  }}
                >
                  ● Jetzt frei
                </div>
                {filteredSpots
                  .filter((s) => s.free)
                  .map((s) => (
                    <SpotCard
                      key={s.id}
                      spot={s}
                      selected={selectedSpot?.id === s.id}
                      onClick={() => onSpotClick(s)}
                    />
                  ))}
              </>
            )}

            {filteredSpots.filter((s) => !s.free).length > 0 && (
              <>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#AAA',
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    padding: '8px 2px 4px',
                  }}
                >
                  ○ Belegt
                </div>
                {filteredSpots
                  .filter((s) => !s.free)
                  .map((s) => (
                    <SpotCard
                      key={s.id}
                      spot={s}
                      selected={selectedSpot?.id === s.id}
                      onClick={() => onSpotClick(s)}
                    />
                  ))}
              </>
            )}

            {filteredSpots.length === 0 && (
              <div style={{ padding: '32px 0', textAlign: 'center', color: '#BBB', fontSize: 13 }}>
                Keine Spots gefunden
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
