import { useSelector, useDispatch } from 'react-redux'
import { setPendingPin, setIsAddingSpot } from '../../store/slices/uiSlice'
import { AddSpotForm } from '../AddSpotForm/AddSpotForm'
import styles from './PinDropOverlay.module.css'

export function PinDropOverlay({ onMapClick }) {
  const dispatch = useDispatch()
  const isAddingSpot = useSelector(state => state.ui.isAddingSpot)
  const pendingPin = useSelector(state => state.ui.pendingPin)

  if (!isAddingSpot) return null

  const handleCancel = () => {
    dispatch(setIsAddingSpot(false))
    dispatch(setPendingPin(null))
  }

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.crosshair} />
        <div className={styles.instructions}>
          <p>Tap on the map to place a pin for your new spot</p>
        </div>
        <button
          className={styles.cancelButton}
          onClick={handleCancel}
          aria-label="Cancel adding spot"
        >
          ✕ Cancel
        </button>
      </div>

      {pendingPin && <AddSpotForm pin={pendingPin} />}
    </>
  )
}
