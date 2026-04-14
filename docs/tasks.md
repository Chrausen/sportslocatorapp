# Tasks — SportsLocator

Three phases. Complete each phase fully before starting the next.
Check off tasks as they are done.

---

## Phase 1 — Foundation: Map & Spots

> Goal: A working map that shows all 10 Kiel seed spots with correct pins and a basic detail panel.

### Setup
- [ ] Install `@react-google-maps/api` and `nanoid`
- [ ] Add `VITE_GOOGLE_MAPS_API_KEY` to `.env.local` (document in `CLAUDE.md`, add `.env.local` to `.gitignore`)
- [ ] Create `src/data/seedSpots.js` with the 10 Kiel locations (see `architecture.md`)

### Redux Store
- [ ] Create `src/store/slices/spotsSlice.js`
  - Initial state merges seed spots + user-added spots from localStorage (`sl_spots`)
  - Actions: `addSpot`, `deleteSpot`
- [ ] Create `src/store/slices/occupancySlice.js`
  - Initial state loaded from localStorage (`sl_occupancy`), expired entries filtered out
  - Actions: `blockSpot(id)`, `unblockSpot(id)`, `purgeExpired`
- [ ] Create `src/store/slices/uiSlice.js`
  - Actions: `selectSpot(id)`, `clearSelection`, `setFilter`, `setUserLocation`,
    `setIsAddingSpot`, `setPendingPin`
- [ ] Register all three slices in `src/store/index.js`
- [ ] Add a `store.subscribe` listener that persists user spots and occupancy to localStorage

### Utilities
- [ ] Create `src/utils/distance.js` — Haversine distance in metres
- [ ] Create `src/utils/navigation.js` — `buildNavigationUrl({ lat, lng })`

### Hooks
- [ ] Create `src/hooks/useUserLocation.js` — `watchPosition` → dispatches `setUserLocation`
- [ ] Create `src/hooks/useOccupancyExpiry.js` — 60-second interval → dispatches `purgeExpired`

### Map & Pins
- [ ] Wrap app in `<LoadScript>` in `src/App.jsx`; show error message if API key is missing
- [ ] Create `src/components/MapView/MapView.jsx`
  - Full-viewport `<GoogleMap>` centered on user location (fallback: Kiel center)
  - Calls `useUserLocation` and `useOccupancyExpiry`
- [ ] Create `src/components/SportPin/SportPin.jsx`
  - `<Marker>` with SVG icon colored by sport type and occupancy status (see color table in `architecture.md`)
  - `onClick` dispatches `selectSpot(id)`
- [ ] Add `<UserLocationMarker>` (blue dot) to `MapView`

### Filter Bar
- [ ] Create `src/components/FilterBar/FilterBar.jsx`
  - Chips: All / Table Tennis / Basketball / Boule
  - Dispatches `setFilter`; `MapView` filters rendered `SportPin` components accordingly

### Location Detail Panel
- [ ] Create `src/components/LocationDetailPanel/LocationDetailPanel.jsx`
  - Rendered when `ui.selectedSpotId` is set
  - Shows: name, sport type, description, distance from user, availability status
  - Close button dispatches `clearSelection`

---

## Phase 2 — Core Features: Navigation, Occupancy & Routing

> Goal: All interactive features that make the app useful in the field.

### Navigation Handoff (F3)
- [ ] Create `src/components/NavigateButton/NavigateButton.jsx`
  - Uses `buildNavigationUrl` and `window.open(..., '_blank')`
  - Rendered inside `LocationDetailPanel`

### Occupancy Reporting (F5)
- [ ] Add `OccupancyToggle` inside `LocationDetailPanel`
  - "Mark as Blocked" → dispatches `blockSpot(id)` with `blockedUntil = now + 1h`
  - "Mark as Free" → dispatches `unblockSpot(id)`
  - Panel updates availability status text and color reactively

### Find Nearest Free Spot (F4)
- [ ] Create `src/hooks/useNearestFreeSpot.js`
  - Derives nearest unblocked spot filtered by active sport-type filter and user location
- [ ] Create `src/components/FindNearestFreeButton/FindNearestFreeButton.jsx`
  - Floating action button on the map
  - On tap: dispatches `selectSpot` for the nearest free spot
  - If none found: shows a toast "All spots are currently blocked"
- [ ] Create `src/components/Toast/Toast.jsx` — simple auto-dismissing message overlay

### Re-route on Arrival (F6)
- [ ] Add `RerouteButton` inside `LocationDetailPanel`
  - Visible only when the selected spot is currently blocked
  - On tap: finds nearest other free spot and calls `buildNavigationUrl` directly (no panel switch needed)
  - If none: shows toast "No other free spots available right now"

---

## Phase 3 — User Contributions & Polish

> Goal: Let the user add new spots and ensure the app is installable and polished.

### Submit a Spot (F7)
- [ ] Create `src/components/AddSpotButton/AddSpotButton.jsx`
  - FAB that dispatches `setIsAddingSpot(true)`
- [ ] Create `src/components/PinDropOverlay/PinDropOverlay.jsx`
  - Rendered over the map when `ui.isAddingSpot` is true
  - Map `onClick` dispatches `setPendingPin({ lat, lng })` and opens `AddSpotForm`
  - "Cancel" dispatches `setIsAddingSpot(false)` and `setPendingPin(null)`
- [ ] Create `src/components/AddSpotForm/AddSpotForm.jsx`
  - Fields: name (required), sport type (select, required), description (optional)
  - Submit dispatches `addSpot({ ...fields, lat, lng, isUserAdded: true, id: nanoid() })`
  - On success: closes form, exits add mode, selects new spot on map
- [ ] Add `DeleteSpotButton` inside `LocationDetailPanel`
  - Visible only when `selectedSpot.isUserAdded === true`
  - Dispatches `deleteSpot(id)` and `clearSelection`

### PWA Polish
- [ ] Verify `vite-plugin-pwa` manifest has correct `name`, `short_name`, `theme_color`, icons
- [ ] Add sport-type icons to the PWA manifest and app header
- [ ] Test "Add to Home Screen" flow on Android and iOS
- [ ] Confirm app shell loads offline (map tiles will not render without network — this is acceptable)

### UI / UX Hardening
- [ ] Responsive layout: detail panel is a slide-up sheet on mobile, right-side panel on desktop
- [ ] Accessible: all buttons have `aria-label`; color coding supplemented by icon/label
- [ ] Empty state: if no spots match the current filter, show a friendly message on the map
- [ ] Loading state: show a spinner while `LoadScript` initialises the Maps API
- [ ] Error state: if geolocation is permanently denied, show a banner explaining the fallback
