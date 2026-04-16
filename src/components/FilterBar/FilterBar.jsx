import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../store/slices/uiSlice'
import styles from './FilterBar.module.css'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'table-tennis', label: 'Table Tennis' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'boule', label: 'Boule' },
]

export default function FilterBar() {
  const dispatch = useDispatch()
  const activeFilter = useSelector((state) => state.ui.filter)

  return (
    <div className={styles.bar} role="group" aria-label="Filter by sport type">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`${styles.chip} ${activeFilter === value ? styles.active : ''}`}
          onClick={() => dispatch(setFilter(value))}
          aria-pressed={activeFilter === value}
          aria-label={`Filter: ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
