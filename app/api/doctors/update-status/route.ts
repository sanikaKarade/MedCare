import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getCurrentDoctor } from "@/lib/current-doctor"
import { createNotification } from "@/lib/notify"
import { parseBody } from "@/lib/parse-body"
import { updateAppointmentStatusSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const doctor = await getCurrentDoctor()
    if (!doctor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const parsed = await parseBody(request, updateAppointmentStatusSchema)
    if ("error" in parsed) return parsed.error
    const body = parsed.data

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

    if (body.status !== existing.status) {
      await createNotification({
        userId: appointment.patientId,
        title: "Appointment Update",
        message: `Dr. ${doctor.name} updated your appointment on ${appointment.appointmentDate.toLocaleDateString()} to ${body.status}.`,
        type: "appointment",
      })
    }

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
