import { redirect } from "next/navigation"
import { getCurrentVendor } from "@/lib/current-vendor"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductManager } from "@/components/admin/product-manager"

export default async function VendorProductsPage() {
  const vendor = await getCurrentVendor()
  if (!vendor) {
    redirect("/vendor/status")
  }

  const products = await prisma.product.findMany({
    where: { vendorId: vendor.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">{vendor.businessName}</h1>
        <p className="text-muted-foreground mb-8">
          Manage your medicine listings.
        </p>

        <ProductManager
          products={JSON.parse(JSON.stringify(products))}
          apiBase="/api/vendors/products"
          uploadEndpoint="vendorProductImage"
        />
      </main>

      <Footer />
    </div>
  )
}
