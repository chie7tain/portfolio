import { afterEach, beforeAll, afterAll, it, expect } from 'vitest'
import { buildApp } from '../src/app.js'
import { testDb, truncateAll, closeTestPool } from './helpers/db.js'

const API_KEY = 'test-api-key'

process.env.API_KEY = API_KEY

let app: Awaited<ReturnType<typeof buildApp>>

beforeAll(async () => {
  app = await buildApp(testDb)
})

afterEach(async () => {
  await truncateAll()
})

afterAll(async () => {
  await app.close()
  await closeTestPool()
})

// ── Test 13 ─────────────────────────────────────────────────────────────────
it('GET /articles returns [] when no articles exist', async () => {
  const res = await app.inject({ method: 'GET', url: '/articles' })
  expect(res.statusCode).toBe(200)
  expect(res.json()).toEqual([])
})

// ── Test 14 ─────────────────────────────────────────────────────────────────
it('POST /articles with API key creates an article', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/articles',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Hello World', body: '# Hello\n\nFirst post.' },
  })
  expect(res.statusCode).toBe(201)
  const body = res.json()
  expect(body.id).toBeDefined()
  expect(body.title).toBe('Hello World')
  expect(body.published).toBe(false)
})

// ── Test 15 ─────────────────────────────────────────────────────────────────
it('GET /articles does not return draft articles', async () => {
  await app.inject({
    method: 'POST',
    url: '/articles',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Draft', body: 'Not ready.', published: false },
  })
  const res = await app.inject({ method: 'GET', url: '/articles' })
  expect(res.json()).toEqual([])
})

// ── Test 16 ─────────────────────────────────────────────────────────────────
it('GET /articles returns published articles ordered by publishedAt DESC', async () => {
  await app.inject({
    method: 'POST',
    url: '/articles',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Older', body: 'Old.', published: true, publishedAt: '2024-01-01T00:00:00.000Z' },
  })
  await app.inject({
    method: 'POST',
    url: '/articles',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Newer', body: 'New.', published: true, publishedAt: '2025-01-01T00:00:00.000Z' },
  })

  const res = await app.inject({ method: 'GET', url: '/articles' })
  const titles = res.json().map((a: { title: string }) => a.title)
  expect(titles).toEqual(['Newer', 'Older'])
})

// ── Test 17 ─────────────────────────────────────────────────────────────────
it('GET /articles/:id returns an article with its body', async () => {
  const create = await app.inject({
    method: 'POST',
    url: '/articles',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'With Body', body: '# Heading\n\nContent here.', published: true, publishedAt: '2025-01-01T00:00:00.000Z' },
  })
  const { id } = create.json()

  const res = await app.inject({ method: 'GET', url: `/articles/${id}` })
  expect(res.statusCode).toBe(200)
  expect(res.json().body).toBe('# Heading\n\nContent here.')
})

// ── Test 18 ─────────────────────────────────────────────────────────────────
it('POST /articles without API key returns 401', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/articles',
    payload: { title: 'Denied', body: 'Nope.' },
  })
  expect(res.statusCode).toBe(401)
})

// ── Test 19 ─────────────────────────────────────────────────────────────────
it('POST /articles with published=true but no publishedAt returns 400', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/articles',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Missing Date', body: 'Some content.', published: true },
  })
  expect(res.statusCode).toBe(400)
})
