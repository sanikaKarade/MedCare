import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import razorpay from "@/lib/razorpay"
import { createNotification } from "@/lib/notify"
import { parseBody } from "@/lib/parse-body"
import { verifyPaymentSchema } from "@/lib/validations"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const parsed = await parseBody(req, verifyPaymentSchema)
    if ("error" in parsed) return parsed.error

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      cart,
      prescriptionFile,
    } = parsed.data

    // Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      )
    }

    // Recompute the total from the database — never trust totalAmount or
    // item.price from the client. This is the fix for the price-tampering bug.
    const ids = cart.map((item) => item.id)
    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
    })

    if (products.length !== ids.length) {
      return NextResponse.json(
        { success: false, message: "One or more products no longer exist" },
        { status: 400 }
      )
    }

    // Same check as create-order, repeated here since this is the step that
    // actually writes the Order — never trust the client on this either.
    const requiresPrescription = products.some((p) => p.prescription)
    if (requiresPrescription && !prescriptionFile) {
      return NextResponse.json(
        {
          success: false,
          message: "A prescription upload is required for one or more items in your cart.",
        },
        { status: 400 }
      )
    }

    let computedTotal = 0
    const orderItemsData: { productId: string; quantity: number; price: number }[] = []

    for (const item of cart) {
      const product = products.find((p) => p.id === item.id)!

      computedTotal += product.price * item.quantity
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price, // server-truth price, not client-supplied
      })
    }

    // Confirm what was actually charged via Razorpay matches our own
    // computed total — catches any tampering that happened before this step.
    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id)
    const chargedAmount = Number(razorpayOrder.amount) // in paise
    const expectedAmount = Math.round(computedTotal * 100)

    if (chargedAmount !== expectedAmount) {
      console.error(
        `Payment amount mismatch: charged ${chargedAmount}, expected ${expectedAmount}`
      )
      return NextResponse.json(
        { success: false, message: "Payment amount does not match cart total" },
        { status: 400 }
      )
    }

    const invoiceNumber = `INV-${Date.now()}`
    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3)

    // Re-check stock and decrement it atomically with order creation, so two
    // concurrent checkouts can't both succeed on the last unit of stock.
    const order = await prisma.$transaction(async (tx) => {
      for (const item of orderItemsData) {
        const product = await tx.product.findUnique({ where: { id: item.productId } })
        if (!product || product.stock < item.quantity) {
          throw new Error(`INSUFFICIENT_STOCK:${product?.name ?? item.productId}`)
        }
      }

      const createdOrder = await tx.order.create({
        data: {
          userId,
          totalAmount: computedTotal,
          status: "CONFIRMED",
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          invoiceNumber,
          estimatedDelivery,
          prescriptionFile: prescriptionFile || null,
        },
      })

      await tx.orderItem.createMany({
        data: orderItemsData.map((item) => ({
          orderId: createdOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      })

      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      return createdOrder
    })

    await createNotification({
      userId,
      title: "Order Placed",
      message: `Your order ${order.invoiceNumber} has been placed and is being processed.`,
      type: "order",
    })

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error("Verify Payment Error:", error)

    if (error instanceof Error && error.message.startsWith("INSUFFICIENT_STOCK:")) {
      // Payment already succeeded on Razorpay's side at this point — this is
      // a rare race condition (stock ran out between create-order and verify).
      // This needs manual follow-up (refund) since the charge already went through.
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment succeeded but an item just went out of stock. Please contact support for a refund.",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    )
  }
}
