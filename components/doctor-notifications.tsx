"use client"

import { useEffect, useState } from "react"
import { Bell, Calendar, UserCheck } from "lucide-react"

type Notification = {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

const typeIcons: Record<string, React.ReactNode> = {
  appointment: <Calendar className="h-4 w-4" />,
  account: <UserCheck className="h-4 w-4" />,
}

export function DoctorNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setNotifications(Array.isArray(data) ? data.slice(0, 5) : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    await fetch("/api/notifications/mark-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    }).catch(() => {})
  }

  if (loading || notifications.length === 0) return null

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="mb-6 rounded-xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-slate-500" />
          <h2 className="text-sm font-semibold">Recent Notifications</h2>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-blue-600 hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-2 rounded-lg p-2 text-sm ${!n.read ? "bg-blue-50" : ""}`}
          >
            <span className="mt-0.5 text-slate-500">
              {typeIcons[n.type] || <Bell className="h-4 w-4" />}
            </span>
            <div>
              <p className="font-medium">{n.title}</p>
              <p className="text-xs text-slate-500">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
