import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

export function MedicineCard({ product }: MedicineCardProps) {
  return (
    <Card className="overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 bg-gray-50">
        <Image
          src={product.imageUrl || "/placeholder-medicine.png"}
          alt={product.name}
          fill
          className="object-contain p-6"
        />
      </div>

      <CardContent className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {product.power || "Standard Dose"}
          </p>
        </div>

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

        <p className="text-sm text-muted-foreground">
          {product.manufacturer}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          {product.stock > 0 ? (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive">
              Out of Stock
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/medicines/${product.id}`}>
              View Details
            </Link>
          </Button>

          <Button className="flex-1">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}