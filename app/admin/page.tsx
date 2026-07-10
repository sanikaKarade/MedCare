import Link from "next/link"
import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/is-admin"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Package } from "lucide-react"

export default async function AdminPage() {
  const adminId = await requireAdmin()
  if (!adminId) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-3xl py-16 px-4">
        <h1 className="mb-8 text-4xl font-bold">Admin</h1>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/admin/doctors">
            <Card className="transition hover:border-blue-400 hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <Users className="h-10 w-10 text-blue-600" />
                <h2 className="text-lg font-semibold">Doctor Applications</h2>
                <p className="text-sm text-muted-foreground">
                  Review and approve doctor registrations.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card className="transition hover:border-blue-400 hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <Package className="h-10 w-10 text-blue-600" />
                <h2 className="text-lg font-semibold">Orders</h2>
                <p className="text-sm text-muted-foreground">
                  Review prescriptions and manage fulfillment.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

