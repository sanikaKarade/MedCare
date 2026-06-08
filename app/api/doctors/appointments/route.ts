import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"

export async function GET() {
  try {
    const prisma = await getPrisma()

    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: true,
      },
      orderBy: {
        appointmentDate: "asc",
      },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    )
  }
}