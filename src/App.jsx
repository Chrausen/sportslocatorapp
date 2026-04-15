import MapView from './components/Map/MapView'
import SportFilter from './components/Controls/SportFilter'
import VenuePanel from './components/VenuePanel/VenuePanel'
import './App.css'

export default function App() {
  return (
    <div className="app">
      {/* Top bar: title + sport filter */}
      <header className="app__header">
        <span className="app__logo">SportsLocator</span>
        <SportFilter />
      </header>

      {/* Full-screen map */}
      <main className="app__map">
        <MapView />
      </main>

      {/* Sliding venue detail panel */}
      <VenuePanel />
    </div>
  )
}
