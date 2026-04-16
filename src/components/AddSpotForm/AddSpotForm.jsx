import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitNewSpot } from '../../store/spotsSlice'
import {
  selectPendingPin,
  exitAddSpotMode,
  clearPendingPin,
  selectSpot,
  setMapCenter,
} from '../../store/uiSlice'
import './AddSpotForm.css'

const SPORT_OPTIONS = [
  { value: 'table-tennis', label: '🏓 Table Tennis' },
  { value: 'basketball', label: '🏀 Basketball' },
  { value: 'boule', label: '⚫ Boule' },
]

export default function AddSpotForm() {
  const dispatch = useDispatch()
  const pendingPin = useSelector(selectPendingPin)

  const [name, setName] = useState('')
  const [sportType, setSportType] = useState('table-tennis')
  const [description, setDescription] = useState('')

  if (!pendingPin) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const result = await dispatch(
      submitNewSpot({
        name: name.trim(),
        sportType,
        description: description.trim(),
        lat: pendingPin.lat,
        lng: pendingPin.lng,
        address: '',
      })
    )

    if (submitNewSpot.fulfilled.match(result)) {
      const newSpot = result.payload
      dispatch(setMapCenter({ lat: newSpot.lat, lng: newSpot.lng }))
      dispatch(clearPendingPin())
      dispatch(exitAddSpotMode())
      dispatch(selectSpot(newSpot.id))
    }
  }

  const handleCancel = () => {
    dispatch(clearPendingPin())
    dispatch(exitAddSpotMode())
  }

  return (
    <div className="add-spot-overlay" role="dialog" aria-modal="true" aria-label="Add new spot">
      <div className="add-spot-sheet">
        <h2 className="add-spot-title">Add new spot</h2>
        <p className="add-spot-coords">
          {pendingPin.lat.toFixed(5)}, {pendingPin.lng.toFixed(5)} · drag the pin to adjust
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="spot-name">Name</label>
            <input
              id="spot-name"
              className="form-input"
              type="text"
              placeholder="e.g. Schlossgarten Table Tennis"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Sport type</label>
            <div className="sport-type-group" role="radiogroup">
              {SPORT_OPTIONS.map(({ value, label }) => (
                <label key={value} className="sport-type-label">
                  <input
                    type="radio"
                    name="sport-type"
                    value={value}
                    checked={sportType === value}
                    onChange={() => setSportType(value)}
                  />
                  <span className="sport-type-pill">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="spot-desc">Description (optional)</label>
            <textarea
              id="spot-desc"
              className="form-textarea"
              placeholder="Any useful info about the spot…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="add-spot-actions">
            <button type="button" className="add-spot-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="add-spot-submit" disabled={!name.trim()}>
              Add spot
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
