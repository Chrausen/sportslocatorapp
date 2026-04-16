export const DEFAULT_BLOCK_DURATION_MS = 60 * 60 * 1000 // 1 hour

export function isBlocked(occupancyRecord) {
  if (!occupancyRecord || !occupancyRecord.blockedUntil) return false
  return occupancyRecord.blockedUntil > Date.now()
}

export function blockedUntilLabel(blockedUntil) {
  if (!blockedUntil || blockedUntil <= Date.now()) return 'Available'
  const remaining = Math.ceil((blockedUntil - Date.now()) / 60000)
  return `Blocked for ~${remaining} min`
}
