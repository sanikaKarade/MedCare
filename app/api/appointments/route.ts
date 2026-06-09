import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const roomId = `medcare-${Date.now()}`
    const meetingLink = `https://meet.jit.si/${roomId}`

    const appointment = await prisma.appointment.create({
      data: {
        patientId: body.patientId,
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
    const appointments = await prisma.appointment.findMany({
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