"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type Doctor = {
  id: string
  name: string
  email: string | null
  phone: string | null
  specialization: string
  experience: number
  consultationFee: number
  hospital: string | null
  city: string | null
  aadhaarNumber: string | null
  registrationNumber: string | null
  degree: string | null
  aadhaarFile: string | null
  degreeFile: string | null
  registrationFile: string | null
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: string
}

function statusBadgeVariant(status: Doctor["status"]) {
  if (status === "APPROVED") return "default"
  if (status === "REJECTED") return "destructive"
  return "secondary"
}

function DocLink({ label, url }: { label: string; url: string | null }) {
  return (
    <div className="text-sm">
      <span className="text-muted-foreground">{label}: </span>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
          View file
        </a>
      ) : (
        <span className="text-muted-foreground italic">Not uploaded</span>
      )}
    </div>
  )
}

function DoctorCard({ doctor, onAction }: { doctor: Doctor; onAction: (id: string, status: "APPROVED" | "REJECTED") => void }) {
  const [loading, setLoading] = useState<"APPROVED" | "REJECTED" | null>(null)

  async function handle(status: "APPROVED" | "REJECTED") {
    setLoading(status)
    await onAction(doctor.id, status)
    setLoading(null)
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialization} · {doctor.experience} yrs experience</p>
          </div>
          <Badge variant={statusBadgeVariant(doctor.status)}>{doctor.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div><span className="text-muted-foreground">Email: </span>{doctor.email || "—"}</div>
          <div><span className="text-muted-foreground">Phone: </span>{doctor.phone || "—"}</div>
          <div><span className="text-muted-foreground">Hospital: </span>{doctor.hospital || "—"}</div>
          <div><span className="text-muted-foreground">City: </span>{doctor.city || "—"}</div>
          <div><span className="text-muted-foreground">Consultation fee: </span>₹{doctor.consultationFee}</div>
          <div><span className="text-muted-foreground">Degree: </span>{doctor.degree || "—"}</div>
          <div><span className="text-muted-foreground">Aadhaar number: </span>{doctor.aadhaarNumber || "—"}</div>
          <div><span className="text-muted-foreground">Registration number: </span>{doctor.registrationNumber || "—"}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t">
          <DocLink label="Aadhaar" url={doctor.aadhaarFile} />
          <DocLink label="Degree" url={doctor.degreeFile} />
          <DocLink label="Registration" url={doctor.registrationFile} />
        </div>

        {doctor.status !== "APPROVED" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              disabled={loading !== null}
              onClick={() => handle("APPROVED")}
            >
              {loading === "APPROVED" ? "Approving..." : "Approve"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={loading !== null}
              onClick={() => handle("REJECTED")}
            >
              {loading === "REJECTED" ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        )}

        {doctor.status === "APPROVED" && (
          <div className="pt-2">
            <Button size="sm" variant="outline" disabled={loading !== null} onClick={() => handle("REJECTED")}>
              {loading === "REJECTED" ? "Revoking..." : "Revoke approval"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function DoctorApprovalList({ doctors }: { doctors: Doctor[] }) {
  const router = useRouter()

  async function handleAction(doctorId: string, status: "APPROVED" | "REJECTED") {
    try {
      const res = await fetch(`/api/admin/doctors/${doctorId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error || "Failed to update doctor status")
        return
      }
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Something went wrong updating this doctor.")
    }
  }

  const pending = doctors.filter((d) => d.status === "PENDING")
  const approved = doctors.filter((d) => d.status === "APPROVED")
  const rejected = doctors.filter((d) => d.status === "REJECTED")

  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
        <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
        <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="space-y-4 mt-4">
        {pending.length === 0 && <p className="text-muted-foreground">No pending applications.</p>}
        {pending.map((d) => (
          <DoctorCard key={d.id} doctor={d} onAction={handleAction} />
        ))}
      </TabsContent>

      <TabsContent value="approved" className="space-y-4 mt-4">
        {approved.length === 0 && <p className="text-muted-foreground">No approved doctors yet.</p>}
        {approved.map((d) => (
          <DoctorCard key={d.id} doctor={d} onAction={handleAction} />
        ))}
      </TabsContent>

      <TabsContent value="rejected" className="space-y-4 mt-4">
        {rejected.length === 0 && <p className="text-muted-foreground">No rejected applications.</p>}
        {rejected.map((d) => (
          <DoctorCard key={d.id} doctor={d} onAction={handleAction} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
