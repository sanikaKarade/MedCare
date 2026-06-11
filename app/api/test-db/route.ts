import { prisma } from "@/lib/prisma"
import { getPrisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  

  const doctors = await prisma.doctor.findMany()

  return NextResponse.json({
    success: true,
    count: doctors.length,
  })
}