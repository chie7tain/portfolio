import { afterEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import { buildApp } from '../src/app.js'
import { testDb, truncateAll, closeTestPool } from './helpers/db.js'
import { projects } from '../src/db/schema.js'
import { eq } from 'drizzle-orm'

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

// ── Test 1 ──────────────────────────────────────────────────────────────────
it('GET /projects returns [] when no projects exist', async () => {
  const res = await app.inject({ method: 'GET', url: '/projects' })
  expect(res.statusCode).toBe(200)
  expect(res.json()).toEqual([])
})

// ── Test 2 ──────────────────────────────────────────────────────────────────
it('POST /projects with API key creates a project', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'My App', link: 'https://example.com', image: 'img.png' },
  })
  expect(res.statusCode).toBe(201)
  const body = res.json()
  expect(body.id).toBeDefined()
  expect(body.title).toBe('My App')
  expect(body.published).toBe(false)
  expect(body.displayOrder).toBe(1)
})

// ── Test 3 ──────────────────────────────────────────────────────────────────
it('GET /projects does not return draft projects', async () => {
  await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Draft', link: 'https://example.com', image: 'img.png', published: false },
  })
  const res = await app.inject({ method: 'GET', url: '/projects' })
  expect(res.json()).toEqual([])
})

// ── Test 4 ──────────────────────────────────────────────────────────────────
it('GET /projects returns published projects', async () => {
  await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Live Project', link: 'https://example.com', image: 'img.png', published: true },
  })
  const res = await app.inject({ method: 'GET', url: '/projects' })
  expect(res.statusCode).toBe(200)
  const body = res.json()
  expect(body).toHaveLength(1)
  expect(body[0].title).toBe('Live Project')
})

// ── Test 5 ──────────────────────────────────────────────────────────────────
it('GET /projects/:id returns a published project', async () => {
  const create = await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Single', link: 'https://example.com', image: 'img.png', published: true },
  })
  const { id } = create.json()
  const res = await app.inject({ method: 'GET', url: `/projects/${id}` })
  expect(res.statusCode).toBe(200)
  expect(res.json().title).toBe('Single')
})

// ── Test 6 ──────────────────────────────────────────────────────────────────
it('GET /projects/:id returns 404 for a draft project', async () => {
  const create = await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Hidden', link: 'https://example.com', image: 'img.png', published: false },
  })
  const { id } = create.json()
  const res = await app.inject({ method: 'GET', url: `/projects/${id}` })
  expect(res.statusCode).toBe(404)
})

// ── Test 7 ──────────────────────────────────────────────────────────────────
it('POST /projects without API key returns 401', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/projects',
    payload: { title: 'Denied', link: 'https://example.com', image: 'img.png' },
  })
  expect(res.statusCode).toBe(401)
})

// ── Test 8 ──────────────────────────────────────────────────────────────────
it('POST /projects missing required field returns 400', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'No link' }, // missing link and image
  })
  expect(res.statusCode).toBe(400)
})

// ── Test 9 ──────────────────────────────────────────────────────────────────
it('GET /projects/not-a-uuid returns 400', async () => {
  const res = await app.inject({ method: 'GET', url: '/projects/not-a-uuid' })
  expect(res.statusCode).toBe(400)
})

// ── Test 10 ─────────────────────────────────────────────────────────────────
it('PATCH /projects/:id flips published without changing other fields', async () => {
  const create = await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Patchable', link: 'https://example.com', image: 'img.png', published: false },
  })
  const { id } = create.json()

  const res = await app.inject({
    method: 'PATCH',
    url: `/projects/${id}`,
    headers: { 'x-api-key': API_KEY },
    payload: { published: true },
  })
  expect(res.statusCode).toBe(200)
  const body = res.json()
  expect(body.published).toBe(true)
  expect(body.title).toBe('Patchable') // unchanged
})

// ── Test 11 ─────────────────────────────────────────────────────────────────
it('DELETE /projects/:id removes the project', async () => {
  const create = await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'ToDelete', link: 'https://example.com', image: 'img.png', published: true },
  })
  const { id } = create.json()

  const del = await app.inject({
    method: 'DELETE',
    url: `/projects/${id}`,
    headers: { 'x-api-key': API_KEY },
  })
  expect(del.statusCode).toBe(204)

  const get = await app.inject({ method: 'GET', url: `/projects/${id}` })
  expect(get.statusCode).toBe(404)
})

// ── Test 12 ─────────────────────────────────────────────────────────────────
it('GET /projects returns items in displayOrder ASC', async () => {
  await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Third', link: 'https://example.com', image: 'img.png', published: true, displayOrder: 3 },
  })
  await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'First', link: 'https://example.com', image: 'img.png', published: true, displayOrder: 1 },
  })
  await app.inject({
    method: 'POST',
    url: '/projects',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Second', link: 'https://example.com', image: 'img.png', published: true, displayOrder: 2 },
  })

  const res = await app.inject({ method: 'GET', url: '/projects' })
  const titles = res.json().map((p: { title: string }) => p.title)
  expect(titles).toEqual(['First', 'Second', 'Third'])
})
