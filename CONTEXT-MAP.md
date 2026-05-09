# Context Map

## Contexts

- [Frontend](./frontend/CONTEXT.md) — React + Vite + TypeScript application that displays portfolio content
- [Backend](./backend/CONTEXT.md) — Fastify + Drizzle + PostgreSQL REST API that stores and serves content

## Relationships

- **Backend → Frontend**: The backend exposes public read endpoints consumed by the frontend to display Projects, Articles, and Media Items
- **Frontend → Backend**: The frontend never writes content — all writes go through the Admin (API key protected)
- **Shared types**: `shared/` at the repo root holds TypeScript type definitions for Project, Article, and MediaItem — imported by both contexts

## System-wide ADRs

System-wide decisions that span both contexts live in [docs/adr/](./docs/adr/).
