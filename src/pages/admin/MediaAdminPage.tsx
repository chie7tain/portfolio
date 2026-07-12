import type { MediaItem } from '@shared/types'
import { adminFetchMedia, createMedia, updateMedia, deleteMedia } from '../../api'
import AdminResourcePage, { AdminField, inputCls } from '../../components/admin/AdminResourcePage'

type MediaForm = {
  title: string
  thumbnail: string
  link: string
  type: 'podcast' | 'video'
  published: boolean
}

const emptyForm: MediaForm = {
  title: '',
  thumbnail: '',
  link: '',
  type: 'podcast',
  published: false,
}

export default function MediaAdminPage() {
  return (
    <AdminResourcePage
      title="Media"
      newLabel="+ New item"
      singular="media item"
      plural="media items"
      api={{
        list: adminFetchMedia,
        create: createMedia,
        update: updateMedia,
        remove: deleteMedia,
      }}
      emptyForm={emptyForm}
      toForm={(m: MediaItem) => ({
        title: m.title,
        thumbnail: m.thumbnail,
        link: m.link,
        type: m.type,
        published: m.published,
      })}
      toBody={(form: MediaForm) => form}
      columns={[
        {
          header: 'Type',
          cell: (m: MediaItem) => (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-main-blue/40 text-main-white/80 capitalize">
              {m.type}
            </span>
          ),
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
          <AdminField label="Thumbnail (URL)">
            <input
              required
              value={form.thumbnail}
              onChange={(e) => setForm((f) => ({ ...f, thumbnail: e.target.value }))}
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
          <AdminField label="Type">
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'podcast' | 'video' }))}
              className={inputCls}
            >
              <option value="podcast">Podcast</option>
              <option value="video">Video</option>
            </select>
          </AdminField>
        </>
      )}
    />
  )
}
