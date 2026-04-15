import { useDispatch } from 'react-redux'
import { useNearestFreeSpot } from '../../hooks/useNearestFreeSpot'
import { selectSpot } from '../../store/slices/uiSlice'
import { showToast } from '../../store/slices/uiSlice'
import styles from './FindNearestFreeButton.module.css'

export function FindNearestFreeButton() {
  const dispatch = useDispatch()
  const nearest = useNearestFreeSpot()

  const handleClick = () => {
    if (nearest) {
      dispatch(selectSpot(nearest.id))
    } else {
      dispatch(showToast({ message: 'All spots are currently blocked' }))
    }
  }

  return (
    <button
      className={styles.fab}
      onClick={handleClick}
      title="Find nearest free spot"
      aria-label="Find nearest free spot"
    >
      📍
    </button>
  )
}
