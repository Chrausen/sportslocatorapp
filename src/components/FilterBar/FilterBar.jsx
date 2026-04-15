import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../../store/slices/uiSlice'
import styles from './FilterBar.module.css'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'table-tennis', label: 'Table Tennis' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'boule', label: 'Boule' }
]

export function FilterBar() {
  const dispatch = useDispatch()
  const activeFilter = useSelector(state => state.ui.filter)

  return (
    <div className={styles.filterBar}>
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`${styles.chip} ${activeFilter === filter.id ? styles.active : ''}`}
          onClick={() => dispatch(setFilter(filter.id))}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
