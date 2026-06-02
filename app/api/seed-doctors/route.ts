import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    await prisma.doctor.createMany({
      data: [
        {
          name: "Dr. Amit Sharma",
          specialization: "Cardiologist",
          experience: 10,
          consultationFee: 500,
          city: "Bhopal",
          hospital: "City Hospital",
        },
        {
          name: "Dr. Priya Patel",
          specialization: "Dermatologist",
          experience: 7,
          consultationFee: 700,
          city: "Indore",
          hospital: "Care Hospital",
        },
        {
          name: "Dr. Raj Verma",
          specialization: "Orthopedic",
          experience: 12,
          consultationFee: 800,
          city: "Bhopal",
          hospital: "Apollo Clinic",
        },
      ],
    })

    return NextResponse.json({
      success: true,
      message: "Doctors added successfully",
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