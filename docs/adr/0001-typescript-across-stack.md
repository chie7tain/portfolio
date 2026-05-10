# TypeScript across the full stack

Both the frontend (React + Vite) and backend (Fastify + Drizzle) use TypeScript. The primary motivation is shared type definitions for the three content types (Project, Article, Media Item) — a mismatch between what the API returns and what the frontend expects becomes a compile error rather than a runtime bug. Fastify and Drizzle are both TypeScript-native, making this zero additional cost on the backend side.
