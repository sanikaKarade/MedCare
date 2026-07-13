import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { parseBody } from "@/lib/parse-body"
import { vendorRegisterSchema } from "@/lib/validations"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "You must be signed in to register as a vendor" },
        { status: 401 }
      )
    }

    // One application per account.
    const existing = await prisma.vendor.findUnique({
      where: { clerkUserId: userId },
    })
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `You already have an application (status: ${existing.status}).`,
        },
        { status: 409 }
      )
    }

    const parsed = await parseBody(req, vendorRegisterSchema)
    if ("error" in parsed) return parsed.error
    const body = parsed.data

    const vendor = await prisma.vendor.create({
      data: {
        clerkUserId: userId,
        status: "PENDING",
        businessName: body.businessName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        licenseNumber: body.licenseNumber,
        licenseFile: body.licenseFile,
      },
    }).catch((error) => {
      if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
        throw new Error("DUPLICATE_EMAIL")
      }
      throw error
    })

    return NextResponse.json({ success: true, vendor })
  } catch (error) {
    console.error(error)

    if (error instanceof Error && error.message === "DUPLICATE_EMAIL") {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email is already registered as a vendor.",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: "Failed to register vendor" },
      { status: 500 }
    )
  }
}
