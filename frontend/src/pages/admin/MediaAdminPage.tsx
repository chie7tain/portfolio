import { useState, useEffect } from 'react'
import type { MediaItem } from '@shared/types'
import { adminFetchMedia, createMedia, updateMedia, deleteMedia } from '../../api'

type MediaForm = {
  title: string
  thumbnail: string
  link: string
  type: 'podcast' | 'video'
  published: boolean
}

const emptyForm: MediaForm = { title: '', thumbnail: '', link: '', type: 'podcast', published: false }

export default function MediaAdminPage() {
  const [items, setItems] = useState<MediaItem[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<MediaItem | null>(null)
  const [form, setForm] = useState<MediaForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')

  async function load() {
    try {
      const data = await adminFetchMedia()
      setItems(data)
    } catch {
      setLoadError('Failed to load media items.')
      setItems([])
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setFormOpen(true)
  }

  function openEdit(m: MediaItem) {
    setEditing(m)
    setForm({ title: m.title, thumbnail: m.thumbnail, link: m.link, type: m.type, published: m.published })
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
      if (editing) {
        await updateMedia(editing.id, form)
      } else {
        await createMedia(form)
      }
      closeForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(m: MediaItem) {
    if (!window.confirm(`Delete "${m.title}"?`)) return
    await deleteMedia(m.id)
    await load()
  }

  if (!items) return <p className="text-main-white/50">Loading…</p>
  if (loadError) return <p className="text-main-red text-sm">{loadError}</p>

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">Media</h1>
        <button onClick={openCreate} className="bg-main-red text-main-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity">
          + New item
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 flex flex-col gap-4">
          <h2 className="font-semibold">{editing ? 'Edit media item' : 'New media item'}</h2>
          <Field label="Title">
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Thumbnail (URL)">
            <input required value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Link (URL)">
            <input required value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Type">
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'podcast' | 'video' }))} className={inputCls}>
              <option value="podcast">Podcast</option>
              <option value="video">Video</option>
            </select>
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

      {items.length === 0 ? (
        <p className="text-main-white/50">No media items yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-main-white/50 text-left">
              <th className="pb-2 pr-4 font-medium">Title</th>
              <th className="pb-2 pr-4 font-medium">Type</th>
              <th className="pb-2 pr-4 font-medium">Status</th>
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {items.map(m => (
              <tr key={m.id} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-3 pr-4 font-medium">{m.title}</td>
                <td className="py-3 pr-4">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-main-blue/40 text-main-white/80 capitalize">{m.type}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.published ? 'bg-green-900/50 text-green-400' : 'bg-white/10 text-main-white/50'}`}>
                    {m.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 flex gap-2 justify-end">
                  <button onClick={() => openEdit(m)} className="text-xs text-main-white/50 hover:text-main-white transition-colors">Edit</button>
                  <button onClick={() => handleDelete(m)} className="text-xs text-main-red/70 hover:text-main-red transition-colors">Delete</button>
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
