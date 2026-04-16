import { configureStore } from '@reduxjs/toolkit'
import facilitiesReducer from './facilitiesSlice'
import locationReducer from './locationSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    facilities: facilitiesReducer,
    location: locationReducer,
    ui: uiReducer,
  },
})
