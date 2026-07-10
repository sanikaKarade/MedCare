import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { parseBody } from "@/lib/parse-body"
import { doctorRegisterSchema } from "@/lib/validations"

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

    const parsed = await parseBody(req, doctorRegisterSchema)
    if ("error" in parsed) return parsed.error
    const body = parsed.data

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
        experience: body.experience,
        hospital: body.hospital,
        city: body.city,
        consultationFee: body.consultationFee,
        aadhaarFile: body.aadhaarFile,
        degreeFile: body.degreeFile,
        registrationFile: body.registrationFile,
        profilePhoto: body.profilePhoto || null,
      },
    }).catch((error) => {
      if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
        throw new Error("DUPLICATE_EMAIL")
      }
      throw error
    })

    return NextResponse.json({
      success: true,
      doctor,
    })
  } catch (error) {
    console.error(error)

    if (error instanceof Error && error.message === "DUPLICATE_EMAIL") {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email is already registered as a doctor.",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to register doctor",
      },
      { status: 500 }
    )
  }
}
