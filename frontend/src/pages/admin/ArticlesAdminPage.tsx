import { useState, useEffect, lazy, Suspense } from 'react'
import type { Article } from '@shared/types'
import { adminFetchArticles, createArticle, updateArticle, deleteArticle } from '../../api'

const MDEditor = lazy(() => import('@uiw/react-md-editor'))

type ArticleForm = {
  title: string
  body: string
  publishedAt: string
  published: boolean
}

const emptyForm: ArticleForm = { title: '', body: '', publishedAt: '', published: false }

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState<Article[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Article | null>(null)
  const [form, setForm] = useState<ArticleForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')

  async function load() {
    try {
      const data = await adminFetchArticles()
      setArticles(data)
    } catch {
      setLoadError('Failed to load articles.')
      setArticles([])
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setFormOpen(true)
  }

  function openEdit(a: Article) {
    setEditing(a)
    setForm({
      title: a.title,
      body: a.body,
      publishedAt: a.publishedAt ? a.publishedAt.slice(0, 16) : '',
      published: a.published,
    })
    setError('')
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const body = {
        title: form.title,
        body: form.body,
        published: form.published,
        ...(form.publishedAt ? { publishedAt: new Date(form.publishedAt).toISOString() } : {}),
      }
      if (editing) {
        await updateArticle(editing.id, body)
      } else {
        await createArticle(body)
      }
      closeForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(a: Article) {
    if (!window.confirm(`Delete "${a.title}"?`)) return
    await deleteArticle(a.id)
    await load()
  }

  if (!articles) return <p className="text-main-white/50">Loading…</p>
  if (loadError) return <p className="text-main-red text-sm">{loadError}</p>

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">Articles</h1>
        <button onClick={openCreate} className="bg-main-red text-main-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity">
          + New article
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 flex flex-col gap-4">
          <h2 className="font-semibold">{editing ? 'Edit article' : 'New article'}</h2>
          <Field label="Title">
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Body">
            <div data-color-mode="dark" className="rounded overflow-hidden">
              <Suspense fallback={<textarea rows={10} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} className={inputCls} />}>
                <MDEditor
                  value={form.body}
                  onChange={v => setForm(f => ({ ...f, body: v ?? '' }))}
                  height={400}
                />
              </Suspense>
            </div>
          </Field>
          <Field label="Published at">
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={e => setForm(f => ({ ...f, publishedAt: e.target.value }))}
              className={inputCls}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="accent-main-red" />
            Published
          </label>
          {error && <p className="text-main-red text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-main-red text-main-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 transition-opacity">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={closeForm} className="text-sm text-main-white/50 hover:text-main-white transition-colors px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      )}

      {articles.length === 0 ? (
        <p className="text-main-white/50">No articles yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-main-white/50 text-left">
              <th className="pb-2 pr-4 font-medium">Title</th>
              <th className="pb-2 pr-4 font-medium">Published at</th>
              <th className="pb-2 pr-4 font-medium">Status</th>
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {articles.map(a => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-3 pr-4 font-medium">{a.title}</td>
                <td className="py-3 pr-4 text-main-white/60">
                  {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : '—'}
                </td>
                <td className="py-3 pr-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${a.published ? 'bg-green-900/50 text-green-400' : 'bg-white/10 text-main-white/50'}`}>
                    {a.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 flex gap-2 justify-end">
                  <button onClick={() => openEdit(a)} className="text-xs text-main-white/50 hover:text-main-white transition-colors">Edit</button>
                  <button onClick={() => handleDelete(a)} className="text-xs text-main-red/70 hover:text-main-red transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-main-white/60">{label}</span>
      {children}
    </label>
  )
}

const inputCls = 'bg-white/5 border border-white/10 rounded px-3 py-2 text-main-white placeholder-main-white/30 focus:outline-none focus:border-main-red w-full'
