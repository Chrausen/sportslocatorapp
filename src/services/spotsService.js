/**
 * spotsService – data access layer for spots and occupancy.
 *
 * All methods return Promises so call sites are async-ready.
 * Swap the function bodies to call a REST API without touching any component or slice.
 *
 * Future endpoints:
 *   fetchSpots()     → GET  /api/spots
 *   submitSpot()     → POST /api/spots
 *   reportOccupancy()→ POST /api/spots/:id/occupancy
 *   fetchOccupancy() → GET  /api/spots/occupancy
 */

import demoSpots from '../data/demoSpots'

let idCounter = demoSpots.length + 1

function generateId() {
  return `spot-user-${idCounter++}`
}

const spotsService = {
  fetchSpots: () => Promise.resolve(demoSpots),

  submitSpot: (payload) =>
    Promise.resolve({
      ...payload,
      id: generateId(),
      source: 'user',
    }),

  reportOccupancy: (spotId, durationMs) =>
    Promise.resolve({ spotId, blockedUntil: Date.now() + durationMs }),

  fetchOccupancy: () => Promise.resolve({}),
}

export default spotsService
