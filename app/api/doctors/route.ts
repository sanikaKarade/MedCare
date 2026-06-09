import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany()

    return NextResponse.json(doctors)
  } catch (error) {
    console.error("FULL ERROR:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch doctors",
        details: String(error),
      },
      { status: 500 }
    )
  }
}