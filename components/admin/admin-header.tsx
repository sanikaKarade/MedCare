import Link from "next/link"
import { Home, LayoutDashboard } from "lucide-react"

export function AdminHeader({ showBackToAdmin = true }: { showBackToAdmin?: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-4 text-sm">
      <Link
        href="/"
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-slate-600 transition hover:bg-white hover:text-blue-600"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      {showBackToAdmin && (
        <Link
          href="/admin"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-slate-600 transition hover:bg-white hover:text-blue-600"
        >
          <LayoutDashboard className="h-4 w-4" />
          Admin Home
        </Link>
      )}
    </div>
  )
}