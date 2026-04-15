import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserLocation } from '../store/slices/uiSlice'

export function useUserLocation() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        dispatch(setUserLocation({ lat: latitude, lng: longitude }))
      },
      (error) => {
        console.error('Geolocation error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [dispatch])
}
