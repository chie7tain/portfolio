# Backend

The content management layer for the portfolio. Stores and serves Projects, Articles, and Media Items that the frontend displays.

## Language

**Project**:
Something the owner built — has a title, a link, an image, a short description, and a published flag (draft vs published).
_Avoid_: Work, case study, portfolio item

**Article**:
Something the owner wrote — has a title, a full body written in Markdown (stored in the CMS), a publish date, and a published flag.
_Avoid_: Blog post, post, write-up

**Media Item**:
A reference to external audio or video content the owner appeared in or produced — has a title, a thumbnail, a link to the external source, and a type (`podcast` or `video`).
_Avoid_: Other content, embed, clip

**Published**:
The state of a content item that is visible on the portfolio. Unpublished items are drafts — stored in the backend but not returned by public read endpoints.
_Avoid_: Live, active, visible

**Admin**:
The portfolio owner — the only identity permitted to create, edit, or delete content. Authenticated via API key on all write requests.
_Avoid_: User, editor, author

## Example dialogue

> **Dev:** "Should the API return draft Projects?"
> **Domain expert:** "No — only **Published** content is returned by public endpoints. The **Admin** can see drafts through the API key-protected write endpoints."

> **Dev:** "When I add a new Project, where does it appear in the grid?"
> **Domain expert:** "It won't appear at all until it's **Published**. Once published, its position in the grid is set by the manual order — not by creation date."

**Admin Endpoint**:
A read endpoint under `/admin/*` that returns all content regardless of published state — including drafts. Protected by API key. Distinct from the public read endpoints which only return Published content.
_Avoid_: Private endpoint, internal endpoint

## Relationships

- A **Project**, **Article**, and **Media Item** are each a distinct kind of **Content** managed by the backend
- **Projects** are ordered manually (display order is set explicitly)
- **Articles** and **Media Items** are ordered by date (newest first)
- **Admin Endpoints** (`GET /admin/projects`, `GET /admin/articles`, `GET /admin/media`) return all content including drafts — used exclusively by the **Admin UI**
