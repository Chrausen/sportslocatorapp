import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../store/slices/uiSlice'
import styles from './FilterBar.module.css'

const FILTERS = [
  { value: 'all', label: 'All', icon: '🏅' },
  { value: 'table-tennis', label: 'Table Tennis', icon: '🏓' },
  { value: 'basketball', label: 'Basketball', icon: '🏀' },
  { value: 'boule', label: 'Boule', icon: '🎯' },
]

export default function FilterBar() {
  const dispatch = useDispatch()
  const activeFilter = useSelector((state) => state.ui.filter)

  return (
    <div className={styles.bar} role="group" aria-label="Filter by sport type">
      {FILTERS.map(({ value, label, icon }) => (
        <button
          key={value}
          className={`${styles.chip} ${activeFilter === value ? styles.active : ''}`}
          onClick={() => dispatch(setFilter(value))}
          aria-pressed={activeFilter === value}
          aria-label={`Filter: ${label}`}
        >
          <span aria-hidden="true">{icon}</span> {label}
        </button>
      ))}
    </div>
  )
}
