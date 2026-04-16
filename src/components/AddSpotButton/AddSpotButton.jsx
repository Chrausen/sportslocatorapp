import { useDispatch } from 'react-redux'
import { setIsAddingSpot } from '../../store/slices/uiSlice'
import styles from './AddSpotButton.module.css'

export default function AddSpotButton() {
  const dispatch = useDispatch()

  return (
    <button
      className={styles.fab}
      onClick={() => dispatch(setIsAddingSpot(true))}
      aria-label="Add a new sport spot"
    >
      + Add Spot
    </button>
  )
}
