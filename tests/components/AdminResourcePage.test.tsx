import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AdminResourcePage, {
  AdminField,
  inputCls,
} from '../../src/components/admin/AdminResourcePage'

type Item = { id: string; title: string; published: boolean; note: string }
type Form = { title: string; published: boolean; note: string }

function makeApi(initial: Item[]) {
  let items = [...initial]
  return {
    list: vi.fn(async () => [...items]),
    create: vi.fn(async (body: Omit<Item, 'id'>) => {
      const created = { id: String(items.length + 1), ...body }
      items.push(created)
      return created
    }),
    update: vi.fn(async (id: string, body: Partial<Item>) => {
      items = items.map((i) => (i.id === id ? { ...i, ...body } : i))
      return items.find((i) => i.id === id)!
    }),
    remove: vi.fn(async (id: string) => {
      items = items.filter((i) => i.id !== id)
    }),
  }
}

const emptyForm: Form = { title: '', published: false, note: '' }

function renderPage(api: ReturnType<typeof makeApi>) {
  return render(
    <AdminResourcePage
      title="Widgets"
      newLabel="+ New widget"
      singular="widget"
      plural="widgets"
      api={api}
      emptyForm={emptyForm}
      toForm={(it: Item) => ({ title: it.title, published: it.published, note: it.note })}
      toBody={(f: Form) => ({ ...f })}
      columns={[{ header: 'Note', cell: (it: Item) => it.note }]}
      renderFields={(form, setForm) => (
        <AdminField label="Title">
          <input
            aria-label="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className={inputCls}
          />
        </AdminField>
      )}
    />,
  )
}

it('loads and lists existing records', async () => {
  const api = makeApi([
    { id: '1', title: 'Alpha', published: true, note: 'a' },
    { id: '2', title: 'Beta', published: false, note: 'b' },
  ])
  renderPage(api)
  await waitFor(() => {
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })
  expect(api.list).toHaveBeenCalledTimes(1)
})

it('creates a record and reloads the list', async () => {
  const api = makeApi([])
  renderPage(api)
  await waitFor(() => expect(screen.getByText('No widgets yet.')).toBeInTheDocument())

  fireEvent.click(screen.getByRole('button', { name: '+ New widget' }))
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Gamma' } })
  fireEvent.click(screen.getByRole('button', { name: 'Save' }))

  await waitFor(() => expect(screen.getByText('Gamma')).toBeInTheDocument())
  expect(api.create).toHaveBeenCalledWith(
    expect.objectContaining({ title: 'Gamma', published: false }),
  )
})

it('populates the form from the record and updates on save', async () => {
  const api = makeApi([{ id: '1', title: 'Alpha', published: false, note: 'a' }])
  renderPage(api)
  await waitFor(() => expect(screen.getByText('Alpha')).toBeInTheDocument())

  fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
  const title = screen.getByLabelText('Title') as HTMLInputElement
  expect(title.value).toBe('Alpha')

  fireEvent.change(title, { target: { value: 'Alpha 2' } })
  fireEvent.click(screen.getByRole('button', { name: 'Save' }))

  await waitFor(() => expect(screen.getByText('Alpha 2')).toBeInTheDocument())
  expect(api.update).toHaveBeenCalledWith('1', expect.objectContaining({ title: 'Alpha 2' }))
})

it('deletes a record when the confirm is accepted', async () => {
  const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
  const api = makeApi([{ id: '1', title: 'Alpha', published: true, note: 'a' }])
  renderPage(api)
  await waitFor(() => expect(screen.getByText('Alpha')).toBeInTheDocument())

  fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

  await waitFor(() => expect(screen.queryByText('Alpha')).not.toBeInTheDocument())
  expect(api.remove).toHaveBeenCalledWith('1')
  confirmSpy.mockRestore()
})

it('does not delete when the confirm is dismissed', async () => {
  const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)
  const api = makeApi([{ id: '1', title: 'Alpha', published: true, note: 'a' }])
  renderPage(api)
  await waitFor(() => expect(screen.getByText('Alpha')).toBeInTheDocument())

  fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

  expect(api.remove).not.toHaveBeenCalled()
  expect(screen.getByText('Alpha')).toBeInTheDocument()
  confirmSpy.mockRestore()
})

it('shows the save error message when a write fails', async () => {
  const api = makeApi([])
  api.create.mockRejectedValueOnce(new Error('Failed to create widget'))
  renderPage(api)
  await waitFor(() => expect(screen.getByText('No widgets yet.')).toBeInTheDocument())

  fireEvent.click(screen.getByRole('button', { name: '+ New widget' }))
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'X' } })
  fireEvent.click(screen.getByRole('button', { name: 'Save' }))

  await waitFor(() =>
    expect(screen.getByText('Failed to create widget')).toBeInTheDocument(),
  )
})

it('shows a load error when the list fails', async () => {
  const api = makeApi([])
  api.list.mockRejectedValueOnce(new Error('boom'))
  renderPage(api)
  await waitFor(() =>
    expect(screen.getByText('Failed to load widgets.')).toBeInTheDocument(),
  )
})
