import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "You must be signed in to register as a doctor" },
        { status: 401 }
      )
    }

    // One application per account.
    const existing = await prisma.doctor.findUnique({
      where: { clerkUserId: userId },
    })
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `You already have an application (status: ${existing.status}).`,
        },
        { status: 409 }
      )
    }

    const body = await req.json()

    const doctor = await prisma.doctor.create({
      data: {
        clerkUserId: userId,
        status: "PENDING",
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
