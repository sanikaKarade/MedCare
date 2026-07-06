import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CheckCircle2,
  ShoppingBag,
  Home,
  Package,
  Download,
} from "lucide-react"

import { prisma } from "@/lib/prisma"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PageProps {
  searchParams: Promise<{
    orderId?: string
  }>
}

export default async function OrderSuccessPage({
  searchParams,
}: PageProps) {
  const { orderId } = await searchParams

  if (!orderId) {
    notFound()
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order) {
    notFound()
  }

  return (
    <>
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-10">
            {/* Success */}
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 className="h-20 w-20 text-green-500" />

              <h1 className="mt-6 text-4xl font-bold">
                Order Placed Successfully
              </h1>

              <p className="mt-3 text-muted-foreground">
                Thank you for shopping with MedCare Connect.
              </p>
            </div>

            {/* Order Details */}
            <div className="mt-10 rounded-lg border p-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Order ID
                  </p>

                  <p className="font-semibold">
                    {order.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Invoice
                  </p>

                  <p className="font-semibold">
                    {order.invoiceNumber ?? "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment
                  </p>

                  <p className="font-semibold text-green-600">
                    {order.status}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Delivery
                  </p>

                  <p className="font-semibold">
                    {order.estimatedDelivery
                      ? new Date(
                          order.estimatedDelivery
                        ).toDateString()
                      : "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 rounded-lg border p-6">
              <div className="mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />

                <h2 className="text-lg font-semibold">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mt-8 rounded-lg border p-6">
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />

                <h2 className="text-lg font-semibold">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-1">
                <p>{order.customerName}</p>

                <p>{order.address}</p>

                <p>
                  {order.city}, {order.state}
                </p>

                <p>{order.pincode}</p>

                <p>{order.customerPhone}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/orders">
                  <Package className="mr-2 h-4 w-4" />
                  View Orders
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
              >
                <Link href="/medicines">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>

              <Button
                variant="ghost"
                asChild
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </>
  )
}