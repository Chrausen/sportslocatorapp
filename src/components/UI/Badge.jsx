import { FREE_COLOR, OCC_COLOR } from '../../tokens'

export default function Badge({ free, small = false }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: small ? '3px 8px' : '4px 10px',
        borderRadius: 999,
        background: free ? 'oklch(0.92 0.07 145)' : 'oklch(0.94 0.07 35)',
        color: free ? FREE_COLOR : OCC_COLOR,
        fontSize: small ? 11 : 12,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: free ? FREE_COLOR : OCC_COLOR,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {free ? 'Frei' : 'Belegt'}
    </span>
  )
}
