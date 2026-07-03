"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItem } from "@/contexts/cart-context"

interface OrderSummaryProps {
  cart: CartItem[]
  totalPrice: number
  children?: React.ReactNode
}

export function OrderSummary({
  cart,
  totalPrice,
  children,
}: OrderSummaryProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>

                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}