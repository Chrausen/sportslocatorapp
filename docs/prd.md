# Product Requirements Document — SportsLocator

## Goal

Give a single user instant, offline-capable access to free public sports spots near them in Kiel.
No signup, no backend — open the app, see the map, go play.

---

## Target User

A person in Kiel who wants to spontaneously play table tennis, basketball, or boule and needs to
quickly find the nearest available public spot.

---

## Sport Types

| ID              | Label         |
|-----------------|---------------|
| `table-tennis`  | Table Tennis  |
| `basketball`    | Basketball    |
| `boule`         | Boule         |

---

## Features & User Stories

### F1 — Map View

> As a user, I want to open the app and immediately see a map centered on my location with pins for
> all nearby sports spots, so I can orient myself at a glance.

**Acceptance criteria:**
- Map loads centered on the user's current GPS location using OpenStreetMap tiles (no API key required)
- Falls back to Kiel city center (54.3213° N, 10.1348° E) if geolocation is denied
- Each spot is shown as a pin colored and/or iconized by sport type
- A filter bar lets the user show all spots or filter by one sport type
- The 10 seed spots are always visible; user-added spots appear alongside them

---

### F2 — Location Detail

> As a user, I want to tap a pin and see details about that spot, so I can decide whether to go
> there.

**Acceptance criteria:**
- Tapping a pin opens a detail panel (slide-up on mobile, sidebar on desktop)
- Panel shows: name, sport type, description, distance from current location, and availability status
- Availability shows "Free" (green) or "Blocked until HH:MM" (red) based on occupancy state
- Panel can be dismissed by tapping outside it or a close button

---

### F3 — Navigation Handoff

> As a user, I want to tap a button and have my phone's map app open with directions to the spot,
> so I don't have to copy coordinates manually.

**Acceptance criteria:**
- A "Navigate" button in the detail panel opens the native map app via a `geo:` URI
- Works on both Android and iOS
- Uses the spot's exact lat/lng coordinates

---

### F4 — Find Nearest Free Spot

> As a user, I want to tap a single button and be shown the closest currently free spot (for any
> sport or a filtered sport type), so I don't have to browse manually.

**Acceptance criteria:**
- A prominent "Find Nearest Free" button is always visible on the map screen
- Tapping it selects and opens the detail panel for the closest spot that is not blocked
- If all spots are blocked, shows a toast/message: "All spots are currently blocked"
- Respects the active sport-type filter

---

### F5 — Occupancy Reporting

> As a user, I want to mark a spot as blocked when I arrive and find it occupied, so I (and
> anyone else using the app on my device) don't waste time going there again.

**Acceptance criteria:**
- A "Mark as Blocked" toggle in the detail panel marks the spot as occupied
- Block expires automatically after **1 hour** (stored as a timestamp in localStorage)
- Expired blocks are cleared on app load and on the hourly tick
- A blocked spot shows "Blocked until HH:MM" in its detail panel and a distinct pin color on the map
- The user can manually unblock a spot ("Mark as Free") before the hour is up

---

### F6 — Re-route on Arrival

> As a user, when I arrive at a spot and find it taken, I want to instantly navigate to the next
> free spot from the detail panel without going back to the map, so I waste as little time as
> possible.

**Acceptance criteria:**
- The detail panel for a blocked spot (or one just marked as blocked) shows a "Take Me to the
  Next Free Spot" button
- Tapping it finds the nearest other free spot and opens navigation handoff to it directly
- If no other free spot exists, shows a message: "No other free spots available right now"

---

### F7 — Submit a Spot

> As a user, I want to add a new public spot I've found by dropping a pin on the map and filling
> in a short form, so my local database stays up to date.

**Acceptance criteria:**
- An "Add Spot" button opens a mode where the user can tap the map to drop a pin
- A form then asks for: name, sport type (select), description (optional)
- Submitting saves the spot to localStorage with `isUserAdded: true`
- The new spot appears on the map immediately
- User-added spots can be deleted from their detail panel; seed spots cannot

---

## Out of Scope (for now)

- User accounts or cloud sync
- Photos or ratings
- Sharing spots with other users/devices
- Sports types beyond table tennis, basketball, and boule
- Server-side occupancy — blocking is local to the device only
