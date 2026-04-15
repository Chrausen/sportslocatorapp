import { buildNavigationUrl } from '../../utils/navigation'
import styles from './NavigateButton.module.css'

export function NavigateButton({ spot }) {
  const handleNavigate = () => {
    const url = buildNavigationUrl({ lat: spot.lat, lng: spot.lng })
    window.open(url, '_blank')
  }

  return (
    <button className={styles.navigateButton} onClick={handleNavigate}>
      🗺️ Navigate
    </button>
  )
}
