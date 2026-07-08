import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getCurrentDoctor } from "@/lib/current-doctor"

const VALID_STATUSES = ["PENDING", "CONFIRMED", "ONGOING", "COMPLETED", "CANCELLED"]

export async function POST(request: Request) {
  try {
    const doctor = await getCurrentDoctor()
    if (!doctor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    if (!body.id || !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    // Make sure this appointment actually belongs to the doctor making the request.
    const existing = await prisma.appointment.findUnique({
      where: { id: body.id },
    })

    if (!existing || existing.doctorId !== doctor.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const appointment = await prisma.appointment.update({
      where: { id: body.id },
      data: { status: body.status },
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to update appointment",
      },
      {
        status: 500,
      }
    )
  }
}
