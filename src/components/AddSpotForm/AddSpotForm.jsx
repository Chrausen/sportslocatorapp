import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSpot } from '../../store/slices/spotsSlice'
import { selectSpot, setIsAddingSpot, setPendingPin } from '../../store/slices/uiSlice'
import { nanoid } from 'nanoid'
import styles from './AddSpotForm.module.css'

const sportOptions = [
  { value: 'table-tennis', label: 'Table Tennis' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'boule', label: 'Boule' }
]

export function AddSpotForm({ pin }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [sport, setSport] = useState('table-tennis')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const newSpot = {
      id: nanoid(),
      name: name.trim(),
      sport,
      description: description.trim(),
      lat: pin.lat,
      lng: pin.lng,
      isUserAdded: true
    }

    dispatch(addSpot(newSpot))
    dispatch(selectSpot(newSpot.id))
    dispatch(setIsAddingSpot(false))
    dispatch(setPendingPin(null))
  }

  const handleCancel = () => {
    dispatch(setIsAddingSpot(false))
    dispatch(setPendingPin(null))
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h3>Add New Sports Spot</h3>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Central Park Basketball Court"
              required
              aria-label="Spot name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sport">Sport Type *</label>
            <select
              id="sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              aria-label="Sport type"
            >
              {sportOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Recently renovated, well-lit at night"
              rows="3"
              aria-label="Spot description"
            />
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              aria-label="Submit new spot"
            >
              Create Spot
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              aria-label="Cancel adding spot"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
