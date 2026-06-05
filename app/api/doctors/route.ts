import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"

export async function GET() {
  try {
    const prisma = await getPrisma()
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
