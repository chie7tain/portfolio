import { lazy, Suspense } from 'react'
import type { Article } from '@shared/types'
import { adminFetchArticles, createArticle, updateArticle, deleteArticle } from '../../api'
import AdminResourcePage, { AdminField, inputCls } from '../../components/admin/AdminResourcePage'

const MDEditor = lazy(() => import('@uiw/react-md-editor'))

type ArticleForm = {
  title: string
  body: string
  publishedAt: string
  published: boolean
}

const emptyForm: ArticleForm = { title: '', body: '', publishedAt: '', published: false }

export default function ArticlesAdminPage() {
  return (
    <AdminResourcePage
      title="Articles"
      newLabel="+ New article"
      singular="article"
      plural="articles"
      api={{
        list: adminFetchArticles,
        create: createArticle,
        update: updateArticle,
        remove: deleteArticle,
      }}
      emptyForm={emptyForm}
      toForm={(a: Article) => ({
        title: a.title,
        body: a.body,
        publishedAt: a.publishedAt ? a.publishedAt.slice(0, 16) : '',
        published: a.published,
      })}
      toBody={(form: ArticleForm) => ({
        title: form.title,
        body: form.body,
        published: form.published,
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
      })}
      columns={[
        {
          header: 'Published at',
          cell: (a: Article) =>
            a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : '—',
        },
      ]}
      renderFields={(form, setForm) => (
        <>
          <AdminField label="Title">
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputCls}
            />
          </AdminField>
          <AdminField label="Body">
            <div data-color-mode="dark" className="rounded overflow-hidden">
              <Suspense
                fallback={
                  <textarea
                    rows={10}
                    value={form.body}
                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                    className={inputCls}
                  />
                }
              >
                <MDEditor
                  value={form.body}
                  onChange={(v) => setForm((f) => ({ ...f, body: v ?? '' }))}
                  height={400}
                />
              </Suspense>
            </div>
          </AdminField>
          <AdminField label="Published at">
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
              className={inputCls}
            />
          </AdminField>
        </>
      )}
    />
  )
}
