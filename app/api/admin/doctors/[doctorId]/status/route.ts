import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"

const VALID_STATUSES = ["PENDING", "APPROVED", "REJECTED"]

export async function POST(
  request: Request,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { doctorId } = await params
  const body = await request.json()

  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  try {
    const doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: { status: body.status },
    })
    return NextResponse.json({ success: true, doctor })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
  }
}
