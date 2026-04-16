import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { kielFacilities } from '../data/kielFacilities'
import { fetchFacilities } from '../services/overpassApi'
import { buildBbox } from '../utils/geo'

export const fetchFacilitiesThunk = createAsyncThunk(
  'facilities/fetch',
  async ({ lat, lon }, { getState, rejectWithValue }) => {
    const bbox = buildBbox(lat, lon, 5)
    const { lastFetchedBbox } = getState().facilities
    if (bbox === lastFetchedBbox) {
      // Nothing new to fetch
      return { facilities: null, bbox }
    }
    try {
      const facilities = await fetchFacilities(bbox)
      return { facilities, bbox }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState: {
    facilities: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    lastFetchedBbox: null,
  },
  reducers: {
    loadSeedData(state) {
      // Merge seed data without overwriting any already-loaded OSM data
      const existingIds = new Set(state.facilities.map((f) => f.id))
      const newSeed = kielFacilities.filter((f) => !existingIds.has(f.id))
      state.facilities = [...state.facilities, ...newSeed]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilitiesThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchFacilitiesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.lastFetchedBbox = action.payload.bbox
        if (action.payload.facilities !== null) {
          // Merge: keep seed data, replace/add OSM results
          const seedFacilities = state.facilities.filter((f) => f.source === 'seed')
          const seen = new Set(action.payload.facilities.map((f) => f.id))
          const keptSeed = seedFacilities.filter((f) => !seen.has(f.id))
          state.facilities = [...action.payload.facilities, ...keptSeed]
        }
      })
      .addCase(fetchFacilitiesThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Failed to load facilities'
        // Keep existing facilities (seed data survives network errors)
      })
  },
})

export const { loadSeedData } = facilitiesSlice.actions
export default facilitiesSlice.reducer
