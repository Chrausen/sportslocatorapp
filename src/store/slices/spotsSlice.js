import { createSlice } from '@reduxjs/toolkit'
import { seedSpots } from '../../data/seedSpots'

const initialState = () => {
  const storedUserSpots = localStorage.getItem('sl_spots')
  const userSpots = storedUserSpots ? JSON.parse(storedUserSpots) : []
  return {
    items: [...seedSpots, ...userSpots]
  }
}

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {
    addSpot: (state, action) => {
      state.items.push(action.payload)
    },
    deleteSpot: (state, action) => {
      state.items = state.items.filter(spot => spot.id !== action.payload)
    }
  }
})

export const { addSpot, deleteSpot } = spotsSlice.actions
export default spotsSlice.reducer
