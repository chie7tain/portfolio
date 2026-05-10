import { pgTable, uuid, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  link: text('link').notNull(),
  image: text('image').notNull(),
  description: text('description'),
  published: boolean('published').default(false).notNull(),
  displayOrder: integer('display_order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  body: text('body').notNull(),
  publishedAt: timestamp('published_at'),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const mediaItems = pgTable('media_items', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  thumbnail: text('thumbnail').notNull(),
  link: text('link').notNull(),
  type: text('type').notNull(), // 'podcast' | 'video'
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
