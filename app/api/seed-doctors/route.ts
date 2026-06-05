import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"
import { doctors } from "@/lib/data"

export async function GET() {
  try {
    const prisma = await getPrisma()

    await prisma.appointment.deleteMany()
    await prisma.doctor.deleteMany()

    await prisma.doctor.createMany({
      data: doctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.name,
        specialization: doctor.specialization,
        experience: doctor.experience,
        consultationFee: doctor.consultationFee,
        imageUrl: doctor.image,
        hospital: doctor.hospital,
      })),
    })

    return NextResponse.json({
      success: true,
      message: `Seeded ${doctors.length} doctors`,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add doctors",
      },
      { status: 500 }
    )
  }
}
