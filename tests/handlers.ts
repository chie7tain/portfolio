import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { Project, Article, MediaItem } from '@shared/types'

export const mockProjects: Project[] = [
  { id: '1', title: 'Alpha', link: 'https://alpha.com', image: 'alpha.png', description: null, published: true, displayOrder: 1, createdAt: '2025-01-01T00:00:00.000Z' },
  { id: '2', title: 'Beta', link: 'https://beta.com', image: 'beta.png', description: null, published: true, displayOrder: 2, createdAt: '2025-01-02T00:00:00.000Z' },
  { id: '3', title: 'Gamma', link: 'https://gamma.com', image: 'gamma.png', description: null, published: true, displayOrder: 3, createdAt: '2025-01-03T00:00:00.000Z' },
]

export const mockArticles: Article[] = [
  { id: 'a1', title: 'First Article', body: '# Hello\n\nContent.', publishedAt: '2025-03-01T00:00:00.000Z', published: true, createdAt: '2025-03-01T00:00:00.000Z' },
  { id: 'a2', title: 'Second Article', body: '## World', publishedAt: '2025-04-01T00:00:00.000Z', published: true, createdAt: '2025-04-01T00:00:00.000Z' },
]

export const mockMedia: MediaItem[] = [
  { id: 'm1', title: 'Dev Podcast Ep1', thumbnail: 'ep1.png', link: 'https://podcast.com/ep1', type: 'podcast', published: true, createdAt: '2025-02-01T00:00:00.000Z' },
  { id: 'm2', title: 'Tech Talk Video', thumbnail: 'vid.png', link: 'https://youtube.com/watch?v=1', type: 'video', published: true, createdAt: '2025-02-15T00:00:00.000Z' },
]

export const handlers = [
  http.get('http://localhost:3000/projects', () => HttpResponse.json(mockProjects)),
  http.get('http://localhost:3000/articles', () => HttpResponse.json(mockArticles)),
  http.get('http://localhost:3000/articles/:id', ({ params }) => {
    const article = mockArticles.find((a) => a.id === params.id)
    if (!article) return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    return HttpResponse.json(article)
  }),
  http.get('http://localhost:3000/media', () => HttpResponse.json(mockMedia)),
]

export const server = setupServer(...handlers)
