import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../../store/venuesSlice'
import './SportFilter.css'

const FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'tabletennis', label: 'Tischtennis' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'boule', label: 'Boule' },
]

export default function SportFilter() {
  const dispatch = useDispatch()
  const activeFilter = useSelector((s) => s.venues.filter)

  return (
    <div className="sport-filter">
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          className={`filter-btn filter-btn--${id}${activeFilter === id ? ' filter-btn--active' : ''}`}
          onClick={() => dispatch(setFilter(id))}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
