import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserLocation } from '../store/slices/uiSlice'

export function useUserLocation() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!navigator.geolocation) return

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        dispatch(
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        )
      },
      () => {
        // Geolocation denied or unavailable — leave userLocation as null (Kiel fallback used in MapView)
      },
      { enableHighAccuracy: true }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [dispatch])
}
