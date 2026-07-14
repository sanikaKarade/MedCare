import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { createNotification } from "@/lib/notify"
import { parseBody } from "@/lib/parse-body"
import { createAppointmentSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const parsed = await parseBody(request, createAppointmentSchema)
    if ("error" in parsed) return parsed.error
    const body = parsed.data

    // Prevent double-booking the same doctor/date/time — only relevant
    // when a specific doctor was actually chosen.
    if (body.doctorId) {
      const existing = await prisma.appointment.findFirst({
        where: {
          doctorId: body.doctorId,
          appointmentDate: new Date(body.appointmentDate),
          appointmentTime: body.appointmentTime,
          status: { not: "CANCELLED" },
        },
      })

      if (existing) {
        return NextResponse.json(
          { success: false, error: "This slot has just been booked. Please pick another." },
          { status: 409 }
        )
      }
    }

    // A specific doctor was chosen: confirm immediately with a meeting link.
    // No doctor chosen (general consult request): stays PENDING, no meeting
    // link yet — an admin assigns a doctor afterward.
    const roomId = `medcare-${Date.now()}`
    const meetingLink = body.doctorId ? `https://meet.jit.si/${roomId}` : null

    const appointment = await prisma.appointment.create({
      data: {
        // patientId always comes from the authenticated session, never the client body
        patientId: userId,
        doctorId: body.doctorId || null,
        patientName: body.patientName,
        patientPhone: body.patientPhone,
        appointmentDate: new Date(body.appointmentDate),
        appointmentTime: body.appointmentTime,
        reason: body.reason,
        meetingLink,
        status: body.doctorId ? "CONFIRMED" : "PENDING",
      },
      include: { doctor: true },
    })

    await createNotification({
      userId,
      title: appointment.doctor ? "Appointment Confirmed" : "Appointment Request Received",
      message: appointment.doctor
        ? `Your appointment with ${appointment.doctor.name} on ${appointment.appointmentDate.toLocaleDateString()} at ${appointment.appointmentTime} is confirmed.`
        : `We've received your consultation request for ${appointment.appointmentDate.toLocaleDateString()} at ${appointment.appointmentTime}. We'll assign the right doctor and confirm shortly.`,
      type: "appointment",
    })

    return NextResponse.json({
      success: true,
      appointment,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create appointment",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const appointments = await prisma.appointment.findMany({
      where: { patientId: userId },
      orderBy: {
        appointmentDate: "desc",
      },
      include: {
        doctor: true,
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
