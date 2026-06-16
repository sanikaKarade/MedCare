"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrescriptionPrintButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
    >
      <Download className="mr-1 h-4 w-4" />
      Download
    </Button>
  )
}