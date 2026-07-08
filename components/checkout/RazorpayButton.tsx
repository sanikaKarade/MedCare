"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { loadRazorpay } from "@/lib/payment"

import { CartItem } from "@/contexts/cart-context"

interface RazorpayButtonProps {
  totalPrice: number

  cart: CartItem[]

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
  cart,
  formData,
  clearCart,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    // Name
    if (!formData.name.trim()) {
      alert("Please enter your full name.")
      return
    }

    // Phone
    const phoneRegex = /^[6-9]\d{9}$/

    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number.")
      return
    }

    // Email
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Address
    if (!formData.address.trim()) {
      alert("Please enter your delivery address.")
      return
    }

    // City
    if (!formData.city.trim()) {
      alert("Please enter your city.")
      return
    }

    // State
    if (!formData.state.trim()) {
      alert("Please enter your state.")
      return
    }

    // PIN
    const pinRegex = /^\d{6}$/

    if (!pinRegex.test(formData.pincode)) {
      alert("Please enter a valid 6-digit PIN code.")
      return
    }

    try {
      setLoading(true)

      const loaded = await loadRazorpay()

      if (!loaded) {
        alert("Failed to load Razorpay.")
        return
      }

      // Create Razorpay Order

      const orderResponse = await fetch(
        "/api/payment/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            cart,
          }),
        }
      )

      const order = await orderResponse.json()

      if (!order.id) {
        throw new Error(order.error || "Unable to create Razorpay order.")
      }

      const options: RazorpayOptions = {
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

        modal: {
          ondismiss: () => {
            setLoading(false)

            alert("Payment cancelled.")
          },
        },

        handler: async (response) => {
          try {
            const verifyResponse = await fetch(
              "/api/payment/verify",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  formData,

                  cart,
                }),
              }
            )

            const result =
              await verifyResponse.json()

            if (result.success) {
              alert(
                "Payment Successful!"
              )

              clearCart()

              window.location.href =
                `/order/success?orderId=${result.orderId}`
            } else {
              alert(
                result.message ??
                  "Payment verification failed."
              )
            }
          } catch (error) {
            console.error(error)

            alert(
              "Unable to verify payment."
            )
          }
        },
      }

      const razorpay =
        new window.Razorpay(options)

      razorpay.on(
        "payment.failed",
        (response: any) => {
          console.error(response)

          setLoading(false)

          alert(
            response.error?.description ??
              "Payment failed."
          )
        }
      )

      razorpay.open()
    } catch (error) {
      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while processing payment."
      )
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
        : `Pay ₹${totalPrice}`}
    </Button>
  )
}