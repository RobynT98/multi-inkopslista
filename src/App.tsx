import { Outlet, Link } from "react-router-dom"

export default function App() {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-lg font-semibold">Multi-lnkopslista</Link>
          <span className="text-sm text-muted">offline, bilder och länkar</span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  )
}