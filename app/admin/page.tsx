import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/is-admin"

export default async function AdminPage() {
  const adminId = await requireAdmin()
  if (!adminId) {
    redirect("/")
  }
  redirect("/admin/doctors")
}
