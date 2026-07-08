import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"

// Admin-only: list doctors, optionally filtered by status (?status=PENDING).
// Unlike the public /api/doctors route, this intentionally returns every
// field — admins need to see Aadhaar/degree/registration files to verify
// applications. Access is gated by requireAdmin(), not by field selection.
export async function GET(request: Request) {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const doctors = await prisma.doctor.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(doctors)
}
