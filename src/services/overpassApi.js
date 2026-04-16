const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

const SPORT_DISPLAY_NAMES = {
  basketball: 'Basketball Court',
  table_tennis: 'Table Tennis Table',
  boules: 'Boules / Pétanque',
}

/** Maps raw OSM sport tag values to our internal sport enum. */
function determineSport(tags) {
  const raw = (tags.sport ?? '').toLowerCase()
  if (raw === 'basketball') return 'basketball'
  if (raw === 'table_tennis') return 'table_tennis'
  if (raw === 'boules' || raw === 'petanque' || raw === 'pétanque') return 'boules'
  return null
}

/** Compute centroid from an array of {lat, lon} geometry points. */
function centroid(geometry) {
  const lat = geometry.reduce((sum, p) => sum + p.lat, 0) / geometry.length
  const lon = geometry.reduce((sum, p) => sum + p.lon, 0) / geometry.length
  return { lat, lon }
}

/** Normalise a single OSM node or way element to our facility shape. */
function normaliseElement(element) {
  const tags = element.tags ?? {}
  const sport = determineSport(tags)
  if (!sport) return null

  let lat, lon
  if (element.type === 'node') {
    lat = element.lat
    lon = element.lon
  } else if (element.type === 'way' && element.geometry?.length) {
    const c = centroid(element.geometry)
    lat = c.lat
    lon = c.lon
  } else {
    return null
  }

  const name =
    tags.name ??
    tags.description ??
    SPORT_DISPLAY_NAMES[sport] ??
    'Sports Facility'

  return {
    id: `osm:${element.type}/${element.id}`,
    name,
    sport,
    lat,
    lon,
    source: 'osm',
  }
}

/** Build the Overpass QL query string for the given bbox string. */
function buildQuery(bbox) {
  return `[out:json][timeout:25];
(
  node[leisure=pitch][sport~"basketball|table_tennis|boules|petanque"](${bbox});
  way[leisure=pitch][sport~"basketball|table_tennis|boules|petanque"](${bbox});
  node[sport~"basketball|table_tennis|boules|petanque"](${bbox});
  way[sport~"basketball|table_tennis|boules|petanque"](${bbox});
);
out geom;`
}

/**
 * Fetch public sports facilities from the Overpass API for the given bbox string.
 * Returns an array of normalised facility objects.
 */
export async function fetchFacilities(bbox) {
  const query = buildQuery(bbox)
  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  })

  if (!response.ok) {
    throw new Error(`Overpass API error: ${response.status}`)
  }

  const json = await response.json()
  const seen = new Set()
  const facilities = []

  for (const element of json.elements ?? []) {
    const facility = normaliseElement(element)
    if (!facility) continue
    if (seen.has(facility.id)) continue
    seen.add(facility.id)
    facilities.push(facility)
  }

  return facilities
}
