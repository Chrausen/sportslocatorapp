import { useDispatch, useSelector } from 'react-redux'
import { setFilter, selectActiveFilter } from '../../store/uiSlice'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'table-tennis', label: '🏓 Table Tennis' },
  { value: 'basketball', label: '🏀 Basketball' },
  { value: 'boule', label: '⚫ Boule' },
]

export default function SportFilter() {
  const dispatch = useDispatch()
  const activeFilter = useSelector(selectActiveFilter)

  return (
    <div className="filter-pills" role="group" aria-label="Filter by sport">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-pill filter-pill--${value}${activeFilter === value ? ' filter-pill--active' : ''}`}
          onClick={() => dispatch(setFilter(value))}
          aria-pressed={activeFilter === value}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
