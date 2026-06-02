import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const appointment = await prisma.appointment.create({
      data: {
        patientId: body.patientId,
        doctorId: body.doctorId,

        patientName: body.patientName,
        patientPhone: body.patientPhone,

        appointmentDate: new Date(body.appointmentDate),
        appointmentTime: body.appointmentTime,

        reason: body.reason,
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
      },
      { status: 500 }
    )
  }
}