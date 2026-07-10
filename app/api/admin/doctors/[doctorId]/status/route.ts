import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"
import { createNotification } from "@/lib/notify"
import { parseBody } from "@/lib/parse-body"
import { doctorStatusSchema } from "@/lib/validations"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  try {
    const adminId = await requireAdmin()
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { doctorId } = await params
    const parsed = await parseBody(request, doctorStatusSchema)
    if ("error" in parsed) return parsed.error
    const body = parsed.data

    const doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: { status: body.status },
    })

    if (doctor.clerkUserId && (body.status === "APPROVED" || body.status === "REJECTED")) {
      await createNotification({
        userId: doctor.clerkUserId,
        title: body.status === "APPROVED" ? "Application Approved" : "Application Not Approved",
        message:
          body.status === "APPROVED"
            ? "Your doctor application has been approved. You can now manage appointments."
            : "Your doctor application was not approved. Contact support for details.",
        type: "account",
      })
    }

    return NextResponse.json({ success: true, doctor })
  } catch (error) {
    // Log the real error server-side so it shows up in your terminal.
    console.error("update-status error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update doctor status" },
      { status: 500 }
    )
  }
}
