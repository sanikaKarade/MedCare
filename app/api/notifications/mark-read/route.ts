import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { parseBody } from "@/lib/parse-body"
import { markNotificationReadSchema } from "@/lib/validations"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = await parseBody(req, markNotificationReadSchema)
  if ("error" in parsed) return parsed.error
  const body = parsed.data

  if ("all" in body) {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    })
    return NextResponse.json({ success: true })
  }

  // Make sure this notification actually belongs to the requester.
  const notification = await prisma.notification.findUnique({
    where: { id: body.id },
  })
  if (!notification || notification.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.notification.update({
    where: { id: body.id },
    data: { read: true },
  })

  return NextResponse.json({ success: true })
}
