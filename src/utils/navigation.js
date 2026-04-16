export function isAppleDevice() {
  return /iPad|iPhone|iPod|Mac/.test(navigator.platform || navigator.userAgent)
}

export function buildNavigationUrl(lat, lng, label = '') {
  if (isAppleDevice()) {
    const q = label ? encodeURIComponent(label) : `${lat},${lng}`
    return `maps://maps.apple.com/?daddr=${q}&dirflg=w`
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`
}
