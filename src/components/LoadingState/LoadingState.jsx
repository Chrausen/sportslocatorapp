import styles from './LoadingState.module.css'

export function LoadingState() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p>Loading map...</p>
    </div>
  )
}
