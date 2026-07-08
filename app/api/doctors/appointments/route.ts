import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentDoctor } from "@/lib/current-doctor"

export async function GET() {
  try {
    const doctor = await getCurrentDoctor()
    if (!doctor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      include: {
        doctor: true,
      },
      orderBy: {
        appointmentDate: "asc",
      },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch appointments",
      },
      {
        status: 500,
      }
    )
  }
}
