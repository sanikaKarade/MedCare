import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"
import { parseBody } from "@/lib/parse-body"
import { createProductSchema } from "@/lib/validations"

export async function GET() {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const parsed = await parseBody(request, createProductSchema)
  if ("error" in parsed) return parsed.error

  const product = await prisma.product.create({
    data: parsed.data,
  })

  return NextResponse.json({ success: true, product })
}
