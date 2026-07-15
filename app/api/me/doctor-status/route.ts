import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

// Lightweight check used by the navbar to decide whether to show a
// "Doctor Dashboard" link at all — only if this user has ever registered
// as a doctor (regardless of approval status; /doctors/status handles
// routing them to the right place from there).
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ hasApplication: false })
  }

  const doctor = await prisma.doctor.findUnique({
    where: { clerkUserId: userId },
    select: { id: true },
  })

  return NextResponse.json({ hasApplication: !!doctor })
}
