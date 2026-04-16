import { useDispatch } from 'react-redux'
import { selectSpot, showToast } from '../../store/slices/uiSlice'
import { useNearestFreeSpot } from '../../hooks/useNearestFreeSpot'
import styles from './FindNearestFreeButton.module.css'

export default function FindNearestFreeButton() {
  const dispatch = useDispatch()
  const nearest = useNearestFreeSpot()

  function handleClick() {
    if (nearest) {
      dispatch(selectSpot(nearest.id))
    } else {
      dispatch(showToast('All spots are currently blocked'))
    }
  }

  return (
    <button
      className={styles.fab}
      onClick={handleClick}
      aria-label="Find nearest free spot"
    >
      Nearest Free
    </button>
  )
}
