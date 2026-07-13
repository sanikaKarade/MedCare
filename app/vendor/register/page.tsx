"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle2, FileCheck, Store } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadThing } from "@/lib/uploadthing"

export default function VendorRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    licenseNumber: "",
  })

  const [licenseFile, setLicenseFile] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const { startUpload } = useUploadThing("vendorLicense", {
    onUploadError: (error) => {
      alert(`Upload failed: ${error.message}`)
      setUploading(false)
    },
  })

  async function handleFileSelected(file: File | undefined) {
    if (!file) return
    setUploading(true)
    try {
      const result = await startUpload([file])
      const url = result?.[0]?.ufsUrl || result?.[0]?.url
      if (url) setLicenseFile(url)
    } catch (error) {
      console.error(error)
      alert("Something went wrong uploading your license document.")
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit() {
    if (!formData.businessName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.licenseNumber) {
      alert("Please fill all required fields.")
      return
    }
    if (!licenseFile) {
      alert("Please upload your pharmacy license document before submitting.")
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/vendors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, licenseFile }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to submit application")
        return
      }

      router.push("/vendor/status")
    } catch (error) {
      console.error(error)
      alert("Something went wrong submitting your application.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Store className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Become a Pharmacy Vendor</h1>
            <p className="text-muted-foreground">
              Sell medicines on MedCare Connect. Applications are reviewed before you can list products.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Business / Pharmacy Name</Label>
              <Input value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
              </div>
              <div>
                <Label>Pharmacy License Number</Label>
                <Input value={formData.licenseNumber} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Pharmacy License Document</Label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-4 hover:border-blue-500">
                {uploading ? (
                  <Loader2 className="h-6 w-6 flex-shrink-0 animate-spin text-blue-600" />
                ) : licenseFile ? (
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
                ) : (
                  <FileCheck className="h-6 w-6 flex-shrink-0 text-blue-600" />
                )}
                <div>
                  <p className="text-sm font-medium">
                    {licenseFile ? "License uploaded ✓" : "Upload license document"}
                  </p>
                  <p className="text-xs text-slate-500">PDF, JPG, or PNG — max 4MB</p>
                </div>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => handleFileSelected(e.target.files?.[0])}
                />
              </label>
            </div>

            <Button className="w-full" disabled={loading || uploading} onClick={handleSubmit}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
