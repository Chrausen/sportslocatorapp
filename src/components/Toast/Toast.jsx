import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearToast } from '../../store/slices/uiSlice'
import styles from './Toast.module.css'

export function Toast() {
  const dispatch = useDispatch()
  const toast = useSelector(state => state.ui.toast)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(clearToast())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast, dispatch])

  if (!toast) return null

  return (
    <div className={styles.toast}>
      {toast.message}
    </div>
  )
}
