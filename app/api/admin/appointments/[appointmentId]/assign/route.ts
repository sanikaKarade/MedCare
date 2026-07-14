import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"
import { createNotification } from "@/lib/notify"
import { parseBody } from "@/lib/parse-body"
import { assignDoctorSchema } from "@/lib/validations"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ appointmentId: string }> }
) {
  try {
    const adminId = await requireAdmin()
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { appointmentId } = await params
    const parsed = await parseBody(request, assignDoctorSchema)
    if ("error" in parsed) return parsed.error
    const { doctorId } = parsed.data

    const existing = await prisma.appointment.findUnique({ where: { id: appointmentId } })
    if (!existing) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }
    if (existing.doctorId) {
      return NextResponse.json({ error: "This appointment already has a doctor assigned" }, { status: 400 })
    }

    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } })
    if (!doctor || doctor.status !== "APPROVED") {
      return NextResponse.json({ error: "Selected doctor is not available" }, { status: 400 })
    }

    // Prevent double-booking the doctor being assigned into this slot.
    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId,
        appointmentDate: existing.appointmentDate,
        appointmentTime: existing.appointmentTime,
        status: { not: "CANCELLED" },
      },
    })
    if (conflict) {
      return NextResponse.json(
        { error: "This doctor already has another appointment at that date/time" },
        { status: 409 }
      )
    }

    const roomId = `medcare-${Date.now()}`
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        doctorId,
        status: "CONFIRMED",
        meetingLink: `https://meet.jit.si/${roomId}`,
      },
    })

    await createNotification({
      userId: appointment.patientId,
      title: "Doctor Assigned",
      message: `Dr. ${doctor.name} has been assigned to your appointment on ${appointment.appointmentDate.toLocaleDateString()} at ${appointment.appointmentTime}. It's now confirmed.`,
      type: "appointment",
    })

    return NextResponse.json({ success: true, appointment })
  } catch (error) {
    console.error("assign doctor error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to assign doctor" },
      { status: 500 }
    )
  }
}
