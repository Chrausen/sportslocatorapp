import { createSlice } from '@reduxjs/toolkit'

// User reference position (Munich city center)
export const USER_LOCATION = [48.1351, 11.582]

const SPOTS_INIT = [
  {
    id: 1,
    type: 'table-tennis',
    name: 'Stadtpark Tischtennistische',
    lat: 48.1372,
    lng: 11.5764,
    free: true,
    distance: '0.3 km',
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
    distance: '0.7 km',
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
    distance: '1.4 km',
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
    distance: '0.9 km',
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
    distance: '1.1 km',
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
    distance: '0.6 km',
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
    distance: '0.8 km',
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
  },
})

export const { setSelected, setFilter, reportOccupied, clearOccupied, submitSpot } =
  spotsSlice.actions
export default spotsSlice.reducer
