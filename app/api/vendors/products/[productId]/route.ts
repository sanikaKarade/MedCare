import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentVendor } from "@/lib/current-vendor"
import { parseBody } from "@/lib/parse-body"
import { updateProductSchema } from "@/lib/validations"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const vendor = await getCurrentVendor()
  if (!vendor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { productId } = await params

  // Make sure this product actually belongs to the vendor making the request.
  const existing = await prisma.product.findUnique({ where: { id: productId } })
  if (!existing || existing.vendorId !== vendor.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const parsed = await parseBody(request, updateProductSchema)
  if ("error" in parsed) return parsed.error

  const product = await prisma.product.update({
    where: { id: productId },
    data: parsed.data,
  })

  return NextResponse.json({ success: true, product })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const vendor = await getCurrentVendor()
  if (!vendor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { productId } = await params

  const existing = await prisma.product.findUnique({ where: { id: productId } })
  if (!existing || existing.vendorId !== vendor.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    await prisma.product.delete({ where: { id: productId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Could not delete — this product may already be referenced by an order." },
      { status: 400 }
    )
  }
}
