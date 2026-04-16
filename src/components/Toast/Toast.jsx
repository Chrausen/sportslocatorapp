import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearToast } from '../../store/slices/uiSlice'
import styles from './Toast.module.css'

const DISMISS_MS = 3000

export default function Toast() {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.ui.toast)

  useEffect(() => {
    if (!message) return
    const id = setTimeout(() => dispatch(clearToast()), DISMISS_MS)
    return () => clearTimeout(id)
  }, [message, dispatch])

  if (!message) return null

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  )
}
