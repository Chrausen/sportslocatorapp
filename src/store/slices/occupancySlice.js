import { createSlice } from '@reduxjs/toolkit'

function loadOccupancy() {
  try {
    const stored = localStorage.getItem('sl_occupancy')
    if (!stored) return {}
    const parsed = JSON.parse(stored)
    const now = Date.now()
    // Filter out expired entries on load
    return Object.fromEntries(
      Object.entries(parsed).filter(([, ts]) => Date.parse(ts) > now)
    )
  } catch {
    return {}
  }
}

const occupancySlice = createSlice({
  name: 'occupancy',
  initialState: loadOccupancy(),
  reducers: {
    blockSpot(state, action) {
      const id = action.payload
      const blockedUntil = new Date(Date.now() + 60 * 60 * 1000).toISOString()
      state[id] = blockedUntil
    },
    unblockSpot(state, action) {
      delete state[action.payload]
    },
    purgeExpired(state) {
      const now = Date.now()
      Object.keys(state).forEach((id) => {
        if (Date.parse(state[id]) <= now) {
          delete state[id]
        }
      })
    },
  },
})

export const { blockSpot, unblockSpot, purgeExpired } = occupancySlice.actions
export default occupancySlice.reducer
