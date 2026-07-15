import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/is-admin"
import { prisma } from "@/lib/prisma"
import { OrderFulfillmentList } from "@/components/admin/order-fulfillment-list"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminOrdersPage() {
  const adminId = await requireAdmin()
  if (!adminId) {
    redirect("/")
  }

  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        <AdminHeader />
        <h1 className="text-4xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground mb-8">
          Review prescriptions and move orders through fulfillment.
        </p>
        <OrderFulfillmentList orders={JSON.parse(JSON.stringify(orders))} />
      </div>
    </div>
  )
}
