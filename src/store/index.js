import { configureStore } from '@reduxjs/toolkit'
import spotsReducer from './spotsSlice'

export const store = configureStore({
  reducer: {
    spots: spotsReducer,
  },
})
