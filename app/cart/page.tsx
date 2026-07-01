"use client"

import Image from "next/image"
import Link from "next/link"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

import { useCart } from "@/contexts/cart-context"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart()

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />

        <main className="flex-1">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
            <Image
               src="/placeholder-medicine.png"
              alt="Empty Cart"
              width={220}
              height={220}
            />

            <h1 className="mt-6 text-4xl font-bold">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-gray-500">
              Add medicines to your cart and they will appear here.
            </p>

            <Button asChild className="mt-8 bg-blue-600 hover:bg-blue-700">
              <Link href="/medicines">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-14">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
          Review your medicines before proceeding to a secure checkout.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-5 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-blue-50">
                      <Image
                        src={
                          item.image ||
                          "/placeholder-medicine.png"
                        }
                        alt={item.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-lg font-bold text-blue-600">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </Button>

                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </Button>
                    </div>

                    <Button
  variant="ghost"
  size="icon"
  className="text-red-500 hover:bg-red-50 hover:text-red-600"
  onClick={() => removeFromCart(item.id)}
>
  <Trash2 className="h-5 w-5" />
</Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span>Items</span>

                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total</span>

                  <span className="font-bold text-blue-600">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              <Button asChild className="w-full">
  <Link href="/checkout">
    Proceed to Checkout
  </Link>
</Button>

              <Button
                asChild
                variant="outline"
                className="mt-3 w-full"
              >
                <Link href="/medicines">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}