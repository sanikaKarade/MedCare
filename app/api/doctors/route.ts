import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { status: "APPROVED" },
      orderBy: {
        createdAt: "desc",
      },
      // Only ever expose fields the public booking flow actually needs.
      // Never select aadhaarNumber, aadhaarFile, registrationFile, degreeFile,
      // email, or phone here — those are sensitive and this route is public.
      select: {
        id: true,
        name: true,
        specialization: true,
        experience: true,
        consultationFee: true,
        hospital: true,
        city: true,
        imageUrl: true,
        profilePhoto: true,
      },
    })

    return NextResponse.json(doctors)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    )
  }
}
