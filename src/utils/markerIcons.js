import L from 'leaflet'

// Using divIcon avoids the broken default-image-path issue in Vite builds.
const SPORT_COLORS = {
  basketball: '#FF8C00', // orange
  table_tennis: '#2E8B57', // green
  boules: '#4169E1', // blue
}

const SPORT_EMOJIS = {
  basketball: '🏀',
  table_tennis: '🏓',
  boules: '🎯',
}

function makeIcon(color, emoji) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1;
      ">${emoji}</div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  })
}

const iconCache = {}

/** Returns a Leaflet divIcon for the given sport type. */
export function getIcon(sport) {
  if (!iconCache[sport]) {
    const color = SPORT_COLORS[sport] ?? '#888'
    const emoji = SPORT_EMOJIS[sport] ?? '📍'
    iconCache[sport] = makeIcon(color, emoji)
  }
  return iconCache[sport]
}

/** Pulsing blue dot for the user's own position. */
export const userLocationIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 16px;
      height: 16px;
      background: #2979FF;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(41,121,255,0.3);
    "></div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})
