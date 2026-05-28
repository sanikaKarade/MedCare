"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Video, X } from "lucide-react"
import { appointments as initialAppointments } from "@/lib/data"
import { EmptyState } from "@/components/states"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments)

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  )
  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed"
  )
  const cancelledAppointments = appointments.filter(
    (apt) => apt.status === "cancelled"
  )

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Confirmed
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  const AppointmentCard = ({
    apt,
    showActions = false,
  }: {
    apt: (typeof appointments)[0]
    showActions?: boolean
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{apt.doctorName}</h3>
              <p className="text-sm text-muted-foreground">
                {apt.doctorSpecialization}
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(apt.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {apt.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Online Consultation
                </span>
              </div>
              {apt.symptoms && (
                <p className="mt-2 text-sm">
                  <span className="font-medium">Reason: </span>
                  {apt.symptoms}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(apt.status)}
            {showActions && apt.status === "upcoming" && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => handleCancel(apt.id)}
              >
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground">
            Manage and view your appointments
          </p>
        </div>
        <Button asChild>
          <Link href="/appointment">Book New Appointment</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <EmptyState
                  title="No upcoming appointments"
                  description="You don't have any scheduled appointments. Book one now to get started."
                  icon={<Calendar className="h-6 w-6 text-muted-foreground" />}
                  action={
                    <Button asChild>
                      <Link href="/appointment">Book Appointment</Link>
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          ) : (
            upcomingAppointments.map((apt) => (
              <AppointmentCard key={apt.id} apt={apt} showActions />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <EmptyState
                  title="No completed appointments"
                  description="Your completed appointments will appear here."
                  icon={<Calendar className="h-6 w-6 text-muted-foreground" />}
                />
              </CardContent>
            </Card>
          ) : (
            completedAppointments.map((apt) => (
              <AppointmentCard key={apt.id} apt={apt} />
            ))
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <EmptyState
                  title="No cancelled appointments"
                  description="Your cancelled appointments will appear here."
                  icon={<Calendar className="h-6 w-6 text-muted-foreground" />}
                />
              </CardContent>
            </Card>
          ) : (
            cancelledAppointments.map((apt) => (
              <AppointmentCard key={apt.id} apt={apt} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
