import { createSlice } from '@reduxjs/toolkit'

const KIEL_CENTER = { lat: 54.3233, lng: 10.1228 }

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    status: 'idle', // 'idle' | 'requesting' | 'granted' | 'denied' | 'error'
    coords: null, // { lat, lng } | null
    error: null,
  },
  reducers: {
    setRequesting(state) {
      state.status = 'requesting'
      state.error = null
    },
    setGranted(state, action) {
      state.status = 'granted'
      state.coords = action.payload // { lat, lng }
      state.error = null
    },
    setDenied(state) {
      state.status = 'denied'
      state.error = null
    },
    setError(state, action) {
      state.status = 'error'
      state.error = action.payload
    },
    updateCoords(state, action) {
      state.coords = action.payload
    },
    applyKielFallback(state) {
      state.status = 'granted'
      state.coords = KIEL_CENTER
      state.error = null
    },
  },
})

export const { setRequesting, setGranted, setDenied, setError, updateCoords, applyKielFallback } =
  locationSlice.actions

export const selectLocationStatus = (state) => state.location.status
export const selectUserCoords = (state) => state.location.coords

export default locationSlice.reducer
