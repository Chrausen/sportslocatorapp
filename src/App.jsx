import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { loadSeedData } from './store/facilitiesSlice'
import { requestLocationThunk } from './store/locationSlice'
import MapView from './components/MapView/MapView'
import StatusBar from './components/StatusBar/StatusBar'
import Controls from './components/Controls/Controls'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSeedData())
    dispatch(requestLocationThunk())
  }, [dispatch])

  return (
    <div className="app">
      <StatusBar />
      <div className="map-wrapper">
        <MapView />
        <Controls />
      </div>
    </div>
  )
}

export default App
