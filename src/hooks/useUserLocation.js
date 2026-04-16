import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserLocation, setGeolocationDenied } from '../store/slices/uiSlice'

export function useUserLocation() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(setGeolocationDenied(true))
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        dispatch(
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        )
      },
      (error) => {
        // PERMISSION_DENIED = 1
        if (error.code === 1) {
          dispatch(setGeolocationDenied(true))
        }
      },
      { enableHighAccuracy: true }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [dispatch])
}
