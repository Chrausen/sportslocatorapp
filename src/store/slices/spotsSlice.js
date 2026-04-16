import { createSlice } from '@reduxjs/toolkit'
import seedSpots from '../../data/seedSpots'

function loadUserSpots() {
  try {
    const stored = localStorage.getItem('sl_spots')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const spotsSlice = createSlice({
  name: 'spots',
  initialState: {
    items: [...seedSpots, ...loadUserSpots()],
  },
  reducers: {
    addSpot(state, action) {
      state.items.push(action.payload)
    },
    deleteSpot(state, action) {
      state.items = state.items.filter((s) => s.id !== action.payload)
    },
  },
})

export const { addSpot, deleteSpot } = spotsSlice.actions
export default spotsSlice.reducer
