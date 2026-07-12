import { useState, useEffect, type FormEvent } from 'react'

export interface AdminResourceApi<T, TBody> {
  list: () => Promise<T[]>
  create: (body: TBody) => Promise<T>
  update: (id: string, body: TBody) => Promise<T>
  remove: (id: string) => Promise<void>
}

export interface UseAdminResourceConfig<T, TForm, TBody> {
  api: AdminResourceApi<T, TBody>
  emptyForm: TForm
  toForm: (item: T) => TForm
  toBody: (form: TForm) => TBody
}

/**
 * The load / create / edit / delete / save state machine shared by every Admin
 * content-management Page. Owns all the logic; the page (and the chrome around
 * it) only render its state and call its actions.
 */
export function useAdminResource<
  T extends { id: string; title: string },
  TForm,
  TBody,
>({ api, emptyForm, toForm, toBody }: UseAdminResourceConfig<T, TForm, TBody>) {
  const [items, setItems] = useState<T[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)
  const [form, setForm] = useState<TForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState(false)

  async function load() {
    try {
      const data = await api.list()
      setItems(data)
    } catch {
      setLoadError(true)
      setItems([])
    }
  }

  // Mount only — matches the original per-page behavior.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    load()
  }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setFormOpen(true)
  }

  function openEdit(item: T) {
    setEditing(item)
    setForm(toForm(item))
    setError('')
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const body = toBody(form)
      if (editing) {
        await api.update(editing.id, body)
      } else {
        await api.create(body)
      }
      closeForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(item: T) {
    if (!window.confirm(`Delete "${item.title}"?`)) return
    await api.remove(item.id)
    await load()
  }

  return {
    items,
    formOpen,
    editing,
    form,
    setForm,
    saving,
    error,
    loadError,
    openCreate,
    openEdit,
    closeForm,
    handleSave,
    handleDelete,
  }
}
