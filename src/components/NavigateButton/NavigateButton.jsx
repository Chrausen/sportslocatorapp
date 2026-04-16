import { buildNavigationUrl } from '../../utils/navigation'
import styles from './NavigateButton.module.css'

export default function NavigateButton({ lat, lng }) {
  function handleClick() {
    const url = buildNavigationUrl({ lat, lng })
    window.open(url)
  }

  return (
    <button className={styles.btn} onClick={handleClick} aria-label="Open navigation to this spot">
      Navigate
    </button>
  )
}
