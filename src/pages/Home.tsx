import { Link } from 'react-router-dom'

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  )
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9 5 9-5M3 17l9 5 9-5"/>
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.418-3.582 7.5-7 9-3.418-1.5-7-4.582-7-9V7l7-4z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5l2 2 3-3.5"/>
    </svg>
  )
}

export default function Home() {
  return (
    <section className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
        {/* subtle highlight */}
        <div className="pointer-events-none absolute inset-0 opacity-20"
             style={{
               background:
                 'radial-gradient(1200px 600px at -10% -20%, rgba(255,255,255,.8), rgba(255,255,255,0)), radial-gradient(800px 400px at 120% 120%, rgba(255,255,255,.5), rgba(255,255,255,0))'
             }}
        />
        <div className="relative p-8 md:p-10 text-white">
          <span className="inline-flex items-center gap-2 text-xs/5 font-medium opacity-90">
            USER & POSTS PORTAL
          </span>

          <h1 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight">
            Modern, güven veren bir yönetim arayüzü
          </h1>

          <p className="mt-3 max-w-2xl text-white/90">
            Kullanıcılar ve gönderiler üzerinde arama, oluşturma, düzenleme ve silme işlemleri.
            React + TypeScript + Tailwind ile performans ve temizliğe odaklı.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/users"
              className="inline-flex items-center rounded-lg bg-white/95 text-indigo-700 hover:bg-white px-4 py-2 text-sm font-medium shadow-sm"
            >
              Kullanıcılara Git
            </Link>
            <Link
              to="/posts"
              className="inline-flex items-center rounded-lg border border-white/40 text-white hover:bg-white/10 px-4 py-2 text-sm font-medium"
            >
              Gönderilere Git
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Feature card */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="group rounded-xl border bg-white hover:shadow-md transition-shadow">
          <div className="p-5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <IconBolt />
            </div>
            <h3 className="mt-3 font-semibold">Akıcı iş akışı</h3>
            <p className="mt-1 text-sm text-gray-600">
              Inline düzenleme ve tek ekranda anında kaydetme ile verimli çalışma.
            </p>
            <div className="mt-3 h-1 w-10 rounded-full bg-indigo-200 group-hover:w-14 group-hover:bg-indigo-300 transition-all"/>
          </div>
        </div>

        <div className="group rounded-xl border bg-white hover:shadow-md transition-shadow">
          <div className="p-5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-100">
              <IconLayers />
            </div>
            <h3 className="mt-3 font-semibold">Temiz bilgi mimarisi</h3>
            <p className="mt-1 text-sm text-gray-600">
              Tutarlı tipografi, boşluklar ve kontrast ile yüksek okunabilirlik.
            </p>
            <div className="mt-3 h-1 w-10 rounded-full bg-violet-200 group-hover:w-14 group-hover:bg-violet-300 transition-all"/>
          </div>
        </div>

        <div className="group rounded-xl border bg-white hover:shadow-md transition-shadow">
          <div className="p-5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-fuchsia-50 text-fuchsia-600 ring-1 ring-fuchsia-100">
              <IconShield />
            </div>
            <h3 className="mt-3 font-semibold">Gerçekçi CRUD senaryosu</h3>
            <p className="mt-1 text-sm text-gray-600">
              Kullanıcı ve gönderi modelleriyle uçtan uca güvenli CRUD deneyimi.
            </p>
            <div className="mt-3 h-1 w-10 rounded-full bg-fuchsia-200 group-hover:w-14 group-hover:bg-fuchsia-300 transition-all"/>
          </div>
        </div>
      </div>

      {/* Alt modül kartları */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Users</h3>
              <Link to="/users" className="text-sm text-indigo-600 hover:underline">Aç</Link>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Kullanıcıları listeleyin, arayın ve tek tıkla düzenleyin veya silin.
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-white">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Posts</h3>
              <Link to="/posts" className="text-sm text-indigo-600 hover:underline">Aç</Link>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Gönderileri görüntüleyin, kullanıcılarla eşleyin ve içerikleri yönetin.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
