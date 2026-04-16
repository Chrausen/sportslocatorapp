import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearExpired } from '../store/spotsSlice'

const TICK_INTERVAL_MS = 30_000 // 30 seconds

export default function useOccupancyExpiry() {
  const dispatch = useDispatch()

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(clearExpired())
    }, TICK_INTERVAL_MS)
    return () => clearInterval(id)
  }, [dispatch])
}
