import { FREE_COLOR, OCC_COLOR, BLUE, SPORT_META } from '../../tokens'

export default function MapSVG({ spots, selectedId, filter, onPinClick }) {
  const bg = '#EAE7DE'
  const road = '#FFFFFF'
  const roadSec = '#F0EDE4'
  const block = '#D9D5C9'
  const park = '#C8DAB8'
  const water = '#B8CDE0'
  const roadTxt = 'rgba(80,70,50,0.35)'

  const visible = filter === 'all' ? spots : spots.filter((s) => s.type === filter)

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 640"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', userSelect: 'none' }}
    >
      {/* Background */}
      <rect width="1000" height="640" fill={bg} />

      {/* Water */}
      <path
        d="M0,510 Q120,490 240,520 Q380,555 500,520 Q640,482 760,518 Q880,548 1000,510 L1000,640 L0,640 Z"
        fill={water}
        opacity="0.85"
      />
      <path
        d="M820,0 Q840,80 830,160 Q820,240 840,310 Q860,370 850,420"
        stroke={water}
        strokeWidth="28"
        fill="none"
        opacity="0.9"
      />

      {/* Parks */}
      <rect x="30" y="60" width="200" height="220" rx="10" fill={park} />
      <rect x="460" y="300" width="150" height="120" rx="8" fill={park} />
      <rect x="30" y="430" width="120" height="100" rx="8" fill={park} />
      <rect x="680" y="60" width="130" height="90" rx="8" fill={park} />

      {/* Park texture dots */}
      {[
        [70, 100], [110, 130], [155, 100], [80, 160], [135, 185], [165, 145],
        [80, 210], [120, 245], [170, 220],
        [510, 330], [545, 355], [580, 320], [530, 375],
        [70, 460], [100, 490], [130, 455],
        [710, 85], [750, 100], [730, 120],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill="rgba(90,130,75,0.22)" />
      ))}

      {/* City blocks */}
      <rect x="250" y="60" width="170" height="100" rx="5" fill={block} />
      <rect x="440" y="60" width="220" height="100" rx="5" fill={block} />
      <rect x="830" y="60" width="160" height="90" rx="5" fill={block} />
      <rect x="30" y="310" width="80" height="100" rx="5" fill={block} />
      <rect x="130" y="310" width="230" height="100" rx="5" fill={block} />
      <rect x="380" y="310" width="60" height="100" rx="5" fill={block} />
      <rect x="640" y="310" width="160" height="100" rx="5" fill={block} />
      <rect x="820" y="310" width="170" height="100" rx="5" fill={block} />
      <rect x="30" y="420" width="80" height="80" rx="5" fill={block} />
      <rect x="170" y="420" width="200" height="80" rx="5" fill={block} />
      <rect x="390" y="420" width="100" height="80" rx="5" fill={block} />
      <rect x="510" y="420" width="120" height="80" rx="5" fill={block} />
      <rect x="660" y="420" width="140" height="80" rx="5" fill={block} />
      <rect x="820" y="420" width="170" height="80" rx="5" fill={block} />

      {/* Secondary roads */}
      <rect x="0" y="190" width="1000" height="8" fill={roadSec} />
      <rect x="0" y="490" width="1000" height="7" fill={roadSec} />
      <rect x="200" y="0" width="8" height="640" fill={roadSec} />
      <rect x="880" y="0" width="8" height="640" fill={roadSec} />

      {/* Main roads — horizontal */}
      <rect x="0" y="170" width="1000" height="16" fill={road} />
      <rect x="0" y="290" width="1000" height="16" fill={road} />
      <rect x="0" y="408" width="1000" height="14" fill={road} />
      <rect x="0" y="503" width="1000" height="12" fill={road} />

      {/* Main roads — vertical */}
      <rect x="110" y="0" width="16" height="640" fill={road} />
      <rect x="356" y="0" width="14" height="640" fill={road} />
      <rect x="625" y="0" width="16" height="640" fill={road} />
      <rect x="800" y="0" width="12" height="640" fill={road} />

      {/* Road labels */}
      {[
        [420, 165, 'Hauptstraße'],
        [420, 285, 'Parkstraße'],
        [420, 404, 'Marktgasse'],
      ].map(([x, y, t], i) => (
        <text
          key={i}
          x={x}
          y={y}
          fontSize="9"
          fill={roadTxt}
          fontFamily="DM Sans,sans-serif"
          fontWeight="600"
          textAnchor="middle"
        >
          {t}
        </text>
      ))}
      {[
        [107, 400, 'Allee', true],
        [352, 400, 'Bergweg', true],
        [621, 400, 'Seestraße', true],
      ].map(([x, y, t, rot], i) => (
        <text
          key={i}
          x={x}
          y={y}
          fontSize="9"
          fill={roadTxt}
          fontFamily="DM Sans,sans-serif"
          fontWeight="600"
          textAnchor="middle"
          transform={rot ? `rotate(-90,${x},${y})` : undefined}
        >
          {t}
        </text>
      ))}

      {/* Park labels */}
      <text
        x="130"
        y="175"
        fontSize="11"
        fill="rgba(60,100,40,0.45)"
        fontFamily="DM Sans,sans-serif"
        fontWeight="600"
        textAnchor="middle"
      >
        Stadtpark
      </text>
      <text
        x="540"
        y="365"
        fontSize="10"
        fill="rgba(60,100,40,0.45)"
        fontFamily="DM Sans,sans-serif"
        fontWeight="600"
        textAnchor="middle"
      >
        Westpark
      </text>

      {/* User location */}
      <circle cx="470" cy="370" r="22" fill={BLUE} opacity="0.12" />
      <circle cx="470" cy="370" r="12" fill={BLUE} opacity="0.25" />
      <circle cx="470" cy="370" r="7" fill={BLUE} />
      <circle cx="470" cy="370" r="3" fill="white" />

      {/* Pins */}
      {visible.map((spot) => {
        const isSel = spot.id === selectedId
        const col = spot.free ? FREE_COLOR : OCC_COLOR
        return (
          <g
            key={spot.id}
            onClick={() => onPinClick(spot)}
            style={{ cursor: 'pointer' }}
            transform={`translate(${spot.x}, ${spot.y})`}
          >
            {isSel && <circle cx="0" cy="-14" r="22" fill={col} opacity="0.18" />}
            <ellipse cx="0" cy="12" rx="9" ry="4" fill="rgba(0,0,0,0.22)" />
            <path
              d="M0,-28 C-13,-28 -13,-12 -13,0 C-13,12 0,28 0,28 C0,28 13,12 13,0 C13,-12 13,-28 0,-28 Z"
              fill={col}
              style={isSel ? { filter: `drop-shadow(0 2px 6px ${col})` } : {}}
            />
            <circle cx="0" cy="-4" r="9" fill="rgba(255,255,255,0.25)" />
            <text x="0" y="-0" textAnchor="middle" dominantBaseline="middle" fontSize="11">
              {SPORT_META[spot.type].icon}
            </text>
            {isSel && (
              <path
                d="M0,-28 C-13,-28 -13,-12 -13,0 C-13,12 0,28 0,28 C0,28 13,12 13,0 C13,-12 13,-28 0,-28 Z"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                opacity="0.6"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
