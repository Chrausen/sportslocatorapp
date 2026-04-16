import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'

/**
 * Invisible component that must live inside a <MapContainer>.
 * Listens to Redux ui.mapCenter / ui.mapZoom and calls map.flyTo() accordingly.
 */
export default function MapController() {
  const map = useMap()
  const { mapCenter, mapZoom } = useSelector((state) => state.ui)
  const prevCenter = useRef(null)

  useEffect(() => {
    if (!mapCenter) return
    const prev = prevCenter.current
    if (prev && prev.lat === mapCenter.lat && prev.lon === mapCenter.lon) return
    prevCenter.current = mapCenter
    map.flyTo([mapCenter.lat, mapCenter.lon], mapZoom, { duration: 1 })
  }, [map, mapCenter, mapZoom])

  return null
}
