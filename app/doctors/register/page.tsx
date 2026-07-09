"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  UserRound,
  BriefcaseMedical,
  Building2,
  FileCheck,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadThing } from "@/lib/uploadthing"

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

  // Uploaded document URLs — filled in as each upload completes.
  const [documents, setDocuments] = useState({
    aadhaarFile: null as string | null,
    degreeFile: null as string | null,
    registrationFile: null as string | null,
    profilePhoto: null as string | null,
  })

  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const { startUpload: startDocUpload } = useUploadThing("doctorDocument", {
    onUploadError: (error) => {
      alert(`Upload failed: ${error.message}`)
      setUploadingField(null)
    },
  })

  const { startUpload: startPhotoUpload } = useUploadThing("doctorProfilePhoto", {
    onUploadError: (error) => {
      alert(`Upload failed: ${error.message}`)
      setUploadingField(null)
    },
  })

  const handleFileSelected = async (
    field: keyof typeof documents,
    file: File | undefined
  ) => {
    if (!file) return

    setUploadingField(field)
    try {
      const uploader = field === "profilePhoto" ? startPhotoUpload : startDocUpload
      const result = await uploader([file])
      const url = result?.[0]?.ufsUrl || result?.[0]?.url
      if (url) {
        setDocuments((prev) => ({ ...prev, [field]: url }))
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong uploading that file.")
    } finally {
      setUploadingField(null)
    }
  }

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

    if (!documents.aadhaarFile || !documents.degreeFile || !documents.registrationFile) {
      alert("Please upload your Aadhaar card, degree certificate, and registration certificate before submitting.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/doctors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, ...documents }),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-blue-100">
            <span>Home</span>

            <ChevronRight className="h-4 w-4" />

            <span>Doctors</span>

            <ChevronRight className="h-4 w-4" />

            <span className="font-semibold text-white">
              Register
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">
              Doctor Registration
            </h1>

            <p className="mt-5 text-lg leading-8 text-blue-100">
              Become a verified healthcare professional on
              MedCare Connect. Manage appointments,
              consult patients online, issue digital
              prescriptions, and grow your medical practice
              securely.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur">
                ✓ Online Consultations
              </div>

              <div className="rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur">
                ✓ Verified Doctor Profile
              </div>

              <div className="rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur">
                ✓ Secure Patient Records
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl">

          {/* Progress */}
          <div className="border-b bg-slate-50 px-8 py-6">

            <div className="grid gap-4 md:grid-cols-4">

              <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">

                <div className="rounded-full bg-blue-600 p-2 text-white">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Step 1
                  </p>

                  <h3 className="font-semibold">
                    Personal
                  </h3>
                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl p-4">

                <div className="rounded-full bg-slate-200 p-2">
                  <BriefcaseMedical className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Step 2
                  </p>

                  <h3 className="font-semibold">
                    Professional
                  </h3>
                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl p-4">

                <div className="rounded-full bg-slate-200 p-2">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Step 3
                  </p>

                  <h3 className="font-semibold">
                    Clinic
                  </h3>
                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl p-4">

                <div className="rounded-full bg-slate-200 p-2">
                  <FileCheck className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Step 4
                  </p>

                  <h3 className="font-semibold">
                    Documents
                  </h3>
                </div>

              </div>

            </div>

          </div>

          <div className="p-8">
{/* Personal Information */}

<div className="mb-12">

  <div className="mb-8 flex items-center gap-3">

    <div className="rounded-xl bg-blue-100 p-3">
      <UserRound className="h-6 w-6 text-blue-600" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        Personal Information
      </h2>

      <p className="text-slate-500">
        Basic details about the doctor.
      </p>
    </div>

  </div>

  <div className="grid gap-6 md:grid-cols-2">

    <div>
      <Label className="mb-2 block">
        Full Name <span className="text-red-500">*</span>
      </Label>

      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Dr. Rahul Sharma"
        className="h-12 rounded-xl"
      />
    </div>

    <div>
      <Label className="mb-2 block">
        Email Address <span className="text-red-500">*</span>
      </Label>

      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="doctor@email.com"
        className="h-12 rounded-xl"
      />
    </div>

    <div>
      <Label className="mb-2 block">
        Phone Number <span className="text-red-500">*</span>
      </Label>

      <Input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="9876543210"
        className="h-12 rounded-xl"
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
        className="h-12 rounded-xl"
      />
    </div>

  </div>

</div>

{/* Professional Information */}

<div className="mb-12 border-t pt-10">

  <div className="mb-8 flex items-center gap-3">

    <div className="rounded-xl bg-blue-100 p-3">
      <BriefcaseMedical className="h-6 w-6 text-blue-600" />
    </div>

    <div>

      <h2 className="text-2xl font-bold text-slate-900">
        Professional Information
      </h2>

      <p className="text-slate-500">
        Medical qualification and experience.
      </p>

    </div>

  </div>

  <div className="grid gap-6 md:grid-cols-2">

    <div>

      <Label className="mb-2 block">
        Medical Registration Number
      </Label>

      <Input
        name="registrationNumber"
        value={formData.registrationNumber}
        onChange={handleChange}
        placeholder="MMC123456"
        className="h-12 rounded-xl"
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
        className="h-12 rounded-xl"
      />

    </div>

    <div>

      <Label className="mb-2 block">
        Specialization <span className="text-red-500">*</span>
      </Label>

      <Input
        name="specialization"
        value={formData.specialization}
        onChange={handleChange}
        placeholder="Cardiology"
        className="h-12 rounded-xl"
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
        className="h-12 rounded-xl"
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
        className="h-12 rounded-xl"
      />

    </div>

  </div>

</div>
{/* Clinic Information */}

<div className="mb-12 border-t pt-10">

  <div className="mb-8 flex items-center gap-3">

    <div className="rounded-xl bg-blue-100 p-3">
      <Building2 className="h-6 w-6 text-blue-600" />
    </div>

    <div>

      <h2 className="text-2xl font-bold text-slate-900">
        Clinic Information
      </h2>

      <p className="text-slate-500">
        Tell patients where you practice.
      </p>

    </div>

  </div>

  <div className="grid gap-6 md:grid-cols-2">

    <div>

      <Label className="mb-2 block">
        Hospital / Clinic Name
      </Label>

      <Input
        name="hospital"
        value={formData.hospital}
        onChange={handleChange}
        placeholder="Apollo Hospital"
        className="h-12 rounded-xl"
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
        className="h-12 rounded-xl"
      />

    </div>

  </div>

</div>

{/* Verification Documents */}

<div className="border-t pt-10">

  <div className="mb-8 flex items-center gap-3">

    <div className="rounded-xl bg-blue-100 p-3">
      <FileCheck className="h-6 w-6 text-blue-600" />
    </div>

    <div>

      <h2 className="text-2xl font-bold text-slate-900">
        Verification Documents
      </h2>

      <p className="text-slate-500">
        Upload the required documents for verification.
      </p>

    </div>

  </div>

  <div className="grid gap-6 md:grid-cols-2">

    {/* Aadhaar */}

    <label className="cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 transition hover:border-blue-500 hover:bg-blue-50">

      <div className="text-center">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

          {uploadingField === "aadhaarFile" ? (
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          ) : documents.aadhaarFile ? (
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          ) : (
            <FileCheck className="h-7 w-7 text-blue-600" />
          )}

        </div>

        <h3 className="font-semibold">
          Aadhaar Card
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {documents.aadhaarFile ? "Uploaded ✓" : "PDF, JPG or PNG"}
        </p>

        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          disabled={uploadingField !== null}
          onChange={(e) => handleFileSelected("aadhaarFile", e.target.files?.[0])}
        />

      </div>

    </label>

    {/* Registration */}

    <label className="cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 transition hover:border-blue-500 hover:bg-blue-50">

      <div className="text-center">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

          {uploadingField === "registrationFile" ? (
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          ) : documents.registrationFile ? (
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          ) : (
            <FileCheck className="h-7 w-7 text-blue-600" />
          )}

        </div>

        <h3 className="font-semibold">
          Medical Registration Certificate
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {documents.registrationFile ? "Uploaded ✓" : "PDF, JPG or PNG"}
        </p>

        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          disabled={uploadingField !== null}
          onChange={(e) => handleFileSelected("registrationFile", e.target.files?.[0])}
        />

      </div>

    </label>

    {/* Degree */}

    <label className="cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 transition hover:border-blue-500 hover:bg-blue-50">

      <div className="text-center">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

          {uploadingField === "degreeFile" ? (
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          ) : documents.degreeFile ? (
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          ) : (
            <FileCheck className="h-7 w-7 text-blue-600" />
          )}

        </div>

        <h3 className="font-semibold">
          Degree Certificate
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {documents.degreeFile ? "Uploaded ✓" : "PDF, JPG or PNG"}
        </p>

        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          disabled={uploadingField !== null}
          onChange={(e) => handleFileSelected("degreeFile", e.target.files?.[0])}
        />

      </div>

    </label>

    {/* Photo */}

    <label className="cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 transition hover:border-blue-500 hover:bg-blue-50">

      <div className="text-center">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

          {uploadingField === "profilePhoto" ? (
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          ) : documents.profilePhoto ? (
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          ) : (
            <UserRound className="h-7 w-7 text-blue-600" />
          )}

        </div>

        <h3 className="font-semibold">
          Profile Photo
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {documents.profilePhoto ? "Uploaded ✓" : "JPG or PNG (optional)"}
        </p>

        <Input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploadingField !== null}
          onChange={(e) => handleFileSelected("profilePhoto", e.target.files?.[0])}
        />

      </div>

    </label>

  </div>

</div>
{/* Declaration */}

<div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6">

  <h3 className="text-lg font-semibold text-slate-900">
    Declaration
  </h3>

  <p className="mt-3 text-sm leading-7 text-slate-600">
    I hereby declare that all the information provided above
    is true and accurate to the best of my knowledge. I
    understand that MedCare Connect may verify my medical
    registration and uploaded documents before activating
    my doctor profile.
  </p>

</div>

{/* Register Button */}

<div className="mt-10 border-t pt-8">

  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

    <div>

      <h3 className="text-lg font-semibold text-slate-900">
        Ready to Join MedCare Connect?
      </h3>

      <p className="text-slate-500">
        Complete your registration and start accepting online consultations.
      </p>

    </div>

    <Button
      onClick={handleSubmit}
      disabled={loading}
      className="h-12 rounded-xl bg-blue-600 px-10 text-base font-semibold hover:bg-blue-700"
    >
      {loading
        ? "Registering..."
        : "Register as Doctor"}
    </Button>

  </div>

</div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold text-slate-900">
              Why Join MedCare Connect?
            </h2>

            <p className="mt-3 text-slate-500">
              Grow your medical practice with secure digital healthcare.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl border bg-slate-50 p-8 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

                👨‍⚕️

              </div>

              <h3 className="text-xl font-semibold">
                More Patients
              </h3>

              <p className="mt-3 text-slate-600">
                Connect with patients from different cities through online consultations.
              </p>

            </div>

            <div className="rounded-2xl border bg-slate-50 p-8 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

                📅

              </div>

              <h3 className="text-xl font-semibold">
                Smart Appointments
              </h3>

              <p className="mt-3 text-slate-600">
                Manage appointments, prescriptions and patient history in one place.
              </p>

            </div>

            <div className="rounded-2xl border bg-slate-50 p-8 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

                🔒

              </div>

              <h3 className="text-xl font-semibold">
                Secure Platform
              </h3>

              <p className="mt-3 text-slate-600">
                Patient records and consultations are protected with modern security standards.
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />

    </div>
  )
}