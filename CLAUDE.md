# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A vanilla HTML/CSS/JavaScript personal portfolio site. No build system, no package manager, no framework — just static files served directly from the filesystem or a static host.

## Running the site

Open `index.html` in a browser, or serve it with any static file server. For local development:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

- **`index.html`** — single-page layout with four sections: navbar, welcome/hero, projects grid, contact/footer.
- **`app.js`** — all JavaScript. Two responsibilities:
  1. Mobile nav toggle (burger menu with CSS class toggling and link-fade animation).
  2. Fetches `projects.json` on `DOMContentLoaded`, maps entries to `{projectImg, projectLink, projectTitle}`, and renders them into `#project-grid` as HTML strings.
- **`projects.json`** — source of truth for the projects grid. Each entry needs `projectTitle`, `projectLink`, and `projectImg` (relative path under `assets/images/`).
- **`styles.css`** — base styles and CSS custom properties (color palette, spacing, transitions). Variables defined on `:root` are the design tokens for the whole site.
- **`responsiveStyles/`** — three breakpoint files (`desktop.css`, `tablet.css`, `mobilie.css`) layered on top of `styles.css`. Note the intentional typo in `mobilie.css`.
- **`assets/images/`** — project screenshot images referenced from `projects.json`.

## Adding a project

1. Add a screenshot to `assets/images/`.
2. Append an entry to `projects.json`:
   ```json
   {
     "projectTitle": "Project Name",
     "projectLink": "https://...",
     "projectImg": "./assets/images/filename.png"
   }
   ```

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`github.com/chie7tain/portfolio`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context layout — `CONTEXT-MAP.md` at root pointing to `frontend/CONTEXT.md` and `backend/CONTEXT.md`. See `docs/agents/domain.md`.

## Design tokens (CSS variables in `styles.css`)

| Variable | Value |
|---|---|
| `--mainBlack` | `#1e1f26` |
| `--mainRed` | `#be3144` |
| `--mainWhite` | `#f0f0f0` |
| `--mainBlue` | `#45567d` |
| `--mainDarkBlue` | `#1a2b53` |
| `--mainYellow` | `rgb(238, 126, 22)` |
