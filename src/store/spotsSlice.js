import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import spotsService from '../services/spotsService'

export const loadSpots = createAsyncThunk('spots/load', () => spotsService.fetchSpots())

export const submitNewSpot = createAsyncThunk('spots/submit', (payload) =>
  spotsService.submitSpot(payload)
)

export const reportOccupancy = createAsyncThunk('spots/reportOccupancy', ({ spotId, durationMs }) =>
  spotsService.reportOccupancy(spotId, durationMs)
)

const spotsSlice = createSlice({
  name: 'spots',
  initialState: {
    items: [],
    occupancy: {}, // { [spotId]: { blockedUntil: number | null } }
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    markBlocked(state, action) {
      const { id, durationMs } = action.payload
      state.occupancy[id] = { blockedUntil: Date.now() + durationMs }
    },
    clearExpired(state) {
      const now = Date.now()
      Object.keys(state.occupancy).forEach((id) => {
        const rec = state.occupancy[id]
        if (rec.blockedUntil && rec.blockedUntil <= now) {
          state.occupancy[id] = { blockedUntil: null }
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSpots.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadSpots.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        action.payload.forEach((s) => {
          if (!state.occupancy[s.id]) {
            state.occupancy[s.id] = { blockedUntil: null }
          }
        })
      })
      .addCase(loadSpots.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(submitNewSpot.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.occupancy[action.payload.id] = { blockedUntil: null }
      })
      .addCase(reportOccupancy.fulfilled, (state, action) => {
        const { spotId, blockedUntil } = action.payload
        state.occupancy[spotId] = { blockedUntil }
      })
  },
})

export const { markBlocked, clearExpired } = spotsSlice.actions

// Selectors
export const selectAllSpots = (state) => state.spots.items
export const selectOccupancy = (state) => state.spots.occupancy
export const selectSpotsStatus = (state) => state.spots.status

export const selectFilteredSpots = (filter) => (state) => {
  if (filter === 'all') return state.spots.items
  return state.spots.items.filter((s) => s.sportType === filter)
}

export const selectSpotById = (id) => (state) => state.spots.items.find((s) => s.id === id) || null

export const selectIsBlocked = (id) => (state) => {
  const rec = state.spots.occupancy[id]
  return !!(rec && rec.blockedUntil && rec.blockedUntil > Date.now())
}

export default spotsSlice.reducer
