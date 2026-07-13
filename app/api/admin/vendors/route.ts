import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"

// Admin-only: list vendors, optionally filtered by status (?status=PENDING).
export async function GET(request: Request) {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const vendors = await prisma.vendor.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(vendors)
}
