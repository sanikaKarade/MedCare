"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"

type OrderItem = {
  id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    imageUrl: string | null
    prescription: boolean
  }
}

type Order = {
  id: string
  invoiceNumber: string | null
  totalAmount: number
  status: OrderStatus
  customerName: string
  customerPhone: string
  customerEmail: string
  address: string
  city: string
  state: string
  pincode: string
  prescriptionFile: string | null
  estimatedDelivery: string | null
  createdAt: string
  items: OrderItem[]
}

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "PAID",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
]

function statusBadgeVariant(status: OrderStatus) {
  if (status === "DELIVERED") return "default"
  if (status === "CANCELLED") return "destructive"
  return "secondary"
}

function OrderCard({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: OrderStatus) => Promise<void> }) {
  const [pendingStatus, setPendingStatus] = useState<OrderStatus>(order.status)
  const [saving, setSaving] = useState(false)

  const requiresPrescription = order.items.some((item) => item.product.prescription)

  async function handleUpdate() {
    if (pendingStatus === order.status) return
    setSaving(true)
    await onStatusChange(order.id, pendingStatus)
    setSaving(false)
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-bold">
              {order.invoiceNumber || order.id}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <Badge variant={statusBadgeVariant(order.status)}>{order.status}</Badge>
        </div>

        <div className="grid gap-1 text-sm md:grid-cols-2">
          <div><span className="text-muted-foreground">Customer: </span>{order.customerName}</div>
          <div><span className="text-muted-foreground">Phone: </span>{order.customerPhone}</div>
          <div><span className="text-muted-foreground">Email: </span>{order.customerEmail}</div>
          <div><span className="text-muted-foreground">Total: </span>₹{order.totalAmount}</div>
          <div className="md:col-span-2">
            <span className="text-muted-foreground">Address: </span>
            {order.address}, {order.city}, {order.state} - {order.pincode}
          </div>
        </div>

        <div className="border-t pt-3">
          <p className="mb-1 text-sm font-medium">Items</p>
          <ul className="space-y-1 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.product.name} × {item.quantity}
                  {item.product.prescription && (
                    <Badge variant="outline" className="ml-2 text-xs">Rx</Badge>
                  )}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {requiresPrescription && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
            <span className="font-medium">Prescription: </span>
            {order.prescriptionFile ? (
              <a
                href={order.prescriptionFile}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View uploaded prescription
              </a>
            ) : (
              <span className="italic text-red-600">
                Missing — this order should not have been allowed to complete without one
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 border-t pt-3">
          <Select value={pendingStatus} onValueChange={(v) => setPendingStatus(v as OrderStatus)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            disabled={saving || pendingStatus === order.status}
            onClick={handleUpdate}
          >
            {saving ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function OrderFulfillmentList({ orders }: { orders: Order[] }) {
  const router = useRouter()

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error || "Failed to update order status")
        return
      }
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Something went wrong updating this order.")
    }
  }

  const active = orders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status))
  const delivered = orders.filter((o) => o.status === "DELIVERED")
  const cancelled = orders.filter((o) => o.status === "CANCELLED")

  return (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
        <TabsTrigger value="delivered">Delivered ({delivered.length})</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4 mt-4">
        {active.length === 0 && <p className="text-muted-foreground">No active orders.</p>}
        {active.map((o) => (
          <OrderCard key={o.id} order={o} onStatusChange={handleStatusChange} />
        ))}
      </TabsContent>

      <TabsContent value="delivered" className="space-y-4 mt-4">
        {delivered.length === 0 && <p className="text-muted-foreground">No delivered orders yet.</p>}
        {delivered.map((o) => (
          <OrderCard key={o.id} order={o} onStatusChange={handleStatusChange} />
        ))}
      </TabsContent>

      <TabsContent value="cancelled" className="space-y-4 mt-4">
        {cancelled.length === 0 && <p className="text-muted-foreground">No cancelled orders.</p>}
        {cancelled.map((o) => (
          <OrderCard key={o.id} order={o} onStatusChange={handleStatusChange} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
