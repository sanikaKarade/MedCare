import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    if (!body.doctorId || !body.appointmentDate || !body.appointmentTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Prevent double-booking the same doctor/date/time.
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

    const roomId = `medcare-${Date.now()}`
    const meetingLink = `https://meet.jit.si/${roomId}`

    const appointment = await prisma.appointment.create({
      data: {
        // patientId always comes from the authenticated session, never the client body
        patientId: userId,
        doctorId: body.doctorId,
        patientName: body.patientName,
        patientPhone: body.patientPhone,
        appointmentDate: new Date(body.appointmentDate),
        appointmentTime: body.appointmentTime,
        reason: body.reason,
        meetingLink,
        status: "CONFIRMED",
      },
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
