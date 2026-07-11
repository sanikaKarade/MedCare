import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/is-admin"
import { prisma } from "@/lib/prisma"
import { ProductManager } from "@/components/admin/product-manager"

export default async function AdminProductsPage() {
  const adminId = await requireAdmin()
  if (!adminId) {
    redirect("/")
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-2">Medicines</h1>
        <p className="text-muted-foreground mb-8">
          Add, edit, or remove products from the pharmacy catalog.
        </p>
        <ProductManager products={JSON.parse(JSON.stringify(products))} />
      </div>
    </div>
  )
}
