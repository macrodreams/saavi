# SaaviGen Projects Workspace v3

Standalone React + Vite + Tailwind CSS prototype built on the SaaviGen canonical dark design system.

## Included

- Responsive SaaviGen application shell
- Working Overview workspace
- Real Projects workspace
- Search projects
- Status filters
- Sort by update / progress / name
- Project cards with progress and health
- Project detail drawer
- New Project modal with local state
- Mobile sidebar behavior
- Canonical SaaviGen colors, typography, spacing and borders

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Architecture

- `src/components/AppShell.jsx` — application chrome and navigation
- `src/pages/Overview.jsx` — overview dashboard
- `src/pages/Projects.jsx` — projects workspace and interactions
- `src/data/projects.js` — local prototype data
- `src/index.css` — canonical visual tokens and global styles

No backend, database, authentication, or API is required yet.


## Theme system

Dark, Light, and System themes are available from the top bar. The selection persists in `localStorage`.
