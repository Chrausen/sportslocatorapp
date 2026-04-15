import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserLocation, setGeolocationDenied } from '../store/slices/uiSlice'

export function useUserLocation() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.')
      dispatch(setGeolocationDenied(true))
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        dispatch(setUserLocation({ lat: latitude, lng: longitude }))
        dispatch(setGeolocationDenied(false))
      },
      (error) => {
        console.error('Geolocation error:', error)
        if (error.code === error.PERMISSION_DENIED) {
          dispatch(setGeolocationDenied(true))
        }
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
