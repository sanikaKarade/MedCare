import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/is-admin"
import { prisma } from "@/lib/prisma"
import { DoctorApprovalList } from "@/components/admin/doctor-approval-list"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminDoctorsPage() {
  const adminId = await requireAdmin()
  if (!adminId) {
    redirect("/")
  }

  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        <AdminHeader />
        <h1 className="text-4xl font-bold mb-2">Doctor Applications</h1>
        <p className="text-muted-foreground mb-8">
          Review documents and approve or reject doctors before they appear publicly.
        </p>
        <DoctorApprovalList doctors={JSON.parse(JSON.stringify(doctors))} />
      </div>
    </div>
  )
}
