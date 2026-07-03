"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface RazorpayButtonProps {
  totalPrice: number
  formData: {
    name: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
  }
  clearCart: () => void
}

export function RazorpayButton({
  totalPrice,
  formData,
  clearCart,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false)

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

      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      })

      const order = await orderResponse.json()

      if (!order.id) {
        throw new Error("Failed to create Razorpay order")
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,

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

        handler: async (response: any) => {
          const verifyResponse = await fetch(
            "/api/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
              
                formData,
              
                totalAmount: totalPrice,
              }),
            }
          )

          const result = await verifyResponse.json()

          if (result.success) {
            alert("Payment Successful!")

            clearCart()

            window.location.href = "/order-success"
          } else {
            alert("Payment Verification Failed")
          }
        },
      }

      const razorpay = new window.Razorpay(options)

      razorpay.open()

    } catch (error) {
      console.error(error)

      alert("Payment Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="mt-4 w-full"
      disabled={loading}
      onClick={handlePayment}
    >
      {loading
        ? "Processing..."
        : "Proceed to Payment"}
    </Button>
  )
}