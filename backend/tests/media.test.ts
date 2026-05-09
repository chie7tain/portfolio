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

// ── Test 20 ─────────────────────────────────────────────────────────────────
it('GET /media returns [] when no media items exist', async () => {
  const res = await app.inject({ method: 'GET', url: '/media' })
  expect(res.statusCode).toBe(200)
  expect(res.json()).toEqual([])
})

// ── Test 21 ─────────────────────────────────────────────────────────────────
it('POST /media with API key creates a media item', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/media',
    headers: { 'x-api-key': API_KEY },
    payload: {
      title: 'My Podcast Episode',
      thumbnail: 'thumb.png',
      link: 'https://podcast.example.com/ep1',
      type: 'podcast',
    },
  })
  expect(res.statusCode).toBe(201)
  const body = res.json()
  expect(body.id).toBeDefined()
  expect(body.type).toBe('podcast')
  expect(body.published).toBe(false)
})

// ── Test 22 ─────────────────────────────────────────────────────────────────
it('GET /media does not return draft media items', async () => {
  await app.inject({
    method: 'POST',
    url: '/media',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Hidden', thumbnail: 'thumb.png', link: 'https://example.com', type: 'video', published: false },
  })
  const res = await app.inject({ method: 'GET', url: '/media' })
  expect(res.json()).toEqual([])
})

// ── Test 23 ─────────────────────────────────────────────────────────────────
it('GET /media returns published items ordered by createdAt DESC', async () => {
  await app.inject({
    method: 'POST',
    url: '/media',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'First Created', thumbnail: 'a.png', link: 'https://example.com/1', type: 'video', published: true },
  })
  // Small delay to ensure distinct createdAt values
  await new Promise((r) => setTimeout(r, 50))
  await app.inject({
    method: 'POST',
    url: '/media',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Second Created', thumbnail: 'b.png', link: 'https://example.com/2', type: 'podcast', published: true },
  })

  const res = await app.inject({ method: 'GET', url: '/media' })
  const titles = res.json().map((m: { title: string }) => m.title)
  expect(titles).toEqual(['Second Created', 'First Created'])
})

// ── Test 24 ─────────────────────────────────────────────────────────────────
it('GET /media/:id returns a media item with its type field', async () => {
  const create = await app.inject({
    method: 'POST',
    url: '/media',
    headers: { 'x-api-key': API_KEY },
    payload: { title: 'Video Item', thumbnail: 'v.png', link: 'https://example.com/v', type: 'video', published: true },
  })
  const { id } = create.json()

  const res = await app.inject({ method: 'GET', url: `/media/${id}` })
  expect(res.statusCode).toBe(200)
  expect(res.json().type).toBe('video')
})

// ── Test 25 ─────────────────────────────────────────────────────────────────
it('POST /media without API key returns 401', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/media',
    payload: { title: 'Denied', thumbnail: 'x.png', link: 'https://example.com', type: 'podcast' },
  })
  expect(res.statusCode).toBe(401)
})
