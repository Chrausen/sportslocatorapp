import { LoadScript } from '@react-google-maps/api'
import { MapView } from './components/MapView/MapView'
import { FilterBar } from './components/FilterBar/FilterBar'
import { LocationDetailPanel } from './components/LocationDetailPanel/LocationDetailPanel'
import { FindNearestFreeButton } from './components/FindNearestFreeButton/FindNearestFreeButton'
import { AddSpotButton } from './components/AddSpotButton/AddSpotButton'
import { PinDropOverlay } from './components/PinDropOverlay/PinDropOverlay'
import { Toast } from './components/Toast/Toast'

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>SportsLocator</h1>
        <p style={{ color: 'red', fontSize: '1.1rem' }}>
          Error: Google Maps API key is not configured.
        </p>
        <p>Please add VITE_GOOGLE_MAPS_API_KEY to your .env.local file.</p>
      </div>
    )
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <MapView />
        <FilterBar />
        <FindNearestFreeButton />
        <AddSpotButton />
        <LocationDetailPanel />
        <PinDropOverlay />
        <Toast />
      </div>
    </LoadScript>
  )
}

export default App
