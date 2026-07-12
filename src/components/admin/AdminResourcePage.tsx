import type { ReactNode, Dispatch, SetStateAction } from 'react'
import { useAdminResource, type AdminResourceApi } from './useAdminResource'

export const inputCls =
  'bg-white/5 border border-white/10 rounded px-3 py-2 text-main-white placeholder-main-white/30 focus:outline-none focus:border-main-red w-full'

export function AdminField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-main-white/60">{label}</span>
      {children}
    </label>
  )
}

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        published ? 'bg-green-900/50 text-green-400' : 'bg-white/10 text-main-white/50'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export interface AdminColumn<T> {
  header: string
  cell: (item: T) => ReactNode
}

export interface AdminResourcePageProps<T, TForm, TBody> {
  /** h1 heading, e.g. "Projects". */
  title: string
  /** "New" button label, e.g. "+ New project". */
  newLabel: string
  /** Singular noun for the form heading, e.g. "project" → "Edit project". */
  singular: string
  /** Plural noun for empty / load-error copy, e.g. "media items". */
  plural: string
  api: AdminResourceApi<T, TBody>
  emptyForm: TForm
  toForm: (item: T) => TForm
  toBody: (form: TForm) => TBody
  /** Middle table columns (Title, Status, and actions are supplied by the chrome). */
  columns: AdminColumn<T>[]
  /** Type-specific form fields (the shared Published checkbox is supplied by the chrome). */
  renderFields: (form: TForm, setForm: Dispatch<SetStateAction<TForm>>) => ReactNode
}

/**
 * An **Admin resource**: the configurable Page behind every Admin
 * content-management screen. Owns the table + form chrome; each content type
 * supplies only what differs (fields, columns, and its api quartet).
 */
export default function AdminResourcePage<
  T extends { id: string; title: string; published: boolean },
  TForm extends { published: boolean },
  TBody,
>({
  title,
  newLabel,
  singular,
  plural,
  api,
  emptyForm,
  toForm,
  toBody,
  columns,
  renderFields,
}: AdminResourcePageProps<T, TForm, TBody>) {
  const {
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
  } = useAdminResource<T, TForm, TBody>({ api, emptyForm, toForm, toBody })

  if (!items) return <p className="text-main-white/50">Loading…</p>
  if (loadError) return <p className="text-main-red text-sm">Failed to load {plural}.</p>

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">{title}</h1>
        <button
          onClick={openCreate}
          className="bg-main-red text-main-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          {newLabel}
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSave}
          className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 flex flex-col gap-4"
        >
          <h2 className="font-semibold">{editing ? `Edit ${singular}` : `New ${singular}`}</h2>
          {renderFields(form, setForm)}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="accent-main-red"
            />
            Published
          </label>
          {error && <p className="text-main-red text-sm">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-main-red text-main-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="text-sm text-main-white/50 hover:text-main-white transition-colors px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <p className="text-main-white/50">No {plural} yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-main-white/50 text-left">
              <th className="pb-2 pr-4 font-medium">Title</th>
              {columns.map((c) => (
                <th key={c.header} className="pb-2 pr-4 font-medium">
                  {c.header}
                </th>
              ))}
              <th className="pb-2 pr-4 font-medium">Status</th>
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-3 pr-4 font-medium">{item.title}</td>
                {columns.map((c) => (
                  <td key={c.header} className="py-3 pr-4 text-main-white/60">
                    {c.cell(item)}
                  </td>
                ))}
                <td className="py-3 pr-4">
                  <StatusBadge published={item.published} />
                </td>
                <td className="py-3 flex gap-2 justify-end">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-xs text-main-white/50 hover:text-main-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-xs text-main-red/70 hover:text-main-red transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
