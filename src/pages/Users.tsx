import { useEffect, useMemo, useState } from 'react'
import type { User } from '../types'
import { getUsers, createUser, updateUser, deleteUser } from '../lib/api'
import { useToast } from '../components/Toast'

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<User | null>(null)

  const [form, setForm] = useState<Omit<User, 'id'>>({
    name: '',
    username: '',
    email: '',
  })

  const { toast } = useToast()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (e: unknown) {
        const err = e as Error
        toast(err.message || 'Kullanıcılar yüklenemedi', 'error')
      } finally {
        setLoading(false)
      }
    })()
  }, [toast])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return users
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(s) ||
        u.username.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        String(u.id).includes(s),
    )
  }, [q, users])

  async function handleCreate() {
    if (!form.name.trim() || !form.username.trim() || !form.email.trim()) {
      toast('Lütfen tüm alanları doldurun', 'error')
      return
    }
    setBusy(true)
    try {
      const created = await createUser(form)
      setUsers((prev) => [created, ...prev])
      setForm({ name: '', username: '', email: '' })
      toast('Kullanıcı oluşturuldu', 'success')
    } catch (e: unknown) {
      toast((e as Error).message || 'Oluşturma başarısız', 'error')
    } finally {
      setBusy(false)
    }
  }

  async function handleSave(user: User) {
    setBusy(true)
    try {
      const updated = await updateUser(user)
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
      setEditing(null)
      toast('Kullanıcı güncellendi', 'success')
    } catch (e: unknown) {
      toast((e as Error).message || 'Güncelleme başarısız', 'error')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id: number) {
    setBusy(true)
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
      toast('Kullanıcı silindi', 'success')
    } catch (e: unknown) {
      toast((e as Error).message || 'Silme başarısız', 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-purple-500/10 px-6 py-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Kullanıcılar · listeleme, arama ve düzenleme
        </h1>
        <p className="text-slate-600">Yeni kullanıcı ekleyin, düzenleyin veya silin.</p>
      </div>

      {/* Create */}
      <div className="rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Yeni Kullanıcı</h3>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="input"
            placeholder="Ad Soyad"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <button
            onClick={handleCreate}
            disabled={busy}
            className="btn btn-primary"
          >
            {busy ? '...' : 'Oluştur'}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">Kayıtlar</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara..."
          className="input max-w-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="th">ID</th>
              <th className="th">Ad Soyad</th>
              <th className="th">Username</th>
              <th className="th">Email</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="td">Yükleniyor...</td>
              </tr>
            ) : list.length ? (
              list.map((u) => (
                <tr key={u.id}>
                  <td className="td">{u.id}</td>
                  <td className="td">
                    {editing?.id === u.id ? (
                      <input
                        className="input"
                        defaultValue={u.name}
                        onChange={(e) => (u.name = e.target.value)}
                      />
                    ) : (
                      u.name
                    )}
                  </td>
                  <td className="td">
                    {editing?.id === u.id ? (
                      <input
                        className="input"
                        defaultValue={u.username}
                        onChange={(e) => (u.username = e.target.value)}
                      />
                    ) : (
                      `@${u.username}`
                    )}
                  </td>
                  <td className="td">
                    {editing?.id === u.id ? (
                      <input
                        className="input"
                        defaultValue={u.email}
                        onChange={(e) => (u.email = e.target.value)}
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td className="td flex gap-2">
                    {editing?.id === u.id ? (
                      <>
                        <button className="btn btn-primary" onClick={() => handleSave(u)}>Kaydet</button>
                        <button className="btn btn-soft" onClick={() => setEditing(null)}>İptal</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-soft" onClick={() => setEditing(u)}>Düzenle</button>
                        <button className="btn btn-soft" onClick={() => handleDelete(u.id)}>Sil</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="td text-center text-slate-500">
                  Sonuç bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
