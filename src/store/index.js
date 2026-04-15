import { configureStore } from '@reduxjs/toolkit'
import venuesReducer from './venuesSlice'
import locationReducer from './locationSlice'

export const store = configureStore({
  reducer: {
    venues: venuesReducer,
    location: locationReducer,
  },
})
