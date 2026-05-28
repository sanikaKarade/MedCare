"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, FileText, FolderHeart, Check } from "lucide-react"
import { notifications as initialNotifications } from "@/lib/data"
import { EmptyState } from "@/components/states"

const typeIcons: Record<string, React.ReactNode> = {
  appointment: <Calendar className="h-5 w-5" />,
  prescription: <FileText className="h-5 w-5" />,
  report: <FolderHeart className="h-5 w-5" />,
  reminder: <Bell className="h-5 w-5" />,
}

const typeColors: Record<string, string> = {
  appointment: "bg-blue-100 text-blue-700",
  prescription: "bg-green-100 text-green-700",
  report: "bg-amber-100 text-amber-700",
  reminder: "bg-secondary text-secondary-foreground",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <EmptyState
              title="No notifications"
              description="You're all caught up! New notifications will appear here."
              icon={<Bell className="h-6 w-6 text-muted-foreground" />}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-primary" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${typeColors[notification.type]}`}
                  >
                    {typeIcons[notification.type]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3
                        className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(notification.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
