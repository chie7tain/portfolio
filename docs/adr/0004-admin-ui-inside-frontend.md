# Admin UI as protected routes inside the existing frontend app

The Admin UI lives at `/admin/*` inside the existing React + Vite frontend rather than as a separate app. Authentication is a login form at `/admin/login` that stores the API key in `sessionStorage` — the key is never baked into the build. A Route Guard redirects unauthenticated visits to `/admin/login`.

A separate admin app was considered but rejected — it would duplicate the React setup, the API client, and the shared types for no real benefit on a personal portfolio. The single-app approach means one deployment, one set of dependencies, and the shared types are already importable.

The API key lives in `sessionStorage` (cleared on tab close) rather than `localStorage` (persists across sessions) or the build bundle (would be visible in source). This is the minimum exposure needed for a personal portfolio where the Admin is always the owner.
