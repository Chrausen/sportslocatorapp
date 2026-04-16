import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { addSpot } from '../../store/slices/spotsSlice'
import { setIsAddingSpot, setPendingPin, selectSpot } from '../../store/slices/uiSlice'
import styles from './AddSpotForm.module.css'

const SPORT_OPTIONS = [
  { value: 'table-tennis', label: 'Table Tennis' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'boule', label: 'Boule' },
]

export default function AddSpotForm() {
  const dispatch = useDispatch()
  const pendingPin = useSelector((state) => state.ui.pendingPin)

  const [name, setName] = useState('')
  const [sport, setSport] = useState('table-tennis')
  const [description, setDescription] = useState('')

  if (!pendingPin) return null

  function handleCancel() {
    dispatch(setIsAddingSpot(false))
    dispatch(setPendingPin(null))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    const id = nanoid()
    dispatch(
      addSpot({
        id,
        name: name.trim(),
        sport,
        lat: pendingPin.lat,
        lng: pendingPin.lng,
        description: description.trim(),
        isUserAdded: true,
      })
    )
    dispatch(setIsAddingSpot(false))
    dispatch(setPendingPin(null))
    dispatch(selectSpot(id))
    setName('')
    setSport('table-tennis')
    setDescription('')
  }

  return (
    <div className={styles.panel} role="dialog" aria-label="Add new sport spot">
      <h2 className={styles.title}>New Spot</h2>
      <p className={styles.coords}>
        {pendingPin.lat.toFixed(5)}, {pendingPin.lng.toFixed(5)}
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="spot-name" className={styles.label}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="spot-name"
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Schrevenpark Tischtennisplatte 3"
            required
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="spot-sport" className={styles.label}>
            Sport <span aria-hidden="true">*</span>
          </label>
          <select
            id="spot-sport"
            className={styles.select}
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          >
            {SPORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="spot-description" className={styles.label}>
            Description
          </label>
          <textarea
            id="spot-description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional notes about this spot"
            rows={2}
          />
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancel}
            aria-label="Cancel adding spot"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!name.trim()}
            aria-label="Save new spot"
          >
            Save Spot
          </button>
        </div>
      </form>
    </div>
  )
}
