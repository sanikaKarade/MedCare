"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DoctorRegisterPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaarNumber: "",
    registrationNumber: "",
    degree: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    hospital: "",
    city: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.specialization
    ) {
      alert("Please fill all required fields.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/doctors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Registration Failed")
        return
      }

      alert("Doctor Registered Successfully!")

      router.push("/doctors")
    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Doctor Registration
          </h1>

          <p className="text-slate-600 mt-3">
            Join MedCare Connect and start consulting patients online.
          </p>
        </div>

        {/* Card */}

        <div className="bg-white rounded-2xl shadow-xl border p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Personal Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <Label className="mb-2 block">
                Full Name *
              </Label>

              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Rahul Sharma"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Email *
              </Label>

              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@email.com"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Phone Number *
              </Label>

              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Aadhaar Number
              </Label>

              <Input
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Medical Registration Number
              </Label>

              <Input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="MMC123456"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Degree
              </Label>

              <Input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="MBBS, MD"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Specialization *
              </Label>

              <Input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Cardiology"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Experience (Years)
              </Label>

              <Input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="5"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Consultation Fee (₹)
              </Label>

              <Input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                placeholder="500"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                Hospital / Clinic
              </Label>

              <Input
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Apollo Hospital"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                City
              </Label>

              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Mumbai"
              />
            </div>

          </div>
                    {/* Verification Documents */}

                    <div className="mt-10 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-6">
              Verification Documents
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <Label className="mb-2 block">
                  Aadhaar Card
                </Label>

                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div>
                <Label className="mb-2 block">
                  Medical Registration Certificate
                </Label>

                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div>
                <Label className="mb-2 block">
                  Degree Certificate
                </Label>

                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div>
                <Label className="mb-2 block">
                  Profile Photo
                </Label>

                <Input
                  type="file"
                  accept="image/*"
                />
              </div>

            </div>
          </div>

          {/* Submit Button */}

          <div className="mt-10">

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 text-base"
            >
              {loading
                ? "Registering..."
                : "Register as Doctor"}
            </Button>

          </div>

        </div>
      </div>
    </div>
  )
}