import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderDetailsPage({
  params,
}: PageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  const { id } = await params

  const order = await prisma.order.findFirst({
    where: {
      id,
      userId,
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

      <main className="container mx-auto max-w-5xl px-4 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Order Details
            </h1>

            <p className="text-muted-foreground">
              #{order.id.slice(-8).toUpperCase()}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/orders">
              Back
            </Link>
          </Button>
        </div>

        {/* Order Info */}

        <Card className="mb-6">
          <CardContent className="p-6">

            <div className="grid md:grid-cols-4 gap-6">

              <div>
                <p className="text-sm text-muted-foreground">
                  Status
                </p>

                <p className="font-semibold text-green-600">
                  {order.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total
                </p>

                <p className="font-semibold">
                  ₹{order.totalAmount}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Invoice
                </p>

                <p>{order.invoiceNumber}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Date
                </p>

                <p>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

          </CardContent>
        </Card>

        {/* Medicines */}

        <Card className="mb-6">

          <CardContent className="p-6">

            <h2 className="text-xl font-semibold mb-6">
              Ordered Medicines
            </h2>

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between border-b pb-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      {item.product.name}
                    </h3>

                    <p className="text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>

                  </div>

                  <div className="font-semibold">
                    ₹{item.price * item.quantity}
                  </div>

                </div>

              ))}

            </div>

          </CardContent>

        </Card>

        {/* Address */}

        <Card>

          <CardContent className="p-6">

            <h2 className="text-xl font-semibold mb-4">
              Delivery Address
            </h2>

            <p>{order.customerName}</p>

            <p>{order.address}</p>

            <p>
              {order.city}, {order.state}
            </p>

            <p>{order.pincode}</p>

            <p>{order.customerPhone}</p>

            <p>{order.customerEmail}</p>

          </CardContent>

        </Card>

      </main>

      <Footer />
    </>
  )
}