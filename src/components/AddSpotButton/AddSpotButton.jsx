import { useDispatch } from 'react-redux'
import { setIsAddingSpot } from '../../store/slices/uiSlice'
import styles from './AddSpotButton.module.css'

export function AddSpotButton() {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setIsAddingSpot(true))
  }

  return (
    <button
      className={styles.fab}
      onClick={handleClick}
      title="Add a new spot"
      aria-label="Add a new sports spot"
    >
      ➕
    </button>
  )
}
