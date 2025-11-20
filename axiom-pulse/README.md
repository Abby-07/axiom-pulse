# Axiom Pulse (axiom-pulse)

Minimal Next.js 14 + TypeScript + Tailwind demo replicating the Axiom Trade Pulse UI.

## Prerequisites
- Node.js 18+ (Node 20 LTS recommended)
- npm (comes with Node)
- (optional) Git and GitHub CLI (`gh`) for creating/pushing remote repo

## Quick start
1. Install dependencies:
```powershell
cd D:\Eterna_Trading\axiom-pulse
npm install
```

2. Run dev server:
```powershell
npm run dev
```
Open http://localhost:3000

## Scripts
- `npm run dev` — start development server
- `npm run build` — build production app
- `npm run start` — run built app

## Notes
- Data is mocked in `src/hooks/useMockData.ts`. Real REST or WebSocket integration can be added.
- Tailwind and PostCSS are required; if Next logs missing modules, install them (e.g. `npm install --save-dev postcss autoprefixer tailwindcss-animate`).
- You may see audit warnings for Next.js; upgrade Next to a patched version if required.