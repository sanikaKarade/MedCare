import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    import { prisma } from "@/lib/prisma"

    const body = await request.json()

    const appointment =
      await prisma.appointment.update({
        where: {
          id: body.id,
        },
        data: {
          status: body.status,
        },
      })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to update appointment",
      },
      {
        status: 500,
      }
    )
  }
}