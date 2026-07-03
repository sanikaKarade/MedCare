import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function MedicineDetailsPage({
  params,
}: Props) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Image */}

          <div className="rounded-xl bg-white p-8 shadow">
            <Image
              src={product.imageUrl || "/medicine-placeholder.png"}
              alt={product.name}
              width={500}
              height={500}
              className="mx-auto object-contain"
            />
          </div>

          {/* Details */}

          <div>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            {product.power && (
              <p className="mt-2 text-lg text-gray-500">
                {product.power}
              </p>
            )}

            <p className="mt-6 text-3xl font-bold text-blue-600">
              ₹{product.price}
            </p>

            <div className="mt-6 space-y-2">

              <p>
                <span className="font-semibold">
                  Manufacturer:
                </span>{" "}
                {product.manufacturer}
              </p>

              <p>
                <span className="font-semibold">
                  Stock:
                </span>{" "}
                {product.stock}
              </p>

            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">
                Description
              </h2>

              <p className="mt-3 text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="mt-10 flex gap-4">

              <Button size="lg">
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="/medicines">
                  Back
                </Link>
              </Button>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}