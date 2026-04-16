import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import { loadSpots } from './store/spotsSlice'
import { selectActiveFilter, selectAddSpotMode, selectSelectedSpotId } from './store/uiSlice'
import { selectLocationStatus } from './store/locationSlice'

import useGeolocation from './hooks/useGeolocation'
import useOccupancyExpiry from './hooks/useOccupancyExpiry'

import MapView from './components/MapView/MapView'
import Controls from './components/Controls/Controls'
import SpotDetail from './components/SpotDetail/SpotDetail'
import AddSpotForm from './components/AddSpotForm/AddSpotForm'
import LocationPermission from './components/LocationPermission/LocationPermission'
import EmptyState from './components/EmptyState/EmptyState'
import { selectAllSpots } from './store/spotsSlice'

function App() {
  const dispatch = useDispatch()

  // Global side-effects
  useGeolocation()
  useOccupancyExpiry()

  // Load demo spots on mount
  useEffect(() => {
    dispatch(loadSpots())
  }, [dispatch])

  const locationStatus = useSelector(selectLocationStatus)
  const activeFilter = useSelector(selectActiveFilter)
  const addSpotMode = useSelector(selectAddSpotMode)
  const selectedSpotId = useSelector(selectSelectedSpotId)
  const allSpots = useSelector(selectAllSpots)

  // Determine if we should show the EmptyState (filter active but no matching spots)
  const filteredCount =
    activeFilter === 'all'
      ? allSpots.length
      : allSpots.filter((s) => s.sportType === activeFilter).length
  const showEmptyState = activeFilter !== 'all' && filteredCount === 0 && allSpots.length > 0

  // Show the blocking location overlay only while requesting/denied/error
  const showLocationOverlay =
    locationStatus === 'requesting' || locationStatus === 'denied' || locationStatus === 'error'

  return (
    <div className="app">
      <MapView />
      <Controls />
      <SpotDetail />
      {addSpotMode && <AddSpotForm />}
      {showEmptyState && !selectedSpotId && <EmptyState filter={activeFilter} />}
      {showLocationOverlay && <LocationPermission />}
    </div>
  )
}

export default App
