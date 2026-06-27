import { prisma } from "@/lib/prisma"
import { MedicineCard } from "@/components/pharmacy/medicine-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryFilter } from "@/components/pharmacy/category-filter"

export default async function MedicinesPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-bold">
            Online Pharmacy
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100">
            Order genuine medicines, healthcare essentials,
            and wellness products delivered to your doorstep.
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

            <Input
              placeholder="Search medicines..."
              className="h-12 rounded-full bg-white pl-12 text-black"
            />
          </div>
          <CategoryFilter />
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Popular Medicines
            </h2>

            <p className="text-muted-foreground">
              {products.length} medicines available
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <MedicineCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
