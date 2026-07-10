import { prisma } from "@/lib/prisma"

type NotificationType =
  | "appointment"
  | "prescription"
  | "report"
  | "reminder"
  | "order"
  | "account"

export async function createNotification({
  userId,
  title,
  message,
  type,
}: {
  userId: string
  title: string
  message: string
  type: NotificationType
}) {
  try {
    await prisma.notification.create({
      data: { userId, title, message, type },
    })
  } catch (error) {

    console.error("Failed to create notification:", error)
  }
}
