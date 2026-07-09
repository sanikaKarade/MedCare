import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentDoctor } from "@/lib/current-doctor"

export async function POST(req: Request) {
  try {
    const doctor = await getCurrentDoctor()
    if (!doctor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    if (!body.appointmentId) {
      return NextResponse.json({ error: "Missing appointmentId" }, { status: 400 })
    }

    // Confirm this appointment actually belongs to the doctor making the request.
    const appointment = await prisma.appointment.findUnique({
      where: { id: body.appointmentId },
    })

    if (!appointment || appointment.doctorId !== doctor.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const prescription = await prisma.prescription.create({
      data: {
        appointmentId: body.appointmentId,
        diagnosis: body.diagnosis,
        tests: body.tests,
        notes: body.notes,
        followUpDate: body.followUpDate ? new Date(body.followUpDate) : null,

        medicines: {
          create: body.medicines.map((medicine: any) => ({
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration: medicine.duration,
          })),
        },
      },

      include: {
        medicines: true,
      },
    })

    return NextResponse.json(prescription)
  } catch (error: any) {
    console.error("FULL ERROR:")
    console.error(error)

    return NextResponse.json(
      {
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}
