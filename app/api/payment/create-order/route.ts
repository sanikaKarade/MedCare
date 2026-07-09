import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import razorpay from "@/lib/razorpay"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cart, prescriptionFile } = await req.json()

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Only trust product id + quantity from the client. Price always comes
    // from the database — never from the request body.
    const ids = cart.map((item: any) => item.id)
    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
    })

    if (products.length !== ids.length) {
      return NextResponse.json(
        { error: "One or more items in your cart no longer exist." },
        { status: 400 }
      )
    }

    // Prescription requirement is decided from the database, never from the
    // client-supplied cart flags, since those could be tampered with.
    const requiresPrescription = products.some((p) => p.prescription)
    if (requiresPrescription && !prescriptionFile) {
      return NextResponse.json(
        { error: "A prescription upload is required for one or more items in your cart." },
        { status: 400 }
      )
    }

    let totalAmount = 0
    for (const item of cart) {
      const product = products.find((p) => p.id === item.id)
      const quantity = Number(item.quantity)

      if (!product || !Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json({ error: "Invalid cart item" }, { status: 400 })
      }
      if (product.stock < quantity) {
        return NextResponse.json(
          { error: `${product.name} only has ${product.stock} left in stock.` },
          { status: 400 }
        )
      }

      totalAmount += product.price * quantity
    }

    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // ₹ to paise, computed server-side
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Create Order Error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
