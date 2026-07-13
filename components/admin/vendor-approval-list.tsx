"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type Vendor = {
  id: string
  businessName: string
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  licenseNumber: string | null
  licenseFile: string | null
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: string
}

function statusBadgeVariant(status: Vendor["status"]) {
  if (status === "APPROVED") return "default"
  if (status === "REJECTED") return "destructive"
  return "secondary"
}

function VendorCard({ vendor, onAction }: { vendor: Vendor; onAction: (id: string, status: "APPROVED" | "REJECTED") => void }) {
  const [loading, setLoading] = useState<"APPROVED" | "REJECTED" | null>(null)

  async function handle(status: "APPROVED" | "REJECTED") {
    setLoading(status)
    await onAction(vendor.id, status)
    setLoading(null)
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">{vendor.businessName}</h3>
            <p className="text-sm text-muted-foreground">{vendor.city || "—"}</p>
          </div>
          <Badge variant={statusBadgeVariant(vendor.status)}>{vendor.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div><span className="text-muted-foreground">Email: </span>{vendor.email || "—"}</div>
          <div><span className="text-muted-foreground">Phone: </span>{vendor.phone || "—"}</div>
          <div className="col-span-2"><span className="text-muted-foreground">Address: </span>{vendor.address || "—"}</div>
          <div><span className="text-muted-foreground">License number: </span>{vendor.licenseNumber || "—"}</div>
        </div>

        <div className="border-t pt-2 text-sm">
          <span className="text-muted-foreground">License document: </span>
          {vendor.licenseFile ? (
            <a href={vendor.licenseFile} target="_blank" rel="noopener noreferrer" className="underline">
              View file
            </a>
          ) : (
            <span className="italic text-muted-foreground">Not uploaded</span>
          )}
        </div>

        {vendor.status !== "APPROVED" && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" disabled={loading !== null} onClick={() => handle("APPROVED")}>
              {loading === "APPROVED" ? "Approving..." : "Approve"}
            </Button>
            <Button size="sm" variant="outline" disabled={loading !== null} onClick={() => handle("REJECTED")}>
              {loading === "REJECTED" ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        )}

        {vendor.status === "APPROVED" && (
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

export function VendorApprovalList({ vendors }: { vendors: Vendor[] }) {
  const router = useRouter()

  async function handleAction(vendorId: string, status: "APPROVED" | "REJECTED") {
    try {
      const res = await fetch(`/api/admin/vendors/${vendorId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error || "Failed to update vendor status")
        return
      }
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Something went wrong updating this vendor.")
    }
  }

  const pending = vendors.filter((v) => v.status === "PENDING")
  const approved = vendors.filter((v) => v.status === "APPROVED")
  const rejected = vendors.filter((v) => v.status === "REJECTED")

  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
        <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
        <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="space-y-4 mt-4">
        {pending.length === 0 && <p className="text-muted-foreground">No pending applications.</p>}
        {pending.map((v) => (
          <VendorCard key={v.id} vendor={v} onAction={handleAction} />
        ))}
      </TabsContent>

      <TabsContent value="approved" className="space-y-4 mt-4">
        {approved.length === 0 && <p className="text-muted-foreground">No approved vendors yet.</p>}
        {approved.map((v) => (
          <VendorCard key={v.id} vendor={v} onAction={handleAction} />
        ))}
      </TabsContent>

      <TabsContent value="rejected" className="space-y-4 mt-4">
        {rejected.length === 0 && <p className="text-muted-foreground">No rejected applications.</p>}
        {rejected.map((v) => (
          <VendorCard key={v.id} vendor={v} onAction={handleAction} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
