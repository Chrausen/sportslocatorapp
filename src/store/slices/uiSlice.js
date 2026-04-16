import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedSpotId: null,
    filter: 'all',
    userLocation: null,
    isAddingSpot: false,
    pendingPin: null,
    toast: null,
    geolocationDenied: false,
  },
  reducers: {
    selectSpot(state, action) {
      state.selectedSpotId = action.payload
    },
    clearSelection(state) {
      state.selectedSpotId = null
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
    setUserLocation(state, action) {
      state.userLocation = action.payload
    },
    setIsAddingSpot(state, action) {
      state.isAddingSpot = action.payload
    },
    setPendingPin(state, action) {
      state.pendingPin = action.payload
    },
    showToast(state, action) {
      state.toast = action.payload
    },
    clearToast(state) {
      state.toast = null
    },
    setGeolocationDenied(state, action) {
      state.geolocationDenied = action.payload
    },
  },
})

export const {
  selectSpot,
  clearSelection,
  setFilter,
  setUserLocation,
  setIsAddingSpot,
  setPendingPin,
  showToast,
  clearToast,
  setGeolocationDenied,
} = uiSlice.actions
export default uiSlice.reducer
