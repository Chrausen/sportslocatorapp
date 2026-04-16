import { useDispatch } from 'react-redux'
import { showToast } from '../../store/slices/uiSlice'
import { useNearestFreeSpot } from '../../hooks/useNearestFreeSpot'
import { buildNavigationUrl } from '../../utils/navigation'
import styles from './RerouteButton.module.css'

export default function RerouteButton({ currentSpotId }) {
  const dispatch = useDispatch()
  const nearest = useNearestFreeSpot({ excludeId: currentSpotId })

  function handleClick() {
    if (nearest) {
      window.open(buildNavigationUrl({ lat: nearest.lat, lng: nearest.lng }))
    } else {
      dispatch(showToast('No other free spots available right now'))
    }
  }

  return (
    <button
      className={styles.btn}
      onClick={handleClick}
      aria-label="Navigate to nearest other free spot"
    >
      Take Me to the Next Free Spot
    </button>
  )
}
