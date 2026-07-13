import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

/**
 * Resolves the Vendor row tied to the currently signed-in Clerk user.
 * Returns null if there is no session, no linked vendor, or the vendor
 * isn't approved yet — callers should treat all three as "not allowed".
 */
export async function getCurrentVendor() {
  const { userId } = await auth()
  if (!userId) return null

  const vendor = await prisma.vendor.findUnique({
    where: { clerkUserId: userId },
  })

  if (!vendor || vendor.status !== "APPROVED") return null

  return vendor
}
