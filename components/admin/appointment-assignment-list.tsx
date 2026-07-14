"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarDays, Clock, User } from "lucide-react"

type Appointment = {
  id: string
  patientName: string
  patientPhone: string
  appointmentDate: string
  appointmentTime: string
  reason: string | null
  createdAt: string
}

type Doctor = {
  id: string
  name: string
  specialization: string
}

function AppointmentCard({
  appointment,
  doctors,
  onAssigned,
}: {
  appointment: Appointment
  doctors: Doctor[]
  onAssigned: () => void
}) {
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleAssign() {
    if (!selectedDoctor) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/appointments/${appointment.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: selectedDoctor }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error || "Failed to assign doctor")
        return
      }
      onAssigned()
    } catch (error) {
      console.error(error)
      alert("Something went wrong assigning this doctor.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" />
              {appointment.patientName}
            </h3>
            <p className="text-sm text-muted-foreground">{appointment.patientPhone}</p>
          </div>
          {appointment.reason && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {appointment.reason}
            </span>
          )}
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {appointment.appointmentTime}
          </span>
        </div>

        <div className="flex items-center gap-2 border-t pt-3">
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose a doctor to assign" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" disabled={!selectedDoctor || saving} onClick={handleAssign}>
            {saving ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function AppointmentAssignmentList({
  appointments,
  doctors,
}: {
  appointments: Appointment[]
  doctors: Doctor[]
}) {
  const router = useRouter()

  if (appointments.length === 0) {
    return <p className="text-muted-foreground">No unassigned appointment requests right now.</p>
  }

  return (
    <div className="space-y-4">
      {appointments.map((apt) => (
        <AppointmentCard
          key={apt.id}
          appointment={apt}
          doctors={doctors}
          onAssigned={() => router.refresh()}
        />
      ))}
    </div>
  )
}
