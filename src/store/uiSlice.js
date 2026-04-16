import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedFacilityId: null,
    mapCenter: { lat: 54.3233, lon: 10.1228 }, // Kiel city centre
    mapZoom: 13,
  },
  reducers: {
    selectFacility(state, action) {
      state.selectedFacilityId = action.payload
    },
    clearSelection(state) {
      state.selectedFacilityId = null
    },
    setMapCenter(state, action) {
      state.mapCenter = action.payload
    },
    setMapZoom(state, action) {
      state.mapZoom = action.payload
    },
    flyToFacility(state, action) {
      const { lat, lon, id } = action.payload
      state.mapCenter = { lat, lon }
      state.mapZoom = 17
      state.selectedFacilityId = id
    },
  },
})

export const { selectFacility, clearSelection, setMapCenter, setMapZoom, flyToFacility } =
  uiSlice.actions
export default uiSlice.reducer
