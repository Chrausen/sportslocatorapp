import 'leaflet/dist/leaflet.css'
import MapView from './components/MapView/MapView'
import FilterBar from './components/FilterBar/FilterBar'
import LocationDetailPanel from './components/LocationDetailPanel/LocationDetailPanel'
import FindNearestFreeButton from './components/FindNearestFreeButton/FindNearestFreeButton'
import Toast from './components/Toast/Toast'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <MapView />
      <div className={styles.filterBarWrapper}>
        <FilterBar />
      </div>
      <div className={styles.fabWrapper}>
        <FindNearestFreeButton />
      </div>
      <div className={styles.toastWrapper}>
        <Toast />
      </div>
      <div className={styles.panelWrapper}>
        <LocationDetailPanel />
      </div>
    </div>
  )
}
