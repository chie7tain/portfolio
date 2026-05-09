import { useState, useEffect } from 'react'
import type { Project } from '@shared/types'
import { adminFetchProjects, createProject, updateProject, deleteProject } from '../../api'

type ProjectForm = {
  title: string
  link: string
  image: string
  description: string
  displayOrder: number
  published: boolean
}

const emptyForm: ProjectForm = { title: '', link: '', image: '', description: '', displayOrder: 0, published: false }

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState<ProjectForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')

  async function load() {
    try {
      const data = await adminFetchProjects()
      setProjects(data)
    } catch {
      setLoadError('Failed to load projects.')
      setProjects([])
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setFormOpen(true)
  }

  function openEdit(p: Project) {
    setEditing(p)
    setForm({ title: p.title, link: p.link, image: p.image, description: p.description ?? '', displayOrder: p.displayOrder, published: p.published })
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
      const body = { ...form, description: form.description || null }
      if (editing) {
        await updateProject(editing.id, body)
      } else {
        await createProject(body)
      }
      closeForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(p: Project) {
    if (!window.confirm(`Delete "${p.title}"?`)) return
    await deleteProject(p.id)
    await load()
  }

  if (!projects) return <p className="text-main-white/50">Loading…</p>
  if (loadError) return <p className="text-main-red text-sm">{loadError}</p>

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">Projects</h1>
        <button onClick={openCreate} className="bg-main-red text-main-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity">
          + New project
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 flex flex-col gap-4">
          <h2 className="font-semibold">{editing ? 'Edit project' : 'New project'}</h2>
          <Field label="Title">
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Link (URL)">
            <input required value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Image (URL)">
            <input required value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Display order">
            <input type="number" required value={form.displayOrder} onChange={e => setForm(f => ({ ...f, displayOrder: Number(e.target.value) }))} className={inputCls} />
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

      {projects.length === 0 ? (
        <p className="text-main-white/50">No projects yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-main-white/50 text-left">
              <th className="pb-2 pr-4 font-medium">Title</th>
              <th className="pb-2 pr-4 font-medium">Order</th>
              <th className="pb-2 pr-4 font-medium">Status</th>
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-3 pr-4 font-medium">{p.title}</td>
                <td className="py-3 pr-4 text-main-white/60">{p.displayOrder}</td>
                <td className="py-3 pr-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.published ? 'bg-green-900/50 text-green-400' : 'bg-white/10 text-main-white/50'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 flex gap-2 justify-end">
                  <button onClick={() => openEdit(p)} className="text-xs text-main-white/50 hover:text-main-white transition-colors">Edit</button>
                  <button onClick={() => handleDelete(p)} className="text-xs text-main-red/70 hover:text-main-red transition-colors">Delete</button>
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
