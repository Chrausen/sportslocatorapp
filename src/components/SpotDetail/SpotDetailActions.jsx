import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reportOccupancy, selectAllSpots, selectOccupancy } from '../../store/spotsSlice'
import { selectSpot, deselectSpot, setMapCenter } from '../../store/uiSlice'
import { selectUserCoords } from '../../store/locationSlice'
import { buildNavigationUrl } from '../../utils/navigation'
import { DEFAULT_BLOCK_DURATION_MS } from '../../utils/occupancy'
import { findNearestFreeSpot } from '../../utils/distance'
import './SpotDetailActions.css'

export default function SpotDetailActions({ spot, blocked }) {
  const dispatch = useDispatch()
  const userCoords = useSelector(selectUserCoords)
  const allSpots = useSelector(selectAllSpots)
  const occupancy = useSelector(selectOccupancy)

  const handleNavigate = useCallback(() => {
    const url = buildNavigationUrl(spot.lat, spot.lng, spot.name)
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [spot])

  const handleMarkBlocked = useCallback(() => {
    dispatch(reportOccupancy({ spotId: spot.id, durationMs: DEFAULT_BLOCK_DURATION_MS }))
  }, [dispatch, spot.id])

  const handleFindNext = useCallback(() => {
    const coords = userCoords || { lat: spot.lat, lng: spot.lng }
    const next = findNearestFreeSpot(coords.lat, coords.lng, allSpots, occupancy, spot.id)
    if (next) {
      dispatch(setMapCenter({ lat: next.lat, lng: next.lng }))
      dispatch(selectSpot(next.id))
    } else {
      dispatch(deselectSpot())
    }
  }, [dispatch, userCoords, allSpots, occupancy, spot])

  return (
    <div className="spot-actions">
      <button className="spot-action-btn spot-action-btn--primary" onClick={handleNavigate}>
        Navigate
      </button>

      {blocked ? (
        <button className="spot-action-btn spot-action-btn--secondary" onClick={handleFindNext}>
          Find next free spot
        </button>
      ) : (
        <button className="spot-action-btn spot-action-btn--ghost" onClick={handleMarkBlocked}>
          Mark as blocked
        </button>
      )}
    </div>
  )
}
