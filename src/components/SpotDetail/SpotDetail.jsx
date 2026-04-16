import { useSelector, useDispatch } from 'react-redux'
import { selectSpotById, selectOccupancy } from '../../store/spotsSlice'
import { selectSelectedSpotId, deselectSpot } from '../../store/uiSlice'
import { selectUserCoords } from '../../store/locationSlice'
import { isBlocked, blockedUntilLabel } from '../../utils/occupancy'
import { haversineDistance, formatDistance } from '../../utils/distance'
import SpotDetailActions from './SpotDetailActions'
import './SpotDetail.css'

const SPORT_LABELS = {
  'table-tennis': 'Table Tennis',
  basketball: 'Basketball',
  boule: 'Boule',
}

const SPORT_ICONS = {
  'table-tennis': '🏓',
  basketball: '🏀',
  boule: '⚫',
}

export default function SpotDetail() {
  const dispatch = useDispatch()
  const selectedSpotId = useSelector(selectSelectedSpotId)
  const spot = useSelector(selectSpotById(selectedSpotId))
  const occupancy = useSelector(selectOccupancy)
  const userCoords = useSelector(selectUserCoords)

  const isOpen = !!spot
  const occ = spot ? occupancy[spot.id] : null
  const blocked = isBlocked(occ)
  const availabilityLabel = occ ? blockedUntilLabel(occ.blockedUntil) : 'Available'

  const distance =
    spot && userCoords
      ? formatDistance(haversineDistance(userCoords.lat, userCoords.lng, spot.lat, spot.lng))
      : null

  const handleClose = () => dispatch(deselectSpot())

  return (
    <>
      {/* Invisible backdrop to close on outside tap */}
      <div
        className={`spot-detail-backdrop${isOpen ? ' open' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className={`spot-detail-panel${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={spot ? spot.name : 'Spot details'}
      >
        <div className="spot-detail-handle" />

        {spot && (
          <div className="spot-detail-body">
            <div className="spot-detail-header">
              <h2 className="spot-detail-name">{spot.name}</h2>
              <button className="spot-detail-close" onClick={handleClose} aria-label="Close">
                ×
              </button>
            </div>

            <div className="spot-detail-meta">
              <span className={`sport-badge sport-badge--${spot.sportType}`}>
                {SPORT_ICONS[spot.sportType]} {SPORT_LABELS[spot.sportType]}
              </span>
              <span
                className={`availability-pill availability-pill--${blocked ? 'blocked' : 'available'}`}
              >
                {blocked ? '🔴' : '🟢'} {availabilityLabel}
              </span>
            </div>

            {spot.address && <p className="spot-detail-address">{spot.address}</p>}
            {distance && <p className="spot-detail-distance">{distance} away</p>}
            <p className="spot-detail-description">{spot.description}</p>

            <SpotDetailActions spot={spot} blocked={blocked} />
          </div>
        )}
      </div>
    </>
  )
}
