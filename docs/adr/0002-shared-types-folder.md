# Shared TypeScript types in /shared

A top-level `shared/` folder holds TypeScript type definitions for the three content types (Project, Article, MediaItem). Both the frontend and backend import from it. This avoids duplication and drift without the overhead of a separate npm package or monorepo tooling.
