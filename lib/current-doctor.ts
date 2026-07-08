import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function getCurrentDoctor() {
  const { userId } = await auth()
  if (!userId) return null

  const doctor = await prisma.doctor.findUnique({
    where: { clerkUserId: userId },
  })

  if (!doctor || doctor.status !== "APPROVED") return null

  return doctor
}
