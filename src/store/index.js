import { configureStore } from '@reduxjs/toolkit'
import spotsReducer from './slices/spotsSlice'
import occupancyReducer from './slices/occupancySlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    spots: spotsReducer,
    occupancy: occupancyReducer,
    ui: uiReducer,
  },
})

// Persist user-added spots and occupancy to localStorage after every change
store.subscribe(() => {
  const state = store.getState()

  const userSpots = state.spots.items.filter((s) => s.isUserAdded)
  localStorage.setItem('sl_spots', JSON.stringify(userSpots))

  localStorage.setItem('sl_occupancy', JSON.stringify(state.occupancy))
})
