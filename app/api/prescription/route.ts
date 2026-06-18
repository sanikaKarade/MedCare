import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const prescription = await prisma.prescription.create({
      data: {
        appointmentId: body.appointmentId,
        diagnosis: body.diagnosis,
        tests: body.tests,
        // advice: body.advice,
        notes: body.notes,
        followUpDate: body.followUpDate
          ? new Date(body.followUpDate)
          : null,

        medicines: {
          create: body.medicines.map((medicine: any) => ({
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration: medicine.duration,
          })),
        },
      },

      include: {
        PrescriptionMedicine: true,
      },
    })

    return NextResponse.json(prescription)
  } catch (error: any) {
    console.error("FULL ERROR:")
    console.error(error)

    return NextResponse.json(
      {
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}