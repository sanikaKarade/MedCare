import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentVendor } from "@/lib/current-vendor"
import { parseBody } from "@/lib/parse-body"
import { createProductSchema } from "@/lib/validations"

export async function GET() {
  const vendor = await getCurrentVendor()
  if (!vendor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const products = await prisma.product.findMany({
    where: { vendorId: vendor.id },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const vendor = await getCurrentVendor()
  if (!vendor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = await parseBody(request, createProductSchema)
  if ("error" in parsed) return parsed.error

  const product = await prisma.product.create({
    data: {
      ...parsed.data,
      vendorId: vendor.id,
    },
  })

  return NextResponse.json({ success: true, product })
}
