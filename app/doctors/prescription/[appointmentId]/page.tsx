"use client"

import { useState } from "react"

import { useParams } from "next/navigation"

export default function PrescriptionPage() {
  const params = useParams()

  const appointmentId =
    params.appointmentId as string 
  const [diagnosis, setDiagnosis] = useState("")
  const [notes, setNotes] = useState("")
  const [followUpDate, setFollowUpDate] = useState("")

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ])

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ])
  }
  const savePrescription = async () => {
    try {
      const response = await fetch(
        "/api/prescriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentId,
            diagnosis,
            notes,
            followUpDate,
            medicines,
          }),
        }
      )
  
      if (!response.ok) {
        throw new Error("Failed")
      }
  
      alert("Prescription saved successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to save prescription")
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Generate Prescription
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Doctor Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border p-3 rounded"
          rows={4}
        />

        <input
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          className="border p-3 rounded"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Medicines
        </h2>

        {medicines.map((medicine, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-3 mb-3"
          >
            <input
              value={medicine.name}
              onChange={(e) => {
                const updated = [...medicines]
                updated[index].name = e.target.value
                setMedicines(updated)
              }}
              placeholder="Medicine Name"
              className="border p-2 rounded"
            />

            <input
              value={medicine.dosage}
              onChange={(e) => {
                const updated = [...medicines]
                updated[index].dosage = e.target.value
                setMedicines(updated)
              }}
              placeholder="Dosage"
              className="border p-2 rounded"
            />

            <input
              value={medicine.frequency}
              onChange={(e) => {
                const updated = [...medicines]
                updated[index].frequency = e.target.value
                setMedicines(updated)
              }}
              placeholder="Frequency"
              className="border p-2 rounded"
            />

            <input
              value={medicine.duration}
              onChange={(e) => {
                const updated = [...medicines]
                updated[index].duration = e.target.value
                setMedicines(updated)
              }}
              placeholder="Duration"
              className="border p-2 rounded"
            />
          </div>
        ))}

        <div className="flex gap-3 mt-4">
          <button
            onClick={addMedicine}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Medicine
          </button>

          <button
  onClick={savePrescription}
  className="bg-green-600 text-white px-6 py-2 rounded"
>
  Save Prescription
</button>
        </div>
      </div>
    </div>
  )
}