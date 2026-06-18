import { prisma } from "@/lib/prisma"

export default async function MedicinesPage() {
  const products = await prisma.product.findMany()

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Online Pharmacy
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4"
          >
            <h2 className="font-semibold">
              {product.name}
            </h2>

            <p>{product.description}</p>

            <p className="mt-2">
              ₹{product.price}
            </p>

            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}