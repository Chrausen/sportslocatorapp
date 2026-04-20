import { createSlice } from '@reduxjs/toolkit'

// Default user position (Munich city center — overridden by geolocation)
export const DEFAULT_USER_LOCATION = { lat: 48.1351, lng: 11.582 }

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const SPOTS_INIT = [
  {
    id: 1,
    type: 'table-tennis',
    name: 'Stadtpark Tischtennistische',
    lat: 48.1372,
    lng: 11.5764,
    free: true,
    desc: 'Zwei Außentische direkt am Teich, teilweise durch ein Dach geschützt. Schläger nicht vorhanden.',
    rating: 4.3,
  },
  {
    id: 2,
    type: 'table-tennis',
    name: 'Spielplatz Nordmitte',
    lat: 48.1412,
    lng: 11.5893,
    free: false,
    desc: 'Ein Tisch auf dem Spielplatz, etwas abgenutzte Platte. Aktuell belegt.',
    rating: 3.6,
  },
  {
    id: 3,
    type: 'table-tennis',
    name: 'Freizeitanlage Süd',
    lat: 48.1231,
    lng: 11.5805,
    free: true,
    desc: 'Drei Tische, gepflegt und in gutem Zustand. Toiletten in der Nähe.',
    rating: 4.7,
  },
  {
    id: 4,
    type: 'basketball',
    name: 'Basketballfeld Nordpark',
    lat: 48.1432,
    lng: 11.5698,
    free: true,
    desc: 'Full Court, beleuchtet bis 22 Uhr. Neuer Asphalt, gute Körbe.',
    rating: 4.5,
  },
  {
    id: 5,
    type: 'basketball',
    name: 'Schulhof Sportplatz',
    lat: 48.1378,
    lng: 11.5965,
    free: false,
    desc: 'Half Court, wochentags oft durch Schule belegt. Wochenends frei.',
    rating: 3.4,
  },
  {
    id: 6,
    type: 'boule',
    name: 'Boulebahn Westpark',
    lat: 48.1364,
    lng: 11.5715,
    free: true,
    desc: '3 gepflegte Sandbahnen mit Bänken. Sehr beliebt am Abend.',
    rating: 4.8,
  },
  {
    id: 7,
    type: 'boule',
    name: 'Marktplatz Boule',
    lat: 48.1358,
    lng: 11.5875,
    free: true,
    desc: '2 Bahnen am historischen Marktplatz. Schöne Atmosphäre.',
    rating: 4.2,
  },
]

const spotsSlice = createSlice({
  name: 'spots',
  initialState: {
    spots: SPOTS_INIT,
    selectedSpotId: null,
    filter: 'all',
    loading: false,
    userLocation: DEFAULT_USER_LOCATION,
  },
  reducers: {
    setSelected(state, action) {
      state.selectedSpotId = action.payload
    },
    setFilter(state, action) {
      state.filter = action.payload
      if (action.payload !== 'all' && state.selectedSpotId !== null) {
        const spot = state.spots.find((s) => s.id === state.selectedSpotId)
        if (spot && spot.type !== action.payload) {
          state.selectedSpotId = null
        }
      }
    },
    reportOccupied(state, action) {
      const spot = state.spots.find((s) => s.id === action.payload)
      if (spot) spot.free = false
    },
    clearOccupied(state, action) {
      const spot = state.spots.find((s) => s.id === action.payload)
      if (spot) spot.free = true
    },
    submitSpot(state, action) {
      state.spots.push(action.payload)
    },
    setUserLocation(state, action) {
      state.userLocation = action.payload
    },
  },
})

export const { setSelected, setFilter, reportOccupied, clearOccupied, submitSpot, setUserLocation } =
  spotsSlice.actions

// Selector: enrich spots with live distance from user, sorted nearest-first
export const selectSpotsWithDistance = (state) => {
  const { spots, userLocation } = state.spots
  return spots
    .map((s) => ({
      ...s,
      distanceKm: haversineKm(userLocation.lat, userLocation.lng, s.lat, s.lng),
      distance:
        haversineKm(userLocation.lat, userLocation.lng, s.lat, s.lng) < 1
          ? `${Math.round(haversineKm(userLocation.lat, userLocation.lng, s.lat, s.lng) * 1000)} m`
          : `${haversineKm(userLocation.lat, userLocation.lng, s.lat, s.lng).toFixed(1)} km`,
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
}

export default spotsSlice.reducer
