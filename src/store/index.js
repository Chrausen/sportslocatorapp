import { configureStore } from '@reduxjs/toolkit'
import spotsReducer from './slices/spotsSlice'
import occupancyReducer from './slices/occupancySlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    spots: spotsReducer,
    occupancy: occupancyReducer,
    ui: uiReducer
  }
})

// Persistence middleware via store.subscribe
store.subscribe(() => {
  const state = store.getState()

  // Persist user-added spots to localStorage
  const userSpots = state.spots.items.filter(spot => spot.isUserAdded === true)
  localStorage.setItem('sl_spots', JSON.stringify(userSpots))

  // Persist occupancy to localStorage
  localStorage.setItem('sl_occupancy', JSON.stringify(state.occupancy))
})
