import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/is-admin"
import { createNotification } from "@/lib/notify"
import { parseBody } from "@/lib/parse-body"
import { vendorStatusSchema } from "@/lib/validations"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ vendorId: string }> }
) {
  try {
    const adminId = await requireAdmin()
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { vendorId } = await params
    const parsed = await parseBody(request, vendorStatusSchema)
    if ("error" in parsed) return parsed.error
    const body = parsed.data

    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: { status: body.status },
    })

    if (vendor.clerkUserId && (body.status === "APPROVED" || body.status === "REJECTED")) {
      await createNotification({
        userId: vendor.clerkUserId,
        title: body.status === "APPROVED" ? "Vendor Application Approved" : "Vendor Application Not Approved",
        message:
          body.status === "APPROVED"
            ? "Your vendor application has been approved. You can now add medicines to the pharmacy."
            : "Your vendor application was not approved. Contact support for details.",
        type: "account",
      })
    }

    return NextResponse.json({ success: true, vendor })
  } catch (error) {
    console.error("update vendor status error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update vendor status" },
      { status: 500 }
    )
  }
}
