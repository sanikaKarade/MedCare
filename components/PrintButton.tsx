"use client"

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-blue-600 text-white px-5 py-2 rounded"
    >
      Print Prescription
    </button>
  )
}