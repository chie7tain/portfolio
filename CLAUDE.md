# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See `../CLAUDE.md` (workspace root) for full architecture, commands, domain language, and environment setup covering both this frontend and the `portfolio-api/` backend.

## This project: React frontend

React 18 + Vite + Tailwind CSS 4 + React Router 6. Deployed to Vercel (`.vercel/project.json`).

### Commands

```bash
yarn dev          # dev server at http://localhost:5173
yarn build        # tsc + vite build
yarn test         # vitest run (single pass)
yarn test:watch   # vitest watch
```

### Key files

- **`src/App.tsx`** — router root with public/admin shell split
- **`src/api/index.ts`** — all fetch calls; handles 401 redirect to `/admin/login`
- **`src/components/admin/RouteGuard.tsx`** — checks `sessionStorage` for API key
- **`@shared`** alias → `./shared/` (types shared with backend)
- **`tests/handlers.ts`** — MSW mock handlers and fixture data used across all tests

### Design tokens (CSS variables in `src/index.css`)

| Variable | Value |
|---|---|
| `--main-black` | `#1e1f26` |
| `--main-red` | `#be3144` |
| `--main-white` | `#f0f0f0` |
| `--main-blue` | `#45567d` |
| `--main-dark-blue` | `#1a2b53` |
| `--main-yellow` | `rgb(238, 126, 22)` |
