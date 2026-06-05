"use client"

import { useRouter } from "next/navigation"

const symptoms = [
  "Eye Problem",
  "Skin Problem",
  "Stomach Pain",
  "Back Pain",
  "Chest Pain",
  "Women's Health",
  "Men's Health",
  "Mental Health",
  "General Consultation",
]

export default function SymptomsPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Select Your Symptoms
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        {symptoms.map((symptom) => (
          <button
            key={symptom}
            onClick={() =>
              router.push(`/doctors?symptom=${encodeURIComponent(symptom)}`)
            }
            className="rounded-lg border p-6 text-left hover:bg-gray-100"
          >
            {symptom}
          </button>
        ))}
      </div>
    </div>
  )
}