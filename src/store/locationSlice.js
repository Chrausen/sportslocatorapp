import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchFacilitiesThunk } from './facilitiesSlice'

// Kiel city centre – default when geolocation is unavailable
const KIEL_LAT = 54.3233
const KIEL_LON = 10.1228

export const requestLocationThunk = createAsyncThunk(
  'location/request',
  async (_, { dispatch, rejectWithValue }) => {
    if (!('geolocation' in navigator)) {
      dispatch(fetchFacilitiesThunk({ lat: KIEL_LAT, lon: KIEL_LON }))
      return rejectWithValue('unavailable')
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon, accuracy } = position.coords
          dispatch(fetchFacilitiesThunk({ lat, lon }))
          resolve({ lat, lon, accuracy })
        },
        (error) => {
          // Fall back to Kiel so seed data is centred
          dispatch(fetchFacilitiesThunk({ lat: KIEL_LAT, lon: KIEL_LON }))
          reject(error.code === 1 ? 'denied' : 'unavailable')
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    }).catch((reason) => rejectWithValue(reason))
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    lat: null,
    lon: null,
    accuracy: null,
    // 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable'
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestLocationThunk.pending, (state) => {
        state.status = 'requesting'
        state.error = null
      })
      .addCase(requestLocationThunk.fulfilled, (state, action) => {
        state.status = 'granted'
        state.lat = action.payload.lat
        state.lon = action.payload.lon
        state.accuracy = action.payload.accuracy
      })
      .addCase(requestLocationThunk.rejected, (state, action) => {
        state.status = action.payload === 'denied' ? 'denied' : 'unavailable'
        state.error = action.payload
      })
  },
})

export default locationSlice.reducer
