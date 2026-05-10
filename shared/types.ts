export interface Project {
  id: string
  title: string
  link: string
  image: string
  description: string | null
  published: boolean
  displayOrder: number
  createdAt: string
}

export interface Article {
  id: string
  title: string
  body: string
  publishedAt: string | null
  published: boolean
  createdAt: string
}

export interface MediaItem {
  id: string
  title: string
  thumbnail: string
  link: string
  type: 'podcast' | 'video'
  published: boolean
  createdAt: string
}
