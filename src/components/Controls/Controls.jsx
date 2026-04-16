import NearestButton from '../NearestButton/NearestButton'

export default function Controls() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999,
        pointerEvents: 'all',
      }}
    >
      <NearestButton />
    </div>
  )
}
