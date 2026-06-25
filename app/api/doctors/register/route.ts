import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const doctor = await prisma.doctor.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        aadhaarNumber: body.aadhaarNumber,
        registrationNumber: body.registrationNumber,
        degree: body.degree,
        specialization: body.specialization,
        experience: Number(body.experience),
        hospital: body.hospital,
        city: body.city,
        consultationFee: Number(body.consultationFee),
      },
    })

    return NextResponse.json({
      success: true,
      doctor,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to register doctor",
      },
      { status: 500 }
    )
  }
}