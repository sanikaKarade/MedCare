import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"
import { parseBody } from "@/lib/parse-body"
import { updateProductSchema } from "@/lib/validations"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { productId } = await params
  const parsed = await parseBody(request, updateProductSchema)
  if ("error" in parsed) return parsed.error

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: parsed.data,
    })
    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { productId } = await params

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
