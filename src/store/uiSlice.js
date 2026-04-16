import { createSlice } from '@reduxjs/toolkit'

const KIEL_CENTER = { lat: 54.3233, lng: 10.1228 }

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedSpotId: null,
    activeFilter: 'all', // 'all' | 'table-tennis' | 'basketball' | 'boule'
    addSpotMode: false,
    pendingPin: null, // { lat, lng } | null
    mapCenter: KIEL_CENTER,
    mapZoom: 13,
  },
  reducers: {
    selectSpot(state, action) {
      state.selectedSpotId = action.payload
    },
    deselectSpot(state) {
      state.selectedSpotId = null
    },
    setFilter(state, action) {
      state.activeFilter = action.payload
      state.selectedSpotId = null
    },
    enterAddSpotMode(state) {
      state.addSpotMode = true
      state.selectedSpotId = null
    },
    exitAddSpotMode(state) {
      state.addSpotMode = false
      state.pendingPin = null
    },
    setPendingPin(state, action) {
      state.pendingPin = action.payload // { lat, lng }
    },
    clearPendingPin(state) {
      state.pendingPin = null
    },
    setMapCenter(state, action) {
      state.mapCenter = action.payload // { lat, lng }
    },
    setMapZoom(state, action) {
      state.mapZoom = action.payload
    },
  },
})

export const {
  selectSpot,
  deselectSpot,
  setFilter,
  enterAddSpotMode,
  exitAddSpotMode,
  setPendingPin,
  clearPendingPin,
  setMapCenter,
  setMapZoom,
} = uiSlice.actions

export const selectSelectedSpotId = (state) => state.ui.selectedSpotId
export const selectActiveFilter = (state) => state.ui.activeFilter
export const selectAddSpotMode = (state) => state.ui.addSpotMode
export const selectPendingPin = (state) => state.ui.pendingPin
export const selectMapCenter = (state) => state.ui.mapCenter
export const selectMapZoom = (state) => state.ui.mapZoom

export default uiSlice.reducer
