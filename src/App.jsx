import 'leaflet/dist/leaflet.css'
import { useSelector } from 'react-redux'
import MapView from './components/MapView/MapView'
import FilterBar from './components/FilterBar/FilterBar'
import LocationDetailPanel from './components/LocationDetailPanel/LocationDetailPanel'
import FindNearestFreeButton from './components/FindNearestFreeButton/FindNearestFreeButton'
import AddSpotButton from './components/AddSpotButton/AddSpotButton'
import AddSpotForm from './components/AddSpotForm/AddSpotForm'
import Toast from './components/Toast/Toast'
import styles from './App.module.css'

export default function App() {
  const isAddingSpot = useSelector((state) => state.ui.isAddingSpot)
  const selectedSpotId = useSelector((state) => state.ui.selectedSpotId)

  return (
    <div className={styles.app}>
      <MapView />
      <div className={styles.filterBarWrapper}>
        <FilterBar />
      </div>

      {/* FABs — hidden while in add-spot mode or a detail panel is open */}
      {!isAddingSpot && !selectedSpotId && (
        <div className={styles.fabRow}>
          <FindNearestFreeButton />
          <AddSpotButton />
        </div>
      )}

      <div className={styles.toastWrapper}>
        <Toast />
      </div>

      <div className={styles.panelWrapper}>
        {isAddingSpot ? <AddSpotForm /> : <LocationDetailPanel />}
      </div>
    </div>
  )
}
