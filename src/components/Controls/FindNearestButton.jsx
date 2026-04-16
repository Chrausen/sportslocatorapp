import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSpots, selectOccupancy } from '../../store/spotsSlice'
import { selectUserCoords } from '../../store/locationSlice'
import { selectSpot, setMapCenter, selectActiveFilter } from '../../store/uiSlice'
import { findNearestFreeSpot } from '../../utils/distance'

export default function FindNearestButton() {
  const dispatch = useDispatch()
  const allSpots = useSelector(selectAllSpots)
  const occupancy = useSelector(selectOccupancy)
  const userCoords = useSelector(selectUserCoords)
  const activeFilter = useSelector(selectActiveFilter)

  const filteredSpots =
    activeFilter === 'all' ? allSpots : allSpots.filter((s) => s.sportType === activeFilter)

  const coords = userCoords || { lat: 54.3233, lng: 10.1228 } // Kiel fallback

  const nearest = findNearestFreeSpot(coords.lat, coords.lng, filteredSpots, occupancy)

  const handleClick = useCallback(() => {
    if (!nearest) return
    dispatch(setMapCenter({ lat: nearest.lat, lng: nearest.lng }))
    dispatch(selectSpot(nearest.id))
  }, [dispatch, nearest])

  return (
    <button
      className="find-nearest-btn"
      onClick={handleClick}
      disabled={!nearest}
      title={nearest ? `Jump to ${nearest.name}` : 'No free spots available'}
    >
      {nearest ? '⚡ Find nearest free' : 'No free spots'}
    </button>
  )
}
