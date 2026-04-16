import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { purgeExpired } from '../store/slices/occupancySlice'

export function useOccupancyExpiry() {
  const dispatch = useDispatch()

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(purgeExpired())
    }, 60 * 1000)

    return () => clearInterval(id)
  }, [dispatch])
}
