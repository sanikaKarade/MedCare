"use client"

import { useState } from "react"
import Link from "next/link"

import { useCart } from "@/contexts/cart-context"

import { AddressForm } from "@/components/checkout/AddressForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { RazorpayButton } from "@/components/checkout/RazorpayButton"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export default function CheckoutPage() {
  const {
    cart,
    totalPrice,
    clearCart,
  } = useCart()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">
          Your cart is empty
        </h2>

        <p className="mt-3 text-gray-500">
          Add medicines before proceeding to checkout.
        </p>

        <Button asChild className="mt-6">
          <Link href="/medicines">
            Browse Medicines
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Side */}

        <div className="space-y-6 lg:col-span-2">

          <AddressForm
            formData={formData}
            setFormData={setFormData}
          />

          <Card>
            <CardHeader>
              <CardTitle>
                Payment Method
              </CardTitle>
            </CardHeader>

            <CardContent>
              <RadioGroup defaultValue="razorpay">

                <div className="flex items-center space-x-2">

                  <RadioGroupItem
                    value="razorpay"
                    id="razorpay"
                  />

                  <Label htmlFor="razorpay">
                    Pay Online (Razorpay)
                  </Label>

                </div>

              </RadioGroup>
            </CardContent>
          </Card>

        </div>

        {/* Right Side */}

        <OrderSummary
          cart={cart}
          totalPrice={totalPrice}
        >
          <RazorpayButton
            totalPrice={totalPrice}
            cart={cart}
            formData={formData}
            clearCart={clearCart}
          />
        </OrderSummary>

      </div>
    </div>
  )
}