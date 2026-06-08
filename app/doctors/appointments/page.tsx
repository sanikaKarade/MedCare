"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import Link from "next/link"

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/doctors/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Button disabled>
          Loading...
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
  <div className="mb-6 flex items-center justify-between">
    <h1 className="text-3xl font-bold">
      Doctor Dashboard
    </h1>

    <Link href="/">
      <Button variant="outline">
        Home
      </Button>
    </Link>
  </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="p-6">
              <h3 className="font-bold">
                {apt.patientName}
              </h3>

              <p>
                Doctor: {apt.doctor.name}
              </p>

              <p>
                Date:
                {new Date(
                  apt.appointmentDate
                ).toLocaleDateString()}
              </p>

              <p>
                Time:
                {apt.appointmentTime}
              </p>

              <p>
                Status:
                {apt.status}
              </p>

              <div className="mt-4 flex gap-3">
              {apt.meetingLink &&
  ["CONFIRMED", "ONGOING"].includes(apt.status) && (
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
                "Content-Type": "application/json",
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
      Complete
    </Button>
  )}
</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}