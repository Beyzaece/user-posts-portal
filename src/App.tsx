import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import Posts from './pages/Posts'
import Toaster from './components/Toast'

export default function App() {
  return (
    <Toaster>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container flex h-14 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              {/* minimal logo */}
              <svg
                className="h-5 w-5 text-indigo-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 2.2L6 8v8l6 3.3 6-3.3V8l-6-2.8z" />
              </svg>
              <span className="font-semibold tracking-tight">USER&POST PORTAL</span>
            </Link>

            <nav className="flex items-center gap-1">
              <Nav to="/" end>Home</Nav>
              <Nav to="/users">Users</Nav>
              <Nav to="/posts">Posts</Nav>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="container py-8 space-y-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t">
          <div className="container py-5 flex items-center justify-between text-sm text-gray-600">
            <span>© {new Date().getFullYear()}</span>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
              React · TypeScript · Tailwind
            </span>
          </div>
        </footer>
      </div>
    </Toaster>
  )
}


function Nav({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? 'text-indigo-600 bg-indigo-50'
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
        }`
      }
    >
      {children}
    </NavLink>
  )
}
