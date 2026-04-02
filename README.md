# SportsLocator

Find sports venues near you. A Progressive Web App (PWA) built with React and Vite.

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Build / Dev server | Vite 6 |
| State management | Redux Toolkit 2 + react-redux |
| PWA / Offline | vite-plugin-pwa + Workbox |
| Linting | ESLint 9 |
| Formatting | Prettier 3 |
| CI / Hosting | GitHub Actions → GitHub Pages |

## Project Structure

```
sportslocatorapp/
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD: build and deploy to GitHub Pages
├── public/
│   └── vite.svg             # Static assets
├── src/
│   ├── main.jsx             # React entry point, mounts <App> with Redux Provider
│   ├── App.jsx              # Root application component
│   ├── App.css              # App-level styles
│   ├── index.css            # Global styles
│   └── store/
│       └── index.js         # Redux store (configureStore)
├── index.html               # HTML shell
├── vite.config.js           # Vite + React + PWA plugin config
├── eslint.config.js         # ESLint flat config
└── .prettierrc              # Prettier formatting rules
```

## Getting Started

**Prerequisites:** Node 20+, Yarn

```bash
yarn install
```

### Start development server

```bash
yarn dev
```

Opens the app at `http://localhost:5173` with hot module replacement.

### Build for production

```bash
yarn build
```

Output is written to `dist/`. The base path is set to `/sportslocatorapp/` when the `GITHUB_PAGES=true` environment variable is present.

### Preview the production build locally

```bash
yarn preview
```

## Linting & Formatting

```bash
# Run ESLint
yarn lint

# Format all files with Prettier
yarn format
```

ESLint is configured with React and React Hooks rules. Prettier enforces single quotes, no semicolons, 2-space indentation, and a 100-character print width.

## Testing

No test runner is configured yet. Tests will be added in a future iteration.

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which installs dependencies, runs `yarn build`, and deploys the `dist/` folder to GitHub Pages automatically.
