# REST API over GraphQL

The content API is straightforward CRUD over three content types. GraphQL's flexibility is unnecessary at this scale and adds significant setup complexity. REST endpoints are simpler to build with Fastify, easier to test, and keep the learning surface manageable alongside PostgreSQL and Drizzle.
