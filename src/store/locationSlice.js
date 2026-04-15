import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    lat: null,
    lng: null,
    error: null,
    loading: false,
  },
  reducers: {
    setLocationLoading(state) {
      state.loading = true
      state.error = null
    },
    setLocation(state, action) {
      state.lat = action.payload.lat
      state.lng = action.payload.lng
      state.loading = false
      state.error = null
    },
    setLocationError(state, action) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setLocationLoading, setLocation, setLocationError } = locationSlice.actions
export default locationSlice.reducer
