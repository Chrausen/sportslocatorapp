import { useDispatch } from 'react-redux'
import { blockSpot, unblockSpot } from '../../store/slices/occupancySlice'
import styles from './OccupancyToggle.module.css'

export default function OccupancyToggle({ spotId, isBlocked }) {
  const dispatch = useDispatch()

  if (isBlocked) {
    return (
      <button
        className={`${styles.btn} ${styles.free}`}
        onClick={() => dispatch(unblockSpot(spotId))}
        aria-label="Mark this spot as free"
      >
        Mark as Free
      </button>
    )
  }

  return (
    <button
      className={`${styles.btn} ${styles.block}`}
      onClick={() => dispatch(blockSpot(spotId))}
      aria-label="Mark this spot as blocked"
    >
      Mark as Blocked
    </button>
  )
}
