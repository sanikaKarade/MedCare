import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"
import { createNotification } from "@/lib/notify"
import { parseBody } from "@/lib/parse-body"
import { orderStatusSchema } from "@/lib/validations"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const adminId = await requireAdmin()
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { orderId } = await params
    const parsed = await parseBody(request, orderStatusSchema)
    if ("error" in parsed) return parsed.error
    const body = parsed.data

    const existing = await prisma.order.findUnique({ where: { id: orderId } })

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: body.status },
    })

    if (existing && existing.status !== body.status) {
      await createNotification({
        userId: order.userId,
        title: "Order Update",
        message: `Your order ${order.invoiceNumber} is now ${body.status.toLowerCase()}.`,
        type: "order",
      })
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("update order status error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update order" },
      { status: 500 }
    )
  }
}
