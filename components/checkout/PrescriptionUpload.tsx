"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle2, FileWarning } from "lucide-react"
import { useUploadThing } from "@/lib/uploadthing"

interface PrescriptionUploadProps {
  value: string | null
  onUploaded: (url: string | null) => void
}

export function PrescriptionUpload({ value, onUploaded }: PrescriptionUploadProps) {
  const [uploading, setUploading] = useState(false)

  const { startUpload } = useUploadThing("medicinePrescription", {
    onUploadError: (error) => {
      alert(`Upload failed: ${error.message}`)
      setUploading(false)
    },
  })

  const handleFileSelected = async (file: File | undefined) => {
    if (!file) return

    setUploading(true)
    try {
      const result = await startUpload([file])
      const url = result?.[0]?.ufsUrl || result?.[0]?.url
      if (url) {
        onUploaded(url)
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong uploading your prescription.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="border-amber-300 bg-amber-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileWarning className="h-5 w-5 text-amber-600" />
          Prescription Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-600">
          Your cart contains one or more medicines that require a valid
          doctor's prescription. Please upload it before proceeding to
          payment — orders without one cannot be processed.
        </p>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-amber-300 bg-white p-4 transition hover:border-amber-500">
          {uploading ? (
            <Loader2 className="h-6 w-6 flex-shrink-0 animate-spin text-amber-600" />
          ) : value ? (
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
          ) : (
            <FileWarning className="h-6 w-6 flex-shrink-0 text-amber-600" />
          )}

          <div>
            <p className="text-sm font-medium">
              {value ? "Prescription uploaded ✓" : "Upload your prescription"}
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
      </CardContent>
    </Card>
  )
}
