import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"

// Admin-only: list appointments awaiting a doctor assignment (doctorId is
// null — created via the "not sure which doctor" general consult flow).
export async function GET() {
  const adminId = await requireAdmin()
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: null, status: { not: "CANCELLED" } },
    orderBy: { appointmentDate: "asc" },
  })

  return NextResponse.json(appointments)
}
