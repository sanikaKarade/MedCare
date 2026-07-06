import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function OrdersPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <>
      <Navbar />

      <main className="container mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                You haven't placed any orders yet.
              </p>

              <Button className="mt-6" asChild>
                <Link href="/medicines">
                  Shop Medicines
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-5">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Order
                      </p>

                      <p className="font-semibold">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
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

                    <div className="flex items-center justify-end">
                      <Button asChild>
                        <Link
                          href={`/orders/${order.id}`}
                        >
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}