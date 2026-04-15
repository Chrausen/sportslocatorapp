import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { purgeExpired } from '../store/slices/occupancySlice'

export function useOccupancyExpiry() {
  const dispatch = useDispatch()

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(purgeExpired())
    }, 60000) // 60 seconds

    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch])
}
