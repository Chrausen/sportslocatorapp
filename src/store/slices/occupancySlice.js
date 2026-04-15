import { createSlice } from '@reduxjs/toolkit'

const filterExpired = (occupancy) => {
  const now = Date.now()
  const filtered = {}
  Object.entries(occupancy).forEach(([id, timestamp]) => {
    if (new Date(timestamp).getTime() > now) {
      filtered[id] = timestamp
    }
  })
  return filtered
}

const initialState = () => {
  const storedOccupancy = localStorage.getItem('sl_occupancy')
  const occupancy = storedOccupancy ? JSON.parse(storedOccupancy) : {}
  return filterExpired(occupancy)
}

const occupancySlice = createSlice({
  name: 'occupancy',
  initialState,
  reducers: {
    blockSpot: (state, action) => {
      const blockedUntil = new Date(Date.now() + 60 * 60 * 1000).toISOString()
      state[action.payload] = blockedUntil
    },
    unblockSpot: (state, action) => {
      delete state[action.payload]
    },
    purgeExpired: (state) => {
      const now = Date.now()
      Object.keys(state).forEach(id => {
        if (new Date(state[id]).getTime() <= now) {
          delete state[id]
        }
      })
    }
  }
})

export const { blockSpot, unblockSpot, purgeExpired } = occupancySlice.actions
export default occupancySlice.reducer
