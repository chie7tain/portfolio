# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See `../CLAUDE.md` (workspace root) for full architecture, commands, domain language, and environment setup covering both this frontend and the `portfolio-api/` backend.

## This project: React frontend

React 18 + Vite + Tailwind CSS 4 + React Router 6. Deployed to Vercel (`.vercel/project.json`).

The public site uses an **editorial / print** design system (warm paper canvas, vermilion accent, Fraunces + Libre Franklin + Spline Sans Mono). The `/admin/*` CMS keeps the legacy dark theme (`--color-main-*` tokens, Inter). See `docs/superpowers/specs/2026-07-12-editorial-portfolio-redesign-design.md`.

**Theme (night edition):** the public site has an opt-in dark mode via `ThemeToggle`. It sets `data-theme="dark"` on `<html>`, which overrides the editorial token variables in `src/index.css` (Tailwind v4 utilities reference the vars, so this re-skins at runtime). Choice persists in `localStorage['portfolio-theme']`; default is paper (no `prefers-color-scheme` auto-follow). An inline script in `index.html` applies a saved dark choice before paint to avoid a flash.

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

### Design tokens (Tailwind 4 `@theme` in `src/index.css`)

**Editorial palette — public site** (utilities: `bg-paper`, `text-ink`, `text-vermilion`, `border-hairline`, …)

| Variable | Value | Role |
|---|---|---|
| `--color-paper` | `#f5f1e8` | warm ivory canvas |
| `--color-paper-deep` | `#ece5d7` | recessed panels / hover bands |
| `--color-ink` | `#1c1a17` | primary text |
| `--color-ink-soft` | `#3a352d` | long-form body |
| `--color-faded` | `#6b6459` | metadata / secondary |
| `--color-vermilion` | `#c43d2e` | the single accent |
| `--color-hairline` | `rgba(28,26,23,0.14)` | editorial rules |

**Fonts** — `font-display` (Fraunces), `font-body` (Libre Franklin), `font-mono` (Spline Sans Mono). `font-sans` (Inter) is retained for admin.

**Legacy palette — `/admin` CMS only** (unchanged): `--color-main-black` `#1e1f26`, `--color-main-red` `#be3144`, `--color-main-white` `#f0f0f0`, `--color-main-blue` `#45567d`, `--color-main-dark-blue` `#1a2b53`.
