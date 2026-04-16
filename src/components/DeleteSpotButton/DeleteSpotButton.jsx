import { useDispatch } from 'react-redux'
import { deleteSpot } from '../../store/slices/spotsSlice'
import { clearSelection } from '../../store/slices/uiSlice'
import styles from './DeleteSpotButton.module.css'

export default function DeleteSpotButton({ spotId }) {
  const dispatch = useDispatch()

  function handleDelete() {
    dispatch(deleteSpot(spotId))
    dispatch(clearSelection())
  }

  return (
    <button
      className={styles.btn}
      onClick={handleDelete}
      aria-label="Delete this spot"
    >
      Delete Spot
    </button>
  )
}
