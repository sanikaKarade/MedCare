"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { useCart } from "@/contexts/cart-context"

interface MedicineCardProps {
  product: {
    id: string
    name: string
    description: string | null
    manufacturer: string | null
    category: string | null
    power: string | null
    imageUrl: string | null
    price: number
    stock: number
    prescription: boolean
  }
}

export function MedicineCard({
  product,
}: MedicineCardProps) {
  const router = useRouter()
  const { cart, addToCart } = useCart()
  const isInCart = cart.some(
    (item) => item.id === product.id
  )

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
    })
  }

  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <Image
          src={product.imageUrl || "/medicine-placeholder.png"}
          alt={product.name}
          fill
          className="object-contain p-6"
        />
      </div>

      <CardContent className="space-y-4 p-5">
        {/* Medicine Name */}
        <div>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
    {product.name}
</h3>

<p className="mt-1 text-sm text-slate-500">
    {product.power || "Standard Dose"}
</p>
        </div>

        {/* Category & Prescription */}
        <div className="flex flex-wrap gap-2">
          {product.category && (
            <Badge variant="secondary">
              {product.category}
            </Badge>
          )}

          {product.prescription && (
            <Badge variant="destructive">
              Prescription Required
            </Badge>
          )}
        </div>

        {/* Manufacturer */}
        <p className="text-sm text-slate-600">
    {product.manufacturer}
</p>
        {/* Price & Stock */}
        <div className="flex items-center justify-between">
        <div>
    <p className="text-3xl font-bold text-blue-700">
        ₹{product.price}
    </p>

    <p className="text-xs text-slate-400">
        Inclusive of all taxes
    </p>
</div>

          {product.stock > 0 ? (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              In Stock ({product.stock})
            </Badge>
          ) : (
            <Badge variant="destructive">
              Out of Stock
            </Badge>
          )}
        </div>

        
        <div className="space-y-3">

        <div className="mt-5 flex gap-3">
  <Button
    asChild
    variant="outline"
    className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
  >
    <Link href={`/medicines/${product.id}`}>
      View Details
    </Link>
  </Button>

  {isInCart ? (
    <Button
      className="flex-1 bg-blue-600 hover:bg-blue-700"
      onClick={() => router.push("/cart")}
    >
      ✓ View Cart
    </Button>
  ) : (
    <Button
      className="flex-1 bg-blue-600 hover:bg-blue-700"
      disabled={product.stock === 0}
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  )}
</div>

</div>
      </CardContent>
    </Card>
  )
}