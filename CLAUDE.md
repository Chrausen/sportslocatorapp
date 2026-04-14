# CLAUDE.md

## Project Overview

SportsLocator is a personal Progressive Web App (PWA) for finding free public sports spots near you.
No backend, no auth — all data lives in `localStorage`. The app is seeded with 10 real locations in
Kiel, Germany. Users can add more spots via the UI; those are also persisted locally.

---

## Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| UI               | React 19                            |
| Build / Dev      | Vite 6                              |
| State            | Redux Toolkit 2 + react-redux       |
| Maps             | @react-google-maps/api              |
| PWA / Offline    | vite-plugin-pwa + Workbox           |
| Persistence      | localStorage (spots + occupancy)    |
| Linting          | ESLint 9                            |
| Formatting       | Prettier 3                          |
| CI / Hosting     | GitHub Actions → GitHub Pages       |

---

## Environment Variables

Create a `.env.local` file in the project root (never commit this):

```
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

The key must have the **Maps JavaScript API** enabled.
For local dev, restrict the key to `http://localhost:5173`.

---

## Running the App

```bash
yarn install
yarn dev        # starts dev server at http://localhost:5173
yarn build      # production build → dist/
yarn preview    # preview the production build locally
yarn lint       # ESLint check
yarn format     # Prettier format all files
```

---

## Project Structure

```
sportslocatorapp/
├── docs/
│   ├── prd.md            # Product Requirements Document
│   ├── architecture.md   # Technical design
│   └── tasks.md          # Phased task list
├── public/
├── src/
│   ├── components/       # UI components (PascalCase, .jsx + .module.css)
│   ├── data/
│   │   └── seedSpots.js  # 10 hardcoded Kiel locations
│   ├── hooks/            # Custom React hooks
│   ├── store/
│   │   ├── index.js      # configureStore
│   │   └── slices/       # One Redux slice per domain
│   ├── utils/            # Pure helper functions (distance, localStorage)
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── CLAUDE.md
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Code Conventions

- **Components:** PascalCase filenames and function names, `.jsx` extension
- **Styles:** CSS Modules (`ComponentName.module.css`) co-located with the component file
- **Redux slices:** one file per domain in `src/store/slices/`
- **Custom hooks:** `src/hooks/useHookName.js`
- **Utilities:** pure functions only, no side effects, in `src/utils/`
- **Formatting:** no semicolons, single quotes, 2-space indent, 100-char line width (see `.prettierrc`)
- **No TypeScript** — plain JSX throughout
- **No test runner configured** — manual testing via the dev server

---

## Key Constraints

- No backend, no authentication, no server-side code
- All spot data and occupancy state persists in `localStorage`
- Single-user personal tool — no multi-user sync
- Occupancy blocks expire automatically after **1 hour**
- Seed data must not be editable or deletable by the user (`isUserAdded: false`)
- Google Maps API key is required at runtime; app should show a clear error if missing
