"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Video,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DoctorAppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/doctors/appointments")
      .then((res) => {
        if (res.status === 401) {
          // Not signed in as an approved doctor — show the status page
          // instead of a silently empty/broken dashboard.
          router.replace("/doctors/status")
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data) {
          setAppointments(data)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Button disabled>Loading...</Button>
      </div>
    )
  }

  const totalAppointments = appointments.length

  const completedAppointments = appointments.filter(
    (apt) => apt.status === "COMPLETED"
  ).length

  const confirmedAppointments = appointments.filter(
    (apt) => apt.status === "CONFIRMED"
  ).length

  const ongoingAppointments = appointments.filter(
    (apt) => apt.status === "ONGOING"
  ).length

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Doctor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage appointments and prescriptions
            </p>
          </div>

          <Link href="/">
            <Button variant="outline">
              Home
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">

          <Card className="shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Total Appointments
              </p>

              <h2 className="text-3xl font-bold">
                {totalAppointments}
              </h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {completedAppointments}
              </h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Confirmed
              </p>

              <h2 className="text-3xl font-bold text-blue-600">
                {confirmedAppointments}
              </h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Ongoing
              </p>

              <h2 className="text-3xl font-bold text-orange-600">
                {ongoingAppointments}
              </h2>
            </CardContent>
          </Card>

        </div>

        {/* Appointment Cards */}
        <div className="space-y-4">
          {appointments.map((apt) => (
            <Card
              key={apt.id}
              className="hover:shadow-lg transition-all border-l-4 border-l-blue-600"
            >
              <CardContent className="p-6">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="h-5 w-5 text-blue-600" />

                      <h3 className="text-xl font-bold">
                        {apt.patientName}
                      </h3>
                    </div>

                    <p className="font-medium text-gray-600">
                      Dr. {apt.doctor.name}
                    </p>

                    <div className="mt-3 space-y-2 text-sm text-gray-600">

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(
                          apt.appointmentDate
                        ).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {apt.appointmentTime}
                      </div>

                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-4">

                    {apt.status === "COMPLETED" ? (
                      <Badge className="bg-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        {apt.status}
                      </Badge>
                    )}

                    <div className="flex flex-wrap gap-2">

                      {apt.meetingLink &&
                        ["CONFIRMED", "ONGOING"].includes(
                          apt.status
                        ) && (
                          <Button asChild>
                            <a
                              href={apt.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Video className="mr-2 h-4 w-4" />
                              Join Consultation
                            </a>
                          </Button>
                        )}

                      {apt.status !== "COMPLETED" && (
                        <Button
                          variant="outline"
                          onClick={async () => {
                            try {
                              await fetch(
                                "/api/doctors/update-status",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type":
                                      "application/json",
                                  },
                                  body: JSON.stringify({
                                    id: apt.id,
                                    status: "COMPLETED",
                                  }),
                                }
                              )

                              window.location.reload()
                            } catch (error) {
                              console.error(error)
                            }
                          }}
                        >
                          Mark Complete
                        </Button>
                      )}

                      {apt.status === "COMPLETED" && (
                        <Link
                          href={`/doctors/prescription/${apt.id}`}
                        >
                          <Button>
                            Generate Prescription
                          </Button>
                        </Link>
                      )}

                    </div>

                  </div>

                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}