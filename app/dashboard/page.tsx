"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import {
  Calendar,
  FileText,
  FolderHeart,
  Bell,
  Clock,
  ArrowRight,
  Activity,
} from "lucide-react"
import {
  appointments,
  prescriptions,
  healthRecords,
  notifications,
} from "@/lib/data"

export default function DashboardPage() {
  const { user } = useAuth()

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  )
  const unreadNotifications = notifications.filter((n) => !n.read)

  const stats = [
    {
      title: "Upcoming Appointments",
      value: upcomingAppointments.length,
      icon: Calendar,
      href: "/dashboard/appointments",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Active Prescriptions",
      value: prescriptions.length,
      icon: FileText,
      href: "/dashboard/prescriptions",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Health Records",
      value: healthRecords.length,
      icon: FolderHeart,
      href: "/dashboard/records",
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Notifications",
      value: unreadNotifications.length,
      icon: Bell,
      href: "/dashboard/notifications",
      color: "bg-red-100 text-red-700",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your health dashboard.
          </p>
        </div>
        <Button asChild>
          <Link href="/appointment">Book New Appointment</Link>
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/appointments">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Calendar className="mx-auto h-10 w-10 opacity-50" />
                <p className="mt-2">No upcoming appointments</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/appointment">Book an appointment</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{apt.doctorName}</p>
                      <p className="text-sm text-muted-foreground">
                        {apt.doctorSpecialization}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(apt.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {apt.time}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-700"
                    >
                      Confirmed
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/notifications">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Bell className="mx-auto h-10 w-10 opacity-50" />
                <p className="mt-2">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 rounded-lg border p-4 ${
                      !notification.read ? "bg-secondary/30" : ""
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        notification.type === "appointment"
                          ? "bg-blue-100 text-blue-700"
                          : notification.type === "prescription"
                            ? "bg-green-100 text-green-700"
                            : notification.type === "report"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {notification.type === "appointment" && (
                        <Calendar className="h-5 w-5" />
                      )}
                      {notification.type === "prescription" && (
                        <FileText className="h-5 w-5" />
                      )}
                      {notification.type === "report" && (
                        <FolderHeart className="h-5 w-5" />
                      )}
                      {notification.type === "reminder" && (
                        <Bell className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(notification.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              asChild
            >
              <Link href="/appointment">
                <Calendar className="h-6 w-6" />
                <span>Book Appointment</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              asChild
            >
              <Link href="/doctors">
                <Activity className="h-6 w-6" />
                <span>Find a Doctor</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              asChild
            >
              <Link href="/dashboard/prescriptions">
                <FileText className="h-6 w-6" />
                <span>View Prescriptions</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              asChild
            >
              <Link href="/dashboard/records">
                <FolderHeart className="h-6 w-6" />
                <span>Health Records</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
