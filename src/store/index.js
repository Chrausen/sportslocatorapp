import { configureStore } from '@reduxjs/toolkit'
import spotsReducer from './spotsSlice'
import locationReducer from './locationSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    spots: spotsReducer,
    location: locationReducer,
    ui: uiReducer,
  },
})
