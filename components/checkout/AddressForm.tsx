"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface AddressFormProps {
  formData: {
    name: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
  }
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string
      phone: string
      email: string
      address: string
      city: string
      state: string
      pincode: string
    }>
  >
}

export function AddressForm({
  formData,
  setFormData,
}: AddressFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Address</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <Label>Full Name</Label>

          <Input
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <Label>Phone Number</Label>

            <Input
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div>
          <Label>Address</Label>

          <Input
            placeholder="House No., Street, Area"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <div>
            <Label>City</Label>

            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>State</Label>

            <Input
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>PIN Code</Label>

            <Input
              placeholder="400001"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pincode: e.target.value,
                })
              }
            />
          </div>

        </div>

      </CardContent>
    </Card>
  )
}