import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedSpotId: null,
    filter: 'all',
    userLocation: null,
    isAddingSpot: false,
    pendingPin: null,
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
  },
})

export const {
  selectSpot,
  clearSelection,
  setFilter,
  setUserLocation,
  setIsAddingSpot,
  setPendingPin,
} = uiSlice.actions
export default uiSlice.reducer
