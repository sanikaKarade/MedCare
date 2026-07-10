import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"

// Admin-only: list all orders with their items and product details, so
// fulfillment (and prescription review) can happen from one screen.
export async function GET(request: Request) {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const orders = await prisma.order.findMany({
    where: status ? { status: status as any } : undefined,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orders)
}
