# Architecture — SportsLocator

## Overview

A single-page React PWA. No backend. All state is managed by Redux Toolkit and persisted to
`localStorage`. Google Maps renders the map and pins. The app is installable and works offline
for existing spots (the Maps tiles themselves require a network connection).

---

## Component Tree

```
App
├── MapView                        # Full-screen Google Map
│   ├── SportPin (× n)             # Marker per spot, color-coded by sport + occupancy
│   └── UserLocationMarker         # Blue dot for current GPS position
├── FilterBar                      # Sport-type filter chips (All / TT / BB / Boule)
├── FindNearestFreeButton          # Floating action button
├── LocationDetailPanel            # Slide-up panel when a pin is selected
│   ├── OccupancyToggle            # Mark as blocked / free
│   ├── NavigateButton             # Opens native map app
│   ├── RerouteButton              # "Next free spot" — visible when spot is blocked
│   └── DeleteSpotButton           # Only visible for user-added spots
└── AddSpotFlow
    ├── AddSpotButton              # FAB to enter pin-drop mode
    ├── PinDropOverlay             # Crosshair / tap-to-place UI on the map
    └── AddSpotForm                # Name, sport type, description fields + submit
```

---

## Redux State Shape

```js
// store/slices/spotsSlice.js
spots: {
  items: [
    {
      id: string,            // nanoid()
      name: string,
      sport: 'table-tennis' | 'basketball' | 'boule',
      lat: number,
      lng: number,
      description: string,
      isUserAdded: boolean,  // false for seed spots
    }
  ]
}

// store/slices/occupancySlice.js
occupancy: {
  // key = spot id, value = ISO timestamp when the block expires
  [spotId]: string   // e.g. "2024-06-01T15:30:00.000Z"
}

// store/slices/uiSlice.js
ui: {
  selectedSpotId: string | null,
  filter: 'all' | 'table-tennis' | 'basketball' | 'boule',
  userLocation: { lat: number, lng: number } | null,
  isAddingSpot: boolean,   // true when pin-drop mode is active
  pendingPin: { lat: number, lng: number } | null,  // coordinates of the dropped pin
}
```

---

## localStorage Schema

| Key                    | Value                          | Written by          |
|------------------------|--------------------------------|---------------------|
| `sl_spots`             | JSON array of user-added spots | spotsSlice          |
| `sl_occupancy`         | JSON object `{ [id]: isoTs }` | occupancySlice      |

Seed spots are **never** written to localStorage — they are imported from `src/data/seedSpots.js`
and merged with stored user spots at startup inside `spotsSlice` initial state logic.

Expired occupancy entries (where `Date.now() > Date.parse(ts)`) are filtered out on:
- App startup (slice initializer)
- Every 60-second interval (`useOccupancyExpiry` hook)

---

## Data — Seed Spots (`src/data/seedSpots.js`)

10 hardcoded public locations in Kiel, Germany:

| # | Name                                | Sport         | Lat       | Lng      |
|---|-------------------------------------|---------------|-----------|----------|
| 1 | Schrevenpark — Tischtennisplatte 1  | table-tennis  | 54.32130  | 10.12480 |
| 2 | Schrevenpark — Tischtennisplatte 2  | table-tennis  | 54.32105  | 10.12455 |
| 3 | Hiroshimapark — Boule               | boule         | 54.32680  | 10.13120 |
| 4 | Vinetaplatz — Basketballplatz       | basketball    | 54.31780  | 10.14980 |
| 5 | Exer Neumühlen — Basketballkorb     | basketball    | 54.33580  | 10.15980 |
| 6 | Düsternbrook — Tischtennistafel     | table-tennis  | 54.32980  | 10.11680 |
| 7 | Holstenpark — Boule                 | boule         | 54.31480  | 10.13480 |
| 8 | Schulpark Meimersdorf — Basketball  | basketball    | 54.29580  | 10.09980 |
| 9 | Falckensteiner Strand — Boule       | boule         | 54.37980  | 10.17980 |
|10 | Max-Planck-Str. — Streetball        | basketball    | 54.34580  | 10.11980 |

> Coordinates are approximate. Verify against Google Maps before shipping.

---

## Google Maps Integration

**Package:** `@react-google-maps/api`

```jsx
// Single loader at App level
<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
  <GoogleMap ... />
</LoadScript>
```

- `<GoogleMap>` fills the viewport; `mapContainerStyle={{ width: '100%', height: '100vh' }}`
- One `<Marker>` per spot; `icon` prop set to a colored SVG pin based on sport + occupancy
- `onClick` on each marker dispatches `uiSlice.selectSpot(id)`
- User location tracked via `navigator.geolocation.watchPosition` in a `useUserLocation` hook

**Pin colors:**

| Sport         | Free    | Blocked |
|---------------|---------|---------|
| table-tennis  | #2196F3 | #90A4AE |
| basketball    | #FF9800 | #90A4AE |
| boule         | #4CAF50 | #90A4AE |

---

## Navigation Handoff

```js
// utils/navigation.js
export function buildNavigationUrl({ lat, lng }) {
  // Opens Google Maps directions on all platforms
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`
}
```

Called from `NavigateButton` and `RerouteButton` via `window.open(url, '_blank')`.

---

## Distance Calculation

```js
// utils/distance.js  — Haversine formula, returns metres
export function distanceBetween(a, b) { ... }
```

Used by:
- `LocationDetailPanel` to show distance from user
- `FindNearestFreeButton` logic to rank spots
- `RerouteButton` to pick the next closest free spot

---

## Custom Hooks

| Hook                  | Responsibility                                              |
|-----------------------|-------------------------------------------------------------|
| `useUserLocation`     | `watchPosition`, dispatches to `uiSlice.setUserLocation`   |
| `useOccupancyExpiry`  | 60-second interval that purges expired blocks from store   |
| `useLocalStorage`     | Generic read/write helper used by slice middleware         |
| `useNearestFreeSpot`  | Derives nearest unblocked spot from Redux state             |

---

## Persistence Middleware

A lightweight Redux middleware (or `store.subscribe` listener) serializes `spots.items`
(user-added only) and `occupancy` to localStorage after every relevant action.

---

## PWA / Offline

`vite-plugin-pwa` generates a service worker that pre-caches the app shell (HTML, JS, CSS).
Map tiles are **not** cached — an internet connection is required to render the map.
Spot data and occupancy work fully offline once the shell is loaded.
