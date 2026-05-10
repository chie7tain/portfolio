import type { Project, Article, MediaItem } from '@shared/types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const SESSION_KEY = 'apiKey'

function authHeaders(): HeadersInit {
  const key = sessionStorage.getItem(SESSION_KEY) ?? ''
  return { 'Content-Type': 'application/json', 'x-api-key': key }
}

function handle401() {
  sessionStorage.removeItem(SESSION_KEY)
  window.location.href = '/admin/login'
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects`)
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${BASE_URL}/articles`)
  if (!res.ok) throw new Error('Failed to fetch articles')
  return res.json()
}

export async function fetchArticle(id: string): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles/${id}`)
  if (!res.ok) throw new Error('Article not found')
  return res.json()
}

export async function fetchMedia(): Promise<MediaItem[]> {
  const res = await fetch(`${BASE_URL}/media`)
  if (!res.ok) throw new Error('Failed to fetch media')
  return res.json()
}

// Used by LoginPage to validate a key without triggering a hard redirect on 401
export async function validateKey(key: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/projects`, {
    headers: { 'x-api-key': key },
  })
  if (res.status === 401) throw new Error('Unauthorized')
  if (!res.ok) throw new Error('Server error')
}

// Admin read endpoints — return all content including drafts

export async function adminFetchProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/admin/projects`, { headers: authHeaders() })
  if (res.status === 401) { handle401(); return [] }
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function adminFetchArticles(): Promise<Article[]> {
  const res = await fetch(`${BASE_URL}/admin/articles`, { headers: authHeaders() })
  if (res.status === 401) { handle401(); return [] }
  if (!res.ok) throw new Error('Failed to fetch articles')
  return res.json()
}

export async function adminFetchMedia(): Promise<MediaItem[]> {
  const res = await fetch(`${BASE_URL}/admin/media`, { headers: authHeaders() })
  if (res.status === 401) { handle401(); return [] }
  if (!res.ok) throw new Error('Failed to fetch media')
  return res.json()
}

// Projects CRUD

export async function createProject(body: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) })
  if (res.status === 401) { handle401(); throw new Error('Unauthorized') }
  if (!res.ok) throw new Error('Failed to create project')
  return res.json()
}

export async function updateProject(id: string, body: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(body) })
  if (res.status === 401) { handle401(); throw new Error('Unauthorized') }
  if (!res.ok) throw new Error('Failed to update project')
  return res.json()
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/projects/${id}`, { method: 'DELETE', headers: authHeaders() })
  if (res.status === 401) { handle401(); return }
  if (!res.ok) throw new Error('Failed to delete project')
}

// Articles CRUD

export async function createArticle(body: Omit<Article, 'id' | 'createdAt'>): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) })
  if (res.status === 401) { handle401(); throw new Error('Unauthorized') }
  if (!res.ok) throw new Error('Failed to create article')
  return res.json()
}

export async function updateArticle(id: string, body: Partial<Omit<Article, 'id' | 'createdAt'>>): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(body) })
  if (res.status === 401) { handle401(); throw new Error('Unauthorized') }
  if (!res.ok) throw new Error('Failed to update article')
  return res.json()
}

export async function deleteArticle(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/articles/${id}`, { method: 'DELETE', headers: authHeaders() })
  if (res.status === 401) { handle401(); return }
  if (!res.ok) throw new Error('Failed to delete article')
}

// Media CRUD

export async function createMedia(body: Omit<MediaItem, 'id' | 'createdAt'>): Promise<MediaItem> {
  const res = await fetch(`${BASE_URL}/media`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) })
  if (res.status === 401) { handle401(); throw new Error('Unauthorized') }
  if (!res.ok) throw new Error('Failed to create media item')
  return res.json()
}

export async function updateMedia(id: string, body: Partial<Omit<MediaItem, 'id' | 'createdAt'>>): Promise<MediaItem> {
  const res = await fetch(`${BASE_URL}/media/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(body) })
  if (res.status === 401) { handle401(); throw new Error('Unauthorized') }
  if (!res.ok) throw new Error('Failed to update media item')
  return res.json()
}

export async function deleteMedia(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/media/${id}`, { method: 'DELETE', headers: authHeaders() })
  if (res.status === 401) { handle401(); return }
  if (!res.ok) throw new Error('Failed to delete media item')
}
