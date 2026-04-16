import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setRequesting, setGranted, setDenied, setError } from '../store/locationSlice'

export default function useGeolocation() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!navigator.geolocation) {
      // No geolocation API – fall back gracefully (LocationPermission will offer Kiel)
      dispatch(setDenied())
      return
    }

    dispatch(setRequesting())

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(setGranted({ lat: pos.coords.latitude, lng: pos.coords.longitude }))
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          dispatch(setDenied())
        } else {
          dispatch(setError(err.message))
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    )
  }, [dispatch])
}
