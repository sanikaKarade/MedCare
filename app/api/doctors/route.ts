import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        createdAt: "desc",
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