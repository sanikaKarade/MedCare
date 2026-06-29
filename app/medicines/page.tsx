import { prisma } from "@/lib/prisma"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { MedicineCard } from "@/components/pharmacy/medicine-card"
import { CategoryFilter } from "@/components/pharmacy/category-filter"
import { SearchBar } from "@/components/pharmacy/search-bar"

interface MedicinesPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

export default async function MedicinesPage({
  searchParams,
}: MedicinesPageProps) {
  const { search = "" } = await searchParams

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          manufacturer: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          power: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
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
            Order genuine medicines, healthcare
            essentials, and wellness products
            delivered to your doorstep.
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>

          <div className="mt-6">
            <CategoryFilter />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Medicines
            </h2>

            <p className="text-muted-foreground">
              {products.length} medicine
              {products.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white py-20 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-800">
              No medicines found
            </h3>

            <p className="mt-3 text-slate-500">
              Try searching with another medicine
              name, manufacturer, or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <MedicineCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}