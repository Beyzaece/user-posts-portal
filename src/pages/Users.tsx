// src/pages/Users.tsx
import { useEffect, useMemo, useState } from 'react'
import type { User } from '../types'
import { getUsers, createUser, updateUser, deleteUser } from '../lib/api'
import { useToast } from '../components/Toast' // toast(msg, 'success' | 'error')

export default function Users() {
  // ---------- state ----------
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [q, setQ] = useState('')

  // inline edit için
  const [editing, setEditing] = useState<User | null>(null)

  // create form
  const [form, setForm] = useState<Omit<User, 'id'>>({
    name: '',
    username: '',
    email: '',
  })

  const { toast } = useToast()

  // ---------- effects ----------
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (e: any) {
        toast(e?.message || 'Kullanıcılar yüklenemedi', 'error')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // ---------- memo (search) ----------
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

  // ---------- handlers ----------
  async function handleCreate() {
    if (!form.name.trim() || !form.username.trim() || !form.email.trim()) {
      toast('Lütfen tüm alanları doldurun', 'error')
      return
    }
    setBusy(true)
    try {
      // id GÖNDERME!
      const created = await createUser({
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
      })
      setUsers((prev) => [created, ...prev])
      setForm({ name: '', username: '', email: '' })
      toast('Kullanıcı oluşturuldu', 'success')
    } catch (e: any) {
      toast(e?.message || 'Oluşturma başarısız', 'error')
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
    } catch (e: any) {
      toast(e?.message || 'Güncelleme başarısız', 'error')
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
    } catch (e: any) {
      toast(e?.message || 'Silme başarısız', 'error')
    } finally {
      setBusy(false)
    }
  }

  // ---------- UI ----------
  return (
    <section className="space-y-6">
      {/* Section header */}
      {/* Üst bilgi / hero */}
{/* Top banner (only Users page) */}
<div className="rounded-2xl border border-slate-200/70 dark:border-slate-700
                bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-purple-500/10
                px-5 md:px-6 py-5 md:py-6 mb-6">
  <div className="inline-flex items-center gap-2">
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Users</span>
    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/80" />
    <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-600/10
                     text-indigo-700 dark:text-indigo-300 border border-indigo-400/30">
      CRUD
    </span>
  </div>

  <h1 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight
                 text-slate-900 dark:text-gray-500">
    Kullanıcılar · listeleme, arama ve düzenleme
  </h1>

  <p className="mt-1 text-sm md:text-base text-slate-600 dark:text-slate-400">
    Yeni kullanıcı ekleyin, var olanları düzenleyin veya silin.
  </p>
</div>

      {/* Create card */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Yeni Kullanıcı</h3>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="input md:col-span-1"
            placeholder="Ad Soyad"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="input md:col-span-1"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
          />
          <input
            className="input md:col-span-1"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <button
            onClick={handleCreate}
            disabled={busy}
            className="btn btn-primary md:col-span-1"
          >
            {busy ? '...' : 'Oluştur'}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-800">Kayıtlar</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: ad / username / email / id…"
          className="input max-w-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="th w-16">ID</th>
              <th className="th">Ad Soyad</th>
              <th className="th">Username</th>
              <th className="th">Email</th>
              <th className="th w-44 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="td">
                    <div className="h-4 w-10 rounded bg-slate-200" />
                  </td>
                  <td className="td">
                    <div className="h-4 w-52 rounded bg-slate-200" />
                  </td>
                  <td className="td">
                    <div className="h-4 w-36 rounded bg-slate-200" />
                  </td>
                  <td className="td">
                    <div className="h-4 w-64 rounded bg-slate-200" />
                  </td>
                  <td className="td" />
                </tr>
              ))
            ) : list.length ? (
              list.map((u) => (
                <tr
                  key={u.id}
                  className="odd:bg-white even:bg-slate-50 hover:bg-indigo-50/40"
                >
                  <td className="td font-medium text-slate-700">{u.id}</td>

                  {/* name */}
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

                  {/* username */}
                  <td className="td">
                    {editing?.id === u.id ? (
                      <input
                        className="input"
                        defaultValue={u.username}
                        onChange={(e) => (u.username = e.target.value)}
                      />
                    ) : (
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        @{u.username}
                      </span>
                    )}
                  </td>

                  {/* email */}
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

                  {/* actions */}
                  <td className="td">
                    <div className="flex items-center justify-end gap-2">
                      {editing?.id === u.id ? (
                        <>
                          <button
                            className="btn btn-primary"
                            disabled={busy}
                            onClick={() => handleSave(u)}
                          >
                            Kaydet
                          </button>
                          <button
                            className="btn btn-soft"
                            onClick={() => setEditing(null)}
                          >
                            İptal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-soft"
                            onClick={() => setEditing(u)}
                          >
                            Düzenle
                          </button>
                          <button
                            className="btn btn-soft"
                            onClick={() => handleDelete(u.id)}
                          >
                            Sil
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="td text-slate-500" colSpan={5}>
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