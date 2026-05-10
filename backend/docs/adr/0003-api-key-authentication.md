# API key authentication for write operations

Only the portfolio owner ever creates or modifies content, so a full username/password auth system (JWT, sessions) would be unnecessary complexity. A single API key — stored as an environment variable and checked on every write request — is sufficient and simpler to maintain. Read endpoints (fetching published content) remain public.
