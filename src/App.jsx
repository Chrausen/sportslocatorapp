import 'leaflet/dist/leaflet.css'
import MapView from './components/MapView/MapView'
import FilterBar from './components/FilterBar/FilterBar'
import LocationDetailPanel from './components/LocationDetailPanel/LocationDetailPanel'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <MapView />
      <div className={styles.filterBarWrapper}>
        <FilterBar />
      </div>
      <div className={styles.panelWrapper}>
        <LocationDetailPanel />
      </div>
    </div>
  )
}
