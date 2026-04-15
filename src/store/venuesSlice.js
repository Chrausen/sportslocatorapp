import { createSlice } from '@reduxjs/toolkit'
import { venues as initialVenues } from '../data/venues'

const venuesSlice = createSlice({
  name: 'venues',
  initialState: {
    items: initialVenues,
    selectedId: null,
    filter: 'all', // 'all' | 'tabletennis' | 'basketball' | 'boule'
  },
  reducers: {
    selectVenue(state, action) {
      state.selectedId = action.payload
    },
    deselectVenue(state) {
      state.selectedId = null
    },
    setFilter(state, action) {
      state.filter = action.payload
      state.selectedId = null
    },
    toggleOccupied(state, action) {
      const venue = state.items.find((v) => v.id === action.payload)
      if (venue) venue.occupied = !venue.occupied
    },
  },
})

export const { selectVenue, deselectVenue, setFilter, toggleOccupied } = venuesSlice.actions
export default venuesSlice.reducer
