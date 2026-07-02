"use client"

import { useState } from "react"
import Link from "next/link"
import Script from "next/script"

import { useCart } from "@/contexts/cart-context"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all delivery details.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      })

      const order = await res.json()

      if (!order.id) {
        alert("Unable to create order.")
        setLoading(false)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "MedCare Connect",

        description: "Medicine Purchase",

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#2563eb",
        },

        handler: async function (response: any) {
          console.log(response)

          alert("Payment Successful!")

          clearCart()

          window.location.href = "/"
        },
      }

      const paymentObject = new window.Razorpay(options)

      paymentObject.open()

      setLoading(false)
    } catch (err) {
      console.error(err)

      alert("Payment Failed")

      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

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
      </>
    )
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="container mx-auto px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <Card>

              <CardHeader>
                <CardTitle>
                  Delivery Address
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">              <div>
                <Label>Full Name</Label>

                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Phone Number</Label>

                  <Input
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Address</Label>

                <Input
                  placeholder="House No., Street, Area"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>City</Label>

                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>State</Label>

                  <Input
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        state: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>PIN Code</Label>

                  <Input
                    placeholder="400001"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pincode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

            </CardContent>
          </Card>

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

        <Card className="h-fit">

          <CardHeader>
            <CardTitle>
              Order Summary
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

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
                  <span className="text-green-600">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <Button
                  className="mt-4 w-full"
                  disabled={loading}
                  onClick={handlePayment}
                >
                  {loading
                    ? "Processing..."
                    : "Proceed to Payment"}
                </Button>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>

    </>
  )
}
