import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/is-admin"
import { prisma } from "@/lib/prisma"
import { VendorApprovalList } from "@/components/admin/vendor-approval-list"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminVendorsPage() {
  const adminId = await requireAdmin()
  if (!adminId) {
    redirect("/")
  }

  const vendors = await prisma.vendor.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        <AdminHeader />
        <h1 className="text-4xl font-bold mb-2">Vendor Applications</h1>
        <p className="text-muted-foreground mb-8">
          Review pharmacy license documents and approve or reject vendors before they can list medicines.
        </p>
        <VendorApprovalList vendors={JSON.parse(JSON.stringify(vendors))} />
      </div>
    </div>
  )
}
