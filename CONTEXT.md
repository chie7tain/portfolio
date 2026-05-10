# Frontend

The portfolio's presentation layer — a React application that fetches and displays content (Projects, Articles, Media Items) served by the backend REST API.

## Language

**Page**:
A top-level route in the frontend application — e.g. the home page, the articles list, a single article.
_Avoid_: Screen, view, route

**Content Feed**:
A page section that lists content items of a single type (e.g. the projects grid, the articles list, the media section).
_Avoid_: Grid, list, section

## Example dialogue

> **Dev:** "Should the articles Page fetch all articles from the API?"
> **Domain expert:** "Only **Published** ones — the API handles that filter. The frontend never needs to check published state itself."

> **Dev:** "Is the projects grid a Content Feed?"
> **Domain expert:** "Yes — any section that lists items of a single content type is a **Content Feed**. The home page might have three Content Feeds: one for Projects, one for Articles, one for Media Items."

**Admin UI**:
The protected section of the frontend for managing content — accessible only to the Admin. Lives under `/admin/*` routes within the existing frontend app.
_Avoid_: Dashboard, CMS, back-office

**Admin Route**:
Any frontend route under `/admin/*`. Requires the Admin to be authenticated (API key stored in `sessionStorage`). Unauthenticated visits redirect to `/admin/login`.
_Avoid_: Protected route, private route

**Route Guard**:
The component that checks `sessionStorage` for a valid API key before rendering an Admin Route. Redirects to `/admin/login` if no key is found.
_Avoid_: Auth wrapper, private route wrapper

## Relationships

- The frontend consumes **Projects**, **Articles**, and **Media Items** from the backend API — it never writes content on the public-facing side
- A **Published** content item is the only kind returned by the public API and displayed in a **Content Feed**
- The **Admin UI** reads from backend Admin Endpoints (which return all content including drafts) and writes via the existing POST/PATCH/DELETE endpoints
- The **Admin UI** authenticates by sending the API key as `x-api-key` on every write request and Admin Endpoint request
