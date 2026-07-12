import type { Project } from '@shared/types'
import { adminFetchProjects, createProject, updateProject, deleteProject } from '../../api'
import AdminResourcePage, { AdminField, inputCls } from '../../components/admin/AdminResourcePage'

type ProjectForm = {
  title: string
  link: string
  image: string
  description: string
  displayOrder: number
  published: boolean
}

const emptyForm: ProjectForm = {
  title: '',
  link: '',
  image: '',
  description: '',
  displayOrder: 0,
  published: false,
}

export default function ProjectsAdminPage() {
  return (
    <AdminResourcePage
      title="Projects"
      newLabel="+ New project"
      singular="project"
      plural="projects"
      api={{
        list: adminFetchProjects,
        create: createProject,
        update: updateProject,
        remove: deleteProject,
      }}
      emptyForm={emptyForm}
      toForm={(p: Project) => ({
        title: p.title,
        link: p.link,
        image: p.image,
        description: p.description ?? '',
        displayOrder: p.displayOrder,
        published: p.published,
      })}
      toBody={(form: ProjectForm) => ({ ...form, description: form.description || null })}
      columns={[{ header: 'Order', cell: (p: Project) => p.displayOrder }]}
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
          <AdminField label="Link (URL)">
            <input
              required
              value={form.link}
              onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              className={inputCls}
            />
          </AdminField>
          <AdminField label="Image (URL)">
            <input
              required
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className={inputCls}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={inputCls}
            />
          </AdminField>
          <AdminField label="Display order">
            <input
              type="number"
              required
              value={form.displayOrder}
              onChange={(e) => setForm((f) => ({ ...f, displayOrder: Number(e.target.value) }))}
              className={inputCls}
            />
          </AdminField>
        </>
      )}
    />
  )
}
