import { useEffect, useMemo, useState } from 'react';
import type { Post, User } from '../types';
import { getPosts, getUsers, createPost, updatePost, deletePost } from '../lib/api';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<Post | null>(null);

  // create form
  const [form, setForm] = useState<Omit<Post, 'id'>>({
    userId: 1,
    title: '',
    body: '',
  });

  useEffect(() => {
    (async () => {
      const [p, u] = await Promise.all([getPosts(), getUsers()]);
      setPosts(p.slice(0, 30));
      setUsers(u);
      setLoading(false);
    })();
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter(p =>
      (p.title?.toLowerCase().includes(s)) ||
      (p.body?.toLowerCase().includes(s)) ||
      String(p.id).includes(s) ||
      String(p.userId).includes(s)
    );
  }, [posts, q]);

  const userName = (id: number) =>
    users.find(u => u.id === id)?.name ?? ` User ${id}`;

  async function handleCreate() {
    if (!form.title.trim()) return;
    const created = await createPost(form);
    setPosts(prev => [created, ...prev]);
    setForm({ userId: 1, title: '', body: '' });
  }

  async function handleSave(updated: Post) {
    const ok = await updatePost(updated);
    setPosts(prev => prev.map(p => (p.id === ok.id ? ok : p)));
    setEditing(null);
  }

  async function handleDelete(id: number) {
    await deletePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <section className="space-y-6">
      {/* Top banner (yalnızca Posts sayfası) */}
      <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-purple-500/10 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
              Posts
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              Inline Edit
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-500">
              Gönderiler · hızlı düzenleme ve filtreleme
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Kullanıcı ilişkilendirme, başlık ve içerik üzerinde tek tıkla düzenleme.
            </p>
          </div>

          {/* search */}
          <div className="w-full md:w-72">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title / body / id / userId…"
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Create Card */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">Yeni Post</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {posts.length} kayıt
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <select
              className="input"
              value={form.userId}
              onChange={(e) => setForm(f => ({ ...f, userId: Number(e.target.value) }))}
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} (id: {u.id})</option>
              ))}
            </select>

            <input
              className="input md:col-span-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            />

            <button className="btn btn-primary" onClick={handleCreate}>Create</button>

            <textarea
              className="input md:col-span-4"
              placeholder="Body (optional)"
              rows={3}
              value={form.body ?? ''}
              onChange={(e) => setForm(f => ({ ...f, body: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="th">ID</th>
              <th className="th">Title</th>
              <th className="th">User</th>
              <th className="th">Body</th>
              <th className="th w-44">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="td"><div className="h-4 w-8 rounded bg-slate-200 dark:bg-slate-700" /></td>
                  <td className="td"><div className="h-4 w-64 rounded bg-slate-200 dark:bg-slate-700" /></td>
                  <td className="td"><div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" /></td>
                  <td className="td"><div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" /></td>
                  <td className="td"></td>
                </tr>
              ))
            ) : list.length ? (
              list.map(p => (
                <tr key={p.id} className="row">
                  <td className="td">{p.id}</td>

                  <td className="td">
                    {editing?.id === p.id ? (
                      <input
                        className="input"
                        defaultValue={p.title}
                        onChange={(e) => (p.title = e.target.value)}
                      />
                    ) : (
                      <span className="font-medium">{p.title}</span>
                    )}
                  </td>

                  <td className="td">
                    {editing?.id === p.id ? (
                      <select
                        className="input"
                        defaultValue={p.userId}
                        onChange={(e) => (p.userId = Number(e.target.value))}
                      >
                        {users.map(u => (
                          <option key={u.id} value={u.id}>{u.name} (id: {u.id})</option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        {userName(p.userId)} <span className="text-slate-400">(id: {p.userId})</span>
                      </span>
                    )}
                  </td>

                  <td className="td">
                    {editing?.id === p.id ? (
                      <textarea
                        className="input"
                        rows={2}
                        defaultValue={p.body ?? ''}
                        onChange={(e) => (p.body = e.target.value)}
                      />
                    ) : (
                      <span className="text-slate-600 dark:text-slate-900">{p.body ?? ''}</span>
                    )}
                  </td>

                  <td className="td">
                    {editing?.id === p.id ? (
                      <div className="flex gap-2">
                        <button className="btn btn-primary" onClick={() => handleSave(p)}>Save</button>
                        <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button className="btn btn-ghost" onClick={() => setEditing(p)}>Edit</button>
                        <button className="btn btn-ghost" onClick={() => handleDelete(p.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="td text-slate-500 dark:text-slate-400" colSpan={5}>Sonuç bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}